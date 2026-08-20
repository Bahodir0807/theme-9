const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { validate, createTaskSchema, updateTaskSchema } = require('../middlewares/validate');

router.get('/', getTasks);
router.post('/', validate(createTaskSchema), createTask);
router.patch('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
