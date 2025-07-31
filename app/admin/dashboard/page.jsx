'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/components/AdminProjectCard';
import { fetchProjects } from '@/lib/fetchprojects';
import api from '@/lib/api.js'

export default function Dashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleEditClick = async (project) =>{
        const id = project._id;
        router.push(`/admin/editproject/${id}`)

    }
    
    const handleDelete = async (project) => {
    const id = project._id;

    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await api.delete(`/admin/deleteProject/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'x-refresh-token': refreshToken,
            },
        });

        console.log('Project deleted:', response.data);
        // Optionally refresh the project list or navigate
        // e.g., fetchProjects() or router.refresh() or remove it from UI state
        window.location.reload();
        
    } catch (error) {
        console.error('Error deleting project:', error);
    }
};


    useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
        router.push('/admin');
    } else {
        setIsAuthenticated(true); // Let api.js handle invalid tokens automatically
    }
}, [router]);



    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (err) {
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            loadProjects();
        }
    }, [isAuthenticated]);

    if (isAuthenticated === null || loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects.length > 0 ? (
                projects.map((project) => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                        onEdit={() => handleEditClick(project)}
                        onDelete={() => handleDelete(project)}
                    />
                ))
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
}
