'use client';

import React from 'react';

export default function ProjectCard({ project }) {
    return (
        <div className="border rounded-lg p-4 mb-4 bg-white dark:bg-black shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project.title}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Description:</strong> {project.description}
            </p>

            {project.tags && project.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="mt-4 flex gap-6 text-sm">
                <a
                    href={project.githubLink}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                <a
                    href={project.liveLink}
                    className="text-green-600 dark:text-green-400 hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Live
                </a>
            </div>
        </div>
    );
}
