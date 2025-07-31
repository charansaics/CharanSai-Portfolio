import api from "@/lib/api.js";

const fetchProjects = async () => {
    try {
        const response = await api.get('/projects');
        return response.data.projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
}

export {fetchProjects};