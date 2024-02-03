import { Comment } from "../model/comment";
import { Request, Response } from "express";

//jldi jldi comment kardu
export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await new Comment(req.body).save();
    res.status(201).send({
      success: true,
      message: "comment created successfully",
    });
  } catch (error) {
    res.status(500).send(`there is an error while creating comment:${error}`);
  }
};

//getting all created comments
export const getComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "comment found successfully",
    });
  } catch (error) {
    res.status(500).send(`there is an error while founding comment:${error}`);
  }
};

//find by id and update it with the request body
export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "comment updated successfully",
    });
  } catch (error) {
    res.status(500).send(`there is an error while Updating comment:${error}`);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "comment deleted successfully",
    });
  } catch (error) {
    res.status(500).send(`there is an error while deleting comment:${error}`);
  }
};
