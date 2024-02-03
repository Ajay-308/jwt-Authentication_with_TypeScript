import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import Token from "../model/token";

dotenv.config();

export const authorizationToken = async (
  req: Request,
  res: Response,
  next: any
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).send({ success: false, message: "token not found" });
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (error: any, user: any) => {
      if (error)
        return res
          .status(403)
          .send({ success: false, message: "token not valid" });
      req.body.user = user;
      next();
    }
  );
};

export const createNewToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.token.split(" ")[1];

  if (!refreshToken) {
    return res.status(401).json({ msg: "Refresh token is missing" });
  }

  const token = await Token.findOne({ token: refreshToken });

  if (!token) {
    return res.status(404).json({ msg: "Refresh token is not valid" });
  }

  jwt.verify(
    token.token,
    process.env.REFRESH_SECRET_KEY as string,
    (error: any, user: any) => {
      if (error) {
        res.status(500).json({ msg: "invalid refresh token" });
      }
      const accessToken = jwt.sign(
        user,
        process.env.ACCESS_SECRET_KEY as string,
        {
          expiresIn: "15m",
        }
      );

      return res.status(200).json({ accessToken: accessToken });
    }
  );
};
