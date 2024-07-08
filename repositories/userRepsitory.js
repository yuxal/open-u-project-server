const repository = require('./db');
const User = require('../models/user');

async function createUser(email, password, nickname) {
    const query = `INSERT INTO users (email, pass, nickname) VALUES ("${email}", "${password}", "${nickname}")`;
    const results = await repository.executeQuery(query);
    return new User(results.insertId, email, nickname, password, false);
}

//get user by email
async function getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = "${email}"`;
    const results = await repository.executeQuery(query);
    if (results.length > 0) {
        const user = results[0];
        return new User(user.id, user.email, user.nickname, user.pass, user.is_admin === 1);
    }
    return null;
}

async function getPossibleAssigns(isAdmin, userId) {
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

}

async function deleteUser(userId) {
    const query = `DELETE FROM users WHERE id = ${userId}`;
    await repository.executeQuery(query);
}

async function updateUser(user) {
    let query = `UPDATE users SET `;
    if (user.email) {
        query += `email = "${user.email}", `;
    }
    if (user.pass) {
        query += `pass = "${user.pass}", `;
    }
    if (user.nickname) {
        query += `nickname = "${user.nickname}", `;
    }
    query = query.slice(0, -2);
    query += ` WHERE id = ${user.id}`;
    await repository.executeQuery(query);
}

async function isCurrentUserAdmin(currentUserId) {
    const query = `SELECT is_admin FROM users WHERE id = ${currentUserId}`;
    const results = await repository.executeQuery(query);
    if (results.length > 0) {
        return results[0].is_admin === 1;
    }
    return false;
}

module.exports = {
    createUser,
    getUserByEmail,
    getPossibleAssigns,
    isCurrentUserAdmin,
    deleteUser,
    updateUser
};