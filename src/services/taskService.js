import axiosInstance from '../api/axiosInstance.jsx';


export const addTaskApi = async (data) => {
    try {
        const response = await axiosInstance.post('/task/create-task', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Adding task failed. Please try again.';
    }
}


