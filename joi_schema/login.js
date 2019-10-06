const joi = require("joi");

const loginSchema = {
  email: joi
    .string()
    .required()
    .email(),
  password: joi
    .string()
    .required()
    .min(6)
};

module.exports = loginSchema;
