import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TodosController {
  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: "Id is not a number" });

    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    return todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} is not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const newTodo = await prisma.todo.create({
      data: { text },
    });
    return res.json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} is not found` });

    const { text, completedAt } = req.body;
    const todoUpdate = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        text,
        completedAt: completedAt ? new Date(completedAt) : null,
      },
    });
    return res.json(todoUpdate);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return !todo
      ? res.status(404).json({ error: `Todo with id ${id} is not found` })
      : res.json({ todo });
  };
}
