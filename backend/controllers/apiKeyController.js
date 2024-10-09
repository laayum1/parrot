const { APIKey } = require('../models/apiKeyModel');

const apiKeyController = {
    getAPIKeyById: async (req, res) => {
        const { id } = req.params;
        try {
            const apiKey = await APIKey.findById(id);
            if (!apiKey) {
                return res.status(404).json({ error: 'API Key not found.' });
            }
            res.json(apiKey);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve API Key.' });
        }
    },

    getAPIKeys: async (req, res) => {
        try {
            const apiKeys = await APIKey.findAll();  // Adjust this line based on your actual model method
            res.json(apiKeys);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve API keys.' });
        }
    },

    createAPIKey: async (req, res) => {
        const { store_id, plan, usage_limit } = req.body;
        const key = crypto.randomBytes(32).toString('hex');
        try {
            const apiKeyId = await APIKey.create(store_id, key, plan, usage_limit);
            res.status(201).json({ id: apiKeyId, store_id, key, plan, usage_limit });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create API Key.' });
        }
    },

    deleteAPIKey: async (req, res) => {
        const { id } = req.params;
        try {
            const apiKey = await APIKey.findById(id);
            if (!apiKey) {
                return res.status(404).json({ error: 'API Key not found.' });
            }
            const success = await APIKey.delete(id);
            if (success) {
                res.json({ message: 'API key deleted successfully.' });
            } else {
                res.status(400).json({ error: 'Failed to delete API Key.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete API Key.' });
        }
    }
};

module.exports = apiKeyController;
