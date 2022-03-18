const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
    if (!req.authenticatedUser) {
        return res.status(500).json({
            msg: "Attempting to verify the role without verifying the token",
        });
    }

    const { name, role } = req.authenticatedUser;
    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} isn't Admin User - Action not allowed`,
        });
    }
    next();
};

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.authenticatedUser) {
            return res.status(500).json({
                msg: "Attempting to verify the role without verifying the token",
            });
        }

        if (!roles.includes(req.authenticatedUser.role)) {
            return res.status(401).json({
                msg: `Action not allowed for user ${req.authenticatedUser.email}`,
            });
        }
        next();
    };
};

module.exports = {
    isAdminRole,
    hasRole,
};