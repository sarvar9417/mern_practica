const {Schema, model, Types} = require("mongoose")
const Joi = require('joi')

const userSchema = new Schema({
    email: {type: String, maxlength: 30, required: true, lowercase: true},
    password: {type: String, minlength: 6, required: true},
    links: [{type: Types.ObjectId, ref: 'Link'}]

})

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().max(30).required(),
        password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    })

    return schema.validate(user)
}

module.exports.validateUser = validateUser
module.exports.User = model('User', userSchema)