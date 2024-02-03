import Post from "../model/post";
import { Request, Response } from "express";
export const createPost = async (req: Request, res: Response) => {
  try {
    //post aa kaha se rahi hai req.body se
    const post = await new Post(req.body).save();
    res.status(201).send({
      success: true,
      message: "post created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error creating post",
      error: error,
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "post found successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "erorr while finding post ",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id);
    res.status(200).send({
      success: true,
      message: "post updated successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "erorr while updating post ",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "post deleted successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "erorr while deleted post ",
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  let username = req.query.username;
  let category = req.query.category;
  let posts;
  try {
    if (username) posts = await Post.find({ username: username });
    else if (category) posts = await Post.find({ categories: category });
    else posts = await Post.find({});

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
