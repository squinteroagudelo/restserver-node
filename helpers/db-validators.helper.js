const Role = require("../models/role.model");
const User = require("../models/user.model");

const isValidRole = async(role = "") => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) throw new Error(`'${role}' isn't a valid role`);
};

const duplicatedEmails = async(email = "") => {
    if (email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) throw new Error(`${email} is already registered`);
    } else throw new Error("Email is required");
};

const getUserById = async(id = "") => {
    const userExists = await User.findById(id);
    if (!userExists) throw new Error(`User with id ${id} not found`);
};

const getUserByEmail = async(email = "") => {
    const userExists = await User.findOne({ email });
    if (!userExists) throw new Error(`User ${email} not found`);
};

module.exports = {
    isValidRole,
    duplicatedEmails,
    getUserById,
    getUserByEmail,
};