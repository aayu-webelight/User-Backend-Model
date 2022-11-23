import { Request, Response } from "express";
import { addToDo, findToDo } from "services/todoService";

export const findAllTodo = async (req: Request, res: Response) => {
  try {
    const todo = await findToDo();
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const addTodoController = async (req: Request, res: Response) => {
  try {
    const todo = await addToDo(req.body);
    return res.status(201).send(todo);
  } catch (error) {
    return res.status(400).send(error);
  }
};
