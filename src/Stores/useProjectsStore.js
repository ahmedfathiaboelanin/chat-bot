import { create } from "zustand";
import axiosInsatnce from "../axios/_axios";
import { PENDING, FULFILLED, REJECTED } from '../Constants/PromiseStatus'
import toast from "react-hot-toast";

const useProjectsStore = create((set) => ({
    projects: [],
    projectFiles: [],
    isLoading: null,
    rerender: false,
    forceRerender: () => { set((state) => ({ rerender: !state.rerender })) },
    getProjects: async () => {
        set({ isLoading: PENDING })
        try {
            const res = await axiosInsatnce.get('/data/projects');
            set({ projects: res.data.projects });
            set({ isLoading: FULFILLED })
        }
        catch (error) {
            console.log(error);
            set({ isLoading: REJECTED })
            toast.error('Somthing went wrong');
        }
    },
    deleteProject: async (project_id) => {
        try {
            const response = await axiosInsatnce.delete(`/data/project/${project_id}`);
            console.log(response);
            set((state) => ({ rerender: !state.rerender }))
            toast.success('Project deleted successfully');
        }
        catch (error) {
            console.log(error);
            toast.error('Somthing went wrong');
        }
    },
    getProjectFiles: async (project_id) => {
        try {
            const response = await axiosInsatnce.get(`data/project/${project_id}/files`)
            console.log(response.data.files);
            document.getElementById('project_files_modal').showModal()
            set({ projectFiles: response.data.files });

        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong');
        }
    },
    uploadProject: async (files, projectName, description, setStatus) => { 
        try {
            setStatus(PENDING);
            const formData = new FormData();
            formData.append('files', files[0]);
            const queryParams = new URLSearchParams({
                project_name: projectName,
                project_description: description,
                auto_process: true,
            }).toString();

            const url = `data/upload?${queryParams}`;
            const response = await axiosInsatnce.post(url, formData);
            console.log('Response:', response.data);
            setStatus(FULFILLED);
            toast.success('Project uploaded successfully');
            set((state) => ({ rerender: !state.rerender }))
        } catch (error) {
            console.error('Error:', error);
            setStatus(REJECTED);
            toast.error('Something went wrong');
        }
    },

    processProject: async (project_id) => {
        try {
            const processResponse = await axiosInsatnce.post(`/data/process/${project_id}`, {
                "chunk_size": 500,
                "overlap_size": 100,
                "do_reset": 0
            });
            console.log('process response',processResponse.data);
            const indexResponse = await axiosInsatnce.post(`/nlp/index/push/${project_id}`, {
                "do_reset": 0
            });
            console.log('index response',indexResponse.data);
            set((state) => ({ rerender: !state.rerender }))
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    },
}))

export default useProjectsStore;