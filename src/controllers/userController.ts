import { Request, Response } from "express";

import {
  createUser,
  deleteAllUsers,
  deleteUserById,
  findAllUsers,
  addUser,
  findUserById,
  updateUser,
} from "services/userService";

export const addUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const Token = await addUser(req.body);
    return res.status(200).send({ Token });
  } catch (error) {
    return res.status(400).send("Wrong Pass");
  }
};

export const findAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(401).send("Unauthorised");
  }
};

export const findUserController = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.params.id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(401).send("Unauthorised");
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const updateduser = updateUser(req.params.id, req.body);
    return res.status(200).send(updateduser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const deleteduser = deleteUserById(req.params.id);
    return res.status(200).send(deleteduser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = deleteAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};
