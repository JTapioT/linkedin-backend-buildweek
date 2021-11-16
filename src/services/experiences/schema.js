import mongoose from "mongoose";
import mongoose_csv from "mongoose-csv";


const { Schema, model } = mongoose;

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    description: { type: String, required: true },
    userName: { type: String, required: true, csv: false },
    image: {
      type: String,
      default: `https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?fit=800%2C800&ssl=1`,
      csv: false
    },
  },
  {
    timestamps: true,
  }
);



ExperienceSchema.plugin(mongoose_csv);

export default model("Experience", ExperienceSchema);