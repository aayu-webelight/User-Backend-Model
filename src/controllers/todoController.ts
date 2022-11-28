import { Request, Response } from "express";
import { addToDo, findToDo } from "services/todoService";

export const findAllTodo = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await findToDo());
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const addTodoController = async (req: Request, res: Response) => {
  try {
    return res.status(201).send(await addToDo(req.body));
  } catch (error) {
    return res.status(400).send(error);
  }
};
