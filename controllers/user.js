const express = require('express');
const router = express.Router();
const userRepo = require('../repositories/userRepsitory');

router.post('/signup', async (req, res) => {
	await userRepo.createUser() // move to service
	res.sendStatus(200)
});

module.exports = router;