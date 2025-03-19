import React, { useState } from 'react'
import Modal from './Modal'
import useProjectsStore from '../../Stores/useProjectsStore';
import {PENDING} from "../../Constants/PromiseStatus";

function AddFilesModal({ isOpen, closeModal, projectId }) {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const { submitUploadedFiles } = useProjectsStore();

    return (
        <Modal
            title={`Add files`}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <div className="flex flex-col gap-3">
                <label htmlFor="add-files" className="">
                    Add Files
                </label>
                <input id="add-files" type="file" multiple onChange={(e) => setFiles(e.target.files)}/>
                <button className='bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded' onClick={() => submitUploadedFiles(files, projectId, setIsLoading, closeModal)}>
                    {
                        isLoading === PENDING ? 'Uploading...' : 'Upload'
                    }
                </button>
            </div>
        </Modal>
    )
}

export default AddFilesModal