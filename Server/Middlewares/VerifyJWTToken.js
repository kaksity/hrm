const Jwt = require('jsonwebtoken');

module.exports = async(req, res, next) => {
    try {

        let AuthorizationToken = req.headers.authorization;

        if (AuthorizationToken == undefined || AuthorizationToken == null) {
            return res.status(401).json({
                success: true,
                message: 'Access Token is required',
                description: 'Try Logging Again to get Token'
            });
        }
        AuthorizationToken = AuthorizationToken.split(' ')[1];

        let User = await Jwt.verify(AuthorizationToken, process.env.JWT_SECRET_KEY);
        console.log(User);

        let UserObj = {
            id: User.auth_id
        }

        req.User = UserObj;

        next();

    } catch (e) {
        return res.status(401).json({
            success: true,
            message: 'Token has been tampered with',
            description: 'Try Logging Again to get Token'
        });
    }
}