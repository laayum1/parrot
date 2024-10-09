const { pool } = require('../config/db');

const OAuthToken = {
    create: async (user_id, provider, token) => {
        const [result] = await pool.query(
            'INSERT INTO oauth_tokens (user_id, provider, `token`) VALUES (?, ?, ?)',
            [user_id, provider, token]
        );
        return result.insertId;
    },
    findByUserId: async (user_id) => {
        const [rows] = await pool.query('SELECT * FROM oauth_tokens WHERE user_id = ?', [user_id]);
        return rows;
    },
};

module.exports = OAuthToken;
