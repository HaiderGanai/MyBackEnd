const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token

    if (!token) {
        return res.status(403).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the same secret key
        const decoded = jwt.verify(token, 'qwerty'); // Ensure the secret key is the same
        req.user = decoded;  // Attach decoded user info to request

        
        next();  // Allow request to proceed
    } catch (error) {
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { authenticateJWT };
