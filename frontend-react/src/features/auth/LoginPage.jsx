import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from './authSlice';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
