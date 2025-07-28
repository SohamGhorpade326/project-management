import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { register, getAllUsers, deleteUser } from '../../services/api';

const UserManagement = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Developer');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const { user: loggedInUser } = useAuth();

    const fetchUsers = async () => {
        try {
            const { data } = await getAllUsers();
            setUsers(data.filter(u => u._id !== loggedInUser._id));
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await deleteUser(userId);
                fetchUsers();
            } catch (err) {
                alert('Failed to delete user.');
                console.error(err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await register({ username, email, password, role });
            setMessage(`User '${username}' registered successfully!`);
            setUsername('');
            setEmail('');
            setPassword('');
            setRole('Developer');
            fetchUsers();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Register New Team Member</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username-reg" className="block text-sm font-medium text-gray-300">Username</label>
                            <input type="text" id="username-reg" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white" required />
                        </div>
                        <div>
                            <label htmlFor="email-reg" className="block text-sm font-medium text-gray-300">Email</label>
                            <input type="email" id="email-reg" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white" required />
                        </div>
                        <div>
                            <label htmlFor="password-reg" className="block text-sm font-medium text-gray-300">Password</label>
                            <input type="password" id="password-reg" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white" required />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-300">Role</label>
                            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white">
                                <option>Developer</option>
                                <option>Project Lead</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">Register User</button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </form>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Existing Users</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {users.map(user => (
                            <div key={user._id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded">
                                <div>
                                    <p className="text-white font-medium">{user.username} ({user.role})</p>
                                    <p className="text-xs text-gray-400">{user.email}</p>
                                </div>
                                <button onClick={() => handleDelete(user._id)} className="bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-700 transition">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;