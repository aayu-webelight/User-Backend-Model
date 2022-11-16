import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { config } from "dotenv";
import { todoRouter } from "routes/todo";
import cors from 'cors'
import { userRouter } from "routes/userRouter";

const app : Application = express();

config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 8010;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});


app.use(cors({ origin: true }));

app.use("/todo", todoRouter);
app.use("/user", userRouter);

mongoose.connect(
  process.env.MONGODB as string, 
  () => {
    console.log("connected to database");
  }
);
