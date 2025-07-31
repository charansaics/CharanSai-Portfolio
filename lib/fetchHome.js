
import api from "@/lib/api.js";

const fetchHome = async () => {
    try {
        const response = await api.get('/home');
        // console.log("Fetched home data:", response.data.siteUser[0]);
        return response.data.siteUser[0];
    } catch (error) {
        console.error("Error fetching home data:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
}

export { fetchHome };