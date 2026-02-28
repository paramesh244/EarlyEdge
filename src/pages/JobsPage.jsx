import { useState, useEffect } from 'react';
import { jobsAPI } from '../services/api';
import { FiMapPin, FiUsers, FiExternalLink, FiClock, FiX, FiWifi, FiFileText } from 'react-icons/fi';
import './JobsPage.css';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        setLoading(true);
        jobsAPI.getAll(page, 20).then((res) => {
            const jobData = Array.isArray(res) ? res : (res?.data || []);
            setJobs(jobData);
            setMeta(res?.meta || { total: jobData.length, page: 1, totalPages: 1 });
        }).catch(() => {
            setJobs([]);
        }).finally(() => setLoading(false));
    }, [page]);

    const timeAgo = (dateStr) => {
        const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    if (loading) {
        return <div className="loading-page"><div className="spinner spinner-lg" /></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Discovered Jobs</h1>
                <p>{meta.total} jobs found by the auto-apply engine</p>
            </div>

            {jobs.length === 0 ? (
                <div className="glass-card empty-state">
                    <div className="empty-state-icon"><FiFileText /></div>
                    <h3>No jobs discovered yet</h3>
                    <p>Jobs will appear here as the engine scrapes LinkedIn and Naukri</p>
                </div>
            ) : (
                <div className="jobs-grid">
                    {jobs.map((job) => (
                        <div key={job.id} className="glass-card job-card interactive" onClick={() => setSelectedJob(job)}>
                            <div className="job-card-header">
                                <div className={`job-platform-badge ${job.platform}`}>
                                    {job.platform === 'linkedin' ? 'Li' : 'Nk'}
                                </div>
                                <div className="job-card-title">
                                    <h4>{job.title}</h4>
                                    <span className="text-sm text-secondary">{job.company}</span>
                                </div>
                            </div>

                            <div className="job-card-meta">
                                <span className="job-meta-item"><FiMapPin /> {job.location}</span>
                                <span className="job-meta-item"><FiUsers /> {job.applicantCount} applicants</span>
                                <span className="job-meta-item"><FiClock /> {timeAgo(job.postedAt)}</span>
                            </div>

                            <div className="job-card-tags">
                                {job.isRemote && (
                                    <span className="badge badge-success"><FiWifi /> Remote</span>
                                )}
                                <span className="badge badge-neutral">{job.jobType}</span>
                                {job.salary && <span className="badge badge-info">{job.salary}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {meta.totalPages > 1 && (
                <div className="pagination">
                    <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
                    {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => {
                        const p = i + 1;
                        return <button key={p} className={page === p ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>;
                    })}
                    <button disabled={page >= meta.totalPages} onClick={() => setPage(page + 1)}>Next</button>
                </div>
            )}

            {/* Job Detail Modal */}
            {selectedJob && (
                <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
                    <div className="modal-content job-detail-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedJob.title}</h2>
                            <button className="modal-close" onClick={() => setSelectedJob(null)}><FiX /></button>
                        </div>
                        <div className="job-detail-body">
                            <div className="job-detail-company">{selectedJob.company}</div>
                            <div className="job-detail-meta-grid">
                                <div className="job-detail-meta-item">
                                    <FiMapPin />
                                    <span>{selectedJob.location}</span>
                                </div>
                                <div className="job-detail-meta-item">
                                    <FiUsers />
                                    <span>{selectedJob.applicantCount} applicants</span>
                                </div>
                                <div className="job-detail-meta-item">
                                    <FiClock />
                                    <span>Posted {timeAgo(selectedJob.postedAt)}</span>
                                </div>
                            </div>

                            <div className="job-detail-tags">
                                {selectedJob.isRemote && <span className="badge badge-success"><FiWifi /> Remote</span>}
                                <span className="badge badge-neutral">{selectedJob.jobType}</span>
                                {selectedJob.salary && <span className="badge badge-info">{selectedJob.salary}</span>}
                                <span className={`badge badge-${selectedJob.platform === 'linkedin' ? 'primary' : 'info'}`}>{selectedJob.platform}</span>
                            </div>

                            <div className="job-detail-description">
                                <h4>Job Description</h4>
                                <pre className="job-description-text">{selectedJob.description}</pre>
                            </div>

                            <a
                                href={selectedJob.jobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-lg btn-full"
                            >
                                <FiExternalLink /> View on {selectedJob.platform === 'linkedin' ? 'LinkedIn' : 'Naukri'}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
