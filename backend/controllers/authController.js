const jwt = require('jsonwebtoken');

const authController = {
    generateToken: (user) => {
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    },
};

module.exports = authController;
