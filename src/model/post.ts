import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  picture: string;
  username: string;
  categories?: string[];
  createdDate?: Date;
}

const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  categories: {
    type: [String], // Array of strings
    required: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
