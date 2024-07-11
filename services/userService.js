
const userRepository = require('../repositories/userRepsitory');
const todoService = require('../services/todoService');

exports.getUserByEmail = async (email) => {
	return userRepository.getUserByEmail(email);
}

exports.createUser = async (email, password, nickname) => {
	return userRepository.createUser(email, password, nickname);
}

exports.getPossibleAssigns = async (currentUserId) => {
	const isAdmin = await userRepository.isCurrentUserAdmin(currentUserId);
	return userRepository.getPossibleAssigns(isAdmin, currentUserId);
}

exports.deleteUser = async (userId) => {
	await userRepository.deleteUser(userId);
	const todos = await todoService.getTodoByAssignee(userId);
	for (const todo of todos) {
		await todoService.deleteTodo(todo.id);
	}
}

exports.updateUser = async (user) => {
	return userRepository.updateUser(user);
}