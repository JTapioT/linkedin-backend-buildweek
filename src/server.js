import express from "express";
//import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import {
  notFoundHandler,
  badRequestHandler,
  forbiddenHandler,
  genericServerErrorHandler,
} from "./errorMiddlewares.js";
import profilesRouter from "../src/services/profile/index.js";
import postsRouter from "../src/services/posts/index.js";
import experiencesRouter from "../src/services/experiences/index.js";
import commentsRouter from "../src/services/comments/index.js";
import likesRouter from "../src/services/likes/index.js";
import authRouter from "../src/services/auth/auth.js";

//dotenv.config();

// ************ MIDDLEWARES *********************
const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 3005;

// ************** ROUTES ************************
server.use("/profile", profilesRouter);
server.use("/profile", experiencesRouter);
server.use("/posts", postsRouter);
server.use("/posts", likesRouter);
server.use("/posts", commentsRouter);
server.use("/auth", authRouter);

// ************** ERROR HANDLING *****************
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(genericServerErrorHandler);

// mongoose getting-started.js
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("❤ DB is running succesfully");
}

console.table(listEndpoints(server)); // tree of the routes
//server to listen on the port, it is stored into a variable
server.listen(PORT, () => {
  console.log("❤ listening on port: ", PORT);
});

server.on("error", console.log);
