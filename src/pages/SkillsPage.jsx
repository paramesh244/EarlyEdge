import { useState, useEffect } from 'react';
import { skillsAPI } from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './SkillsPage.css';

const PROFICIENCY_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'];
const PROFICIENCY_COLORS = {
    beginner: 'neutral',
    intermediate: 'info',
    advanced: 'primary',
    expert: 'success',
};

export default function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [form, setForm] = useState({ name: '', proficiency: 'intermediate' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        skillsAPI.getAll().then(setSkills).finally(() => setLoading(false));
    }, []);

    const openAddModal = () => {
        setEditingSkill(null);
        setForm({ name: '', proficiency: 'intermediate' });
        setModalOpen(true);
    };

    const openEditModal = (skill) => {
        setEditingSkill(skill);
        setForm({ name: skill.name, proficiency: skill.proficiency });
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (!form.name.trim()) {
            toast.error('Please enter a skill name');
            return;
        }
        setSaving(true);
        try {
            if (editingSkill) {
                const updated = await skillsAPI.update(editingSkill.id, form);
                setSkills(skills.map((s) => (s.id === editingSkill.id ? updated : s)));
                toast.success('Skill updated!');
            } else {
                const created = await skillsAPI.create(form);
                setSkills([...skills, created]);
                toast.success('Skill added!');
            }
            setModalOpen(false);
        } catch {
            toast.error('Failed to save skill');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await skillsAPI.delete(id);
            setSkills(skills.filter((s) => s.id !== id));
            toast.success('Skill deleted');
        } catch {
            toast.error('Failed to delete');
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
                        <h1>Skills</h1>
                        <p>Manage your skills and proficiency levels</p>
                    </div>
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <FiPlus /> Add Skill
                    </button>
                </div>
            </div>

            {skills.length === 0 ? (
                <div className="glass-card empty-state">
                    <div className="empty-state-icon"><FiZap /></div>
                    <h3>No skills added yet</h3>
                    <p>Add your technical skills to help match you with the right jobs</p>
                    <button className="btn btn-primary" onClick={openAddModal} style={{ marginTop: '16px' }}>
                        <FiPlus /> Add Your First Skill
                    </button>
                </div>
            ) : (
                <div className="skills-grid">
                    {skills.map((skill) => (
                        <div key={skill.id} className="glass-card skill-card interactive">
                            <div className="skill-card-top">
                                <h4>{skill.name}</h4>
                                <div className="skill-actions">
                                    <button className="btn btn-ghost btn-sm" onClick={() => openEditModal(skill)}>
                                        <FiEdit2 />
                                    </button>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(skill.id)}>
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                            <span className={`badge badge-${PROFICIENCY_COLORS[skill.proficiency]}`}>
                                {skill.proficiency}
                            </span>
                            <div className="skill-bar-track">
                                <div
                                    className="skill-bar-fill"
                                    style={{
                                        width: `${PROFICIENCY_LEVELS.indexOf(skill.proficiency) / 3 * 100}%`,
                                        background: `var(--gradient-primary)`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingSkill ? 'Edit Skill' : 'Add Skill'}</h2>
                            <button className="modal-close" onClick={() => setModalOpen(false)}><FiX /></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <label>Skill Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. React, Python, AWS"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    autoFocus
                                />
                            </div>
                            <div className="input-group">
                                <label>Proficiency</label>
                                <div className="proficiency-selector">
                                    {PROFICIENCY_LEVELS.map((level) => (
                                        <button
                                            key={level}
                                            className={`proficiency-option ${form.proficiency === level ? 'active' : ''}`}
                                            onClick={() => setForm({ ...form, proficiency: level })}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                                {saving ? <div className="spinner" /> : editingSkill ? 'Update' : 'Add Skill'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
