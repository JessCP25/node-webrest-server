import { Request, Response } from "express";
import { todo } from "node:test";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: new Date() },
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
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null,
    };
    todos.push(newTodo);
    return res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} is not found` });
    const { text, completedAt } = req.body;
    todo.text = text || todo.text;
    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    return res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) return res.status(400).json({error: "ID argument is not a number"});
    // const indexTodo = todos.findIndex(todo => todo.id === id);
    // if(indexTodo === -1) return res.status(404).json({error: `Todo with id ${id} is not found`});
    // const todo = todos[indexTodo];
    // todos.splice(indexTodo, 1);
    const todo = todos.find(todo => todo.id === id);
    if(!todo) return res.status(404).json({error: `Todo with id ${id} is not found`});

    todos.splice(todos.indexOf(todo), 1)
    res.json(todo);
  }
}
