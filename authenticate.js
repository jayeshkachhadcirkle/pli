
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.cookies.jwt;  // Get the JWT from the cookies

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: Token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed: Invalid token' });
        }

        req.user = { id: decoded.id }; // Attach user info to the request object
        next();
    });
}

module.exports = authenticate;
