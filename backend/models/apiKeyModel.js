const { pool } = require('../config/db');

const APIKey = {
    create: async (store_id, key, plan, usage_limit) => {
        const [result] = await pool.query(
            'INSERT INTO api_keys (store_id, `key`, plan, usage_limit) VALUES (?, ?, ?, ?)',
            [store_id, key, plan, usage_limit]
        );
        return result.insertId;
    },
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM api_keys WHERE id = ?', [id]);
        return rows[0];
    },
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM api_keys WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = APIKey;
