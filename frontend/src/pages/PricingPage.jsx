// frontend/src/pages/PricingPage.jsx
import React, { useState } from 'react';
import '../styles/PricingPage.css';

const PricingPage = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            name: 'Standard',
            price: 'Free',
            features: [
                'Max 35 products',
                'Roblox Hub',
                'No API or Whitelist Access',
            ],
        },
        {
            name: 'Premium',
            price: '$4.99 one-time',
            features: [
                'Max 100 products',
                'Whitelist for 25 products',
                'Limited API access',
                'Webpage with limited customization',
            ],
        },
        {
            name: 'Deluxe',
            price: '$9.99 one-time',
            features: [
                'Unlimited products',
                'Full API access',
                'Full Webpage customization',
                '50 whitelisted products',
            ],
        },
    ];

    const handleSelect = (planName) => {
        setSelectedPlan(planName);
        // Implement further actions, such as redirecting to payment or signup
    };

    return (
        <div className="pricing-page">
            <h1>Pricing Plans</h1>
            <div className="pricing-cards">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`card ${selectedPlan === plan.name ? 'selected' : ''}`}
                        onClick={() => handleSelect(plan.name)}
                    >
                        <h2>{plan.name}</h2>
                        <p className="price">{plan.price}</p>
                        <ul>
                            {plan.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        <button className="select-btn">
                            {selectedPlan === plan.name ? 'Selected' : 'Choose Plan'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingPage;
