import PublicNavbar from '../components/PublicNavbar';
import Footer from '../components/Footer';
import './AboutPage.css';

export default function AboutPage() {
    return (
        <div className="landing-page">
            <PublicNavbar />

            <div className="landing-bg-glow glow-1" style={{ background: 'var(--accent-secondary)', opacity: 0.3 }} />

            <section className="about-hero">
                <div className="about-container">
                    <div className="badge badge-info hero-badge mb-4">Our Mission</div>
                    <h1 className="hero-title">
                        Leveling the <span className="text-gradient">Playing Field</span>
                    </h1>
                    <p className="hero-subtitle mt-4">
                        We believe that the best talent shouldn't be lost in the resume black hole. Early Edge was built to democratize the job application process using next-generation AI.
                    </p>
                </div>
            </section>

            <section className="about-content-section">
                <div className="about-container">
                    <div className="content-grid">
                        <div className="content-text">
                            <h2>The Problem: The System is Broken</h2>
                            <p>
                                In today's hyper-competitive market, applying to jobs is a full-time job. Recruiters use ATS (Applicant Tracking Systems) to filter out 90% of resumes before a human ever sees them. Freshers are sending thousands of applications and getting ghosted just because they didn't include the exact buzzwords the ATS wanted.
                            </p>

                            <h2 style={{ marginTop: '2rem' }}>Our Solution: Fight Fire with Fire</h2>
                            <p>
                                If platforms use bots to reject you, use bots to apply. Early Edge is your personal AI agent. We securely link to your LinkedIn and Naukri accounts. Our engine finds jobs matching your preferences, uses GPT-4 to dynamically tailor your resume to the specific job description (without inventing fake experience), and applies on your behalf while you sleep.
                            </p>
                        </div>

                        <div className="content-stats">
                            <div className="stat-box">
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">Automated Applying</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-number">50+</div>
                                <div className="stat-label">Filters & Preferences</div>
                            </div>
                            <div className="stat-box glass-accent">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Truthful Resumes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
