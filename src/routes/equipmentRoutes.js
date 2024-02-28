const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const authMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/insert', equipmentController.insert);


router.use(authMiddleware.authenticateToken);
router.post('/getinfo', authMiddleware.authenticateToken, equipmentController.getinfo);
router.post('/getlist', authMiddleware.isAdmin, equipmentController.getlist);
router.post('/delete', authMiddleware.isAdmin, equipmentController.delete);
router.post('/update', authMiddleware.authenticateToken, equipmentController.update);

// quản lý sân thuê thiết bị
router.post('/insertEquipment', equipmentController.insertEquipment);
router.post('/getinfoEquipment', authMiddleware.authenticateToken, equipmentController.getinfoEquipment);
router.post('/getlistEquipment', authMiddleware.isAdmin, equipmentController.getlistEquipment);
router.post('/deleteEquipment', authMiddleware.isAdmin, equipmentController.deleteEquipment);
router.post('/updateEquipment', authMiddleware.authenticateToken, equipmentController.updateEquipment);



module.exports = router;
