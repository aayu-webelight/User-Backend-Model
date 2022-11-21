import { Router } from "express";

import { user } from "auth";
import {
  addauser,
  deleteAllusers,
  deleteauser,
  findallusers,
  findauser,
  loginauser,
  updateauser,
} from "Controllers/UserController";

const router = Router();

router.get("/findall", findallusers);

router.post("/add", addauser);

router.post("/login", loginauser);

router.get("/find", user, findauser);

router.post("/update", user, updateauser);

router.delete("/delete", user, deleteauser);

router.delete("/deleteall", user, deleteAllusers);

export { router as userRouter };
