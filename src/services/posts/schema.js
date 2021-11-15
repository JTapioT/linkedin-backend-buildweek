import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  text: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  image: {
    type: String,
    required: false,
    default: `https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?fit=800%2C800&ssl=1`,
  },
  comments: [],
  likedBy: [],
});


export default model("Post", PostSchema);