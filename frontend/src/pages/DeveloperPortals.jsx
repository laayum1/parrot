// frontend/src/pages/DevelopersPage.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../styles/DevelopersPage.css';

const Documentation = () => (
    <div className="developers-page">
        <h2>Documentation</h2>
        <p>Comprehensive documentation for integrating with Parrot's API.</p>
    </div>
);

const DeveloperPortal = () => (
    <div className="developers-page">
        <h2>Developer Portal</h2>
        <p>Access your developer dashboard, manage APIs, and more.</p>
    </div>
);

const Guides = () => (
    <div className="developers-page">
        <h2>Guides</h2>
        <p>Step-by-step guides to help you get started with Parrot.</p>
    </div>
);

const DevelopersPage = () => {
    return (
        <div className="developers-container">
            <h1>Developers</h1>
            <nav className="developers-nav">
                <Link to="documentation">Documentation</Link>
                <Link to="portal">Developer Portal</Link>
                <Link to="guides">Guides</Link>
            </nav>
            <Routes>
                <Route path="documentation" element={<Documentation />} />
                <Route path="portal" element={<DeveloperPortal />} />
                <Route path="guides" element={<Guides />} />
            </Routes>
        </div>
    );
};

export default DevelopersPage;
