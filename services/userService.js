
const userRepository = require('../repositories/userRepsitory');

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