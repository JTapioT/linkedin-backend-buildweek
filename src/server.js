import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import {notFoundHandler, badRequestHandler, forbiddenHandler, genericServerErrorHandler } from "./errorMiddlewares.js"

dotenv.config();


// ************ MIDDLEWARES *********************
const server = express();
server.use(cors());
server.use(express.json());



const PORT = process.env.PORT || 3005;

// ************** ROUTES ************************


// ************** ERROR HANDLING *****************


// mongoose.connect(process.env.MONGODB_URI); // Of course, locally feel free to change the environment variable as you want.
// mongoose.connection.on("connected", () => {
// server.listen(PORT, () => {
// console.table(listEndpoints(server));
// console.log("Server is running on port: ", PORT);
//  });
// });

// mongoose getting-started.js
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("❤ DB is running succesfully")
}

console.table(listEndpoints(server)) // tree of the routes
//server to listen on the port, it is stored into a variable
server.listen(PORT, () => {
  console.log("❤ listening on port: ", PORT);
});

server.on("error", console.log);

