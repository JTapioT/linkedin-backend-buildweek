import mongoose from "mongoose";
import validation from "validator";

const { Schema, model } = mongoose;

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (!validation.isLength(value, { min: 2 })) {
            throw new Error("Name should be at least 2 characters long!");
          }
        },
      },
    },
    surname: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (!validation.isLength(value, { min: 2 })) {
            throw new Error("Surname should be at least 2 characters long!");
          }
        },
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: async (value) => {
          if (!validation.isEmail(value)) {
            throw new Error("Email is invalid");
          } else {
            const checkEmail = await ProfileModel.findOne({ email: value });
            if (checkEmail) {
              throw new Error("Email already existsts");
            }
          }
        },
      },
    },
    bio: { type: String, required: true },
    title: { type: String, required: true },
    area: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default: function () {
        return `https://eu.ui-avatars.com/api/?name=${this.name}+${this.surname}`;
      },
    },
    cover: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProfileSchema.pre("findOneAndUpdate", async function (next) {
    const modelToUpdate = await this.model.findOne(this.getFilter())
    if (modelToUpdate?.image.includes("eu.ui-avatars.com")) {
      this.set({
        image: `https://eu.ui-avatars.com/api/?name=${modelToUpdate.name}+${modelToUpdate.surname}`,
      })
    }
    next()
  })

export default model("Profile", ProfileSchema);
