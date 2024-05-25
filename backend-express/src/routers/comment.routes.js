import express from 'express';
import { addComment, editComment, deleteComment } from '../controllers/comment.controllers.js';
import { protect } from '../middlewares/authMiddleware.js';
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { body } from 'express-validator';
import { validate } from '../middlewares/validation.js';
const router = express.Router();


router.route('/post-commnet').post(protect,[
  body('content').notEmpty().withMessage('Content is required'),
  validate
], asyncErrorHandler(addComment)); // Add comment

router.route('/:id').put(protect,[
  body('content').notEmpty().withMessage('Content is required'),
  validate
], asyncErrorHandler(editComment)); // Edit comment

router.route('/:id').delete(protect, asyncErrorHandler(deleteComment)); // Delete comment

export default router;
