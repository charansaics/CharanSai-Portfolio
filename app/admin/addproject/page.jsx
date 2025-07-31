'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api.js';
import { useRouter } from 'next/navigation';

export default function AddProjectForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        githubLink: '',
        liveLink: ''
    });
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    

    const handleChange = (e) => {
        setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        try {

            await api.post('/admin/addProject', formData , {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "x-refresh-token": refreshToken
            }
        });
        

        setMessage("Project added successfully!");
        setFormData({ title: '', description: '', tags: '', githubLink: '', liveLink: '' });
        router.push('/admin/dashboard');
        
        } catch (error) {
        console.error(error);
        setMessage("Failed to add project.");
        } finally {
        setLoading(false);
        }
    };
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken || refreshToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push('/admin');
        }
    }, []);

        if (isAuthenticated === null || loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    return (
        <form 
        onSubmit={handleSubmit} 
        className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md space-y-4"
        >
        <h2 className="text-2xl font-semibold text-center">Add New Project</h2>

        <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
        />

        <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border rounded"
        />

        <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
        />

        <input
            type="url"
            name="githubLink"
            placeholder="GitHub Link"
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full p-2 border rounded"
        />

        <input
            type="url"
            name="liveLink"
            placeholder="Live Link"
            value={formData.liveLink}
            onChange={handleChange}
            className="w-full p-2 border rounded"
        />

        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
            {loading ? 'Adding...' : 'Add Project'}
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
    );
}
