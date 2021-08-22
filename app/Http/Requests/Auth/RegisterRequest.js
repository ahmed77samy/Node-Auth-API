const { body } = require('express-validator');
const { isExistEmail } = require('../../../Helpers/Validation/authCustom');

class RegisterRequest
{
    static roles () {
        return [
            // Name roles
            body('name')
            .isLength({ min: 5 })
            .withMessage('must be at least 5 chars long'),
            // Email roles
            body('email')
            .isEmail()
            .withMessage('must be an email')
            .custom( email => isExistEmail (email) ),
            // Image roles
            body('img')
            .optional()
            .isLength({ min: 5 }),
            // Password roles
            body('password')
            .isLength({ min: 5 })
            .withMessage('must be at least 5 chars long'),
            // password_confirmation roles
            body('password_confirmation')
            .custom ((value , {req}) => value == req.body.password )
        ]
    }
}

module.exports = RegisterRequest.roles()