const { Store } = require('../models/storeModel');

const storeController = {
    createStore: async (req, res) => {
        const { name, description, logo_url, pricing_plan } = req.body;
        try {
            const existingStore = await Store.findByUserId(req.user.id);
            if (existingStore.find(store => store.name === name)) {
                return res.status(400).json({ error: 'Store name already exists.' });
            }
            const storeId = await Store.create(req.user.id, name, description, logo_url, pricing_plan);
            res.status(201).json({ id: storeId, name, description, logo_url, pricing_plan });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create store.' });
        }
    },
    getStores: async (req, res) => {
        try {
            const stores = await Store.findByUserId(req.user.id);
            res.json(stores);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve stores.' });
        }
    },
    getStoreById: async (req, res) => {
        const { id } = req.params;
        try {
            const store = await Store.findById(id);
            if (!store) {
                return res.status(404).json({ error: 'Store not found.' });
            }
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            res.json(store);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve store.' });
        }
    },
    updateStore: async (req, res) => {
        const { id } = req.params;
        const fields = req.body;
        try {
            const store = await Store.findById(id);
            if (!store) {
                return res.status(404).json({ error: 'Store not found.' });
            }
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const success = await Store.update(id, fields);
            if (success) {
                res.json({ message: 'Store updated successfully.' });
            } else {
                res.status(400).json({ error: 'Failed to update store.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update store.' });
        }
    },
    deleteStore: async (req, res) => {
        const { id } = req.params;
        try {
            const store = await Store.findById(id);
            if (!store) {
                return res.status(404).json({ error: 'Store not found.' });
            }
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const success = await Store.delete(id);
            if (success) {
                res.json({ message: 'Store deleted successfully.' });
            } else {
                res.status(400).json({ error: 'Failed to delete store.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete store.' });
        }
    },
};

module.exports = storeController;
