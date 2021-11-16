import mongoose from "mongoose";
import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import ProfileSchema from "../profile/schema.js";

const profilesRouter = express.Router();

// *************** CREATE A NEW PROFILE
profilesRouter.post("/", async (req, res, next) => {
  try {
    const newProfile = new ProfileSchema(req.body);
    const { _id } = await newProfile.save();

    res.status(201).send({ _id });
  } catch (error) {
    console.log(error);
  }
});

export default profilesRouter;