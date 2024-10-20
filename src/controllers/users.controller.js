const userService = require('../service/users.service');
const roleConstant = require('../common/contants/role-constant');
module.exports.createUser = async (req,res) => {
    try {
        const {username, email, role} = req.body;
        const isEmailExist = await userService.isEmailExists(email);
        if (isEmailExist) return res.status(500).json('Email is existed !');
        let roleId = 0;
        switch (role){
            case 'Manager':
                roleId = roleConstant.ROLES.MANAGER;
                break;
            case 'Member' :
                roleId = roleConstant.ROLES.MEMBER;
                break;
            default:
                break;
        }
        if (roleId !== 0) {
            const result = await userService.createUser({username,email,roleId});
            res.status(201).json(result);
        } else {
            res.status(400).json('Role is invalid !');
        }
    } catch (error){
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports.updateUser = async (req,res) => {
    try {
        const user = req.body;
        const { id } = req.params;
        const isEmailExist = await userService.isEmailExists(user.email);
        if (isEmailExist) return res.status(500).json('Email is existed !');
        const result = await userService.updateUser(id, user);
        if (result) {
            res.status(201).json(result);
        } else {
            res.status(404).json('User not found !');
        }

    } catch (error){
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports.deleteUser = async (req,res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(201).json('User is deleted !');
    } catch (error){
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message });
    }
}