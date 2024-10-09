const { Collaborator } = require('../models/collaboratorModel');
const { Store } = require('../models/storeModel');

const collaboratorController = {
    addCollaborator: async (req, res) => {
        const { store_id, collaborator_id, permissions } = req.body;
        try {
            const store = await Store.findById(store_id);
            if (!store) {
                return res.status(404).json({ error: 'Store not found.' });
            }
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const collaborator = await Collaborator.addCollaborator(store_id, collaborator_id, permissions);
            res.status(201).json(collaborator);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to add collaborator.' });
        }
    },

    getCollaborators: async (req, res) => {
        const { store_id } = req.query;
        try {
            const collaborators = await Collaborator.findByStoreId(store_id);
            res.json(collaborators);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve collaborators.' });
        }
    },

    removeCollaborator: async (req, res) => {
        const { id } = req.params;
        try {
            const collaborator = await Collaborator.findById(id);
            if (!collaborator) {
                return res.status(404).json({ error: 'Collaborator not found.' });
            }
            const store = await Store.findById(collaborator.store_id);
            if (store.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied.' });
            }
            const success = await Collaborator.removeCollaborator(id);
            if (success) {
                res.json({ message: 'Collaborator removed successfully.' });
            } else {
                res.status(400).json({ error: 'Failed to remove collaborator.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to remove collaborator.' });
        }
    }
};

module.exports = collaboratorController;
