const userService = require('../service/users.service');
const constant = require('../common/constant');
const validationHelper = require('../common/utils/validation-helper');

module.exports.login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const validation = validationHelper.validateLoginInput({ email, password });
        if(!validation.isValid) {
            return res.status(500).json(validation.errors);
        }
        const result = await userService.login(email, password);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports.createUser = async (req,res) => {
    try {
        const { username, password, email, role } = req.body;
        const isEmailExist = await userService.isEmailExists(email);
        if (isEmailExist) return res.status(500).json('Email is existed !');
        let roleId = 0;
        switch (role){
            case 'Manager':
                roleId = constant.ROLES.MANAGER;
                break;
            case 'Member' :
                roleId = constant.ROLES.MEMBER;
                break;
            default:
                break;
        }
        if (roleId !== 0) {
            const result = await userService.createUser({ username, password, email, roleId });
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