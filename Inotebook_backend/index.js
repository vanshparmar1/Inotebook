import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectToMongo from "./db.js";
import auth from "./routes/auth.js";
import notes from "./routes/notes.js";
connectToMongo();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//Routes

//using routes
// routing using route folder files
app.use("/api/auth", auth);
app.use("/api/notes", notes);

// direct routing from index file 
// app.get("/hello", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
