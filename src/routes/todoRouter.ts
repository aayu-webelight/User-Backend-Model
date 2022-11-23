import { auth } from "middleware/auth";
import { addTodoController, findAllTodo } from "controllers/todoController";
import express from "express";

const todoRouter = express.Router();

todoRouter.get("/", auth, findAllTodo);

todoRouter.post("/", auth, addTodoController);

export default todoRouter;
