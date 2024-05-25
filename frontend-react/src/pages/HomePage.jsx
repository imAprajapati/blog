import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../blog/blogSlice';
import BlogList from '../components/BlogList';

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const status = useSelector((state) => state.blog.status);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  return (
    <div className='container mx-auto px-5 py-10'>
      <h1 className="text-3xl font-bold text-blue-700 mb-5">Home Page</h1>
      {status === 'loading' ? (
        <div className="text-gray-600">Loading...</div>
      ) : status === 'failed' ? (
        <div className="text-red-600">Failed to fetch data</div>
      ) : (
        <BlogList blogs={blogs} />
      )}
    </div>
  );
};

export default HomePage;
