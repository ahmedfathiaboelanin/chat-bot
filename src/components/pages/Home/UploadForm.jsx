import { useState } from 'react'
import FormInput from '../../Ui/FormInput';
import {PENDING} from "../../../Constants/PromiseStatus";
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoMdCloudUpload } from 'react-icons/io';
import useProjectsStore from '../../../Stores/useProjectsStore';

function UploadForm() {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState(null);
    const [status, setStatus] = useState(null);
    const { uploadProject } = useProjectsStore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (projectName && files) {
            uploadProject(files, projectName, description, setStatus);
        } else {
            toast.error('Please fill all fields and select a file.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput state={projectName} setState={setProjectName} label="Project Name:" type="text" isRequired />
            <FormInput state={description} setState={setDescription} label="Project Description:" type="text" isRequired />
            <FormInput state={files} setState={setFiles} label="Files:" type="file" isRequired />
            
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                {
                    status === PENDING ? <><AiOutlineLoading3Quarters className='animate-spin mr-1' /> Processing</> : <IoMdCloudUpload className='text-2xl' />
                }
            </button>
        </form>
    )
}

export default UploadForm