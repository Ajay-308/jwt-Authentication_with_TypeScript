import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
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
    type: Array,
    required: false,
  },
  createdDate: {
    type: Date,
  },
});

const post = mongoose.model("post", PostSchema);

export default post;
