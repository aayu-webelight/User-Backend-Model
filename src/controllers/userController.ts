import { Request, Response } from "express";

import {
  createUser,
  deleteAllUsers,
  deleteUserById,
  findAllUsers,
  userLogin,
  findUserById,
  updateUser,
} from "services/userService";

export const addUserController = async (req: Request, res: Response) => {
  try {
    return res.status(201).send(await createUser(req.body));
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await userLogin(req.body));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const findAllUsersController = async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await findAllUsers());
  } catch (error: any) {
    return res.status(401).send(error.message);
  }
};

export const findUserController = async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await findUserById(req.params.id));
  } catch (error: any) {
    return res.status(401).send(error.message);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await updateUser(req.params.id, req.body));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await deleteUserById(req.params.id));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const deleteAllUsersController = async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await deleteAllUsers());
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
