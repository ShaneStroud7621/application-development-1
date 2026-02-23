const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

router.get('/', tasksController.listTasks);
router.get('/:id', tasksController.getTaskById);
router.post('/', tasksController.createTask);
router.patch('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
