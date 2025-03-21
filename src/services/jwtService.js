import jwt from "jsonwebtoken";

const secrete = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, secrete);
};

export const verifyToken = (token) => {
  return jwt.verify(token, secrete);
};
