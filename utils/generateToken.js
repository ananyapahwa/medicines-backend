const jwt = require('jsonwebtoken');

const generateToken = (id, secret, expiresIn = '30d') => {
    return jwt.sign({ id }, secret, { expiresIn });
};

module.exports = generateToken;
