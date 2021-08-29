const User = require("../../Models/User");

module.exports = {

    isExistEmail (email) 
    {
        if (email)
            return User
            .getByEmail(email)
            .then( response => {
                if (response[0][0]) return Promise
                    .reject('E-mail already in use');
            })
    }
}