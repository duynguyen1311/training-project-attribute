const router = require('express').Router();
const userController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleConstant = require("../common/contants/role-constant");
router.post('/users/login', (req,res) => {
   userController.login(req,res);
});
router.post('/users', authMiddleware.authenticateJWT, (req,res) => {
   userController.createUser(req,res);
});
router.put('/users/:id', authMiddleware.authenticateJWT, authMiddleware.authorizeRole([roleConstant.ROLES.MEMBER]), (req,res) => {
   userController.updateUser(req,res);
});
router.delete('/users/:id', authMiddleware.authenticateJWT, authMiddleware.authorizeRole([roleConstant.ROLES.MEMBER]), (req,res) => {
   userController.deleteUser(req,res);
});

module.exports = router;
