'use client';
import { useState } from 'react';
import api from '@/lib/api.js'; // Adjust the import based on your API setup

import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        async function loginUser(email, password) {
            try {
                const response = await api.post('/adminlogin', { email, password });
                const data = response.data;
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                console.log('Login successful:', data);
                router.push('/admin/dashboard');
            } catch (error) {
                console.error('Login error:', error);
            } finally {
                setLoading(false);
            }
        }
        loginUser(form.email, form.password);

        setForm({ email: '', password: '' });


    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 p-6 bg-white dark:bg-gray-900 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-white"
                    disabled={loading}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-white"
                    disabled={loading}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded hover:bg-green-300 transition flex items-center justify-center gap-2"
                disabled={loading}
            >
                {loading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                )}
                {loading ? 'Logging in' : 'Login'}
            </button>
        </form>
    );
}