import mongoose, { Schema } from "mongoose";

export const CategorySchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
