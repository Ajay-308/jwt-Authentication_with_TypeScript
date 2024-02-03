"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = void 0;
const post_1 = __importDefault(require("../model/post"));
const createPost = async (req, res) => {
    try {
        //post aa kaha se rahi hai req.body se
        const post = await new post_1.default(req.body).save();
        res.status(201).send({
            success: true,
            message: "post created successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error creating post",
            error: error,
        });
    }
};
exports.createPost = createPost;
const getPost = async (req, res) => {
    try {
        const post = await post_1.default.findById(req.params.id);
        res.status(200).send({
            success: true,
            message: "post found successfully",
            post: post,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "erorr while finding post ",
        });
    }
};
exports.getPost = getPost;
const updatePost = async (req, res) => {
    try {
        const post = await post_1.default.findByIdAndUpdate(req.params.id);
        res.status(200).send({
            success: true,
            message: "post updated successfully",
            post: post,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "erorr while updating post ",
        });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const post = await post_1.default.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "post deleted successfully",
            post: post,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "erorr while deleted post ",
        });
    }
};
exports.deletePost = deletePost;
const getAllPosts = async (req, res) => {
    let username = req.query.username;
    let category = req.query.category;
    let posts;
    try {
        if (username)
            posts = await post_1.default.find({ username: username });
        else if (category)
            posts = await post_1.default.find({ categories: category });
        else
            posts = await post_1.default.find({});
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getAllPosts = getAllPosts;
