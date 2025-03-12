import React from 'react'
import FileBadge from './FileBadge'
import useProjectsStore from '../../Stores/useProjectsStore'

export default function ShowFilesModal() {
    const { projectFiles } = useProjectsStore()

    return (
        <>
            <dialog id="project_files_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="flex flex-col gap-3">
                        {
                            projectFiles.map(file => (
                                <FileBadge key={file.asset_id} file={file.filename} />
                            ))
                        }
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}