const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authUser = async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  // Check if email is in DB
  const user = await User.findOne({ email });

  // Compare passwords
  const passwordsMatch = await bcrypt.compare(password, user.password);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  if (user && passwordsMatch) {
    res.status(200).json({
      _id: user.id,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

module.exports = authUser;
