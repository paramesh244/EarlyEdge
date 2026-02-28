import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    FiHome, FiUser, FiZap, FiSettings, FiBriefcase,
    FiFileText, FiLink, FiLogOut, FiMenu, FiX, FiChevronLeft
} from 'react-icons/fi';
import './AppLayout.css';

const NAV_ITEMS = [
    { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/applications', icon: FiBriefcase, label: 'Applications' },
    { to: '/jobs', icon: FiFileText, label: 'Jobs' },
    { to: '/skills', icon: FiZap, label: 'Skills' },
    { to: '/preferences', icon: FiSettings, label: 'Preferences' },
    { to: '/platforms', icon: FiLink, label: 'Platforms' },
    { to: '/profile', icon: FiUser, label: 'Profile' },
];

export default function AppLayout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close mobile nav on route change
    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    const initials = user
        ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
        : 'EE';

    return (
        <div className={`app-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Sidebar — Desktop */}
            <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <div className="logo-icon">
                            <FiZap />
                        </div>
                        {!collapsed && <span className="logo-text">Early Edge</span>}
                    </div>
                    <button
                        className="sidebar-collapse-btn desktop-only"
                        onClick={() => setCollapsed(!collapsed)}
                        aria-label="Toggle sidebar"
                    >
                        <FiChevronLeft />
                    </button>
                    <button
                        className="sidebar-collapse-btn mobile-only"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        <FiX />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon className="nav-icon" />
                            {!collapsed && <span className="nav-label">{label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-card">
                        <div className="user-avatar">{initials}</div>
                        {!collapsed && (
                            <div className="user-info">
                                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                                <span className="user-email">{user?.email}</span>
                            </div>
                        )}
                    </div>
                    <button className="nav-item logout-btn" onClick={logout}>
                        <FiLogOut className="nav-icon" />
                        {!collapsed && <span className="nav-label">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

            {/* Main content */}
            <main className="main-content">
                <header className="topbar">
                    <button className="topbar-menu mobile-only" onClick={() => setMobileOpen(true)}>
                        <FiMenu />
                    </button>
                    <div className="topbar-title">
                        {NAV_ITEMS.find((n) => location.pathname.startsWith(n.to))?.label || 'Early Edge'}
                    </div>
                    <div className="topbar-right">
                        <div className="topbar-avatar">{initials}</div>
                    </div>
                </header>
                <div className="main-scroll">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="mobile-nav">
                {NAV_ITEMS.slice(0, 5).map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Icon />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
