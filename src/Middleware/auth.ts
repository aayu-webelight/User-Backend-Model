import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers["authorization"] as string;

    if (authorization === undefined) {
      throw new Error("Unauthorized");
    }

    const authToken = authorization.split(" ");

    if (authToken[0] !== "Bearer") {
      throw new Error("Unauthorized");
    }

    const user = verify(authToken[1], process.env.SECRET_KEY as string);

    // console.log(req.body)
    if (user) {
      req.body.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
};
