const express = require('express');
const soccerbookingController = require('../controllers/soccerbookingController');
const authMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/insert', soccerbookingController.insert);

router.use(authMiddleware.authenticateToken);
router.post('/getinfo', authMiddleware.authenticateToken, soccerbookingController.getinfo);
router.post('/getlist', authMiddleware.isAdmin, soccerbookingController.getlist);
router.post('/delete', authMiddleware.isAdmin, soccerbookingController.delete);
router.post('/update', authMiddleware.authenticateToken, soccerbookingController.update);

module.exports = router;
