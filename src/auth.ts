import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

async function user(req: Request, res: Response, next: NextFunction) {
  try {
    const auth: any = req.headers["authorization"];
    const token = auth.split(" ");
    const user = verify(token[1], process.env.SECRET_KEY as string);
    if (user) {
      req.body = user;
      next();
    }
  } catch (error) {
    return res.status(400).send(error);
  }
}

export { user };
