// router.js
const express = require('express');
const router = express.Router();
const packageJson = require('./package.json');
const appVersion = packageJson.version;


// Import controller routes
const userRoutes = require('./controllers/userController');
const todoRoutes = require('./controllers/todoController');

// Use controller routes
router.get('/', (req, res) => res.send('Welcome to the Todo API! Version: ' + appVersion));
router.use('/api/user', userRoutes);
router.use('/api/todo', todoRoutes);

module.exports = router;
