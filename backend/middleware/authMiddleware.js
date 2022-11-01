const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

// Protect is working as expected

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (it has the user id as a payload)
      // and assign it to req.user so we can access any protected route
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no access token' });
  }
};

module.exports = { protect };
