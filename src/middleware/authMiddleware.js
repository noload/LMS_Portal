import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthMiddleware {
  static authenticate(req, res, next) {
    const token = req.header("Authorization");
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET
      );
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid Token" });
    }
  }

  static authorizeRoles(...roles) {
    return (req, res, next) => {
      console.log(req.user);
      console.log(roles);
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    };
  }
}

export default AuthMiddleware;
