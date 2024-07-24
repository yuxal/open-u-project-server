const express = require('express');
const router = express.Router();
const todoService = require('../services/todoService');
const {protectedRoute} = require('../middleware/protectedRoute')

router.post('/:token', protectedRoute, async(req, res) => {
	// Create todo

	if (!req.body.title) {
		return res.status(400).json({ message: 'Title is required' });
	}
    const createdTodo = await todoService.createTodo({
		title: req.body.title,
        status: req.body.status,
		description: req.body.description,
		assignee: req.body.assignee,
		startDate: req.body.startDate,
		dueDate: req.body.dueDate,
		endDate: req.body.endDate,
		parentTaskId: req.body.parentTaskId
	})
    res.send(createdTodo)
});

router.put('/:todoId/:token', protectedRoute, async(req, res) => {
	// Update todo
	if (!req.params.todoId) {
		return res.status(400).json({ message: 'Id required for Todo' });
	}
	const updatedTodo = await todoService.updateTodo({
		id: req.params.todoId,
		title: req.body.title,
		status: req.body.status,
		description: req.body.description,
		assignee: req.body.assignee,
		startDate: req.body.startDate,
		dueDate: req.body.dueDate,
		endDate: req.body.endDate,
		parentTaskId: req.body.parentTaskId
	})
	res.send(updatedTodo)
});

router.delete('/:todoId/:token', protectedRoute, async(req, res) => {
	// Delete todo
	if (!req.params.todoId) {
		return res.status(400).json({ message: 'Id required for Todo' });
	}
	await todoService.deleteTodo(req.params.todoId)
	res.sendStatus(200)
});

router.put('/assign/:todoId/:token', protectedRoute, async(req, res) => {
	// Assign todo
	if (!req.params.todoId) {
		return res.status(400).json({ message: 'Id required for Todo' });
	}
	await todoService.assignTodo(req.params.todoId, req.body.assignee)
	res.sendStatus(200)
});

router.get('/assignee/:assigneeId/:token', protectedRoute, async(req, res) => {
	if (!req.params.assigneeId) {
		return res.status(400).json({ message: 'assigneeId required for get' });
	}
	const todos = await todoService.getTodoByAssignee(req.params.assigneeId)
	res.send(todos);
});

router.get('/:token', protectedRoute, async(req, res) => {
	const todos = await todoService.getAllTodos()
	res.send(todos);
});

router.get('/due/:date/:token', protectedRoute, async(req, res) => {
	if (!req.params.date) {
		return res.status(400).json({ message: 'assigneeId required for get' });
	}
	const todos = await todoService.getTodosForDate(req.userId, req.params.date)
	res.send(todos);
});
router.get('/overdue/:token', protectedRoute, async(req, res) => {
	const todos = await todoService.getOverdueTodos(req.userId)
	res.send(todos);
});

router.get('/:id/:token', protectedRoute, async(req, res) => {
	const todo = await todoService.getTodoById(req.params.id);
	if (todo) {
		return res.json(todo);
	}
	return res.sendStatus(404);
});

module.exports = router;