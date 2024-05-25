// middleware/validation.js

import { validationResult } from 'express-validator';

// Middleware function to handle validation errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success:false,msg: errors.array() });
  }
  next();
};
