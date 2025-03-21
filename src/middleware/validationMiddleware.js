import Joi from "joi";
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    req.body = value;
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

export default validateRequest;
