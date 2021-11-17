import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LikeSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: "Profile" },
});


export default mongoose.model("Like", LikeSchema);