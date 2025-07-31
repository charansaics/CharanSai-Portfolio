'use client';

export default function ProjectCard({ project, onEdit, onDelete }) {
    const {
        title,
        description,
        tags = [],
        githubLink,
        liveLink,
    } = project;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col gap-4">
        {/* Title */}
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>

        {/* Tags */}
        {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200"
                >
                {tag}
                </span>
            ))}
            </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-sm">
            {githubLink && (
            <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
                GitHub ↗
            </a>
            )}
            {liveLink && (
            <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
            >
                Live Demo ↗
            </a>
            )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between border-t dark:border-gray-700 pt-4 mt-2">
            <button
            onClick={onEdit}
            className="text-sm text-yellow-600 hover:text-yellow-800 font-medium"
            >
            ✏️ Edit
            </button>
            <button
            onClick={onDelete}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
            🗑️ Delete
            </button>
        </div>
        </div>
    );
}
