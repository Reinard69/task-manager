const { Router } = require('express');

const authController = require('../controllers/authController');
const { requireAuth } = require('../middlewares/authMiddleware');


const router = Router();

router.post('/sign-up', authController.signUp);

router.post('/login', authController.login);

router.put('/update', requireAuth, authController.update);

module.exports = router;