import { sign } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";
import IUser from "interfaces/userInterface";
import {
  createUser,
  deleteAllUsers,
  deleteUserById,
  findAllUsers,
  findUser,
  findUserById,
  updateUser
} from "services/userService";
import { secretkey } from "config/app-config";

export const addUserController = async (req: Request, res: Response) => {
  try {
    req.body.password = await hash(req.body.password, 10);
    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const user: IUser | any = await findUser(req.body.name);
  if (!user) {
    return res.status(400).send("Bad Request");
  }
  const passcheck = await compare(req.body.password, user.password);
  if (passcheck) {
    const Token = sign({ name: user.name }, secretkey as string, {
      expiresIn: "1h",
    });
    return res.status(200).send({ Token });
  }
  return res.status(400).send("Wrong Pass");
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
    if (req.body.password !== undefined) {
      req.body.password = await hash(req.body.password, 10);
    }
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
  const users = deleteAllUsers();
  return res.status(200).send(users);
};
