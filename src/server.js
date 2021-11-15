import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";


const server = express();
server.use(cors());
server.use(express.json());



const PORT = process.env.PORT || 3005;


mongoose.connect(process.env.MONGODB_URI); // Of course, locally feel free to change the environment variable as you want.
mongoose.connection.on("connected", () => {
server.listen(PORT, () => {
console.table(listEndpoints(server));
console.log("Server is running on port: ", PORT);
 });
});

