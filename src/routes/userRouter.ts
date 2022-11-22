import { Router } from "express";

import { auth } from "middleware/auth";
import {
  addUser,
  deleteAllUsers,
  deleteUser,
  findAllUsers,
  findUser,
  loginUser,
  updateUser,
} from "controllers/UserController";

const userRouter = Router();

userRouter.get("/findall", findAllUsers);

userRouter.post("/add", addUser);

userRouter.post("/login", loginUser);

userRouter.get("/find", auth, findUser);

userRouter.post("/update", auth, updateUser);

userRouter.delete("/delete", auth, deleteUser);

userRouter.delete("/deleteall", deleteAllUsers);

export default userRouter