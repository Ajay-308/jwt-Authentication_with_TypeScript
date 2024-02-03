import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Comment = mongoose.model("Comment", CommentSchema);
