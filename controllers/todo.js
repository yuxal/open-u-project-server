const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
	// Controller logic for route1 in controller1
	res.send('Controller 1 - Route 1');
});

module.exports = router;