import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.js";

const router = express.Router();
//create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check if user already exists
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      //create a new user
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(201).json({ message: "User created", user: newUser });
    } 
    
    catch (error) {
      console.error("Create user error:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
);

export default router;
//
