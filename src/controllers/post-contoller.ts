import Post, { IPost } from "../model/post";
import { Request, Response } from "express";

export const createPost = async (req: Request, res: Response) => {
  try {
    const post: IPost = await new Post(req.body).save();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating post",
      error: error,
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post: IPost | null = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post found successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error finding post",
      error: error,
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post: IPost | null = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating post",
      error: error,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post: IPost | null = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting post",
      error: error,
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  const username = req.query.username as string | undefined;
  const category = req.query.category as string | undefined;
  try {
    let posts: IPost[];
    if (username) {
      posts = await Post.find({ username: username });
    } else if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
      error: error,
    });
  }
};
