import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { todoRouter } from "./routes/todo";
import { userRouter } from "./routes/userRouter";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

import * as dotenv from "dotenv";
dotenv.config();

// console.log(process.env.SECRET_CODE);

// # if you want anyone to be able to connect
// app.use(cors({ origin: true }));

// # if you want only your frontend to connect
// app.use(cors({ origin: "http://localhost:3000" }))

const PORT = process.env.PORT || 8010;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.use("/todo",todoRouter);
app.use("/user",userRouter)

mongoose.connect(
  "mongodb+srv://aayuag:Z1RI4rr9axOEwcrT@cluster0.aohkv0w.mongodb.net/?retryWrites=true&w=majority",
  // {
  //   useCreateIndex: true,
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // },
  () => {
    console.log("connected to database");
  }
);
