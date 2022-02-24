const jwt = require('jsonwebtoken');

const jwtSecret = process.env.TOKEN_SECRET;

/**
 * Authorize middleware to be used on the routes to be secured
 */

const authorize = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) return res.status(403).json({ error: 'A token is required for authentication' });

    try {
        req.user = jwt.verify(token, jwtSecret);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    return next();
};

const createToken = (id, email) => {
    console.log(jwtSecret);
    console.log(process.env.TOKEN_SECRET);
    return jwt.sign(
        { user_id: id, email },
        jwtSecret
    );
};

module.exports = { authorize, createToken };
