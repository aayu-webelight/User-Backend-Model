import { sign } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import IUser from "interfaces/userInterface";
import { User } from "models/userModel";
import { appConfig } from "config/app-config";

export const createUser = async (obj: IUser) => {
  obj.password = await hash(obj.password, 10);
  const user = await User.create({ ...obj });
  return user;
};

export const addUser = async (obj: IUser) => {
  const user: IUser[] = await User.find({ name: obj.name });
  if (!user) {
    return new Error("Bad Request");
  }
  const passcheck = await compare(obj.password, user[0].password);
  if (passcheck) {
    const Token = sign({ name: user[0].name }, appConfig.secretkey as string, {
      expiresIn: "1h",
    });
    return Token;
  } else {
    return new Error("Wrong Pass");
  }
};

export const findAllUsers = async () => {
  const users = await User.find({});
  return users;
};

export const updateUser = async (id: string, obj: IUser) => {
  if (obj.password !== undefined) {
    obj.password = await hash(obj.password, 10);
  }
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
