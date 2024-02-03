import express from "express";

import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/comment-controller";
import {
  createPost,
  getPost,
  deletePost,
  updatePost,
  getAllPosts,
} from "../controllers/post-contoller";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user-controller";

import {
  authorizationToken,
  createNewToken,
} from "../controllers/jwt-controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("token", createNewToken);

//middleware->> jaate waqt mujhse milkar jana

router.post("/post", authorizationToken, createPost);
router.put("/update/:id", authorizationToken, updatePost);
router.delete("/delete/:id", authorizationToken, deletePost);

router.get("/post/:id", authorizationToken, getPost);
router.get("/posts", authorizationToken, getAllPosts);

router.post("/comment", authorizationToken, createComment);
router.get("/comment/:id", authorizationToken, getComment);
router.put("/comment/:id", authorizationToken, updateComment);

router.delete("/comment/delete/:id", authorizationToken, deleteComment);

export default router;
