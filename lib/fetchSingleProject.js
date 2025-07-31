import api from "@/lib/api.js";

const fetchEditProject = async (id) =>{
    try{
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await api.get(`/admin/editproject/:${id}`, 
            {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "x-refresh-token": refreshToken
            }
        }
        )
        return response.data
    } catch(error){
        console.error('error in getting project');
    }
}

export {fetchEditProject}

