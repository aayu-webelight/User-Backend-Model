import { config } from "dotenv";

config();

export const appConfig = {
  mongourl: process.env.MONGODB as string,
  secretkey: process.env.SECRET_KEY,
  port: process.env.PORT || 3001,
};
