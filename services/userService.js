
const userRepository = require('../repositories/userRepsitory');
const todoRepository = require('../repositories/todoRepsitory');

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
	return todoRepository.deleteTodosByAssignee(userId);
}

exports.updateUser = async (user) => {
	return userRepository.updateUser(user);
}