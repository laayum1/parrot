const { pool } = require('../config/db');

const Collaborator = {
    addCollaborator: async (store_id, collaborator_id, permissions) => {
        const [result] = await pool.query(
            'INSERT INTO collaborators (store_id, collaborator_id, permissions) VALUES (?, ?, ?)',
            [store_id, collaborator_id, permissions]
        );
        return result.insertId;
    },
    findByStoreId: async (store_id) => {
        const [rows] = await pool.query('SELECT * FROM collaborators WHERE store_id = ?', [store_id]);
        return rows;
    },
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM collaborators WHERE id = ?', [id]);
        return rows[0];
    },
    removeCollaborator: async (id) => {
        const [result] = await pool.query('DELETE FROM collaborators WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Collaborator;
