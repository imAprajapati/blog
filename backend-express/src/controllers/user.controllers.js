// Import necessary dependencies and models
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { sendEmail } from '../utils/email.Services.js';
import ApiResponse from "../utils/ApiResponse.js";
// Controller function to handle user signup
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user with the same email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user instance
    user = new User({ username, email, password });

    // Hash password before saving user
    // Save user to database
    await user.save();

    // Generate verification token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Construct verification email
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/users/verify/${token}`;
    const message = `Please click the following link to verify your email: ${verificationUrl}`;

    // Send verification email
    console.log(verificationUrl);
    // await sendEmail(user.email, 'Verify Your Email', message);

    res.status(201).json({user:{username:user.username,email:user.email}, message: 'User created successfully. Verification email sent.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to handle user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    console.log(user.password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.verified) {
      return res.status(400).json({ message: 'Email not verified. Please verify your email.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({user:{username:user.username,email:user.email}, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to handle password reset request
export const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate password reset token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Construct password reset email
    const resetUrl = `${req.protocol}://${req.get('host')}/api/users/change-password/${token}`;
    const message = `Please click the following link to reset your password: ${resetUrl}`;

    // Send password reset email
    await sendEmail(user.email, 'Reset Your Password', message);

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to handle email verification
export const verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // Find user by decoded user id
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's verification status
    user.verified = true;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
