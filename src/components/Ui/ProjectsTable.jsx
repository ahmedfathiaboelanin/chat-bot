import React, { useEffect, useState } from 'react'
import Project from './Project'
import ShowFilesModal from './ShowFilesModal';
import useProjectsStore from '../../Stores/useProjectsStore';

export default function ProjectsTable() {
    const { getProjects, projects, rerender } = useProjectsStore()
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

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
                            <Project key={project.project_id} openModal={openModal} {...project} />
                        ))
                    }
                </tbody>
            </table>
            <ShowFilesModal isOpen={isOpen} closeModal={closeModal} />
        </div>
    )
}