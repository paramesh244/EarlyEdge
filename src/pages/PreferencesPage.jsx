import { useState, useEffect } from 'react';
import { preferencesAPI } from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiMapPin, FiDollarSign, FiSettings } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './PreferencesPage.css';

const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'];

export default function PreferencesPage() {
    const [preferences, setPreferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        role: '', keywords: [], location: '', remote: false,
        minSalary: '', maxSalary: '', jobType: 'full-time',
    });
    const [keywordInput, setKeywordInput] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        preferencesAPI.getAll().then(setPreferences).finally(() => setLoading(false));
    }, []);

    const openAdd = () => {
        setEditing(null);
        setForm({ role: '', keywords: [], location: '', remote: false, minSalary: '', maxSalary: '', jobType: 'full-time' });
        setKeywordInput('');
        setModalOpen(true);
    };

    const openEdit = (pref) => {
        setEditing(pref);
        setForm({
            role: pref.role, keywords: pref.keywords || [], location: pref.location,
            remote: pref.remote, minSalary: pref.minSalary, maxSalary: pref.maxSalary,
            jobType: pref.jobType,
        });
        setKeywordInput('');
        setModalOpen(true);
    };

    const addKeyword = () => {
        const kw = keywordInput.trim();
        if (kw && !form.keywords.includes(kw)) {
            setForm({ ...form, keywords: [...form.keywords, kw] });
        }
        setKeywordInput('');
    };

    const removeKeyword = (kw) => {
        setForm({ ...form, keywords: form.keywords.filter((k) => k !== kw) });
    };

    const handleSave = async () => {
        if (!form.role.trim()) {
            toast.error('Please enter a role');
            return;
        }
        setSaving(true);
        try {
            const payload = {
                ...form,
                minSalary: Number(form.minSalary) || 0,
                maxSalary: Number(form.maxSalary) || 0,
            };
            if (editing) {
                const updated = await preferencesAPI.update(editing.id, payload);
                setPreferences(preferences.map((p) => (p.id === editing.id ? updated : p)));
                toast.success('Preference updated!');
            } else {
                const created = await preferencesAPI.create(payload);
                setPreferences([...preferences, created]);
                toast.success('Preference added!');
            }
            setModalOpen(false);
        } catch {
            toast.error('Failed to save preference');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await preferencesAPI.delete(id);
            setPreferences(preferences.filter((p) => p.id !== id));
            toast.success('Preference deleted');
        } catch {
            toast.error('Failed to delete');
        }
    };

    const toggleActive = async (pref) => {
        try {
            const updated = await preferencesAPI.update(pref.id, { isActive: !pref.isActive });
            setPreferences(preferences.map((p) => (p.id === pref.id ? updated : p)));
        } catch {
            toast.error('Failed to update');
        }
    };

    if (loading) {
        return <div className="loading-page"><div className="spinner spinner-lg" /></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-row">
                    <div>
                        <h1>Job Preferences</h1>
                        <p>Configure the types of jobs you want to auto-apply for</p>
                    </div>
                    <button className="btn btn-primary" onClick={openAdd}>
                        <FiPlus /> Add Preference
                    </button>
                </div>
            </div>

            {preferences.length === 0 ? (
                <div className="glass-card empty-state">
                    <div className="empty-state-icon"><FiSettings /></div>
                    <h3>No preferences set</h3>
                    <p>Define your ideal job roles, locations, and salary ranges</p>
                    <button className="btn btn-primary" onClick={openAdd} style={{ marginTop: '16px' }}>
                        <FiPlus /> Add First Preference
                    </button>
                </div>
            ) : (
                <div className="pref-list">
                    {preferences.map((pref) => (
                        <div key={pref.id} className={`glass-card pref-card ${!pref.isActive ? 'inactive' : ''}`}>
                            <div className="pref-card-header">
                                <div>
                                    <h3>{pref.role}</h3>
                                    <div className="pref-meta">
                                        <span className="pref-meta-item"><FiMapPin /> {pref.location}</span>
                                        <span className="pref-meta-item"><FiDollarSign /> ${(pref.minSalary / 1000).toFixed(0)}k – ${(pref.maxSalary / 1000).toFixed(0)}k</span>
                                        <span className={`badge badge-${pref.remote ? 'success' : 'neutral'}`}>
                                            {pref.remote ? 'Remote' : 'On-site'}
                                        </span>
                                        <span className="badge badge-neutral">{pref.jobType}</span>
                                    </div>
                                </div>
                                <div className="pref-card-actions">
                                    <div className={`toggle ${pref.isActive ? 'active' : ''}`} onClick={() => toggleActive(pref)} />
                                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(pref)}><FiEdit2 /></button>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(pref.id)}><FiTrash2 /></button>
                                </div>
                            </div>
                            {pref.keywords?.length > 0 && (
                                <div className="pref-keywords">
                                    {pref.keywords.map((kw) => (
                                        <span key={kw} className="tag">{kw}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editing ? 'Edit Preference' : 'Add Preference'}</h2>
                            <button className="modal-close" onClick={() => setModalOpen(false)}><FiX /></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <label>Role</label>
                                <input type="text" className="input-field" placeholder="Senior Software Engineer"
                                    value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} autoFocus />
                            </div>
                            <div className="input-group">
                                <label>Keywords</label>
                                <div className="keyword-input-row">
                                    <input type="text" className="input-field" placeholder="Type and press Enter"
                                        value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); } }} />
                                    <button className="btn btn-secondary" type="button" onClick={addKeyword}>Add</button>
                                </div>
                                {form.keywords.length > 0 && (
                                    <div className="keyword-tags">
                                        {form.keywords.map((kw) => (
                                            <span key={kw} className="tag">{kw} <span className="tag-remove" onClick={() => removeKeyword(kw)}>×</span></span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="input-group">
                                <label>Location</label>
                                <input type="text" className="input-field" placeholder="San Francisco, CA"
                                    value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                            </div>
                            <div className="form-row-2">
                                <div className="input-group">
                                    <label>Min Salary ($)</label>
                                    <input type="number" className="input-field" placeholder="120000"
                                        value={form.minSalary} onChange={(e) => setForm({ ...form, minSalary: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Max Salary ($)</label>
                                    <input type="number" className="input-field" placeholder="200000"
                                        value={form.maxSalary} onChange={(e) => setForm({ ...form, maxSalary: e.target.value })} />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Job Type</label>
                                <select className="input-field" value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })}>
                                    {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={form.remote} onChange={(e) => setForm({ ...form, remote: e.target.checked })} />
                                <span>Allow remote positions</span>
                            </label>
                        </div>
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                                {saving ? <div className="spinner" /> : editing ? 'Update' : 'Add Preference'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
