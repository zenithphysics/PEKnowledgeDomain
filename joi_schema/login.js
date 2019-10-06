const joi = require("@hapi/joi");

const loginSchema = joi.object({
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "tech", "io"] } }),
  password: joi
    .string()
    .required()
    .min(6)
});

module.exports = loginSchema;
