import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import AddProject from '../components/admin/AddProject';
import UserManagement from '../components/admin/UserManagement';
import ProjectList from '../components/shared/ProjectList';
import { getProjects } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading dashboard...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-black mb-6">Dashboard</h1>
      
      {user.role === 'Admin' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <AddProject onProjectAdded={fetchProjects} />
          {/* UserManagement now takes up more space and has its own internal layout */}
        </div>
      )}
      
      {user.role === 'Admin' && <UserManagement />}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          {user.role === 'Developer' ? "Your Assigned Projects" : "Active Projects"}
        </h2>
        
        <ProjectList projects={projects} onUpdate={fetchProjects} />
      </div>
    </div>
  );
};

export default Dashboard;