const express = require('express');
const shoesController = require('../controllers/shoesController');
const authMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/insert', shoesController.insert);


router.use(authMiddleware.authenticateToken);
router.post('/getinfo', authMiddleware.authenticateToken, shoesController.getinfo);
router.post('/getlist', authMiddleware.isAdmin, shoesController.getlist);
router.post('/delete', authMiddleware.isAdmin, shoesController.delete);
router.post('/update', authMiddleware.authenticateToken, shoesController.update);

module.exports = router;
