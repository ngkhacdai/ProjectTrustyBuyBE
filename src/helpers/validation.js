const joi = require('joi')

const userValidate = data => {
    const userSchema = joi.object({
        user_email: joi.string().pattern(new RegExp('gmail.com$')).email().lowercase().required(),
        user_password: joi.string().min(6).required(),
        // phone_number: joi.string().pattern(/^0\d{9}$/).required()
    })
    return userSchema.validate(data)
}
const shopValidate = data =>{
    const shopSchema = joi.object({
        email: joi.string().pattern(new RegExp('gmail.com$')).email().lowercase().required(),
        password: joi.string().min(6).max(32).required(),
    })
    return shopSchema.validate(data)
}
module.exports = {
    userValidate,shopValidate
}