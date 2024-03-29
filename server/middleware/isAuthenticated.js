const dotenv = require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken')
const tokensService = require('../services/Tokens')


// Middleware to check if the user is logged in
async function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'The authentication token is not available' })
    }

    try {
        const userData = await tokensService.validateAccessToken(token.split(' ')[1]);
        if (!userData) {
            return res.status(401).json({ message: 'The authentication token is incorrect' });
        }
        req.user = userData;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'The authentication token is incorrect' });
    }
};

module.exports = isAuthenticated