import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { deleteProject } from '../../services/api';

const ProjectList = ({ projects, onUpdate }) => {
    const { user } = useAuth();

    const handleDelete = async (projectId) => {
        if(window.confirm('Are you sure you want to delete this entire project? This action cannot be undone.')) {
            try {
                await deleteProject(projectId);
                onUpdate();
            } catch (err) {
                alert('Failed to delete project.');
                console.error(err);
            }
        }
    };

    if (!projects || projects.length === 0) {
        return <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow text-center text-gray-400">No projects to display.</div>;
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow">
          <ul className="divide-y divide-gray-700">
            {projects.map((project) => (
              <li key={project._id} className="p-4 hover:bg-gray-700/50 flex justify-between items-center group">
                <div className="flex-1">
                    <Link to={`/project/${project._id}`} className="text-lg font-semibold text-blue-400 hover:underline">
                        {project.name}
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                    <span className={`flex-shrink-0 px-3 py-1 text-xs font-medium rounded-full ${project.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
                        {project.status}
                    </span>
                    {user.role === 'Admin' && (
                        <button onClick={() => handleDelete(project._id)} className="bg-red-600 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 hover:bg-red-700 transition">
                            Delete
                        </button>
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>
    );
};

export default ProjectList;