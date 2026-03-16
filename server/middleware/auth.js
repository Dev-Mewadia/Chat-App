import jwt from 'jsonwebtoken';

// Placeholder auth middleware
export const protectRoute = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded; // Would be { id: user._id }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const protect = protectRoute; // Alias for consistency

