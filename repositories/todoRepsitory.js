const repository = require('./db');
const Todo = require('../models/todo');

async function createTodo(todo) {
    try {
        const query =
            `INSERT INTO todos (title, description, parent_task_id, assignee, status, start_date, due_date, end_date) 
            VALUES ("${todo.title}", ${todo.description || "NULL"}, ${todo.parentTaskId || "NULL"}, ${todo.assignee || "NULL"}, "${todo.status}", ${todo.startDate || "NULL"}, ${todo.dueDate || "NULL"}, ${todo.endDate || "NULL"})`;
        const results = await repository.executeQuery(query);
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
    } catch (error) {
        throw error;
    }
}

async function updateTodo(todo) {
    try {
        const query =
            `UPDATE todos
            SET title = "${todo.title}",
            description = ${todo.description || "NULL"},
            parent_task_id = ${todo.parentTaskId || "NULL"},
            assignee = ${todo.assignee || "NULL"},
            status = "${todo.status}",
            start_date = ${todo.startDate || "NULL"},
            due_date = ${todo.dueDate || "NULL"},
            end_date = ${todo.endDate || "NULL"}
        WHERE id = ${todo.id};`;
        await repository.executeQuery(query);
        return todo;
    } catch (error) {
        throw error;
    }
}

async function deleteTodo(todoId) {
    try {
        const query = `DELETE FROM todos WHERE id = ${todoId}`
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
    updateTodo,
    deleteTodo,
    assignTodo,
    getTodosByAssignee,
    getAllTodos,
    getTodosForDate,
    getOverdueTodos,
    getTodoById
};