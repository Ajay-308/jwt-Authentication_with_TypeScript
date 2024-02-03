"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controllers/comment-controller");
const post_contoller_1 = require("../controllers/post-contoller");
const user_controller_1 = require("../controllers/user-controller");
const jwt_controller_1 = require("../controllers/jwt-controller");
const router = express_1.default.Router();
router.post("/register", user_controller_1.registerUser);
router.post("/login", user_controller_1.loginUser);
router.post("/logout", user_controller_1.logoutUser);
router.post("token", jwt_controller_1.createNewToken);
//middleware->> jaate waqt mujhse milkar jana
router.post("/post", jwt_controller_1.authorizationToken, post_contoller_1.createPost);
router.put("/update/:id", jwt_controller_1.authorizationToken, post_contoller_1.updatePost);
router.delete("/delete/:id", jwt_controller_1.authorizationToken, post_contoller_1.deletePost);
router.get("/post/:id", jwt_controller_1.authorizationToken, post_contoller_1.getPost);
router.get("/posts", jwt_controller_1.authorizationToken, post_contoller_1.getAllPosts);
router.post("/comment", jwt_controller_1.authorizationToken, comment_controller_1.createComment);
router.get("/comment/:id", jwt_controller_1.authorizationToken, comment_controller_1.getComment);
router.put("/comment/:id", jwt_controller_1.authorizationToken, comment_controller_1.updateComment);
router.delete("/comment/delete/:id", jwt_controller_1.authorizationToken, comment_controller_1.deleteComment);
exports.default = router;
