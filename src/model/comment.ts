import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  content: string;
  user: mongoose.Types.ObjectId | string;
  postId: mongoose.Types.ObjectId | string;
  comments?: Array<mongoose.Types.ObjectId | string>;
  date: Date;
}

const CommentSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
