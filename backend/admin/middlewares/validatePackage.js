import Joi from "joi";

// Define Joi schema for package validation
const packageSchema = Joi.object({
  packageName: Joi.string().min(3).max(100).required(),
  packageDescription: Joi.string().min(10).required(),
  packageTerm: Joi.number().positive().required(),
  packagePrice: Joi.number().positive().required(),
  packageStatus: Joi.string().valid("Active", "Inactive"),
  numberOfLeads: Joi.number().integer().min(0).required(),
  listingType: Joi.string().valid("Limited", "Unlimited").required(),
  numberOfListings: Joi.number().integer().min(1).when("listingType", {
    is: "Limited",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
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
