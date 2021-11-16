import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    title: { type: String, required: true },
    area: { type: String, required: true },
    username: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default: `https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?fit=800%2C800&ssl=1`,
    },
  },
  {
    timestamps: true,
  }
);

ProfileSchema.static("findProfileByUserName", async function (query) {
  const total = await this.countDocuments(query);
  const profile = await this.find(query.criteria)
    .limit(query.options.limit)
    .skip(query.options.skip)
    .sort(query.options.sort);

  return { total, profile };
});
export default model("Profile", ProfileSchema);
