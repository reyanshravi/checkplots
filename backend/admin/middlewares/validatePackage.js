import Joi from "joi";

// Define Joi schema for package validation
const packageSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  term: Joi.string().valid("1 month", "3 months", "6 months", "12 months").required(),
  price: Joi.number().positive().required(),
  status: Joi.string().valid("Active", "Inactive").required(),
  leads: Joi.number().integer().min(0).required(),
  listings: Joi.string().valid("Limited", "Unlimited").required(),
});

// Middleware function to validate package data
export const validatePackage = (req, res, next) => {
  const { error } = packageSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }

  next(); // Proceed to the next middleware/controller
};
