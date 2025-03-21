import Joi from "joi";

class ValidationMiddleware {
  static validate(schema) {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.details[0].message,
        });
      }

      req.body = value;
      next();
    };
  }
}

export default ValidationMiddleware;
