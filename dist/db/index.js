"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
const ConnectDB = async () => {
    try {
        await mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blog-website.ndfvfgj.mongodb.net/blog-website?retryWrites=true&w=majority`);
        app.on("error", (error) => {
            console.log("there is an error ", error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(`DB connected successfully`);
        });
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
};
exports.default = ConnectDB;
