const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const app = express();

connectDB();

const PORT = process.env.PORT || 8000;
// Initialize app

app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use('/api/todos', require('./routes/todoRoutes'));
app.use('/api/register', require('./routes/userRoutes'));
app.use('/api/login', require('./controllers/authController'));
app.use(errorHandler);
app.use(function (req, res, next) {
  res.status(404);
  res.json({ status: 404, title: 'Not Found', msg: 'Route not found' });
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
