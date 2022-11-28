import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";
import todoRouter from "routes/todoRouter";
import userRouter from "routes/userRouter";
import { appConfig } from "config/appConfig";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use("/todo", todoRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

mongoose.connect(appConfig.mongourl as string, () => {
  console.log("connected to database");
});

app.listen(appConfig.port, () => {
  console.log(`Server is running on PORT ${appConfig.port}`);
});
