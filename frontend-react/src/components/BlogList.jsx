import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const BlogList = ({ blogs }) => {
  const MAX_WORD_COUNT = 200;

  const renderContent = (blog) => {
    const { content, _id } = blog;
    const words = content.split(/\s+/);
    const truncatedContent = words.slice(0, MAX_WORD_COUNT).join(' ');
    const isTruncated = words.length > MAX_WORD_COUNT;

    return (
      <>
        <Typography variant="body2" className="text-gray-600" dangerouslySetInnerHTML={{ __html: blog.content }}  />
        {isTruncated && <Link to={`/blogs/${_id}`} className="text-blue-500 hover:underline">Read more</Link>}
      </>
    );
  };

  return (
    <div className='max-auto px-2 roun'>
      {blogs.map((blog) => (
        <Card key={blog._id} className="mb-4">
          <CardContent>
            <Typography variant="h5" className="text-xl font-bold mb-2">{blog.title}</Typography>
            {renderContent(blog)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
