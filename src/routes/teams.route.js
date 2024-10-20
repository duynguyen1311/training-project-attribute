const router = require('express').Router()
const teamController = require('../controllers/teams.controller')

router.post('/users', (req,res) => {
    userController.createUser(req,res);
});
router.put('/users/:id', (req,res) => {
    userController.updateUser(req,res);
});
router.delete('/users/:id', (req,res) => {
    userController.deleteUser(req,res);
});

module.exports = router;
