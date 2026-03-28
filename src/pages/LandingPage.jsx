import { Link } from 'react-router-dom';
import { FiArrowRight, FiTarget, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';
import PublicNavbar from '../components/PublicNavbar';
import Footer from '../components/Footer';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className="landing-page">
            <PublicNavbar />

            {/* Background Effects */}
            <div className="landing-bg-glow glow-1" />
            <div className="landing-bg-glow glow-2" />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="badge badge-primary hero-badge">
                        <span className="status-dot success" style={{ marginRight: '8px' }}></span>
                        Early Edge 1.0 is now live
                    </div>
                    <h1 className="hero-title">
                        Stop Ghosting.<br />
                        <span className="text-gradient">Start Working.</span>
                    </h1>
                    <p className="hero-subtitle">
                        The AI autopilot for your career. Auto-apply to thousands of jobs on LinkedIn and Naukri tailored perfectly to your skills. No fake info, zero BS.
                    </p>
                    <div className="hero-cta-group">
                        <Link to="/register" className="btn btn-primary btn-lg cta-main">
                            Launch Autopilot <FiArrowRight />
                        </Link>
                        <Link to="/about" className="btn btn-secondary btn-lg">
                            How it works
                        </Link>
                    </div>

                    {/* Social Proof */}
                    <div className="social-proof">
                        <p>Trusted by engineers landing offers at</p>
                        <div className="company-logos">
                            <span>Google</span>
                            <span>Amazon</span>
                            <span>Netflix</span>
                            <span>Stripe</span>
                            <span>OpenAI</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid / Bento */}
            <section id="features" className="features-section">
                <div className="section-header">
                    <h2>Hyper-Scale Your Reach</h2>
                    <p>We built the smartest job application engine so you don't have to fill out another form.</p>
                </div>

                <div className="bento-grid">
                    <div className="bento-card col-span-2">
                        <div className="bento-icon"><FiZap /></div>
                        <h3>AI Tailored Resumes</h3>
                        <p>Our GPT-4 powered engine dynamically rewrites your resume for every single job application to highlight the exact skills they are looking for. No hallucinations, 100% your truth.</p>
                    </div>
                    <div className="bento-card">
                        <div className="bento-icon"><FiTarget /></div>
                        <h3>Smart Matching</h3>
                        <p>Set your minimum salary, remote preference, and keywords. We only apply to what matters.</p>
                    </div>
                    <div className="bento-card">
                        <div className="bento-icon"><FiShield /></div>
                        <h3>Stealth Mode</h3>
                        <p>Advanced anti-bot detection evasion. We apply human-like delays so your LinkedIn and Naukri accounts stay safe.</p>
                    </div>
                    <div className="bento-card col-span-2 glass-accent">
                        <div className="bento-icon"><FiTrendingUp /></div>
                        <h3>Analytics Dashboard</h3>
                        <p>Track your funnel from Applied → Viewed → Shortlisted → Interview. See exactly which platforms and keywords are converting into real offers.</p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta-section">
                <div className="cta-box">
                    <h2>Ready to upgrade your career?</h2>
                    <p>Join thousands of users who put their job search on autopilot.</p>
                    <Link to="/register" className="btn btn-primary btn-lg mt-4">
                        Get Early Access <FiArrowRight />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
