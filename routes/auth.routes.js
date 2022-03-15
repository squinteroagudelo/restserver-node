const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { fieldsValidate } = require("../middlewares/fields-validate.middleware");

const router = Router();

router.post(
    "/login", [
        check("email", "Email is required").not().isEmpty(),
        check("email", "Format email invalid").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        fieldsValidate,
    ],
    login
);

module.exports = router;