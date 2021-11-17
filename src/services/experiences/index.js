import express from "express";
import Experiences from "./handlers.js";
import { uploadExperiencePicture } from "../../utils/imageUpload.js";


const experiencesRouter = express.Router();


experiencesRouter.route("/:userName/experiences")
.get(Experiences.getAll)
.post(Experiences.newExperience);


experiencesRouter.route("/:userName/experiences/CSV")
.get(Experiences.toCSV);


experiencesRouter.route("/:userName/experiences/:expId")
.get(Experiences.getById)
.put(Experiences.updateExperience)
.delete(Experiences.deleteExperience);


experiencesRouter.route("/:userName/experiences/:expId/picture")
.post(uploadExperiencePicture, Experiences.updateImageUrl)


export default experiencesRouter;

