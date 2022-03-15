const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/jwt-generate.helper");
const User = require("../models/user.model");

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        // Email validate
        if (!userExists || !userExists.isActive) {
            return res.status(400).json({
                msg: `Invalid user or password - ${
                    !userExists ? "Email" : "isActive"
                }`,
            });
        }

        // Password validate
        const validPassword = bcryptjs.compareSync(
            password,
            userExists.password
        );

        if (!validPassword) {
            return res.status(400).json({
                msg: `Invalid user or password - Password`,
            });
        }

        // JWT generate
        const token = await generateJWT(userExists.id);

        res.json({
            userExists,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Problem",
        });
    }
};

module.exports = {
    login,
};