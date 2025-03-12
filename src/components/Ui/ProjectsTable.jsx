import React, { useEffect } from 'react'
import Project from './Project'
import ShowFilesModal from './ShowFilesModal';
import useProjectsStore from '../../Stores/useProjectsStore';

export default function ProjectsTable() {
    const { getProjects, projects, rerender } = useProjectsStore()
    
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
                            <Project key={project.project_id} {...project} />
                        ))
                    }
                </tbody>
            </table>
            <ShowFilesModal />
        </div>
    )
}