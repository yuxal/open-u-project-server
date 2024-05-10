
const todoRepository = require('../repositories/todoRepsitory')

exports.createTodo = async (todo) => {
    return await todoRepository.createTodo(todo);
}

exports.updateTodo = async (todo) => {
    return await todoRepository.updateTodo(todo);
}

exports.deleteTodo = async (todoId) => {
    await todoRepository.deleteTodo(todoId);
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
    return await todoRepository.getTodoById(id);
}