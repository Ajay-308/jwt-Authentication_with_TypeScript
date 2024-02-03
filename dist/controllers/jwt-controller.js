"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewToken = exports.authorizationToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../model/token"));
dotenv_1.default.config();
const authorizationToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).send({ success: false, message: "token not found" });
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error)
            return res
                .status(403)
                .send({ success: false, message: "token not valid" });
        req.body.user = user;
        next();
    });
};
exports.authorizationToken = authorizationToken;
const createNewToken = async (req, res) => {
    const refreshToken = req.body.token.split(" ")[1];
    if (!refreshToken) {
        return res.status(401).json({ msg: "Refresh token is missing" });
    }
    const token = await token_1.default.findOne({ token: refreshToken });
    if (!token) {
        return res.status(404).json({ msg: "Refresh token is not valid" });
    }
    jsonwebtoken_1.default.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
        if (error) {
            res.status(500).json({ msg: "invalid refresh token" });
        }
        const accessToken = jsonwebtoken_1.default.sign(user, process.env.ACCESS_SECRET_KEY, {
            expiresIn: "15m",
        });
        return res.status(200).json({ accessToken: accessToken });
    });
};
exports.createNewToken = createNewToken;
