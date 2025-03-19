import React, { useEffect, useState } from 'react'
import Project from './Project'
import ShowFilesModal from './ShowFilesModal';
import useProjectsStore from '../../Stores/useProjectsStore';
import AddFilesModal from './AddFilesModal';

export default function ProjectsTable() {
    const { getProjects, projects, rerender } = useProjectsStore()
    const [isShowFielsModalOpen, setIsShowFielsModalOpen] = useState(false)
    const [isAddFilesModalOpen, setIsAddFilesModalOpen] = useState(false)
    const [id, setId] = useState(null)
    const openShowFielsModal = () => setIsShowFielsModalOpen(true)
    const closeShowFielsModal = () => setIsShowFielsModalOpen(false)
    const openAddFilesModal = () => setIsAddFilesModalOpen(true)
    const closeAddFilesModal = () => setIsAddFilesModalOpen(false)

    useEffect(() => { getProjects(); }, [rerender]);
    return (
        <div className="overflow-auto shadow-md rounded-lg">
            <table className="table bg-white">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Uploaded At</th>
                        <th>Processing Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects?.map(project => (
                            <Project key={project.project_id} setAddfilesId={setId} openAddFilesModal={openAddFilesModal} openShowFielsModal={openShowFielsModal} {...project} />
                        ))
                    }
                </tbody>
            </table>
            <ShowFilesModal isOpen={isShowFielsModalOpen} closeModal={closeShowFielsModal} />
            <AddFilesModal isOpen={isAddFilesModalOpen} projectId={id} closeModal={closeAddFilesModal} />
        </div>
    )
}