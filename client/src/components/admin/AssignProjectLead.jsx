import React, { useState, useEffect } from 'react';
import { getAllUsers, assignProjectLead } from '../../services/api';

const AssignProjectLead = ({ projectId, onAssignment }) => {
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await getAllUsers();
                setLeads(data.filter(user => user.role === 'Project Lead'));
            } catch (err) {
                console.error("Could not fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedLead) return;
        try {
            await assignProjectLead(projectId, selectedLead);
            setMessage('Project Lead assigned.');
            onAssignment();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError('Failed to assign lead.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Assign Project Lead</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="lead" className="block text-sm font-medium text-gray-700">Select Project Lead</label>
                <select id="lead" value={selectedLead} onChange={(e) => setSelectedLead(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm">
                    <option value="">-- Select a lead --</option>
                    {leads.map(user => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
                <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition">
                    Assign Lead
                </button>
                {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default AssignProjectLead;