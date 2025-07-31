
import React from "react";
import ProjectCard from "@/components/ProjectCard.jsx";
import { fetchProjects } from "../../lib/fetchprojects.js";

export default async function ProjectsPage() {

    const projects = await fetchProjects();
    return (
        <div className="container mx-auto p-4">
            {projects.length > 0 ? (
                projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
};