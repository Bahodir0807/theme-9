const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.json({ data: tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ message: 'Task created', data: task });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  res.json({ message: 'Task updated', data: task });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  res.json({ message: 'Task deleted', data: task });
});

module.exports = { getTasks, createTask, updateTask, deleteTask };
