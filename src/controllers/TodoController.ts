import { Request, Response } from "express";
import { Todo } from "models/todo";

export const findAllTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.find({});
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(201).send(todo);
  } catch (error) {
    return res.status(400).send(error);
  }
};
