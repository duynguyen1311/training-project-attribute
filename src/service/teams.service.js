const knex = require('../configs/db/knex');
const roleConstant = require('../common/contants/role-constant');
const userService = require('./users.service');
class TeamsService{
    async createTeamWithMembers(teamName, listManager, listMember){
        const trx = await knex.transaction();

        try {
            const [{teamId}] = await trx('team').insert({teamName: teamName}).returning('teamId');

            const addedManagers = await this.addTeamMembers(trx, teamId, listManager, roleConstant.ROLES.MANAGER);
            const addedMembers = await this.addTeamMembers(trx, teamId, listMember, roleConstant.ROLES.MEMBER);

            await trx.commit();

            return {
                teamId,
                teamName,
                managers: addedManagers,
                members: addedMembers
            };
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async addTeamMembers(trx, teamId, listUserId, roleId) {
        const addedUsers = [];
        for (const userId of listUserId) {
            if(roleId === roleConstant.ROLES.MEMBER){
                const teamMemeber = {
                    teamId: teamId,
                    userId: userId,
                    roleId: roleConstant.ROLES.MEMBER
                };
                await trx('team_members').insert(teamMemeber);
                const memberName = await userService.getMemberById(userId);
                addedUsers.push(
                    {
                        managerId: userId,
                        memberName: memberName.username
                    }
                );
            } else {
                const teamManager = {
                    teamId: teamId,
                    userId: userId,
                    roleId: roleConstant.ROLES.MANAGER
                };
                await trx('team_members').insert(teamManager);
                const managerName = await userService.getMemberById(userId);
                addedUsers.push(
                    {
                        managerId: userId,
                        memberName: managerName.username
                    }
                );
            }
        }
        return addedUsers;
    }
    async addToTeam(teamId, userId, name, roleId){
        await knex('team_members').insert({
            teamId: teamId,
            userId: userId,
            roleId: roleId
        })
        const user = await userService.getMemberById(userId);
        if(!user) throw new Error('User not found !');
        if(roleId === roleConstant.ROLES.MEMBER){
            return {
                memberId: user.userId,
                memberName: user.username
            };
        }else{
            return {
                managerId: user.userId,
                managerName: user.username
            };
        }

    }
    async removeUserFromTeam(teamId, userId) {
        const deletedCount = await knex('team_members')
            .where({ teamId, userId })
            .del();

        if (deletedCount === 0) {
            throw new Error('User not found in the team');
        }
    }
    async getAllTeam(){
        return knex('team_members').from('team').select('team.teamId', 'team.teamName').orderBy('team.created_at', 'desc');
    }
    async getTeamById(teamId) {
        const query = `
            SELECT
                t."teamId",
                t."teamName",
                (
                    SELECT json_agg(json_build_object('managerId', u."userId", 'managerName', u.username))
                    FROM team_members tm
                    JOIN users u ON tm."userId" = u."userId"
                    WHERE tm."teamId" = t."teamId" AND u."roleId" = 1
                ) AS managers,
                (
                    SELECT json_agg(json_build_object('memberId', u."userId", 'memberName', u.username))
                    FROM team_members tm
                    JOIN users u ON tm."userId" = u."userId"
                    WHERE tm."teamId" = t."teamId" AND u."roleId" = 2
                ) AS members
            FROM
                team t
            WHERE
                t."teamId" = ?;
    `;

        const result = await knex.raw(query, [teamId]);

        if (result.rows.length === 0) {
            throw new Error('Team not found');
        }

        const team = result.rows[0];

        // Convert null arrays to empty arrays
        team.managers = team.managers || [];
        team.members = team.members || [];

        return team;
    }
}
module.exports = new TeamsService();