import { useState } from 'react';
import React from 'react';
import UploadForm from './UploadForm';
import { IoMdCloudUpload } from 'react-icons/io';
import Modal from '../../Ui/Modal';
const FileUploadModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            <button onClick={openModal} className="upload-zone shadow bg-white p-5 w-full flex flex-col gap-5 items-center justify-center border border-dashed rounded">
                <IoMdCloudUpload className='text-7xl' />
                <p>Click this section to upload your files. Only files with the following extensions are accepted: .pdf and .txt.</p>
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Upload Project"
                maxWidth="md"
            >
                <UploadForm closeModal={closeModal} />
            </Modal>
        </>

    );
};

export default FileUploadModal;