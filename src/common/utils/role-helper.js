const roleMap = {
    1: 'Manager',
    2: 'Member'
}
function roleMapping(roleId){
    return roleMap[roleId];
}
module.exports = roleMapping;