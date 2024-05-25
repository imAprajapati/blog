import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
  // Get token from request headers
  const token = req.header('Authorization').split(' ')[1];

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded user id
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach user object to request object
    req.user = user;

    // Call next middleware
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
