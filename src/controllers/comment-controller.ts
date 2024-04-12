import { Comment, IComment } from "../model/comment";
import { Request, Response } from "express";

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment: IComment = await new Comment(req.body).save();
    res.status(201).send({
      success: true,
      message: "Comment created successfully",
      comment: comment,
    });
  } catch (error) {
    res.status(500).send(`Error creating comment: ${error.message}`);
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    const comment: IComment | null = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: "Comment not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Comment found successfully",
      comment: comment,
    });
  } catch (error) {
    res.status(500).send(`Error finding comment: ${error.message}`);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment: IComment | null = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: "Comment not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Comment updated successfully",
      comment: comment,
    });
  } catch (error) {
    res.status(500).send(`Error updating comment: ${error.message}`);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment: IComment | null = await Comment.findByIdAndDelete(
      req.params.id
    );
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: "Comment not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Comment deleted successfully",
      comment: comment,
    });
  } catch (error) {
    res.status(500).send(`Error deleting comment: ${error.message}`);
  }
};
