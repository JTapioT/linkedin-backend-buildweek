import mongoose from "mongoose";
import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import ProfileSchema from "../profile/schema.js";
import { generateProfilePDF } from "./pdfindex.js";
import { pipeline } from "stream";

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
///**********************GET ALL PROFILE
profilesRouter.get("/", async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const { total, profile } = await ProfileSchema.findProfileByUserName(
      mongoQuery
    );

    //const profile = await ProfileSchema.find({});
    res.send({
      links: mongoQuery.links("/profile", total),
      pageTotal: Math.ceil(total / mongoQuery.options.limit),
      total,
      profile,
    });
  } catch (error) {
    next(error);
  }
});

//************************* GET PROFILE BY _id

profilesRouter.get("/:id", async (req, res, next) => {
  try {
    const profile = await ProfileSchema.findById(req.params.id);
    if (!profile) {
      res
        .status(404)
        .send({ message: `profile with ${req.params.id} is not found` });
    } else {
      res.send(profile);
    }
  } catch (error) {
    next(error);
  }
});
//**************************** DELETE PROFILE */
profilesRouter.delete("/:id", async (req, res, next) => {
  try {
    const profile = await ProfileSchema.findById(req.params.id);
    if (!profile) {
      res
        .status(404)
        .send({ message: `profile with ${req.params.id} not found` });
    } else {
      await ProfileSchema.findByIdAndDelete(req.params.id);
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});

///******************************* UPDATE PROFILE */

profilesRouter.put("/:id", async (req, res, next) => {
  try {
    const profile = await ProfileSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(profile);
  } catch (error) {
    next(error);
  }
});

//****************************************FOR PDF FILE */
profilesRouter.get("/:id/PDF", async (req, res, next) => {
  try {
    const profile = await ProfileSchema.findById(req.params.id);

    if (!profile) {
      res
        .status(404)
        .send({ message: `profile with ${req.params.id} is not found` });
    } else {
      const source = await generateProfilePDF(profile);
      res.setHeader("Content-Disposition", `attachment; filename= profile.pdf`);
      //source.pipe(res);
      const destination = res;
      pipeline(source, destination, (err) => {
        if (err) next(err);
      });

      //source.end();
    }
  } catch (error) {
    next(error);
  }
});

/*profilesRouter.post(
  "/:profileId/picture",
  uploadOnCloudinary.single("image"),
  async (req, res, next) => {}
);*/

export default profilesRouter;
