import { create } from "zustand";
import axiosInsatnce from "../axios/_axios";
import {PENDING, FULFILLED, REJECTED} from '../Constants/PromiseStatus'
import toast from "react-hot-toast";

const useMessagesStore = create((set) => ({
    messages: [],
    isLoading: null,
    resetHistory: () => {set({messages : []})},
    sendMessage: async (message, project_id) => {
        const newMessage = { sender: 'user', text: message };
        set((state) => ({ messages: [...state.messages, newMessage] }));
        
        try {
            set({ isLoading: PENDING });
            let res = await axiosInsatnce.post('/chatbot/chat',
                {
                    query:message,
                    project_id
                }
            )
            const aiResponse = { sender: res.data.query_type, text: res.data.message };
            set((state) => ({ messages: [...state.messages, aiResponse] }));
            set({ isLoading: FULFILLED });
        } catch (error) {
            error.response.data.detail.map(err => console.log(err))
            
            toast.error('Something went wrong');
            set({ isLoading: REJECTED });
        }
    },
}))

export default useMessagesStore;