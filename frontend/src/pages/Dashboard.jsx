// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [apiKeys, setApiKeys] = useState([]);
    const [whitelists, setWhitelists] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [newStore, setNewStore] = useState({ name: '', description: '', logo_url: '', pricing_plan: 'Standard' });
    const [newAPIKey, setNewAPIKey] = useState({});
    const [newCollaborator, setNewCollaborator] = useState({ email: '', permission_level: 'read' });

    const navigate = useNavigate();

    // Extract token from URL and store it
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
            fetchUser(token);
        } else {
            // Redirect to sign-in if no token
            navigate('/signin');
        }
    }, [navigate]);

    // Fetch user information
    const fetchUser = async (token) => {
        try {
            const res = await axios.get('http://localhost:5000/api/user', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setUser(res.data);
            fetchStores(token);
        } catch (err) {
            console.error(err);
            // Redirect to sign-in on error
            navigate('/signin');
        }
    };

    // Fetch stores associated with the user
    const fetchStores = async (token) => {
        try {
            const res = await axios.get('http://localhost:5000/api/stores', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setStores(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch API keys for the selected store
    const fetchAPIKeys = async (storeId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/api-keys?store_id=${storeId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setApiKeys(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch whitelists for the selected store
    const fetchWhitelists = async (storeId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/whitelists?store_id=${storeId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setWhitelists(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch collaborators for the selected store
    const fetchCollaborators = async (storeId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/collaborators?store_id=${storeId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setCollaborators(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Handle store selection
    const handleStoreSelect = (store) => {
        setSelectedStore(store);
        fetchAPIKeys(store.id);
        fetchWhitelists(store.id);
        fetchCollaborators(store.id);
    };

    // Handle new store form submission
    const handleStoreSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/stores', newStore, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setStores([...stores, res.data]);
            setNewStore({ name: '', description: '', logo_url: '', pricing_plan: 'Standard' });
        } catch (err) {
            console.error(err);
        }
    };

    // Handle new API Key form submission
    const handleAPIKeySubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/api-keys', {
                store_id: selectedStore.id,
                // No plan selection; only one API key per store
            }, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setApiKeys([res.data]);
        } catch (err) {
            console.error(err);
        }
    };

    // Handle new collaborator form submission
    const handleCollaboratorSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/collaborators', {
                store_id: selectedStore.id,
                ...newCollaborator,
            }, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setCollaborators([...collaborators, res.data]);
            setNewCollaborator({ email: '', permission_level: 'read' });
        } catch (err) {
            console.error(err);
        }
    };

    // Handle API Key deletion
    const handleAPIKeyDelete = async () => {
        if (!apiKeys.length) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/api-keys/${apiKeys[0].id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setApiKeys([]);
        } catch (err) {
            console.error(err);
        }
    };

    // Handle Collaborator deletion
    const handleCollaboratorDelete = async (collaboratorId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/collaborators/${collaboratorId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setCollaborators(collaborators.filter(collab => collab.id !== collaboratorId));
        } catch (err) {
            console.error(err);
        }
    };

    // Handle Store deletion
    const handleStoreDelete = async (storeId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/stores/${storeId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setStores(stores.filter(store => store.id !== storeId));
            setSelectedStore(null);
            setApiKeys([]);
            setWhitelists([]);
            setCollaborators([]);
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return <div className="dashboard-loading">Loading...</div>;

    return (
        <div className="dashboard-container">
            <h1>Welcome, {user.discord_username || user.roblox_username}</h1>
            <div className="dashboard-content">
                {/* User Info */}
                <div className="user-info">
                    <img
                        src={
                            user.discord_avatar
                                ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.discord_avatar}.png`
                                : user.roblox_avatar
                        }
                        alt="User Avatar"
                        className="avatar"
                    />
                    <p><strong>Username:</strong> {user.discord_username || user.roblox_username}</p>
                    <p><strong>User ID:</strong> {user.id}</p>
                    <p><strong>Token:</strong> <span className="masked-token">{user.token}</span></p>
                </div>

                {/* Stores Section */}
                <div className="stores-section">
                    <h2>Your Stores</h2>
                    <ul className="stores-list">
                        {stores.map(store => (
                            <li
                                key={store.id}
                                className={selectedStore && selectedStore.id === store.id ? 'selected-store' : ''}
                                onClick={() => handleStoreSelect(store)}
                            >
                                <img src={store.logo_url} alt={`${store.name} Logo`} className="store-logo" />
                                <span>{store.name}</span>
                                <button
                                    className="delete-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm(`Are you sure you want to delete store "${store.name}"?`)) {
                                            handleStoreDelete(store.id);
                                        }
                                    }}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* New Store Form */}
                    <form className="new-store-form" onSubmit={handleStoreSubmit}>
                        <h3>Create New Store</h3>
                        <input
                            type="text"
                            placeholder="Store Name"
                            value={newStore.name}
                            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={newStore.description}
                            onChange={(e) => setNewStore({ ...newStore, description: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Logo URL"
                            value={newStore.logo_url}
                            onChange={(e) => setNewStore({ ...newStore, logo_url: e.target.value })}
                        />
                        <select
                            value={newStore.pricing_plan}
                            onChange={(e) => setNewStore({ ...newStore, pricing_plan: e.target.value })}
                            required
                        >
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                            <option value="Deluxe">Deluxe</option>
                        </select>
                        <button type="submit">Create Store</button>
                    </form>
                </div>

                {/* API Keys Section */}
                {selectedStore && (
                    <div className="api-keys-section">
                        <h2>API Key for {selectedStore.name}</h2>
                        {apiKeys.length > 0 ? (
                            <div className="api-key-item">
                                <p><strong>API Key:</strong> {apiKeys[0].key}</p>
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this API key?')) {
                                            handleAPIKeyDelete();
                                        }
                                    }}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ) : (
                            <p>No API key found for this store.</p>
                        )}
                        <form className="new-api-key-form" onSubmit={handleAPIKeySubmit}>
                            <h3>Generate New API Key</h3>
                            {/* No plan selection as each store can have only one API key */}
                            <button type="submit">Generate API Key</button>
                        </form>
                    </div>
                )}

                {/* Collaborators Section */}
                {selectedStore && (
                    <div className="collaborators-section">
                        <h2>Collaborators for {selectedStore.name}</h2>
                        <ul className="collaborators-list">
                            {collaborators.map(collab => (
                                <li key={collab.id} className="collaborator-item">
                                    <p><strong>Email:</strong> {collab.email}</p>
                                    <p><strong>Permission Level:</strong> {collab.permission_level}</p>
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to remove collaborator "${collab.email}"?`)) {
                                                handleCollaboratorDelete(collab.id);
                                            }
                                        }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* New Collaborator Form */}
                        <form className="new-collaborator-form" onSubmit={handleCollaboratorSubmit}>
                            <h3>Add New Collaborator</h3>
                            <input
                                type="email"
                                placeholder="Collaborator Email"
                                value={newCollaborator.email}
                                onChange={(e) => setNewCollaborator({ ...newCollaborator, email: e.target.value })}
                                required
                            />
                            <select
                                value={newCollaborator.permission_level}
                                onChange={(e) => setNewCollaborator({ ...newCollaborator, permission_level: e.target.value })}
                                required
                            >
                                <option value="read">Read</option>
                                <option value="write">Write</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button type="submit">Add Collaborator</button>
                        </form>
                    </div>
                )}
            </div>
        );
    };

    export default Dashboard;
