const dbConnection = require('../configs/db/knex')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constant = require('../common/constant')
const roleMapping = require('../common/utils/role-helper')
class UsersService {
    constructor() {
        this.connection = dbConnection.knex;
    }
    async login(email, password){
        const user = await this.getUserByEmail(email);
        let role = '';
        if (!user) throw new Error('Invalid email or password !');
        // Compare provided password with stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid email or password !');
        switch (user.roleId){
            case constant.ROLES.MEMBER:
                role = roleMapping(constant.ROLES.MEMBER);
                break;
            case constant.ROLES.MANAGER:
                role = roleMapping(constant.ROLES.MANAGER);
                break;
            default:
                break;
        }
        // Generate JWT token
        const token = jwt.sign({
            userId: user.userId,
            email: user.email,
            role: role,
            roleId: user.roleId
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return {
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token: token
        };
    }
    async createUser(user){
        const saltRounds = 10;
        const defaultRole = 3; // Viewer
        user.password = await bcrypt.hash(user.password, saltRounds);
        const [result] = await this.connection('users').insert(user).returning('*');
        return {
            userId: result.userId,
            username: result.username,
            email: result.email,
            role: roleMapping(result.roleId)
        };
    }
    async isEmailExists(email) {
        const user = await this.connection('users')
            .where({ email: email.toLowerCase() })
            .first();
        // !! means if user is null or undefined !!user return false else return true
        return !!user;
    }
    async updateUser(userId, user){
        const [updatedUser] = await this.connection('users')
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
        const deletedCount = await this.connection('users')
            .where({ userId: id })
            .del();
        if (deletedCount === 0) {
            throw new Error('User not found !');
        }
    }
    async getMemberById(id){
        const member = await this.connection('users').where({userId: id}).first();
        if (member) {
            return member;
        } else {
            throw new Error('User not found !');
        }
    }
    async getUserByEmail(email){
        return this.connection('users').where({email: email}).first();
    }
}
module.exports = new UsersService();