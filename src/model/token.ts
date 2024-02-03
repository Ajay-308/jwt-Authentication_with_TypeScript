import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("token", TokenSchema);
export default Token;
