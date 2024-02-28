const express = require('express');
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/insert', employeeController.insert);


router.use(authMiddleware.authenticateToken);
router.post('/getinfo', authMiddleware.authenticateToken, employeeController.getinfo);
router.post('/getlist', authMiddleware.isAdmin, employeeController.getlist);
// router.post('/getField', authMiddleware.authenticateToken, employeeController.getField);
// router.post('/getlistAll', authMiddleware.isAdmin, employeeController.getlistAll);
router.post('/deleteByemloyee', authMiddleware.isAdmin, employeeController.deleteByemloyee);
router.post('/update', authMiddleware.authenticateToken, employeeController.update);


// quản lý thiết bị cho sân
router.post('/insertEfield', authMiddleware.authenticateToken, employeeController.insertEfield);
router.post('/getinfoEF', authMiddleware.authenticateToken, employeeController.getinfoEF);
router.post('/getlistEF', authMiddleware.isAdmin, employeeController.getlistEF);
router.post('/deleteEF', authMiddleware.isAdmin, employeeController.deleteEF);
 router.post('/updateEF', authMiddleware.authenticateToken, employeeController.updateEF);

module.exports = router;
