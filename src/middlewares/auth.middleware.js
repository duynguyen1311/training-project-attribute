const passport = require('passport');

// Middleware to authenticate requests
const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.session.user = user; // This sets the user information in the session
        next();
    })(req, res, next);
};

// Middleware for role-based authorization
const authorizeRole = (allowedRoleIds) => {
    return (req, res, next) => {
        const user = req.session.user;
        console.log(allowedRoleIds)
        console.log("Author:",user)
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (allowedRoleIds.some(roleId => user.roleId <= roleId)) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};

module.exports = {
    authenticateJWT,
    authorizeRole,
};