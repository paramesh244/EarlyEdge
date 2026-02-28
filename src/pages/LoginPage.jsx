import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiZap, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './AuthPages.css';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error('Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            await login(form.email, form.password);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="aurora aurora-1" />
                <div className="aurora aurora-2" />
                <div className="aurora aurora-3" />
            </div>

            <div className="auth-container">
                {/* Left Brand Panel */}
                <div className="auth-brand">
                    <div className="brand-content">
                        <Link to="/" className="brand-logo-link" style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '1rem' }}>
                            <div className="brand-logo">
                                <FiZap />
                            </div>
                            <h1 style={{ marginTop: '1rem' }}>Early Edge</h1>
                        </Link>
                        <p>Your AI-powered job application autopilot. Apply to the right jobs while you sleep.</p>
                        <div className="brand-features">
                            <div className="brand-feature">
                                <span className="feature-dot" />
                                AI-tailored resumes for each job
                            </div>
                            <div className="brand-feature">
                                <span className="feature-dot" />
                                Auto-apply on LinkedIn & Naukri
                            </div>
                            <div className="brand-feature">
                                <span className="feature-dot" />
                                Smart job matching (50+ filters)
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="auth-form-panel">
                    <div className="auth-form-wrapper">
                        <div className="auth-form-header">
                            <h2>Welcome back</h2>
                            <p>Sign in to continue your job hunt</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="input-group">
                                <label>Email</label>
                                <div className="input-with-icon">
                                    <FiMail className="input-icon" />
                                    <input
                                        type="email"
                                        className="input-field"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <div className="input-with-icon">
                                    <FiLock className="input-icon" />
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        className="input-field"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="input-toggle"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={loading}>
                                {loading ? <div className="spinner" /> : 'Sign In'}
                            </button>
                        </form>

                        <p className="auth-switch">
                            Don't have an account? <Link to="/register">Create one</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
