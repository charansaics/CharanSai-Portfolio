'use client';

import { useEffect, useState } from 'react';
import { fetchHome } from '@/lib/fetchHome';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import {FiMail} from 'react-icons/fi'

export default function Footer() {
    const [socialLinks, setSocialLinks] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchHome();
                setEmail(data.email);
                setSocialLinks(data.socialLinks);
            } catch (error) {
                console.error('Failed to fetch social links:', error);
            }
        };

        getData();
    }, []);

    if (!socialLinks) {
        return null; // or loading indicator
    }

    return (
        <footer className="w-full bg-black text-white py-6">
            <div className="flex justify-center items-center space-x-6 text-2xl">
                <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                >
                    <FaGithub />
                </a>
                <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                >
                    <FaLinkedin />
                </a>
                <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                >
                    <FaInstagram />
                </a>

                <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                >
                <FiMail />
                </a>
            </div>
        </footer>
    );
}
