import express from "express";
import Experiences from "./handlers.js";
import uploadExperiencePicture from "../../utils/imageUpload.js";

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
experiencesRouter.post("/:userName/experiences/:expId/picture", uploadExperiencePicture, Experiences.updateImage)


export default experiencesRouter;

/*

Include later (below) to profilesRouter and delete this below from server.js:
server.use("/profile", experiencesRouter) 
I think that use of:
server.use("/profile", profilesRouter)
server.use("/profile", experiencesRouter)
Does not make sense as the both share the same "root", "/profile"


profilesRouter.route("/:userName/experiences")
.get(Experiences.getAll)
.post(Experiences.newExperience);

profilesRouter.route("/:userName/experiences/CSV")
.get(Experiences.toCSV)

profilesRouter.route("/:userName/experiences/:expId")
.get(Experiences.getById)
.put(Experiences.updateExperience)
.delete(Experiences.deleteExperience)

profilesRouter.route("/:userName/experiences/:expId/picture")
.post(Experiences.updateImage)

 */