const joi = require('joi');

const userSchema = joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    age: joi.number().integer().min(0).max(100).required(),
    mobileNumber: joi.string().min(10).required(),
    isActive: joi.boolean().required(true)

});

module.exports = { userSchema };