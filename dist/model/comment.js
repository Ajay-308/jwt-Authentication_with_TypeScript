"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.CommentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CommentSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "post",
        required: true,
    },
    comments: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "Comment",
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
});
exports.Comment = mongoose_1.default.model("Comment", exports.CommentSchema);
