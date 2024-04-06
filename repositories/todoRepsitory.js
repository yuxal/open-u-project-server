const repository = require('./db');
const Todo = require('../models/todo');

async function createTodo(todo) {
    try {
        const query =
            `INSERT INTO todos (title, description, parent_task_id, assignee, status, start_date, due_date) 
            VALUES ("${todo.title}", "${todo.description}", ${todo.parentTaskId || "NULL"}, "${todo.assignee}", "${todo.status}", ${todo.startDate || "NULL"}, ${todo.dueDate || "NULL"})`;
        console.log(query)
        const results = await repository.executeQuery(query);
        return new Todo({
            id: results.insertId,
            title: todo.title,
            description: todo.description,
            parentTaskId: todo.parentTaskId,
            assignee: todo.assignee,
            status: todo.status,
            startDate: todo.startDate,
            dueDate: todo.dueDate
        });
    } catch (error) {
        throw error;
    }
}

async function getTodoById(id) {
    try {
        const query = `SELECT * FROM todos WHERE id = ${id}`;
        const results = await repository.executeQuery(query);
        if (results.length > 0) {
            const todo = results[0];
            return new Todo({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                parentTaskId: todo.parent_task_id,
                assignee: todo.assignee,
                status: todo.status,
                startDate: todo.start_date,
                dueDate: todo.due_date
            });
        }
        return null;
    } catch (error) {
        throw error;
    }
}
//get user by email
module.exports = {
    createTodo,
    getTodoById
};