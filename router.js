// router.js
const express = require('express');
const router = express.Router();
const packageJson = require('./package.json');
const appVersion = packageJson.version;


// Import controller routes
const userRoutes = require('./controllers/user');
const todoRoutes = require('./controllers/todo');

// Use controller routes
router.get('/', (req, res) => res.send('Welcome to the Todo API! Version: ' + appVersion));
router.use('/user', userRoutes);
router.use('/todo', todoRoutes);

module.exports = router;
