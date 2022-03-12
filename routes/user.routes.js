const { Router } = require('express');
const { check } = require("express-validator");
const {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
} = require("../controllers/user.controller");
const {
    isValidRole,
    duplicatedEmails,
    getUserById,
} = require("../helpers/db-validators.helper");
const { fieldsValidate } = require("../middlewares/fields-validate.middleware");

const router = Router();

router.get("/", getUsers);

router.post(
    "/", [
        check("name", "Name is required").not().isEmpty(),
        check(
            "password",
            "Password must be at least 6 characters long"
        ).isLength({ min: 6 }),
        check("email", "Invalid email").isEmail(),
        check("email").custom(duplicatedEmails),
        check("role").custom(isValidRole),
        fieldsValidate,
    ],
    postUsers
);

router.put(
    "/:id", [
        check("id", "Id is invalid").isMongoId(),
        check("id").custom(getUserById),
        check("role").custom(isValidRole),
        fieldsValidate,
    ],
    putUsers
);

router.delete(
    "/:id", [
        check("id", "Id is invalid").isMongoId(),
        check("id").custom(getUserById),
        fieldsValidate,
    ],
    deleteUsers
);

router.patch("/:id", patchUsers);



module.exports = router;