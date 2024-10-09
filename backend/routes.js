const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authController = require('./controllers/authController');
const storeController = require('./controllers/storeController');
const productController = require('./controllers/productController');
const apiKeyController = require('./controllers/apiKeyController');
const whitelistController = require('./controllers/whitelistController');
const collaboratorController = require('./controllers/collaboratorController');

// Models
const User = require('./models/userModel');
const Store = require('./models/storeModel');
const Product = require('./models/productModel');
const APIKey = require('./models/apiKeyModel');
const Whitelist = require('./models/whitelistModel');
const OAuthToken = require('./models/oauthTokenModel');

const router = express.Router();

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Authentication Routes

// Discord Authentication
router.get('/auth/discord', passport.authenticate('discord'));

// Discord Callback
router.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }), async (req, res) => {
    if (!req.user.roblox_id) {
        res.redirect('/auth/roblox');
    } else {
        const token = authController.generateToken(req.user);
        res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
    }
});

// Roblox Authentication
router.get('/auth/roblox', passport.authenticate('roblox'));

// Roblox Callback
router.get('/auth/roblox/callback', passport.authenticate('roblox', { failureRedirect: '/' }), async (req, res) => {
    const token = authController.generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
});

// API Routes

// Get User Info
router.get('/api/user', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Store Routes
router.post('/api/stores', authenticateToken, storeController.createStore);
router.get('/api/stores', authenticateToken, storeController.getStores);
router.get('/api/stores/:id', authenticateToken, storeController.getStoreById);
router.put('/api/stores/:id', authenticateToken, storeController.updateStore);
router.delete('/api/stores/:id', authenticateToken, storeController.deleteStore);

// Product Routes
router.post('/api/products', authenticateToken, productController.createProduct);
router.get('/api/products', authenticateToken, productController.getProducts);
router.get('/api/products/:id', authenticateToken, productController.getProductById);
router.put('/api/products/:id', authenticateToken, productController.updateProduct);
router.delete('/api/products/:id', authenticateToken, productController.deleteProduct);

// API Key Routes
router.post('/api/api-keys', authenticateToken, apiKeyController.createAPIKey);
//sigma
router.get('/api/api-keys', authenticateToken, apiKeyController.getAPIKeys);
router.get('/api/api-keys/:id', authenticateToken, apiKeyController.getAPIKeyById);
router.delete('/api/api-keys/:id', authenticateToken, apiKeyController.deleteAPIKey);

// Whitelist Routes
router.post('/api/whitelists', authenticateToken, whitelistController.createWhitelist);
router.get('/api/whitelists', authenticateToken, whitelistController.getWhitelists);
router.get('/api/whitelists/:id', authenticateToken, whitelistController.getWhitelistById);
router.delete('/api/whitelists/:id', authenticateToken, whitelistController.deleteWhitelist);

// Collaborator Routes
router.post('/api/collaborators', authenticateToken, collaboratorController.addCollaborator);
router.get('/api/collaborators', authenticateToken, collaboratorController.getCollaborators);
router.delete('/api/collaborators/:id', authenticateToken, collaboratorController.removeCollaborator);

module.exports = router;
