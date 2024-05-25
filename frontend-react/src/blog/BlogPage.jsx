import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection.jsx';

const BlogPage = () => {
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.blogs.find((b) => b._id === id));

  if (!blog) {
    return <div className="container mx-auto mt-8 text-center">Blog post not found</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      <div className="mt-8">
        <CommentSection blogId={id} />
      </div>
    </div>
  );
};

export default BlogPage;
