import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", createdAt: new Date() },
  { id: 2, text: "Buy bread", createdAt: null },
  { id: 3, text: "Buy butter", createdAt: new Date() },
];

export class TodosController {
  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: "Id is not a number" });

    const todo = todos.find((todo) => todo.id === id);

    return todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} is not found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const {text} = req.body;
    if(!text) return res.status(400).json({error: "Text is required"});

    const newTodo = {
      id: todos.length +1,
      text,
      createdAt: null
    }
    todos.push(newTodo);
    return res.json(newTodo);
  };
}
