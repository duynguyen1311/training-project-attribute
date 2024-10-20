const router = require('express').Router()
const teamController = require('../controllers/teams.controller')
const authMiddleware = require("../middlewares/auth.middleware");
const roleConstant = require('../common/contants/role-constant');
//Get all team
router.get('/teams', authMiddleware.authenticateJWT, (req,res) => {
    teamController.getAllTeam(req, res);
});
//Get team by id
router.get('/teams/:teamId', authMiddleware.authenticateJWT, (req,res) => {
    teamController.getTeamById(req, res);
});
//Create new team
router.post('/teams', authMiddleware.authenticateJWT, authMiddleware.authorizeRole([roleConstant.ROLES.MANAGER]), (req,res) => {
    teamController.createTeam(req, res);
});
//Add member to team
router.post('/teams/:teamId/members', authMiddleware.authenticateJWT, authMiddleware.authorizeRole([roleConstant.ROLES.MANAGER]), (req,res) => {
    teamController.addMember(req, res);
});
//Remove member from team
router.delete('/teams/:teamId/members/:memberId', authMiddleware.authenticateJWT, authMiddleware.authorizeRole([roleConstant.ROLES.MANAGER]), (req,res) => {
    teamController.removeMember(req, res);
});
//Add manager to team
router.post('/teams/:teamId/managers', authMiddleware.authenticateJWT, authMiddleware.authorizeRole([roleConstant.ROLES.MANAGER]), (req,res) => {
    teamController.addManager(req, res);
});
//Remove manager from team
router.delete('/teams/:teamId/managers/:managerId', authMiddleware.authenticateJWT, authMiddleware.authorizeRole([roleConstant.ROLES.MANAGER]), (req,res) => {
    teamController.removeManager(req, res);
});
module.exports = router;
