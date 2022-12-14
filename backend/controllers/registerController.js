const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// POST api/register
// register new user
// access public

const registerUser = asyncHandler(async (req, res) => {
  // Get the user details from the request body
  const { firstName, lastName, email, password } = req.body;

  // Check if something is not in the req body
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('All field are required');
  }

  // Check if user with that email exists in the DB
  const match = await User.findOne({ email });

  if (match) {
    res.status(409);
    throw new Error('Email already exists');
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = registerUser;
