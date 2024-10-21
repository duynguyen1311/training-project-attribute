const teamService = require("../service/teams.service");
const constant = require("../common/constant");
module.exports.createTeam = async (req,res) => {
    try {
        const {
            teamName,
            managers,
            members
        } = req.body;
            const result = await teamService.createTeamWithMembers(teamName, managers, members);
            res.status(201).json(result);
    } catch (error){
        console.error('Error creating team:', error);
        res.status(500).json({ error: error.message });
    }
}
module.exports.addMember = async (req,res) => {
    try {
        const { memberId, memberName } = req.body;
        const { teamId } = req.params;
        const result = await teamService.addToTeam(teamId, memberId, memberName, constant.ROLES.MEMBER);
        res.status(201).json(result);
    } catch (error){
        console.error('Error adding member to team:', error);
        res.status(500).json({ error: error.message });
    }
}
module.exports.addManager = async (req,res) => {
    try {
        const { managerId, managerName } = req.body;
        const { teamId } = req.params;
        const result = await teamService.addToTeam(teamId, managerId, managerName, constant.ROLES.MANAGER);
        res.status(201).json(result);
    } catch (error){
        console.error('Error adding manager to team:', error);
        res.status(500).json({ error: error.message });
    }
}
module.exports.removeMember = async (req,res) => {
    try {
        const { teamId, memberId } = req.params;
        await teamService.removeUserFromTeam(teamId, memberId);
        res.status(201).json('Member is removed !');
    } catch (error){
        console.error('Error removing member from team:', error);
        res.status(500).json({ error: error.message });
    }
}
module.exports.removeManager = async (req,res) => {
    try {
        const { teamId, managerId } = req.params;
        await teamService.removeUserFromTeam(teamId, managerId);
        res.status(201).json('Manager is removed !');
    } catch (error){
        console.error('Error removing manager from team:', error);
        res.status(500).json({ error: error.message });
    }
}
module.exports.getAllTeam = async (req,res) => {
    try {
        const result = await teamService.getAllTeam();
        res.status(201).json(result);
    } catch (error){
        console.error('Error removing manager from team:', error);
        res.status(500).json({ error: error.message });
    }
}
module.exports.getTeamById = async (req,res) => {
    try {
        const { teamId } = req.params;
        const result = await teamService.getTeamById(teamId);
        res.status(201).json(result);
    } catch (error){
        console.error('Error removing manager from team:', error);
        res.status(500).json({ error: error.message });
    }
}
