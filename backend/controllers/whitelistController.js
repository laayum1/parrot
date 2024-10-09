const { Whitelist } = require('../models/whitelistModel');
const { Product } = require('../models/productModel');
const { Store } = require('../models/storeModel');

const whitelistController = {
    createWhitelist: async (req, res) => {
        const { product_id, user_token, type, wl_key, owner_id, person_key } = req.body;
        try {
            const product = await Product.findById(product_id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found.' });
            }
            const store = await Store.findById(product.store_id);
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const whitelistId = await Whitelist.create(product_id, user_token, type, wl_key, owner_id, person_key);
            res.status(201).json({ id: whitelistId, product_id, user_token, type, wl_key, owner_id, person_key });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create whitelist.' });
        }
    },
    getWhitelists: async (req, res) => {
        const { product_id } = req.query;
        try {
            const product = await Product.findById(product_id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found.' });
            }
            const store = await Store.findById(product.store_id);
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const whitelists = await Whitelist.findByProductId(product_id);
            res.json(whitelists);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve whitelists.' });
        }
    },
    getWhitelistById: async (req, res) => {
        const { id } = req.params;
        try {
            const whitelist = await Whitelist.findById(id);
            if (!whitelist) {
                return res.status(404).json({ error: 'Whitelist not found.' });
            }
            res.json(whitelist);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve whitelist.' });
        }
    },
    deleteWhitelist: async (req, res) => {
        const { id } = req.params;
        try {
            const whitelist = await Whitelist.findById(id);
            if (!whitelist) {
                return res.status(404).json({ error: 'Whitelist not found.' });
            }
            const product = await Product.findById(whitelist.product_id);
            const store = await Store.findById(product.store_id);
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const success = await Whitelist.delete(id);
            if (success) {
                res.json({ message: 'Whitelist deleted successfully.' });
            } else {
                res.status(400).json({ error: 'Failed to delete whitelist.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete whitelist.' });
        }
    },
};

module.exports = whitelistController;
