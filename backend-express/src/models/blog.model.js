// models/BlogPost.js

import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: {
    type: [String],
    // validate: {
    //   validator: function(value) {
    //     const validCategories = ["IT", "Backend", "Node","Express"];
    //     return value.every(category => validCategories.includes(category));
    //   },
    //   message: props => `${props.value} is not a valid category`
    // },
    // required: true
  },
  tags: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

export default BlogPost;
