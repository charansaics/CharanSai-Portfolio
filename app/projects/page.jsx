// app/projects/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard.jsx";
import { fetchProjects } from "@/lib/fetchprojects.js";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
        
        const data = await fetchProjects();
        setProjects(data);
        setLoading(false);
        }
        loadProjects();
    }, []);

    return (
        <div className="container mx-auto p-4">
        {loading ? (
            <div>
                <p>Loading projects...</p>
                <p>It will take time because my backend is hosted differently on free tier hosting, which uses cold start...!!!</p>
            </div>
            
        
        ) : projects.length > 0 ? (
            projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
            ))
        ) : (
            <p>No projects found.</p>
        )}
        </div>
    );
}
