const { request, response } = require("express");

const getUsers = (req = request, res = response) => {
    const { key = 'None', name = 'No name', lastname = 'No lastname', perpage = 10, page = 1 } = req.query;

    res.json({
        msg: "get API - Controller",
        key,
        name,
        lastname,
        perpage,
        page
    });
};

const postUsers = (req, res = response) => {
    const body = req.body;
    res.json({
        msg: "post API - Controller",
        body,
    });
};

const putUsers = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: "put API - Controller",
        id,
    });
};

const patchUsers = (req, res = response) => {
    res.json({
        msg: "patch API - Controller",
    });
};

const deleteUsers = (req, res = response) => {
    res.json({
        msg: "delete API - Controller",
    });
};

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}