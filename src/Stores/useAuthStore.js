import { create } from 'zustand'
import axiosInsatnce from '../axios/_axios';
import toast from 'react-hot-toast';

const useAuthStore = create(() => ({
    login: async (data, navigate) => {
        try {
            const response = await axiosInsatnce.post('auth/login', data,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            localStorage.setItem('token', response.data.access_token);
            navigate('/')
        } catch (error) {
            toast.error(error.response.data.detail);
            console.log(error.response.data.detail);
        }
    },
}))

export default useAuthStore;