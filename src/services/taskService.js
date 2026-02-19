import axiosInstance from '../api/axiosInstance.jsx';


export const addTaskApi = async (data) => {
    try {
        const response = await axiosInstance.post('/task/create-task', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Adding task failed.';
    }
}


export const getTasksApi = async (data) => {
    try {
        const response = await axiosInstance.post('/task/get-all-task', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Getting task failed.';
    }
}

export const getStatsApi = async () => {
    try {
        const response = await axiosInstance.get('/task/get-task-stats');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Getting task stats failed.';
    }
}

export const taskDeleteApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/task/remove-task/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Deleting task failed.';
    }
}

export const taskUpdateApi = async (id,updatedData) => {
    try {
        const response = await axiosInstance.put(`/task/update-task/${id}`,updatedData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Task updating failed.';
    }
}