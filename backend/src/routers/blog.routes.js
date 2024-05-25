import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validation.js';
import { createBlogPost, editBlogPost, deleteBlogPost, getAllBlogPosts,likeBlogPost,dislikeBlogPost ,getBlogPostComments} from '../controllers/blog.controllers.js';
import { protect } from '../middlewares/authMiddleware.js';
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
const router = express.Router();
router.route('/create').post(protect,[
  // Validation rules using express-validator
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('categories').isArray().withMessage('Categories must be an array'),
  body('tags').isArray().withMessage('Tags must be an array'),
  validate // Apply validation middleware
], asyncErrorHandler(createBlogPost));

router.route('/:id').put(protect,[
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('categories').isArray().withMessage('Categories must be an array'),
  body('tags').isArray().withMessage('Tags must be an array'),
  validate
], asyncErrorHandler(editBlogPost));

router.route('/:id').delete(protect, asyncErrorHandler(deleteBlogPost));

router.get('/', asyncErrorHandler(getAllBlogPosts));

router.route('/:id/comments').get(asyncErrorHandler(getBlogPostComments));

router.get('/like/:id',protect, asyncErrorHandler(likeBlogPost));

router.get('/dislike/:id',protect, asyncErrorHandler(dislikeBlogPost));

export default router;
