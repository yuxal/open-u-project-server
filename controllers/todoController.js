const express = require('express');
const router = express.Router();
const todoService = require('../services/todoService');
const {protectedRoute} = require('../middleware/protectedRoute')

router.post('/', protectedRoute, async(req, res) => {
	// Create todo
	if (!req.body.title) {
		return res.status(400).json({ message: 'Title is required' });
	}
    const createdTodo = await todoService.createTodo({
		title: req.body.title,
        status: req.body.status,
		description: req.body.description,
		assignee: req.session.user.id
	})
    res.send(createdTodo)
});

router.get('/:id', protectedRoute, async(req, res) => {
	const todo = await todoService.getTodoById(req.params.id);
	if (todo) {
		return res.json(todo);
	}
	return res.sendStatus(404);
});

module.exports = router;