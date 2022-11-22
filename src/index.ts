import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";
import { todoRouter } from "routes/todo";
import userRouter from "routes/userRouter";

const app: Application = express();

config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use("/todo", todoRouter);
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

mongoose.connect(process.env.MONGODB as string, () => {
  console.log("connected to database");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
