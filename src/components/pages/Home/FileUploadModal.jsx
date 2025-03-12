import React from 'react';
import UploadForm from './UploadForm';
import { IoMdCloudUpload } from 'react-icons/io';

const FileUploadModal = () => {
    return (
        <>
            <button onClick={() => document.getElementById('upload_files_modal').showModal()} className="upload-zone shadow bg-white p-5 w-full flex flex-col gap-5 items-center justify-center border border-dashed rounded">
                <IoMdCloudUpload className='text-7xl' />
                <p>Click this section to upload your files. Only files with the following extensions are accepted: .pdf and .txt.</p>
            </button>
            <dialog id="upload_files_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-center">Upload File</h2>
                        <UploadForm/>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    );
};

export default FileUploadModal;