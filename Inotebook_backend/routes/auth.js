import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js"; 
const router = express.Router();
//ROUTE 1 :create a user using: POST "/api/auth/createuser". No login required
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
      //salting and hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,

        password: secPass,
      });
      //JWT token generation
      const JWT_SECRET = process.env.JWT_SECRET;
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      console.log(jwtData);
      res.json({ jwtData });
    } catch (error) {
      console.error("Create user error:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
);


//ROUTE 2: create a user using: POST "/api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const JWT_SECRET = process.env.JWT_SECRET;
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
);

//ROUTE 3: create a user using: POST "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).send("Internal Server Error");
}
});

export default router;
