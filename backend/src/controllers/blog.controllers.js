// Import necessary dependencies and models
import BlogPost from '../models/blog.model.js';
import Comment from '../models/comment.model.js';
import {io} from '../socket.server.js'
// Controller function to handle creation of a new blog post
export const createBlogPost = async (req, res) => {
  const { title, content, categories, tags } = req.body;

  try {
    const blogPost = new BlogPost({ title, content, categories, tags, author: req.user._id });
    await blogPost.save();

    // io.emit('newBlogPost', blogPost); // Emit event to all connected clients
    
    res.status(201).json(blogPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to handle editing an existing blog post
export const editBlogPost = async (req, res) => {
  const { title, content, categories, tags } = req.body;
  const { id } = req.params;

  try {
    let blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if the user is the author of the blog post
    if (blogPost.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to edit this blog post' });
    }

    blogPost = await BlogPost.findByIdAndUpdate(id, { title, content, categories, tags }, { new: true });
    res.json(blogPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to handle deletion of a blog post
export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;

  try {
    let blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if the user is the author of the blog post
    if (blogPost.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this blog post' });
    }

    await BlogPost.findByIdAndRemove(id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to handle retrieval of all blog posts
export const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'username').exec();
    res.json(blogPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};




export const likeBlogPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if user already liked the blog post
    if (blogPost.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this blog post' });
    }

    // Check if user disliked the blog post previously
    const dislikeIndex = blogPost.dislikes.indexOf(userId);
    if (dislikeIndex !== -1) {
      blogPost.dislikes.splice(dislikeIndex, 1);
    }

    blogPost.likes.push(userId);
    await blogPost.save();

    res.json({ message: 'Blog post liked successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const dislikeBlogPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if user already disliked the blog post
    if (blogPost.dislikes.includes(userId)) {
      return res.status(400).json({ message: 'You have already disliked this blog post' });
    }

    // Check if user liked the blog post previously
    const likeIndex = blogPost.likes.indexOf(userId);
    if (likeIndex !== -1) {
      blogPost.likes.splice(likeIndex, 1);
    }

    blogPost.dislikes.push(userId);
    await blogPost.save();

    res.json({ message: 'Blog post disliked successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getBlogPostComments = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const blogPost = await Comment.find({blogPost:id},{createdAt:0,updatedAt:0,__v:0}).populate( 'author', 'username').exec();

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.log(blogPost);
    return res.json(blogPost.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
}