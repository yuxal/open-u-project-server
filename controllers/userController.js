const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userService = require('../services/userService');
const userRepository = require('../repositories/userRepsitory');
const {protectedRoute, SUPER_SECRET_KEY} = require('../middleware/protectedRoute')
const {verifyAdmin} = require('../middleware/verifyAdmin')

router.post('/signup', async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.nickname) {
        return res.status(400).json({ message: 'Email password and nickname are required' });
    }
    if (await userService.getUserByEmail(req.body.email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = await userService.createUser(req.body.email, req.body.password, req.body.nickname);
    if (user) {
        const token = jwt.sign({userId: user.id}, SUPER_SECRET_KEY, {expiresIn: '1h'});
        return res.send({token, userId: user.id, isAdmin: user.isAdmin});
    }
    throw new Error('User not created');
});

router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await userService.getUserByEmail(req.body.email);
    if (!user || user.password !== req.body.password) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({userId: user.id}, SUPER_SECRET_KEY, {expiresIn: '1h'});
    return res.send({token, userId: user.id, isAdmin: user.isAdmin});
});

router.get('/assigns/:token', protectedRoute, async (req, res) => {
    const assigns = await userService.getPossibleAssigns(req.userId);
    res.send(assigns);
});

router.delete('/:userId/:token', protectedRoute, verifyAdmin, async (req, res) => {
    await userService.deleteUser(req.params.userId);
    res.sendStatus(200);
});

router.post('/update/:token', protectedRoute, async (req, res) => {
    const isAdmin = await userRepository.isCurrentUserAdmin(req.userId)
    if (!isAdmin && req.userId !== req.body.id) {
        return res.status(401).json({ message: 'Only admin is allowed to update other users' });
    }
    if (!req.body.id || (!req.body.email && !req.body.password && !req.body.nickname)) {
        return res.status(400).json({ message: `Id and at least one of email password or nickname is required to update user` });
    }
    await userService.updateUser(req.body);
    res.sendStatus(200);
});
module.exports = router;