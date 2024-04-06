const repository = require('./db');
const User = require('../models/user');

async function createUser(email, password, nickname) {
    try {
        const query = `INSERT INTO users (email, pass, nickname) VALUES ("${email}", "${password}", "${nickname}")`;
        const results = await repository.executeQuery(query);
        return new User(results.insertId, email, nickname, password);
    } catch (error) {
        throw error;
    }
}

//get user by email
async function getUserByEmail(email) {
    try {
        const query = `SELECT * FROM users WHERE email = "${email}"`;
        const results = await repository.executeQuery(query);
        if (results.length > 0) {
            const user = results[0];
            return new User(user.id, user.email, user.nickname, user.pass);
        }
        return null;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUserByEmail
};