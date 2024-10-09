const { pool } = require('../config/db');

const Product = {
    create: async (store_id, name, description, version, file_link) => {
        const [result] = await pool.query(
            'INSERT INTO products (store_id, name, description, version, file_link) VALUES (?, ?, ?, ?, ?)',
            [store_id, name, description, version, file_link]
        );
        return result.insertId;
    },
    findByStoreId: async (store_id) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE store_id = ?', [store_id]);
        return rows;
    },
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    },
    update: async (id, fields) => {
        const setClause = Object.keys(fields).map(field => `${field} = ?`).join(', ');
        const values = Object.values(fields);
        values.push(id);
        const [result] = await pool.query(`UPDATE products SET ${setClause} WHERE id = ?`, values);
        return result.affectedRows > 0;
    },
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Product;
