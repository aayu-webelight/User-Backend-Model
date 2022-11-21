import { Request, Response } from "express";
import { User } from "models/UserModel";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

const addauser = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const password = await hash(req.body.password, 10);
    const user = await User.create({ name, password });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const loginauser = async (req: Request, res: Response) => {
  const user = await User.findOne({ name: req.body.name });
  if (!user) {
    return res.status(400).send("Bad Request");
  }
  const passcheck = await compare(req.body.password, user.password);
  if (passcheck) {
    const Token = sign({ name: user.name }, process.env.SECRET_KEY as string, {
      expiresIn: "1h",
    });
    return res.status(201).send({ Token });
  }
  return res.status(400).send("Wrong Pass");
};

const findallusers = async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).send(users);
};

async function deleteauser(req: Request, res: Response) {
  try {
    const deleteduser = await User.deleteOne({
      name: req.body.user.name,
    });
    return res.status(200).send(deleteduser);
  } catch (error) {
    res.status(400).send(error);
  }
}

const findauser = async (req: Request, res: Response) => {
  const user = await User.findOne({ name: req.body.user.name });
  if (user) {
    return res.status(200).send(user);
  }
  return res.status(401).send("Unauthorised");
};

const updateauser = async (req: Request, res: Response) => {
  console.log(req.body)
  const user = await User.findOne({ name: req.body.user.name });
  if (user) {
    const change = req.body;
    if (change.password !== undefined) {
      change.password = await hash(req.body.password, 10);
    }
    try {
      const updateduser = await User.updateOne(
        { name: user.name },
        { $set: { ...change } }
      );
      return res.status(201).send(updateduser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  return res.status(400).send("User does not exist");
};

const deleteAllusers = async (req: Request, res: Response) => {
  const users = await User.deleteMany({});
  return res.status(200).send(users);
};

export {
  deleteauser,
  findauser,
  updateauser,
  deleteAllusers,
  addauser,
  findallusers,
  loginauser,
};
