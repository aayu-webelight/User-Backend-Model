import mongoose from "mongoose";
interface ITodo {
  title: string;
  description: string;
}

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
