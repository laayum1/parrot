const { pool } = require('../config/db');

const Store = {
    create: async (user_id, name, description, logo_url, pricing_plan) => {
        const [result] = await pool.query(
            'INSERT INTO stores (user_id, name, description, logo_url, pricing_plan) VALUES (?, ?, ?, ?, ?)',
            [user_id, name, description, logo_url, pricing_plan]
        );
        return result.insertId;
    },
    findByUserId: async (user_id) => {
        const [rows] = await pool.query('SELECT * FROM stores WHERE user_id = ?', [user_id]);
        return rows;
    },
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM stores WHERE id = ?', [id]);
        return rows[0];
    },
    update: async (id, fields) => {
        const setClause = Object.keys(fields).map(field => `${field} = ?`).join(', ');
        const values = Object.values(fields);
        values.push(id);
        const [result] = await pool.query(`UPDATE stores SET ${setClause} WHERE id = ?`, values);
        return result.affectedRows > 0;
    },
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM stores WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Store;
