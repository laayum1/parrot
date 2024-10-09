const { pool } = require('../config/db');

const Whitelist = {
    create: async (product_id, user_token, type, wl_key, owner_id, person_key) => {
        const [result] = await pool.query(
            'INSERT INTO whitelists (product_id, user_token, type, wl_key, owner_id, person_key) VALUES (?, ?, ?, ?, ?, ?)',
            [product_id, user_token, type, wl_key, owner_id, person_key]
        );
        return result.insertId;
    },
    findByProductId: async (product_id) => {
        const [rows] = await pool.query('SELECT * FROM whitelists WHERE product_id = ?', [product_id]);
        return rows;
    },
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM whitelists WHERE id = ?', [id]);
        return rows[0];
    },
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM whitelists WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Whitelist;
