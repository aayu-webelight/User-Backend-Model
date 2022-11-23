import { User } from "models/userModel";
import IUser from "interfaces/userInterface";

export const createUser = async (obj: IUser) => {
  const user = await User.create({ ...obj });
  return user;
};

export const findUser = async (name: string) => {
  const user = await User.find({ name: name });
  return user;
};

export const findAllUsers = async () => {
  const users = await User.find({});
  return users;
};

export const updateUser = async (id: string, obj: IUser) => {
  const user = await User.findByIdAndUpdate(id, {
    $set: { ...obj },
  });
  return user;
};

export const findUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

export const deleteAllUsers = async () => {
  const response = await User.deleteMany({});
  return response;
};
