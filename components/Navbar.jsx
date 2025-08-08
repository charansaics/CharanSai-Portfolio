'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black text-white px-6 py-4 z-50 fixed top-0 w-full">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Logo */}
            <div className="text-2xl font-bold uppercase">CS</div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-10 text-sm uppercase font-light">
            <Link href="/" className="hover:text-gray-400 transition">Home</Link>
            <Link href="/projects" className="hover:text-gray-400 transition">Projects</Link>
            <Link href="/contactme" className="hover:text-gray-400 transition">Contact Me</Link>
            </div>

            {/* Hamburger Menu - Mobile Only */}
            <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black px-6 py-4 space-y-4 text-sm uppercase font-light border-t border-gray-800 z-40">
            <Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-gray-400 transition">
                Home
            </Link>
            <Link href="/projects" onClick={() => setIsOpen(false)} className="block hover:text-gray-400 transition">
                Projects
            </Link>
            <Link href="/contactme" onClick={() => setIsOpen(false)} className="block hover:text-gray-400 transition">
                Contact Me
            </Link>
            </div>
        )}
        </nav>
    );
}
