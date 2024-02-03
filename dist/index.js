"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./db/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config({
    path: "./env",
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST"],
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/", routes_1.default);
console.log("before");
const PORT = 5000;
(0, index_1.default)()
    .then(() => {
    app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
})
    .catch((err) => {
    console.error("Error connecting to the database:", err.message);
});
