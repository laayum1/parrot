// frontend/src/pages/ResourcesPage.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../styles/ResourcesPage.css';

const Terms = () => (
    <div className="resources-page">
        <h2>Terms of Service</h2>
        <p>Our terms of service details...</p>
    </div>
);

const Privacy = () => (
    <div className="resources-page">
        <h2>Privacy Policy</h2>
        <p>Our privacy policy details...</p>
    </div>
);

const Downloads = () => (
    <div className="resources-page">
        <h2>Downloads</h2>
        <p>Available downloads...</p>
    </div>
);

const Blog = () => (
    <div className="resources-page">
        <h2>Blog</h2>
        <p>Latest blog posts...</p>
    </div>
);

const ResourcesPage = () => {
    return (
        <div className="resources-container">
            <h1>Resources</h1>
            <nav className="resources-nav">
                <Link to="terms">Terms of Service</Link>
                <Link to="privacy">Privacy Policy</Link>
                <Link to="downloads">Downloads</Link>
                <Link to="blog">Blog</Link>
            </nav>
            <Routes>
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="downloads" element={<Downloads />} />
                <Route path="blog" element={<Blog />} />
            </Routes>
        </div>
    );
};

export default ResourcesPage;
