'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api.js';

export default function EditProjectPage() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        githubLink: '',
        liveLink: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchEditProject = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                const response = await api.get(`/admin/editproject/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                        'x-refresh-token': refreshToken,
                    },
                });

                const project = response.data.data;

                setFormData({
                    title: project.title || '',
                    description: project.description || '',
                    tags: project.tags?.join(', ') || '',
                    githubLink: project.githubLink || '',
                    liveLink: project.liveLink || ''
                });
            } catch (error) {
                console.error('Error fetching project:', error);
                router.push('/admin');
            }
        };

        if (id) fetchEditProject();
    }, [id, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            const updatedData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim())
            };

            await api.put(`/admin/editproject/${id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    'x-refresh-token': refreshToken
                }
            });

            setMessage('Project updated successfully!');
            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Error updating project:', error);
            setMessage('Failed to update project.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Edit Project</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    rows={4}
                    required
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
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Updating...' : 'Update Project'}
                </button>

                {message && <p className="text-sm text-center mt-2">{message}</p>}
            </form>
        </div>
    );
}
