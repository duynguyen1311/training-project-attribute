const dbConnection = require('../configs/db/knex');
const constant = require('../common/constant');
const userService = require('./users.service');
class TeamsService{
    constructor() {
        this.connection = dbConnection.knex;
    }
    //test
    async createTeamWithMembers(teamName, listManager, listMember){
        const trx = await this.connection.transaction();

        try {
            const [{teamId}] = await trx('team').insert({teamName: teamName}).returning('teamId');

            const addedManagers = await this.addTeamMembers(trx, teamId, listManager, constant.ROLES.MANAGER);
            const addedMembers = await this.addTeamMembers(trx, teamId, listMember, constant.ROLES.MEMBER);

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
            if(roleId === constant.ROLES.MEMBER){
                const teamMemeber = {
                    teamId: teamId,
                    userId: userId,
                    roleId: constant.ROLES.MEMBER
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
                    roleId: constant.ROLES.MANAGER
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
        await this.connection('team_members').insert({
            teamId: teamId,
            userId: userId,
            roleId: roleId
        })
        const user = await userService.getMemberById(userId);
        if(!user) throw new Error('User not found !');
        if(roleId === constant.ROLES.MEMBER){
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
        const deletedCount = await this.connection('team_members')
            .where({ teamId, userId })
            .del();

        if (deletedCount === 0) {
            throw new Error('User not found in the team');
        }
    }
    async getAllTeam(){
        return this.connection('team_members').from('team').select('team.teamId', 'team.teamName').orderBy('team.created_at', 'desc');
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

        const result = await this.connection.raw(query, [teamId]);

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