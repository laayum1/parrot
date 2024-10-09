// frontend/src/pages/HomePage.jsx
import React from 'react';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="hero-section">
            <h1>Marketplace infrastructure for growing your platform.</h1>
            <div className="cta-buttons">
                <button className="btn get-started">Get Started</button>
                <button className="btn contact-sales">Contact Sales</button>
            </div>
            <div className="features">
                <div className="feature">
                    <h3>API Integration</h3>
                    <p>Seamlessly integrate our API to manage your products and stores.</p>
                </div>
                <div className="feature">
                    <h3>Whitelisting</h3>
                    <p>Control access to your products with our robust whitelisting functionality.</p>
                </div>
                <div className="feature">
                    <h3>Store Creation</h3>
                    <p>Easily create and manage your online store with our intuitive tools.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
