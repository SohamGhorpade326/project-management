import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, markProjectAsCompleted, deleteDocument, unassignDeveloper, unassignProjectLead } from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
import AssignDeveloper from '../components/project_lead/AssignDeveloper';
import UploadDocument from '../components/project_lead/UploadDocument';
import AssignProjectLead from '../components/admin/AssignProjectLead';

const ProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProject = async () => {
        setLoading(true);
        try {
            const { data } = await getProjectById(id);
            setProject(data);
        } catch (error) {
            console.error("Failed to fetch project", error);
            setProject(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProject();
    }, [id]);

    const handleMarkComplete = async () => {
        if (window.confirm("Are you sure you want to mark this project as complete?")) {
            try {
                await markProjectAsCompleted(id);
                fetchProject();
            } catch (err) {
                alert("Failed to update project status.");
            }
        }
    };
    
    const handleDocumentDelete = async (docId) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            try {
                await deleteDocument(project._id, docId);
                fetchProject();
            } catch (err) {
                alert('Failed to delete document.');
            }
        }
    };

    const handleUnassignDev = async (devId) => {
        if (window.confirm('Are you sure you want to unassign this developer?')) {
            try {
                await unassignDeveloper(project._id, devId);
                fetchProject();
            } catch (err) {
                alert('Failed to unassign developer.');
            }
        }
    };

    const handleUnassignLead = async () => {
        if (window.confirm('Are you sure you want to unassign the Project Lead?')) {
            try {
                await unassignProjectLead(project._id);
                fetchProject();
            } catch (err) {
                alert('Failed to unassign Project Lead.');
            }
        }
    };

    if (loading) return <p className="text-center mt-8">Loading project...</p>;
    if (!project) return <p className="text-center mt-8 font-bold text-red-500">Project not found.</p>;

    const canManage = user.role === 'Admin' || (user.role === 'Project Lead' && project.projectLead?._id === user._id);

    return (
        <div className="bg-gray-800 border border-gray-700 p-6 sm:p-8 rounded-xl shadow-2xl space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                    <p className="text-gray-400 mt-1">Due by {new Date(project.deadline).toLocaleDateString()}</p>
                </div>
                <span className={`px-4 py-1.5 text-sm font-medium rounded-full ${project.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>{project.status}</span>
            </div>
            
            <p className="text-gray-300">{project.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-700 pt-6">
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-white">Assigned Team</h2>
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-sm text-gray-300">
                            <strong>Lead:</strong> {project.projectLead?.username || 'N/A'}
                        </p>
                        {user.role === 'Admin' && project.projectLead && (
                            <button onClick={handleUnassignLead} className="text-red-500 hover:text-red-400 text-xs font-semibold">
                                Unassign
                            </button>
                        )}
                    </div>
                    {project.team.length > 0 ? (
                        <ul className="space-y-2">
                            {project.team.map(member => (
                                <li key={member._id} className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md text-gray-300">
                                    {member.username}
                                    {canManage && (
                                        <button onClick={() => handleUnassignDev(member._id)} className="text-red-500 hover:text-red-400 text-xs font-semibold">
                                            Unassign
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-gray-400">No developers assigned yet.</p>}
                </div>
                <div>
                     <h2 className="text-xl font-semibold mb-3 text-white">Project Documents</h2>
                     {project.documents.length > 0 ? (
                        <ul className="space-y-2">
                            {project.documents.map(doc => (
                                <li key={doc._id} className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
                                    <a href={`http://localhost:5001/${doc.filePath}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{doc.fileName}</a>
                                    {canManage && (
                                        <button onClick={() => handleDocumentDelete(doc._id)} className="text-red-500 hover:text-red-400 text-xs font-semibold ml-4">
                                            DELETE
                                        </button>
                                    )}
                                </li>
                             ))}
                        </ul>
                     ) : <p className="text-gray-400">No documents uploaded.</p>}
                </div>
            </div>

            {canManage && (
                <div className="border-t border-gray-700 pt-6">
                    <h2 className="text-xl font-semibold mb-4 text-white">Management Controls</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user.role === 'Admin' && <AssignProjectLead projectId={project._id} onAssignment={fetchProject} />}
                        <AssignDeveloper projectId={project._id} onAssignment={fetchProject} />
                        <UploadDocument projectId={project._id} onUpload={fetchProject} />
                        {user.role === 'Admin' && project.status === 'Active' && (
                             <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                                <h3 className="text-xl font-semibold mb-4 text-white">Project Status</h3>
                                <button onClick={handleMarkComplete} className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition">Mark as "Completed"</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default ProjectPage;