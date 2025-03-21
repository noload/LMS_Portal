import jwt from "jsonwebtoken";

const secrete = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secrete);
};
