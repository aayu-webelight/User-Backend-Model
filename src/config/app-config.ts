import { config } from "dotenv";

config();

export const mongourl = process.env.MONGODB as string;

export const secretkey = process.env.SECRET_KEY;

export const port = process.env.PORT || 3001;
