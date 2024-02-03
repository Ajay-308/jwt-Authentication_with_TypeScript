"use strict";
//request aati hai frontend se jab bhi request marte ho
//ex:-api url, api body
//response ke sath hum kya show karna chahte hai frontend pr vo bejh skte
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = __importDefault(require("../model/token"));
const user_1 = __importDefault(require("../model/user"));
dotenv_1.default.config();
const registerUser = async (req, res) => {
    try {
        const hashPassword = await bcrypt_1.default.hash(req.body.password, 15);
        const user = {
            username: req.body.username,
            name: req.body.name,
            password: hashPassword,
        };
        const newUser = await new user_1.default(user).save();
        return res.status(200).json({ msg: "Signup successfull" });
    }
    catch (error) {
        return res.status(500).json({ msg: "Error while signing up user" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    let user = await user_1.default.findOne({ username: req.body.username });
    if (!user) {
        return res
            .status(404)
            .send({ success: false, message: "user doesn't exist" });
    }
    try {
        let matchedUser = await bcrypt_1.default.compare(req.body.password, user.password);
        if (matchedUser) {
            const accessToken = jsonwebtoken_1.default.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: "30m" });
            const refreshToken = jsonwebtoken_1.default.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = await new token_1.default({ token: refreshToken });
            await newToken.save();
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: user.name,
                username: user.username,
            });
        }
        else {
            return res
                .status(401)
                .send({ success: false, message: "password doesn't match" });
        }
    }
    catch (error) {
        res
            .status(500)
            .send({ success: false, message: "there is an error while login user" });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    const token = req.body.token;
    await token_1.default.deleteOne({ token: token });
    res
        .status(204)
        .send({ success: true, message: "user logged out successfully" });
};
exports.logoutUser = logoutUser;
