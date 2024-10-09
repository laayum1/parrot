// frontend/src/pages/SignInPage.jsx
import React from 'react';
import '../styles/SignInPage.css';

const SignInPage = () => {
    const handleSignIn = () => {
        window.location.href = 'http://localhost:5000/auth/discord';
    };

    return (
        <div className="signin-page">
            <h1>Sign In to Parrot</h1>
            <button onClick={handleSignIn} className="signin-btn">
                <i className="fab fa-discord"></i> Sign in with Discord
            </button>
        </div>
    );
};

export default SignInPage;
