const { pool } = require('../config/db');

const User = {
    findByDiscordId: async (discord_id) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE discord_id = ?', [discord_id]);
        return rows[0];
    },
    findByRobloxId: async (roblox_id) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE roblox_id = ?', [roblox_id]);
        return rows[0];
    },
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (discord_id, discord_username, discord_avatar) => {
        const [result] = await pool.query(
            'INSERT INTO users (discord_id, discord_username, discord_avatar) VALUES (?, ?, ?)',
            [discord_id, discord_username, discord_avatar]
        );
        return result.insertId;
    },
    createRoblox: async (roblox_id, roblox_username, roblox_avatar) => {
        const [result] = await pool.query(
            'INSERT INTO users (roblox_id, roblox_username, roblox_avatar) VALUES (?, ?, ?)',
            [roblox_id, roblox_username, roblox_avatar]
        );
        return result.insertId;
    },
};

module.exports = User;
