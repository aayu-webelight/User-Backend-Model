import { Router } from "express";

import { auth } from "middleware/auth";
import {
  addUserController,
  deleteAllUsersController,
  deleteUserController,
  findAllUsersController,
  findUserController,
  loginUserController,
  updateUserController,
} from "controllers/userController";

const userRouter = Router();

userRouter.get("/", findAllUsersController);

userRouter.post("/", addUserController);

userRouter.post("/login", loginUserController);

userRouter.get("/:id", auth, findUserController);

userRouter.put("/:id", auth, updateUserController);

userRouter.delete("/:id", auth, deleteUserController);

userRouter.delete("/", deleteAllUsersController);

export default userRouter;
