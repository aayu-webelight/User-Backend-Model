import express, { Request, Response } from "express";
import { User } from "@/models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/findall", async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).send(users);
});

router.post("/add", async (req: Request, res: Response) => {
  // console.log(req.body.name)
  const check = await User.findOne({ name: req.body.name.toLowerCase() });
  if (check) {
    return res.status(400).send("User exists");
  }
  const name = req.body.name.toLowerCase();
  const password = await bcrypt.hash(req.body.password, 10);
  const user = User.build({ name, password });
  await user.save();
  return res.status(201).send(user);
});

router.post("/login", async (req: Request, res: Response) => {
  // console.log(req.body.name)
  const check = await User.findOne({ name: req.body.name.toLowerCase() });
  if (!check) {
    return res.status(400).send("User does not exists");
  }  
  const passcheck = await bcrypt.compare(req.body.password, check.password);
  if (passcheck) {
    const secretkey: any = process.env.SECRET_KEY;
    const authToken = jwt.sign(req.body.name, secretkey);
    return res.status(201).send({ authToken });
  }
  return res.status(400).send("Wrong Pass");
});

router.get("/find/:name", async (req: Request, res: Response) => {
  // console.log(req.params.name)
  const check = await User.findOne({ name: req.params.name.toLowerCase() });
  // console.log({ name: req.params.name.toLowerCase() })
  // console.log(check)
  if(check){
    return res.status(200).send(check);
  }

  return res.status(400).send("User does not exist");
});

router.post("/update/:name", async (req: Request, res: Response) => {
  // console.log(req.params.name)
  const check = await User.findOne({ name: req.params.name.toLowerCase() });
  const change = req.body;
  if (check) {
    try{
      const trial=await User.updateOne({ name: req.params.name }, { $set: { ...change } })
      return res.status(201).send(trial)
    }
    catch(error){
      res.status(400).send(error);
    }
  }
  return res.status(400).send("User does not exist");
});

router.delete("/delete/:name", async (req: Request, res: Response) => {
  const check = await User.findOne({ name: req.params.name });
  if (check) {
    try{
      const trial=await User.deleteOne({ name: req.params.name })
      return res.status(201).send(trial)
    }
    catch(error){
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
