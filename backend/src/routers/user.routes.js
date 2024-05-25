// routes/users.js
import express from 'express';
import { signup, login, resetPassword, verifyEmail } from '../controllers/user.controllers.js';
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { validate } from '../middlewares/validation.js';
import { body } from 'express-validator';
const router = express.Router();
router.route('/signup').post([
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  validate
],asyncErrorHandler(signup));

router.route('/login').post([
  body('email').isEmail().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  validate
],asyncErrorHandler(login));

router.route('/reset-password').post([
  body('email').isEmail().withMessage('Email is required'),
  validate
],asyncErrorHandler(resetPassword));

router.route('/verify-email/:token').get(asyncErrorHandler(verifyEmail));
export default router;
