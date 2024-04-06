
const todoRepository = require('../repositories/todoRepsitory')

exports.createTodo = async (todo) => {
    try {
        const createdTodo = await todoRepository.createTodo(todo);
        return createdTodo;
    } catch (error) {
        throw error;
    }
}

exports.getTodoById = async (id) => {
    try {
        const todo = await todoRepository.getTodoById(id);
        return todo;
    } catch (error) {
        throw error;
    }
}