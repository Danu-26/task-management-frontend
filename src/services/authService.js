import axiosInstance from '../api/axiosInstance.jsx';


export const loginApi = async (data) => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Login failed. Please try again.';
    }
}

export const signupApi = async (data) => {
    try {
        const response = await axiosInstance.post('/auth/register', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Signup failed. Please try again.';
    }
}