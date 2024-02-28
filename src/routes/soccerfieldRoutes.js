const express = require('express');
const soccerfieldController = require('../controllers/soccerfieldController');
const authMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/insert', soccerfieldController.insert);

router.use(authMiddleware.authenticateToken);
router.post('/getinfo', authMiddleware.authenticateToken, soccerfieldController.getinfo);
router.post('/gettype', authMiddleware.authenticateToken, soccerfieldController.gettype);
router.post('/getlist', authMiddleware.isAdmin, soccerfieldController.getlist);
router.post('/delete', authMiddleware.isAdmin, soccerfieldController.delete);
router.post('/update', authMiddleware.authenticateToken, soccerfieldController.update);


// lay lich dat san bong
router.post('/getlistbook', authMiddleware.authenticateToken, soccerfieldController.getlistbook);
router.post('/getlistName', authMiddleware.authenticateToken, soccerfieldController.getlistName);
router.post('/getlistAll', authMiddleware.authenticateToken, soccerfieldController.getlistAll);
module.exports = router;
