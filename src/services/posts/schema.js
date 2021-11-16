import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  text: { type: String, required: true },
  username: {
    type: String,
    required: [true, "Please add the name of user"],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "Please add the id of user"],
    ref: "Profile",
  },
  image: {
    type: String,
    required: false,
    default: `https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?fit=800%2C800&ssl=1`,
  },

  comments: [],
  likes: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
});

export default model("Post", PostSchema);
