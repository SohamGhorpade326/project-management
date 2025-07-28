import React, { useState } from 'react';
import { uploadDocument } from '../../services/api';

const UploadDocument = ({ projectId, onUpload }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('document', file);

        try {
            await uploadDocument(projectId, formData); //
            setMessage('Document uploaded successfully.');
            onUpload(); // Refresh project data
            setFile(null);
            e.target.reset(); // Clear the file input
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError('File upload failed.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Upload Document</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Select File</label>
                <input id="file-upload" name="file-upload" type="file" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                <button type="submit" className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">Upload</button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default UploadDocument;