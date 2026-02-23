const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasksController');

router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.post('/', controller.createTask);
router.patch('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
