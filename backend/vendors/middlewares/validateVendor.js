import Joi from "joi";

// Vendor Signup Validation Schema
const vendorSignupSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  businessName: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message("Phone number must be 10 digits")
    .required(),
  password: Joi.string().min(6).required(),
  businessType: Joi.string()
    .valid("Retail", "Wholesale", "Service", "Manufacturing", "Other")
    .required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});

// Vendor Profile Update Schema (All Fields Optional)
const vendorProfileUpdateSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).optional(),
  businessName: Joi.string().min(3).max(100).optional(),
  email: Joi.string().email().optional(), // Email shouldn't be updated in the profile (usually)
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message("Phone number must be 10 digits")
    .optional(),
  businessType: Joi.string()
    .valid("Retail", "Wholesale", "Service", "Manufacturing", "Other")
    .optional(),
  profileImageUrl: Joi.string().uri().optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
});



  const schema = Joi.object({
    oldPassword: Joi.string().required().messages({
      "any.required": "Old password is required",
    }),
    newPassword: Joi.string()
      .min(6)
      .pattern(/[A-Z]/, "uppercase")
      .pattern(/[a-z]/, "lowercase")
      .pattern(/[0-9]/, "number")
      .pattern(/[!@#$%^&*(),.?":{}|<>]/, "special character")
      .disallow(Joi.ref("oldPassword"))
      .required()
      .messages({
        "string.min": "New password must be at least 6 characters long",
        "string.pattern.name": "New password must meet complexity requirements (uppercase, lowercase, number, special character)",
        "any.invalid": "New password must be different from old password",
        "any.required": "New password is required",
      }),
  });

  export const passwordValidationMiddleware = (req, res, next) => {

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ message: error.details.map((err) => err.message).join(", ") });
  }

  next();
};

// Middleware for Vendor Signup Validation
export const validateVendorSignup = (req, res, next) => {
  const { error } = vendorSignupSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }
  next();
};

// Middleware for Vendor Profile Update Validation
export const validateVendorProfileUpdate = (req, res, next) => {
  const { error } = vendorProfileUpdateSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }
  next();
};
