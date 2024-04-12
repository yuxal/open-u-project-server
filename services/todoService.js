
const todoRepository = require('../repositories/todoRepsitory')

exports.createTodo = async (todo) => {
    try {
        const createdTodo = await todoRepository.createTodo(todo);
        return createdTodo;
    } catch (error) {
        throw error;
    }
}

exports.updateTodo = async (todo) => {
    try {
        const updatedTodo = await todoRepository.updateTodo(todo);
        return updatedTodo;
    } catch (error) {
        throw error;
    }
}

exports.deleteTodo = async (todoId) => {
    try {
        await todoRepository.deleteTodo(todoId);
    } catch (error) {
        throw error;
    }
}

exports.assignTodo = async (todoId, assigneeId) => {
    await todoRepository.assignTodo(todoId, assigneeId);
}

exports.getTodoByAssignee = async (assigneeId) => {
    return todoRepository.getTodosByAssignee(assigneeId);
}

exports.getAllTodos = async () => {
    return todoRepository.getAllTodos();
}

exports.getTodosForDate = async (date) => {
    return todoRepository.getTodosForDate(date);
}

exports.getOverdueTodos = async () => {
    return todoRepository.getOverdueTodos();
}

exports.getTodoById = async (id) => {
    try {
        return await todoRepository.getTodoById(id);
    } catch (error) {
        throw error;
    }
}