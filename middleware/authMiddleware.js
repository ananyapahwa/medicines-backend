const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Pharmacy = require('../models/pharmacy');

const protect = (secret) => async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secret);

            req.user = await User.findById(decoded.id).select('-password');
            req.pharmacy = await Pharmacy.findById(decoded.id);
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };