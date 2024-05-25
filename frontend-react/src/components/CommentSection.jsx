import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log(blogId);
        const response = await axios.get(`http://localhost:5000/api/blogposts/${blogId}/comments`);
        console.log(response.data);
        // setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`/api/blogposts/${blogId}/comments`, { text: commentText });
      setComments([...comments, response.data]);
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-100 p-4 rounded-lg mb-2">
          <p>{comment.text}</p>
        </div>
      ))}
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Add Comment
      </button>
    </div>
  );
};

export default CommentSection;
