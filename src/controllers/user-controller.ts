//request aati hai frontend se jab bhi request marte ho
//ex:-api url, api body
//response ke sath hum kya show karna chahte hai frontend pr vo bejh skte

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

import Token from "../model/token";
import User from "../model/user";
const JWT_ACCESS_SECRET = "FODACLVDVDBV134VNSL";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const saltRounds = 15;
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = {
      username: req.body.username,
      name: req.body.name,
      password: hashPassword,
    };
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ success: true, msg: "Signup successful" });
  } catch (error) {
    console.error("Error while signing up user:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Error while signing up user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "User doesn't exist" });
    }
    let matchedUser = await bcrypt.compare(req.body.password, user.password);
    if (!matchedUser) {
      return res
        .status(401)
        .json({ success: false, msg: "Password doesn't match" });
    }

    const accessToken = jwt.sign(
      { username: user.username },
      JWT_ACCESS_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      JWT_ACCESS_SECRET
    );

    const newToken = await new Token({ token: refreshToken }).save();
    res.status(200).json({
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      name: user.name,
      username: user.username,
    });
  } catch (error) {
    console.error("Error while logging in user:", error);
    res
      .status(500)
      .json({ success: false, msg: "Error while logging in user" });
  }
};

// export const loginUser = async (req: Request, res: Response) => {
//   let user = await User.findOne({ username: req.body.username });
//   if (!user) {
//     return res.status(400).json({ msg: "Username does not match" });
//   }
//   try {
//     let matchedUser = await bcrypt.compare(req.body.password, user.password);
//     if (!matchedUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "password does not matched" });
//     }
//     if (matchedUser) {
//       const accessToken = jwt.sign(
//         user.toJSON(),
//         process.env.ACCESS_SECRET_KEY as string,
//         { expiresIn: "15m" }
//       );
//       const refreshToken = jwt.sign(
//         user.toJSON(),
//         process.env.REFRESH_SECRET_KEY as string
//       );
//       const newToken = new Token({ token: refreshToken });
//       await newToken.save();
//       res.status(200).json({
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//         name: user.name,
//         username: user.username,
//       });
//     } else {
//       res.status(400).json({ msg: "Password does not match" });
//     }
//   } catch (error) {
//     res.status(500).json({ msg: "error while login the user" });
//   }
// };

export const logoutUser = async (req: Request, res: Response) => {
  const token = req.body.token;
  await Token.deleteOne({ token: token });
  res
    .status(204)
    .send({ success: true, message: "user logged out successfully" });
};
