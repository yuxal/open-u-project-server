
const userRepository = require('../repositories/userRepsitory');

exports.getUserByEmail = async (email) => {
	try {
		const user = await userRepository.getUserByEmail(email);
		return user;
	} catch (error) {
		throw error;
	}
}

exports.createUser = async (email, password, nickname) => {
	try {
		const user = await userRepository.createUser(email, password, nickname);
		return user;
	} catch (error) {
		throw error;
	}
}