const repository = require('./db');
const User = require('../models/user');

async function createUser(email, password, nickname) {
    try {
        const query = `INSERT INTO users (email, pass, nickname) VALUES ("${email}", "${password}", "${nickname}")`;
        const results = await repository.executeQuery(query);
        return new User(results.insertId, email, nickname, password, false);
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
            return new User(user.id, user.email, user.nickname, user.pass, user.is_admin === 1);
        }
        return null;
    } catch (error) {
        throw error;
    }
}

async function getPossibleAssigns(isAdmin, userId) {
    try {
        let query;
        if (isAdmin) {
            query = `SELECT id, nickname as name FROM users`;
        } else {
            query = `SELECT id, nickname as name FROM users WHERE id = ${userId}`;
        }

        const results = await repository.executeQuery(query);
        if (results.length > 0) {
            return results.map(user => {
                return {
                    id: user.id,
                    name: user.name
                }
            });
        }
        return null;
    } catch (error) {
        throw error;
    }
}

async function isCurrentUserAdmin(currentUserId) {
    try {
        const query = `SELECT is_admin FROM users WHERE id = ${currentUserId}`;
        const results = await repository.executeQuery(query);
        if (results.length > 0) {
            return results[0].is_admin === 1;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    getPossibleAssigns,
    isCurrentUserAdmin
};