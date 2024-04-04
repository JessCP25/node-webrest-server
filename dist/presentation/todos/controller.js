"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const todos = [
    { id: 1, text: "Buy milk", createdAt: new Date() },
    { id: 2, text: "Buy bread", createdAt: null },
    { id: 3, text: "Buy butter", createdAt: new Date() },
];
class TodosController {
    constructor() {
        this.getTodos = (req, res) => {
            return res.json(todos);
        };
        this.getTodoById = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(404).json("Id is not a number");
            const todo = todos.find((todo) => todo.id === id);
            return todo
                ? res.json(todo)
                : res.status(404).json(`Todo with id ${id} is not found`);
        };
    }
}
exports.TodosController = TodosController;
