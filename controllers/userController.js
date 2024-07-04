const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userService = require('../services/userService');
const {protectedRoute, SUPER_SECRET_KEY} = require('../middleware/protectedRoute')

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
        return res.send({token, isAdmin: user.isAdmin});
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
    return res.send({token, isAdmin: user.isAdmin});
});

router.get('/assigns/:token', protectedRoute, async (req, res) => {
    const assigns = await userService.getPossibleAssigns(req.userId);
    res.send(assigns);
});

module.exports = router;