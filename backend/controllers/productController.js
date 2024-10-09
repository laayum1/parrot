const { Product } = require('../models/productModel');
const { Store } = require('../models/storeModel');

const productController = {
    createProduct: async (req, res) => {
        const { store_id, name, description, version, file_link } = req.body;
        try {
            const store = await Store.findById(store_id);
            if (!store) {
                return res.status(404).json({ error: 'Store not found.' });
            }
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const productId = await Product.create(store_id, name, description, version, file_link);
            res.status(201).json({ id: productId, store_id, name, description, version, file_link });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create product.' });
        }
    },
    getProducts: async (req, res) => {
        const { store_id } = req.query;
        try {
            const store = await Store.findById(store_id);
            if (!store) {
                return res.status(404).json({ error: 'Store not found.' });
            }
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const products = await Product.findByStoreId(store_id);
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve products.' });
        }
    },
    getProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found.' });
            }
            const store = await Store.findById(product.store_id);
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            res.json(product);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve product.' });
        }
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const fields = req.body;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found.' });
            }
            const store = await Store.findById(product.store_id);
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const success = await Product.update(id, fields);
            if (success) {
                res.json({ message: 'Product updated successfully.' });
            } else {
                res.status(400).json({ error: 'Failed to update product.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update product.' });
        }
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found.' });
            }
            const store = await Store.findById(product.store_id);
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const success = await Product.delete(id);
            if (success) {
                res.json({ message: 'Product deleted successfully.' });
            } else {
                res.status(400).json({ error: 'Failed to delete product.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete product.' });
        }
    },
};

module.exports = productController;
