import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Optional trim for safety
      const userId = decoded.id.trim();

      // ✅ Fetch user from database if you want full user details (recommended)
      const user = await User.findById(userId).select("-password");

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.user = user; // attaches entire user object (id, name, email, role etc.)

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

export default protect;
