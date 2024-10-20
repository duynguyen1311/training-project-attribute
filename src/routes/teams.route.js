const router = require('express').Router()
const teamController = require('../controllers/teams.controller')

//Get all team
router.get('/teams', (req,res) => {
    teamController.getAllTeam(req, res);
});
//Get team by id
router.get('/teams/:teamId', (req,res) => {
    teamController.getTeamById(req, res);
});
//Create new team
router.post('/teams', (req,res) => {
    teamController.createTeam(req, res);
});
//Add member to team
router.post('/teams/:teamId/members', (req,res) => {
    teamController.addMember(req, res);
});
//Remove member from team
router.delete('/teams/:teamId/members/:memberId', (req,res) => {
    teamController.removeMember(req, res);
});
//Add manager to team
router.post('/teams/:teamId/managers', (req,res) => {
    teamController.addManager(req, res);
});
//Remove manager from team
router.delete('/teams/:teamId/managers/:managerId', (req,res) => {
    teamController.removeManager(req, res);
});
module.exports = router;
