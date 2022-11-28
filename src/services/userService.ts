import { sign } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import IUser from "interfaces/userInterface";
import { User } from "models/userModel";
import { appConfig } from "config/appConfig";

export const createUser = async (obj: IUser) => {
  obj.password = await hash(obj.password, 10);
  return await User.create(obj);
};

export const userLogin = async (obj: IUser) => {
  const user: IUser | null = await User.findOne({ name: obj.name });
  if (!user) {
    throw new Error("User not found");
  }
  const passcheck = await compare(obj.password, user.password);
  if (!passcheck) {
    throw new Error("Wrong Pass");
  }
  return sign({ name: user.name }, appConfig.secretkey as string, {
    expiresIn: "1h",
  });
};

export const findAllUsers = async () => {
  return await User.find();
};

export const updateUser = async (id: string, obj: any) => {
  if (obj.password !== undefined) {
    obj.password = await hash(obj.password, 10);
  }
  return await User.findByIdAndUpdate(id, obj);
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};

export const deleteUserById = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const deleteAllUsers = async () => {
  return await User.deleteMany();
};
