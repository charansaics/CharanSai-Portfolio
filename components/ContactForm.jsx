'use client';

import { useState } from 'react';
import api from '@/lib/api.js';

export default function ContactMeForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false); // loading state

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading

        try {
        await api.post('/contact', form);
        console.log("Form submitted successfully:", form);
        alert("Message sent!");
        } catch (error) {
        console.error("Error submitting form:", error);
        alert('Error submitting form.');
        }

        setLoading(false); // stop loading
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-black rounded shadow text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Contact Me</h1>

        <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
            <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-400"
            />
        </div>

        <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-400"
            />
        </div>

        <div className="mb-4">
            <label htmlFor="message" className="block mb-1 font-medium">Message</label>
            <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-400"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition flex items-center justify-center"
            disabled={loading}
        >
            {loading ? (
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
                d="M4 12a8 8 0 018-8v8z"
                ></path>
            </svg>
            ) : (
            'Send Message'
            )}
        </button>
        </form>
    );
}
