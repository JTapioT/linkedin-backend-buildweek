import mongoose from "mongoose";
import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import ExperienceSchema from "../experiences/schema.js";

const experiencesRouter = express.Router();

// ****************** CREATE NEW EXPERIENCE ******************
experiencesRouter.post("/:userName/experiences", async (req, res, next) => {
  try {
      const newExperience = new ExperienceSchema({
        ...req.body,
        userName: req.params.userName
      });
      const { _id } = await newExperience.save();

      res.status(201).send({_id});

  } catch (error) {
    next(createHttpError(500, "An error ocurred while creating a new experience"));
  }
});

export default experiencesRouter;