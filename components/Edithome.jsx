'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api.js';
import { fetchHome } from '@/lib/fetchHome.js';

export default function EditProfileForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        aboutMe: '',
        skills: '',
        location: '',
        resumeUrl: ''
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAndFetch = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!accessToken || !refreshToken) {
                router.push('/admin');
                return;
            }

            try {
                const data = await fetchHome();

                setFormData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    aboutMe: data.aboutMe || '',
                    skills: data.skills?.join(', ') || '',
                    location: data.location || '',
                    resumeUrl: data.resumeUrl || ''
                });
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAndFetch();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const updatedData = {
            ...formData,
            skills: formData.skills.split(',').map(skill => skill.trim())
        };

        try {
            await api.put('/admin/edithome', updatedData);
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 200);
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Something went wrong!');
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
            {['firstName', 'lastName', 'email', 'location', 'resumeUrl'].map((field) => (
                <div key={field}>
                    <label className="block font-semibold">{field}</label>
                    <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
            ))}

            <div>
                <label className="block font-semibold">About Me</label>
                <textarea
                    name="aboutMe"
                    value={formData.aboutMe}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block font-semibold">Skills (comma-separated)</label>
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                {submitting ? (
                    <div className="flex justify-center items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z" />
                        </svg>
                        Saving...
                    </div>
                ) : (
                    'Save Changes'
                )}
            </button>
        </form>
    );
}
