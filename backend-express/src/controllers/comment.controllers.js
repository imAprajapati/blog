// Import necessary dependencies and models
import Comment from '../models/comment.model.js';

// Controller function to handle adding a new comment
export const addComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  try {
    const comment = new Comment({ content, author: req.user._id, blogPost: postId });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to handle editing an existing comment
export const editComment = async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  try {
    let comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user is the author of the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to edit this comment' });
    }

    comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
    res.json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to handle deletion of a comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    let comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user is the author of the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment' });
    }

    await Comment.findByIdAndRemove(id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
