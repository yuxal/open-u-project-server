const repository = require('./db');
const Todo = require('../models/todo');
const moment = require('moment');


async function createTodo(todo) {
        const query =
            `INSERT INTO todos (title, description, parent_task_id, assignee, status, start_date, due_date, end_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            todo.title,
            todo.description,
            todo.parentTaskId,
            todo.assignee,
            todo.status,
            todo.startDate ? parseDate(todo.startDate) : null,
            todo.dueDate ? parseDate(todo.dueDate) : null,
            todo.endDate ? parseDate(todo.endDate) : null
        ];
        const results = await repository.executeQuery(query, values);
        return new Todo({
            id: results.insertId,
            title: todo.title,
            description: todo.description,
            parentTaskId: todo.parentTaskId,
            assignee: todo.assignee,
            status: todo.status,
            startDate: todo.startDate,
            endDate: todo.endDate,
            dueDate: todo.dueDate
        });
}

async function updateTodo(todo) {
    const query =
        `UPDATE todos
            SET title = ?,
            description = ?,
            parent_task_id = ?,
            assignee = ?,
            status = ?,
            start_date = ?,
            due_date = ?,
            end_date = ?
        WHERE id = ?`;

    const values = [
        todo.title,
        todo.description,
        todo.parentTaskId,
        todo.assignee,
        todo.status,
        todo.startDate ? parseDate(todo.startDate) : null,
        todo.dueDate ? parseDate(todo.dueDate) : null,
        todo.endDate ? parseDate(todo.endDate) : null,
        todo.id
    ];

    await repository.executeQuery(query, values);
    return todo;
}


async function deleteTodo(todoId) {
    try {
        const query = `DELETE FROM todos WHERE id = ${todoId} OR parent_task_id = ${todoId}`
        await repository.executeQuery(query);
    } catch (error) {
        throw error;
    }
}

async function assignTodo(todoId, assigneeId) {
    const query = `UPDATE todos SET assignee = ${assigneeId} WHERE id = ${todoId}`
    await repository.executeQuery(query);
}

async function getTodosByAssignee(assigneeId) {
    const query = `SELECT
    id AS id,
    title AS title,
    description AS description,
    parent_task_id AS parentTaskId,
    assignee AS assignee,
    status AS status,
    start_date AS startDate,
    end_date AS endDate,
    due_date AS dueDate
    FROM todos
    WHERE assignee = ${assigneeId}`;
    return await repository.executeQuery(query);
}

async function getTodosForDate(date) {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    const query = `SELECT
    id AS id,
    title AS title,
    description AS description,
    parent_task_id AS parentTaskId,
    assignee AS assignee,
    status AS status,
    start_date AS startDate,
    end_date AS endDate,
    due_date AS dueDate
FROM todos
WHERE DATE(due_date) = "${formattedDate}"`;
    return await repository.executeQuery(query);
}

async function getOverdueTodos() {
    const dateObject = new Date();
    const formattedDate = dateObject.toISOString().split('T')[0];
    const query = `SELECT
    id AS id,
    title AS title,
    description AS description,
    parent_task_id AS parentTaskId,
    assignee AS assignee,
    status AS status,
    start_date AS startDate,
    end_date AS endDate,
    due_date AS dueDate
FROM todos
WHERE DATE(due_date) < "${formattedDate}"`;
    return await repository.executeQuery(query);
}

async function getAllTodos() {
    const query = `SELECT
    id AS id,
    title AS title,
    description AS description,
    parent_task_id AS parentTaskId,
    assignee AS assignee,
    status AS status,
    start_date AS startDate,
    end_date AS endDate,
    due_date AS dueDate
    FROM todos`;
    return await repository.executeQuery(query);
}

async function getTodoById(id) {
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
}

async function deleteTodosByAssignee(userId) {
    const query = `DELETE FROM todos WHERE assignee = ${userId}`;
    await repository.executeQuery(query);
}

function parseDate(date) {
    return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null;
}

//get user by email
module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    assignTodo,
    getTodosByAssignee,
    getAllTodos,
    getTodosForDate,
    getOverdueTodos,
    getTodoById,
    deleteTodosByAssignee
};