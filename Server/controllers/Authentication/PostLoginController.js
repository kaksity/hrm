const Validator = require('validator');
const Authentication = require('../../Models/Authentication');
const GeneralFunction = require('../../Functions/GeneralFunctions');
const Bcrypt = require('bcryptjs');
module.exports = async(req, res) => {
    try {
        let EmailAddress = req.body.email_address;
        let Password = req.body.password;

        if (Validator.isEmpty(EmailAddress) == true) {
            return res.status(400).json({
                success: false,
                message: 'Email Address is required',
                description: 'You have to supply an email address'
            });
        }
        if (Validator.isEmpty(Password) == true) {
            return res.status(400).json({
                success: false,
                message: 'Password is required',
                description: 'You have to supply a password'
            });
        }
        if (Validator.isEmail(EmailAddress) == false) {
            return res.status(400).json({
                success: false,
                message: 'Email Address format is not valid',
                description: 'Email Address format has to be valid. Use xxx@yyy.zzz'
            });
        }
        if (Password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Login Credentials',
                description: 'Supply the Correct Login Credentails'
            });
        }


        //After this point it is assumed that the everything is going as planned
        try {

            //Prepare the Email Address 
            EmailAddress = EmailAddress.toLowerCase();

            const AuthenticationQueryResult = await Authentication.findOne({
                where: {
                    email_address: EmailAddress,
                    is_deleted: 0
                }
            });
            //This is if the Email Address Supplied is not valid
            if (!AuthenticationQueryResult) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect Login Credentials',
                    description: 'Supply the Correct Login Credentails'
                });
            }

            //Compare the Password with the Password the User has Supplied
            const CompareHashedPasswordResult = await Bcrypt.compare(Password, AuthenticationQueryResult.password);

            if (CompareHashedPasswordResult == false) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect Login Credentials',
                    description: 'Supply the Correct Login Credentails'
                });
            }

            const AuthenticationTokenJSON = {
                auth_id: AuthenticationQueryResult.id
            }
            return res.status(200).json({
                success: true,
                message: 'Login Was Successful',
                data: {
                    token: GeneralFunction.SignJWTToken(AuthenticationTokenJSON),
                }

            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Try again',
                description: 'Could not complete the Operation'
            });
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again',
            description: 'The Following request bodies are required. email_address & password'
        });
    }
}