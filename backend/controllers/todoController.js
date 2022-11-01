const Todo = require('../model/todoModel');

// GET  /api/todos  get all todos

const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.status(200).json(todos);
};

// POST /api/todos  create new todo

const createTodo = async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ message: 'Title field is required' });
  }

  const todo = await Todo.create({
    user: req.user.id,
    title: req.body.title,
    isDone: req.body.isDone,
  });

  res.status(200).json(todo);
};

// GET /api/todos/:id  get single todo with given id

const getTodoDetails = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res
      .status(400)
      .json({ message: `No record found for the id: ${req.params.id}` });
  }

  res.status(200).json(todo);
};

// DELETE /api/todos/:id  delete todo with the given id

const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res
      .status(400)
      .json({ message: `No record found for the id: ${req.params.id}` });
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await todo.remove();
  res
    .status(200)
    .json(
      `Todo with id: ${req.params.id} successfully deleted from the database`
    );
};

// PUT api/todos/:id  update todo with the given id

const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error('Todo not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
};

module.exports = {
  getTodos,
  createTodo,
  getTodoDetails,
  deleteTodo,
  updateTodo,
};
