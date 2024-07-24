
const todoRepository = require('../repositories/todoRepsitory')

async function addLevelforTodo (todo) {
    if (todo.parentTaskId) {
        const parentTask = await todoRepository.getTodoById(todo.parentTaskId)
        if (!parentTask) {
            throw new Error('Parent task not found')
        }
        todo.level = parentTask.level + 1
    } else {
        todo.level = 0
    }
}

exports.createTodo = async (todo) => {
    await addLevelforTodo(todo)
    return await todoRepository.createTodo(todo);
}

exports.updateTodo = async (todo) => {
    await addLevelforTodo(todo)
    return await todoRepository.updateTodo(todo);
}

exports.deleteTodo = async (todoId) => {
    const updateChildren = async (parentId) => {
        const childTodos = await todoRepository.getTodosByParentId(parentId);
        for (const childTodo of childTodos) {
            await updateChildren(childTodo.id); // Recursively update children
            await todoRepository.updateChildTodo(childTodo.id, childTodo.level - 1);
        }
    };

    await updateChildren(todoId);
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

exports.getTodosForDate = async (userId, date) => {
    return todoRepository.getTodosForDate(userId, date);
}

exports.getOverdueTodos = async (userId) => {
    return todoRepository.getOverdueTodos(userId);
}

exports.getTodoById = async (id) => {
    return await todoRepository.getTodoById(id);
}