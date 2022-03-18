const fieldsValidate = require("./fields-validate.middleware");
const validateJWT = require("./jwt-validate.middleware");
const validateRole = require("./roles-validate.middleware");

module.exports = {
    ...fieldsValidate,
    ...validateJWT,
    ...validateRole,
};