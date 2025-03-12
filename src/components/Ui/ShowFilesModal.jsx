import FileBadge from './FileBadge'
import useProjectsStore from '../../Stores/useProjectsStore'
import Modal from './Modal'

export default function ShowFilesModal({ isOpen, closeModal }) {
    const { projectFiles } = useProjectsStore()
    return (
        <Modal
            title={'Project Files'}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <div className="flex flex-col gap-3">
                {
                    projectFiles.map(file => (
                        <FileBadge key={file.asset_id} file={file.filename} />
                    ))
                }
            </div>
        </Modal>
    )
}