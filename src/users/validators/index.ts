import { NextFunction, Request, Response } from "express";
import Joi, { ValidationResult } from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().strict(),
  preferences: Joi.array().items(Joi.string()),
});
export const signInSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().strict(),
});

export const validateSignUpSchema = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Validate task data
  const result: ValidationResult = signUpSchema.validate(
    req.body,
    { abortEarly: false }, // Return all errors
  );

  // If errors, return error response
  if (result.error) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.details.map((err) => err.message),
    });
  }

  // If no errors, continue to next handler
  next();
};

export const validateSignInSchema = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Validate task data
  const result: ValidationResult = signInSchema.validate(
    req.body,
    { abortEarly: false }, // Return all errors
  );

  // If errors, return error response
  if (result.error) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.details.map((err) => err.message),
    });
  }

  // If no errors, continue to next handler
  next();
};
