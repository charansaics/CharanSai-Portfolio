'use client'

import EditProfileForm from '@/components/Edithome'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function EditProfile() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    


    
    useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
        router.push('/admin');
    } else {
        setIsAuthenticated(true); // Let api.js handle invalid tokens automatically
    }
}, [router]);
    
    
    if (isAuthenticated === null) {
        return <div className="text-center p-10">Loading...</div>;
    }
return(
    <EditProfileForm />
);
}