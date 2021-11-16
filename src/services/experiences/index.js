import express from "express";
import Experiences from "./handlers.js";

const experiencesRouter = express.Router();

// ****************** GET ALL EXPERIENCES ********************
experiencesRouter.get("/:userName/experiences", Experiences.getAll);


// ****************** CREATE NEW EXPERIENCE ******************
experiencesRouter.post("/:userName/experiences", Experiences.newExperience);


// ****************** CSV FILE OF EXPERIENCES ****************
experiencesRouter.get("/:userName/experiences/CSV", Experiences.toCSV)


// ****************** GET EXPERIENCE BY ID *******************
experiencesRouter.get("/:userName/experiences/:expId", Experiences.getById);


// ****************** UPDATE EXPERIENCE BY ID ****************
experiencesRouter.put("/:userName/experiences/:expId", 
Experiences.updateExperience);


// ****************** DELETE EXPERIENCE BY ID ****************
experiencesRouter.delete("/:userName/experiences/:expId", 
Experiences.deleteExperience);


// ****************** UPDATE EXPERIENCE IMAGE ****************
//experiencesRouter.post("/:userName/experiences/:expId/picture")


export default experiencesRouter;

/*

Include later (below) to profilesRouter and delete this below from server.js:

profilesRouter.route("/:userName/experiences")
.get(Experiences.getAll)
.post(Experiences.newExperience);

profilesRouter.route(":/userName/experiences/CSV")
.get(Experiences.toCSV)

profilesRouter.route("/:userName/experiences/:expId")
.get(Experiences.getById)
.put(Experiences.updateExperience)
.delete(Experiences.deleteExperience)

profilesRouter.route("/:userName/experiences/:expId/picture")
.post(Experiences.updateImage)

 */