import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
    FiBriefcase, FiTrendingUp, FiCalendar, FiClock,
    FiExternalLink, FiCheckCircle, FiEye, FiStar,
    FiXCircle, FiMessageSquare, FiGift, FiUser, FiZap, FiLink
} from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './DashboardPage.css';

const STATUS_CONFIG = {
    applied: { color: '#6366f1', icon: FiBriefcase, label: 'Applied' },
    viewed: { color: '#3b82f6', icon: FiEye, label: 'Viewed' },
    shortlisted: { color: '#22c55e', icon: FiStar, label: 'Shortlisted' },
    rejected: { color: '#ef4444', icon: FiXCircle, label: 'Rejected' },
    interview: { color: '#f59e0b', icon: FiMessageSquare, label: 'Interview' },
    offered: { color: '#06b6d4', icon: FiGift, label: 'Offered' },
};

export default function DashboardPage() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardAPI.get().then(setData).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="loading-page"><div className="spinner spinner-lg" /></div>;
    }

    if (!data) return null;

    // Defensive defaults for different API response shapes
    const stats = data.stats || {};
    const platformAccounts = data.platformAccounts || data.platformStatus || [];
    const recentApplications = data.recentApplications || [];
    const profile = data.profile || { hasResume: false, skillsCount: 0, preferencesCount: 0, connectedAccounts: 0 };

    const byStatus = stats.byStatus || {};
    const pieData = Object.entries(byStatus)
        .filter(([key, v]) => v > 0 && STATUS_CONFIG[key])
        .map(([key, value]) => ({
            name: STATUS_CONFIG[key].label,
            value,
            color: STATUS_CONFIG[key].color,
        }));

    const completionItems = [
        { label: 'Resume', done: !!profile.hasResume },
        { label: 'Skills', done: (profile.skillsCount || 0) > 0 },
        { label: 'Preferences', done: (profile.preferencesCount || 0) > 0 },
        { label: 'Platforms', done: (profile.connectedAccounts || 0) > 0 },
    ];
    const completionPercent = Math.round((completionItems.filter((i) => i.done).length / completionItems.length) * 100);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Welcome back, {user?.firstName} 👋</h1>
                <p>Here's your application overview</p>
            </div>

            {/* Stats Cards */}
            <div className="grid-4 dash-stats">
                <div className="glass-card stat-card">
                    <div className="stat-icon total"><FiBriefcase /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.totalApplications}</span>
                        <span className="stat-label">Total Applications</span>
                    </div>
                </div>
                <div className="glass-card stat-card">
                    <div className="stat-icon today"><FiClock /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.todayApplications}</span>
                        <span className="stat-label">Today</span>
                    </div>
                </div>
                <div className="glass-card stat-card">
                    <div className="stat-icon week"><FiCalendar /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.weekApplications}</span>
                        <span className="stat-label">This Week</span>
                    </div>
                </div>
                <div className="glass-card stat-card">
                    <div className="stat-icon month"><FiTrendingUp /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.monthApplications}</span>
                        <span className="stat-label">This Month</span>
                    </div>
                </div>
            </div>

            {/* Middle Row: Chart + Profile */}
            <div className="dash-mid-row">
                {/* Status Breakdown */}
                <div className="glass-card dash-chart-card">
                    <h3>Application Status</h3>
                    {pieData.length > 0 ? (
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={85}
                                        paddingAngle={3}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--border-default)',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '0.8125rem',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="chart-legend">
                                {pieData.map((entry) => (
                                    <div key={entry.name} className="legend-item">
                                        <span className="legend-dot" style={{ background: entry.color }} />
                                        <span className="legend-label">{entry.name}</span>
                                        <span className="legend-value">{entry.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No applications yet</p>
                        </div>
                    )}
                </div>

                {/* Profile Completion */}
                <div className="glass-card dash-profile-card">
                    <h3>Profile Completion</h3>
                    <div className="completion-ring-container">
                        <svg className="completion-ring" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
                            <circle
                                cx="60" cy="60" r="50" fill="none"
                                stroke="url(#completionGrad)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${completionPercent * 3.14} ${(100 - completionPercent) * 3.14}`}
                                transform="rotate(-90 60 60)"
                            />
                            <defs>
                                <linearGradient id="completionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                            <text x="60" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="24" fontWeight="700">{completionPercent}%</text>
                            <text x="60" y="74" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">complete</text>
                        </svg>
                    </div>
                    <div className="completion-items">
                        {completionItems.map((item) => (
                            <div key={item.label} className={`completion-item ${item.done ? 'done' : ''}`}>
                                <FiCheckCircle />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Platform Status */}
            <div className="dash-section">
                <h3>Platform Accounts</h3>
                <div className="grid-2">
                    {platformAccounts.map((acc) => (
                        <div key={acc.id} className="glass-card platform-card">
                            <div className="platform-card-header">
                                <div className={`platform-logo ${acc.platform}`}>
                                    <FiLink />
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'capitalize' }}>{acc.platform}</h4>
                                    <span className="text-xs text-tertiary">
                                        Last active: {new Date(acc.lastActiveAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className={`badge badge-${acc.status === 'active' ? 'success' : acc.status === 'paused' ? 'warning' : 'error'}`}>
                                <span className={`status-dot ${acc.status}`} />
                                {acc.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Applications */}
            <div className="dash-section">
                <h3>Recent Applications</h3>
                <div className="glass-card recent-apps-card">
                    {recentApplications.map((app) => {
                        const statusConf = STATUS_CONFIG[app.status];
                        return (
                            <div key={app.id} className="recent-app-row">
                                <div className="recent-app-info">
                                    <span className="recent-app-title">{app.job.title}</span>
                                    <span className="text-sm text-secondary">{app.job.company} · {app.job.platform}</span>
                                </div>
                                <div className="recent-app-meta">
                                    <span className={`badge badge-${app.status === 'applied' ? 'primary' : app.status === 'viewed' ? 'info' : app.status === 'shortlisted' ? 'success' : app.status === 'interview' ? 'warning' : app.status === 'rejected' ? 'error' : 'neutral'}`}>
                                        {statusConf.label}
                                    </span>
                                    <span className="text-xs text-tertiary">
                                        {new Date(app.appliedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
