import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  likedBy: [],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export default model("Comment", CommentSchema);
