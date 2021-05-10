const JWT = require('jsonwebtoken');
exports.SignJWTToken = (UserJSON) => {

    const ExpiresIn = 24 * 60 * 60;

    return JWT.sign(UserJSON, process.env.JWT_SECRET_KEY, { expiresIn: ExpiresIn });
}