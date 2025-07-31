'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'; // ← import useState and useEffect
import api from '@/lib/api.js';

export default function AdminNavbar() {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false); // ← loading state

    useEffect(() => {
        router.prefetch('/admin/addproject'); // Optional: prefetch target route
    }, [router]);

    const handleLogout = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            await api.post('/adminlogout', { refreshToken }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                    "x-refresh-token": refreshToken
                }
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.push('/admin');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const handleAddProject = () => {
        setIsNavigating(true); // trigger spinner
        router.push('/admin/addproject');
    };

    const handleEditHome = () => {
        router.push('/admin/edithome')
    };

    return (
        <nav className="bg-white dark:bg-black px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
                <button
                    onClick={handleAddProject}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                    disabled={isNavigating}
                >
                    {isNavigating ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    ) : (
                        'Add Project'
                    )}
                </button>

                <button
                onClick={handleEditHome}
                disabled={isNavigating}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
                            >
                    {isNavigating ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    ) : (
                        'Edit Home'
                    )}
                </button>

            </div>
            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </nav>
    );
}
