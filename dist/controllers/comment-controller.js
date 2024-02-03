"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getComment = exports.createComment = void 0;
const comment_1 = require("../model/comment");
//jldi jldi comment kardu
const createComment = async (req, res) => {
    try {
        const comment = await new comment_1.Comment(req.body).save();
        res.status(201).send({
            success: true,
            message: "comment created successfully",
        });
    }
    catch (error) {
        res.status(500).send(`there is an error while creating comment:${error}`);
    }
};
exports.createComment = createComment;
//getting all created comments
const getComment = async (req, res) => {
    try {
        const comment = await comment_1.Comment.findById(req.params.id);
        res.status(200).send({
            success: true,
            message: "comment found successfully",
        });
    }
    catch (error) {
        res.status(500).send(`there is an error while founding comment:${error}`);
    }
};
exports.getComment = getComment;
//find by id and update it with the request body
const updateComment = async (req, res) => {
    try {
        const comment = await comment_1.Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).send({
            success: true,
            message: "comment updated successfully",
        });
    }
    catch (error) {
        res.status(500).send(`there is an error while Updating comment:${error}`);
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    try {
        const comment = await comment_1.Comment.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "comment deleted successfully",
        });
    }
    catch (error) {
        res.status(500).send(`there is an error while deleting comment:${error}`);
    }
};
exports.deleteComment = deleteComment;
