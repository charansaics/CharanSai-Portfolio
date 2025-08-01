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
        const res = await fetchProjects()
        const data = await res.json();
        setProjects(data);
        setLoading(false);
        }
        loadProjects();
    }, []);

    return (
        <div className="container mx-auto p-4">
        {loading ? (
            <p>Loading projects...</p>
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
