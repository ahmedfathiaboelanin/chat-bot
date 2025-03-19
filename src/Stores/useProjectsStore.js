import { create } from "zustand";
import axiosInsatnce from "../axios/_axios";
import { PENDING, FULFILLED, REJECTED } from '../Constants/PromiseStatus'
import toast from "react-hot-toast";

const useProjectsStore = create((set) => ({
    projects: [],
    projectFiles: [],
    projectName: null,
    isLoading: null,
    addProjectLoading:null,
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
            set({ isLoading: REJECTED })
            toast.error(error.response.data.detail);
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
    getProjectFiles: async (project_id, openModal) => {
        try {
            const response = await axiosInsatnce.get(`data/project/${project_id}/files`)
            openModal();
            set({ projectFiles: response.data.files, projectName: response.data.project_name });
        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong');
        }
    },
    uploadProject: async (files, projectName, description, setStatus, closeModal) => { 
        try {
            setStatus(PENDING);
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
            
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
            closeModal();
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
            console.log('index response', indexResponse.data);
            toast.success('Project processed successfully');
            set((state) => ({ rerender: !state.rerender }))
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    },


    submitUploadedFiles: async (files, projectId, setIsLoading, closeModal) => {
        console.log(projectId);
        try {
            setIsLoading(PENDING);
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            };
            const response = await axiosInsatnce.post(`/data/upload/project/${projectId}`, formData);
            console.log(response);
            setIsLoading(FULFILLED);
            closeModal();
            toast.success('Files uploaded successfully');
        } catch (error) {
            console.log(error);
            setIsLoading(REJECTED);
            toast.error('Something went wrong');
        }
    }
}))

export default useProjectsStore;