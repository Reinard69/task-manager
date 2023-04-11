const { Router } = require('express');

const { requireAuth } = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');

const router = Router();

router.post('/tasks', requireAuth, taskController.store);

router.get('/tasks', requireAuth, taskController.index);

router.get('/tasks/:id', requireAuth, taskController.show);

router.put('/tasks/:id', requireAuth, taskController.update);

router.delete('/tasks/:id', requireAuth, taskController.delete);

router.get('/tasks/search/:searchParam', requireAuth, taskController.search);

router.get('/filter', requireAuth, taskController.filter);

module.exports = router;