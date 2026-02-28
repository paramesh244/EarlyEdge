import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import PublicNavbar from '../components/PublicNavbar';
import Footer from '../components/Footer';
import './PricingPage.css';

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <div className="landing-page">
            <PublicNavbar />
            <div className="landing-bg-glow glow-1" />
            <div className="landing-bg-glow glow-2" />

            <section className="pricing-hero">
                <div className="pricing-container text-center">
                    <h1 className="hero-title">Simple, transparent <span className="text-gradient">pricing</span></h1>
                    <p className="hero-subtitle mt-4 mx-auto">
                        Invest in your career. Let AI do the heavy lifting while you focus on interviews.
                    </p>

                    <div className="billing-toggle mt-8">
                        <button
                            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
                            onClick={() => setBillingCycle('annual')}
                        >
                            Annually <span className="save-badge">Save 20%</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="pricing-cards-section">
                <div className="pricing-container">
                    <div className="pricing-grid">
                        {/* Starter Tier */}
                        <div className="pricing-card">
                            <div className="card-header">
                                <h3>Starter</h3>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">{billingCycle === 'monthly' ? '0' : '0'}</span>
                                    <span className="period">/mo</span>
                                </div>
                                <p>Perfect for trying out the platform.</p>
                            </div>
                            <div className="card-features">
                                <ul>
                                    <li><FiCheck /> 10 AI-tailored applications/month</li>
                                    <li><FiCheck /> 1 Platform connection (LinkedIn)</li>
                                    <li><FiCheck /> Basic resume parsing</li>
                                    <li><FiCheck /> Standard support</li>
                                </ul>
                            </div>
                            <button className="btn btn-secondary btn-full mt-4">Get Started Free</button>
                        </div>

                        {/* Pro Tier (Highlighted) */}
                        <div className="pricing-card popular">
                            <div className="popular-badge">Most Popular</div>
                            <div className="card-header">
                                <h3>Pro Autopilot</h3>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">{billingCycle === 'monthly' ? '29' : '23'}</span>
                                    <span className="period">/mo</span>
                                </div>
                                <p>For serious job seekers wanting maximum reach.</p>
                            </div>
                            <div className="card-features">
                                <ul>
                                    <li><FiCheck /> <strong>Unlimited</strong> AI applications</li>
                                    <li><FiCheck /> All platforms (LinkedIn, Naukri, etc)</li>
                                    <li><FiCheck /> Advanced ATS formatting</li>
                                    <li><FiCheck /> Priority queue execution</li>
                                    <li><FiCheck /> Salary negotiation scripts</li>
                                </ul>
                            </div>
                            <button className="btn btn-primary btn-full mt-4">Upgrade to Pro</button>
                        </div>

                        {/* Elite Tier */}
                        <div className="pricing-card">
                            <div className="card-header">
                                <h3>Elite</h3>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">{billingCycle === 'monthly' ? '99' : '79'}</span>
                                    <span className="period">/mo</span>
                                </div>
                                <p>White-glove service with interview coaching.</p>
                            </div>
                            <div className="card-features">
                                <ul>
                                    <li><FiCheck /> Everything in Pro</li>
                                    <li><FiCheck /> Dedicated career advisor</li>
                                    <li><FiCheck /> 4 Mock interviews/month</li>
                                    <li><FiCheck /> Resume rewrite by experts</li>
                                    <li><FiCheck /> Direct recruiter introductions</li>
                                </ul>
                            </div>
                            <button className="btn btn-secondary btn-full mt-4">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
