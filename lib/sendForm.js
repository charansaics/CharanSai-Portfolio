
import api from "@/lib/api.js";


const sendForm = async (formData) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/contact`, formData);
        console.log("Form submitted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting form:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
}

export { sendForm };
