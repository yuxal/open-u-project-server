exports.TodoStatus = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    DELETED: 'DELETED'
}

class Todo {
    constructor(todo) {
        this.id = todo.id;
        this.title = todo.title;
        this.description = todo.description;
        this.parentTaskId = todo.parentTaskId;
        this.assignee = todo.assignee;
        this.status = todo.status;
        this.startDate = todo.startDate;
        this.endDate = todo.endDate;
        this.dueDate = todo.dueDate;
        this.level = todo.level;
    }

    toString() {
        return `Todo: { title: ${this.title}, description: ${this.description}, parentTaskId: ${this.parentTaskId}, assignee: ${this.assignee}, status: ${this.status}, level: ${this.level}, startDate: ${this.startDate}, dueDate: ${this.dueDate}, endDate: ${this.endDate} }`;
    }
}

module.exports = Todo;