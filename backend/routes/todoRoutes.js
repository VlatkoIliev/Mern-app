const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  getTodoDetails,
  deleteTodo,
  updateTodo,
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTodos);

router.post('/', protect, createTodo);

router.get('/:id', getTodoDetails);

router.delete('/:id', protect, deleteTodo);

router.put('/:id', protect, updateTodo);

module.exports = router;
