const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const {protectedRoute} = require('../middleware/protectedRoute')

router.post('/signup', async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.nickname) {
        return res.status(400).json({ message: 'Email password and nickname are required' });
    }
    if (await userService.getUserByEmail(req.body.email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = await userService.createUser(req.body.email, req.body.password, req.body.nickname);
    if (user) {
        req.session.user = user;
        return res.sendStatus(200);
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
    req.session.user = user;
    res.sendStatus(200);
});

router.post('/logout', protectedRoute, async (req, res) => {
    try {
        await req.session.destroy()
    } catch (e) {
        console.error(e)
        return res.sendStatus(500);
    }
    res.sendStatus(200);
});

module.exports = router;