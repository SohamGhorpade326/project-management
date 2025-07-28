import React, { useState, useEffect } from 'react';
import { getAllUsers, assignDeveloperToProject } from '../../services/api';

const AssignDeveloper = ({ projectId, onAssignment }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await getAllUsers();
                // Filter for only developers to assign
                setUsers(data.filter(user => user.role === 'Developer'));
            } catch (err) {
                console.error("Could not fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!selectedUser) {
            setError('Please select a developer.');
            return;
        }
        try {
            await assignDeveloperToProject(projectId, selectedUser); //
            setMessage('Developer assigned successfully.');
            onAssignment(); // Refresh project data
            setSelectedUser('');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError('Failed to assign developer.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Assign Developer</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="developer" className="block text-sm font-medium text-gray-700">Select Developer</label>
                <select id="developer" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm">
                    <option value="">-- Select a developer --</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
                <button type="submit" className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">Assign to Project</button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default AssignDeveloper;