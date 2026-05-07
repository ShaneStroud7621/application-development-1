const express = require('express');
const tasksController = require('../controllers/tasksController');
const auth = require('../middleware/auth');
const validateTaskTitle = require('../middleware/validateTaskTitle');

const router = express.Router();

router.use((req, res, next) => {
	if (['POST', 'PATCH', 'DELETE'].includes(req.method)) {
		return auth(req, res, next);
	}

	return next();
});

router.use((req, res, next) => {
	if (['POST', 'PATCH'].includes(req.method)) {
		return validateTaskTitle(req, res, next);
	}

	return next();
});

router.get('/', tasksController.listTasks);
router.get('/:id', tasksController.getTaskById);
router.post('/', tasksController.createTask);
router.patch('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;