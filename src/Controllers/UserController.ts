import { sign } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";
import { User } from "models/UserModel";

export const addUser = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const password = await hash(req.body.password, 10);
    const user = await User.create({ name, password });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ name: req.body.name });
  if (!user) {
    return res.status(400).send("Bad Request");
  }
  const passcheck = await compare(req.body.password, user.password);
  if (passcheck) {
    const Token = sign({ name: user.name }, process.env.SECRET_KEY as string, {
      expiresIn: "1h",
    });
    return res.status(200).send({ Token });
  }
  return res.status(400).send("Wrong Pass");
};

export const findAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).send(users);
};

export const findUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ name: req.body.user.name });
  if (user) {
    return res.status(200).send(user);
  }
  return res.status(401).send("Unauthorised");
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const change = req.body;
    if (change.password !== undefined) {
      change.password = await hash(req.body.password, 10);
    }
    // console.log(change)
    const updateduser = await User.findOneAndUpdate(
      { name: req.body.user.name },
      { $set: { ...change } }
    );
    return res.status(200).send(updateduser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleteduser = await User.deleteOne({
      name: req.body.user.name,
    });
    return res.status(200).send(deleteduser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  const users = await User.deleteMany({});
  return res.status(200).send(users);
};
