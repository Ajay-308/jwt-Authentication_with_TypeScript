import mongoose, { Schema, Document } from "mongoose";

export interface IToken extends Document {
  token: string;
}

const TokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model<IToken>("Token", TokenSchema);
export default Token;
