// const jwt = require('jsonwebtoken');

// function authenticate(req, res, next) {
//     const token = req.cookies.jwt;  // Get the JWT from the cookies

//     if (!token) {
//         return res.redirect('/')
//     }

//     // console.log("Token Got", token);

//     // Verify the token 
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Failed to authenticate token' });
//         }

//         req.userId = decoded.user_id;  // Attach user info to the request object
//         next();  // Continue to the next middleware or route handler
//     });
// }

// module.exports = authenticate;

const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.cookies.jwt;  // Get the JWT from the cookies

    if (!token) {
        // Token missing, send a 401 Unauthorized response
        return res.status(401).json({ message: 'Authentication failed: Token missing' });
    }

    // Verify the token 
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Invalid token, send a 401 Unauthorized response
            return res.status(401).json({ message: 'Authentication failed: Invalid token' });
        }

        req.userId = decoded.user_id;  // Attach user info to the request object
        next();  // Continue to the next middleware or route handler
    });
}

module.exports = authenticate;
