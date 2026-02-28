import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiZap, FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './AuthPages.css';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.firstName || !form.lastName || !form.email || !form.password) {
            toast.error('Please fill in all fields');
            return;
        }
        if (form.password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }
        if (form.password !== form.confirmPassword) {
            toast.error('Passwords don\'t match');
            return;
        }
        setLoading(true);
        try {
            await register(form.email, form.password, form.firstName, form.lastName);
            toast.success('Account created! Welcome to Early Edge.');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Registration failed');
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
                <div className="auth-brand">
                    <div className="brand-content">
                        <Link to="/" className="brand-logo-link" style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '1rem' }}>
                            <div className="brand-logo">
                                <FiZap />
                            </div>
                            <h1 style={{ marginTop: '1rem' }}>Early Edge</h1>
                        </Link>
                        <p>Start your automated job application journey. Let AI find and apply to your dream jobs.</p>
                        <div className="brand-features">
                            <div className="brand-feature">
                                <span className="feature-dot" />
                                Upload resume & set preferences
                            </div>
                            <div className="brand-feature">
                                <span className="feature-dot" />
                                Link LinkedIn & Naukri accounts
                            </div>
                            <div className="brand-feature">
                                <span className="feature-dot" />
                                Sit back & watch applications roll in
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-form-panel">
                    <div className="auth-form-wrapper">
                        <div className="auth-form-header">
                            <h2>Create account</h2>
                            <p>Start applying to jobs on autopilot</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-row">
                                <div className="input-group">
                                    <label>First name</label>
                                    <div className="input-with-icon">
                                        <FiUser className="input-icon" />
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="John"
                                            value={form.firstName}
                                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Last name</label>
                                    <div className="input-with-icon">
                                        <FiUser className="input-icon" />
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="Doe"
                                            value={form.lastName}
                                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

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
                                        placeholder="Min. 8 characters"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        autoComplete="new-password"
                                    />
                                    <button type="button" className="input-toggle" onClick={() => setShowPass(!showPass)}>
                                        {showPass ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Confirm password</label>
                                <div className="input-with-icon">
                                    <FiLock className="input-icon" />
                                    <input
                                        type="password"
                                        className="input-field"
                                        placeholder="••••••••"
                                        value={form.confirmPassword}
                                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={loading}>
                                {loading ? <div className="spinner" /> : 'Create Account'}
                            </button>
                        </form>

                        <p className="auth-switch">
                            Already have an account? <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
