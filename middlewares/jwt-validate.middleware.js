const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header("u-token");

    if (!token) {
        return res.status(401).json({
            msg: "Not allowed",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const authenticatedUser = await User.findById(uid);

        if (!authenticatedUser || !authenticatedUser.isActive)
            res.status(401).json({ msg: "Invalid authorization" });

        req.authenticatedUser = authenticatedUser;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Invalid authorization" });
    }
};

module.exports = {
    validateJWT,
};