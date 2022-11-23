import { Todo } from "models/todoModel";
import ITodo from "interfaces/todoInterface";

export const addToDo = async (obj: ITodo) => {
  const todo = await Todo.create(obj);
  return todo;
};

export const findToDo = async () => {
  const todo = await Todo.find();
  return todo;
};
