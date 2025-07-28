import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' });

API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
    }
    return req;
});

// Auth
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Users
export const getAllUsers = () => API.get('/users');
export const updateUserPassword = (passwordData) => API.put('/users/profile', passwordData);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Projects
export const getProjects = () => API.get('/projects');
export const getProjectById = (id) => API.get(`/projects/${id}`);
export const addProject = (projectData) => API.post('/projects', projectData);
export const assignDeveloperToProject = (id, userId) => API.put(`/projects/${id}/assign`, { userId });
export const uploadDocument = (id, formData) => API.post(`/projects/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
});
export const markProjectAsCompleted = (id) => API.put(`/projects/${id}/complete`);
export const assignProjectLead = (id, userId) => API.put(`/projects/${id}/assign-lead`, { userId });
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const deleteDocument = (projectId, docId) => API.delete(`/projects/${projectId}/documents/${docId}`);
export const unassignDeveloper = (projectId, userId) => API.delete(`/projects/${projectId}/team/${userId}`);
export const unassignProjectLead = (projectId) => API.delete(`/projects/${projectId}/lead`);

export default API;