import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { addBlog } from '../blog/blogSlice';
import { TextField, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) =>state.auth.token);
  console.log("this is token",token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/blogposts/create', { title, content, categories: categories.split(','), tags: tags.split(',') },{
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request header
        },
      });
      dispatch(addBlog(response.data));
    } catch (error) {
      console.error('Failed to create blog post:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <div className="bg-white">
          <ReactQuill value={content} onChange={setContent} />
        </div>
        <TextField
          label="Categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
