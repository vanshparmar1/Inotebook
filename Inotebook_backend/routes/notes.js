import express from "express";
import Notes from "../models/Notes.js";
import fetchuser from "../middleware/fetchuser.js";
import { body, validationResult } from "express-validator";
const router = express.Router();
//ROUTE 1: fetch all notes using: GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//ROUTE 2: create a note using: POST "/api/notes/createnote". login required
router.post("/createnote", fetchuser, [
  body("title", "Title must be at least 3 characters").isLength({ min: 3 }),
  body("description", "Content must be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
  
  //if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description ,tag} = req.body;
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } 
  
  catch (error) {
    console.error("Create note error:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
