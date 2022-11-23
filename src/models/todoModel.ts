import mongoose from "mongoose";
import ITodo from "interfaces/todoInterface";

const todoSchema = new mongoose.Schema<ITodo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
