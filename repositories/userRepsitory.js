const repository = require('./db');

async function createUser() {
	try {
		const query = 'INSERT INTO users (nickname, email, pass) VALUES ("poop", "poop@gmail.com", "password123")';
		const results = await repository.executeQuery(query);
		return results;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createUser
};