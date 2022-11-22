import { auth } from "middleware/auth";
import { addTodo, findAllTodo } from "controllers/TodoController";
import express from "express";

const todoRouter = express.Router();

todoRouter.get("/todo", auth, findAllTodo);

todoRouter.post("/todo", auth, addTodo);

export default todoRouter;
