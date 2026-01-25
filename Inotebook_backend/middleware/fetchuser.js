import jwt from "jsonwebtoken";

const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

export default fetchuser;
