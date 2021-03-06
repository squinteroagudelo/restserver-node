const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const Category = require("../models/category.model");

const getUsers = async(req = request, res = response) => {
    const { perpage = 15, from = 0 } = req.query;
    const query = { isActive: true };

    const cat = new Category({ category: "world" });
    await cat.save();

    const [countUsers, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(isNaN(Number(from)) ? 0 : Number(from))
        .limit(isNaN(Number(perpage)) ? 15 : Number(perpage)),
    ]);

    res.json({ countUsers, users });
};

const postUsers = async(req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Create user
    await user.save();

    res.json(user);
};

const putUsers = async(req, res = response) => {
    const id = req.params.id;
    const { _id, email, password, google, ...remaining } = req.body;

    if (password) {
        // Encrypt new password
        const salt = bcryptjs.genSaltSync();
        remaining.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, remaining);

    res.json(user);
};

const deleteUsers = async(req, res = response) => {
    const { id } = req.params;

    const authenticatedUser = req.authenticatedUser;

    // Delete user
    // const userDeleted = await User.findByIdAndDelete(id);

    // Set isActive to false
    const deletedUser = await User.findByIdAndUpdate(id, { isActive: false });

    res.json({
        msg: `User ${deletedUser.email} has been successfully deleted`,
        authenticatedUser,
    });
};

const patchUsers = (req, res = response) => {
    res.json({
        msg: "patch API - Controller",
    });
};

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}