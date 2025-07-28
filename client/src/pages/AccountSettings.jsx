import React, { useState } from 'react';
import { updateUserPassword } from '../services/api';

const AccountSettings = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            await updateUserPassword({ password }); //
            setMessage("Password updated successfully!");
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError("Failed to update password.");
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700">Update Password</h2>
                <div>
                    <label htmlFor="new-password"className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" id="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                 <div>
                    <label htmlFor="confirm-password"className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Update Password</button>
            </form>
        </div>
    );
};

export default AccountSettings;