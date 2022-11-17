import express, { Request, Response } from "express";
import { User } from "models/UserModel";
import {sign,verify} from "jsonwebtoken";
import {compare,hash} from "bcryptjs";

interface Ijsonpayload{
  name:string;
  iat:number;
  exp:number
}

interface IUser {
  name: string;
  password: string;
}

const router = express.Router();

router.get("/findall", async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).send(users);
});

router.post("/add", async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const password = await hash(req.body.password, 10);
    const user = await User.create( { name, password });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const user= await User.findOne({ name: req.body.name });
  if (!user) {
    return res.status(400).send("User does not exists");
  }
  const passcheck = await compare(req.body.password, user.password);
  if (passcheck) {
    const authToken = sign({name:user.name} , process.env.SECRET_KEY as string, {
      expiresIn: "1h",
    });
    return res.status(201).send({ authToken });
  }
  return res.status(400).send("Wrong Pass");
});

router.get("/find", async (req: Request, res: Response) => {
  const username=verify(req.headers.authorization as string,process.env.SECRET_KEY as string)
  const user= await User.findOne({ name: (username as Ijsonpayload).name });
  if (user) {
    return res.status(200).send(user);
  }
  return res.status(400).send("User does not exist");
});

router.post("/update", async (req: Request, res: Response) => {
  const username=verify(req.headers.authorization as string,process.env.SECRET_KEY as string)
  const user= await User.findOne({ name: (username as Ijsonpayload).name });
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
});

router.delete("/delete", async (req: Request, res: Response) => {
  const user=verify(req.headers.authorization as string,process.env.SECRET_KEY as string)
  if (user) {
    try {
      const deleteduser = await User.deleteOne({name:(user as Ijsonpayload).name });
      return res.status(201).send(deleteduser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  return res.status(400).send("User does not exist");
});

router.delete("/deleteall", async (req: Request, res: Response) => {
  const users = await User.deleteMany({});
  return res.status(200).send(users);
});

export { router as userRouter };
