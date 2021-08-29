const { saveFile } = require("../../../Helpers/Fileupload");
const User = require("../../../Models/User");
const RegisterObserver = require("../../../Observers/RegisterObserver");
const AuthServiceProvider = require("../../../Providers/AuthServiceProvider");
const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");


class RegisterController 
{
    /**
     * Register a new user
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async register (req, res) 
    {
        try {
            if (req.files)
            req.body.img = `uploads/users/avatar/${saveFile('users/avatar', req.files.img)}`

            // Generate Verification Code
            let verify_code = Math.floor(Math.random() * 999999) + 100000;

            // Add verify_code to request 
            req.body.verify_code = verify_code

            let user = await AuthServiceProvider.register(req.body);

            // Add user_id to request 
            req.body.userID = user[0].insertId

            // Inject Observer 
            RegisterObserver.registered(req.body)

            return res.status(200).json({
                success : true,
                payload : "Check Your Email"
            })

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }
}

module.exports = new RegisterController