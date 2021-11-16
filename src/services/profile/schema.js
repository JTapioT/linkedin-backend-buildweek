import mongoose from "mongoose";
import validation from "validator";
import bcrypt from "bcrypt";

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
    username: {
      type: String,
      required: true,
      validate: {
        validator: async (value) => {
          const checkUsername = await ProfileModel.findOne({ username: value });
          if (checkUsername) {
            throw new Error("Username already exists!");
          }
        },
      },
    },
    password: {
      type: String,
    },
    token: {
      type: String,
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
    /*cover: {
      type: String,
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
  },*/},
  {
    timestamps: true,
  }
);

// Function to update the default avatar with dynamic initials from names
ProfileSchema.pre("findOneAndUpdate", async function (next) {
  const modelToUpdate = await this.model.findOne(this.getFilter());
  if (modelToUpdate?.image.includes("eu.ui-avatars.com")) {
    this.set({
      image: `https://eu.ui-avatars.com/api/?name=${modelToUpdate.name}+${modelToUpdate.surname}`,
    });
  }
  next();
});

// Function to check for credentials if they match and compare passwords loading hash from our passwordDB
ProfileSchema.statics.findByCredentials = async (credentials, password) => {
  // we can use email or username to login and we store this as credentials
  const user = await ProfileSchema.findOne({
    $or: [{ username: credentials }, { email: credentials }],
  });

  if (!user) {
    const error = new Error("Username or Password do not match!");
    error.httpStatusCode = 404;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const error = new Error("Login Failed");
    error.httpStatusCode = 401;
    throw error;
  } else {
    return user;
  }
};

ProfileSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

ProfileSchema.static("findProfileByUserName", async function (query) {
  const total = await this.countDocuments(query);
  const profile = await this.find(query.criteria)
    .limit(query.options.limit)
    .skip(query.options.skip)
    .sort(query.options.sort);

  return { total, profile };
});

export default model("Profile", ProfileSchema);
