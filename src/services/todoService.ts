import { Todo } from "models/todoModel";
import ITodo from "interfaces/todoInterface";

export const addToDo = async (obj: ITodo) => {
  return await Todo.create(obj);
};

export const findToDo = async () => {
  return await Todo.find();
};
