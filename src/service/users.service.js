const knex = require('../configs/db/knex')
const roleMapping = require('../common/utils/role-helper')
class UsersService {
    async createUser(user){
        const [result] = await knex('users').insert(user).returning('*');
        return {
            userId: result.userId,
            username: result.username,
            email: result.email,
            role: roleMapping(result.roleId)
        };
    }
    async isEmailExists(email) {
        const user = await knex('users')
            .where({ email: email.toLowerCase() })
            .first();
        // !! means if user is null or undefined !!user return false else return true
        return !!user;
    }
    async updateUser(userId, user){
        const [updatedUser] = await knex('users')
            .where({userId: userId})
            .update(user)
            .returning('*');
        if (!updatedUser){
            return null;
        } else {
            return {
                userId: updatedUser.userId,
                username: updatedUser.username,
                email: updatedUser.email,
                role: roleMapping(updatedUser.roleId)
            };
        }

    }
    async deleteUser(id){
        const deletedCount = await knex('users')
            .where({ userId: id })
            .del();
        if (deletedCount === 0) {
            throw new Error('User not found !');
        }
    }

}
module.exports = new UsersService();