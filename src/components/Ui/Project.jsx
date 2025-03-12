import React from 'react'
import { Link } from 'react-router-dom'
import useProjectsStore from '../../Stores/useProjectsStore';
import { PiFilesBold } from 'react-icons/pi';
import { FaDeleteLeft, FaGears } from 'react-icons/fa6';
import { IoChatbubble, IoEye } from 'react-icons/io5';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

export default function Project({ name, description, project_id, processing_status, created_at, openModal }) {
    const { getProjectFiles, deleteProject, processProject } = useProjectsStore()
    
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="flex items-center justify-center">
                            <PiFilesBold className='text-4xl' />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                    </div>
                </div>
            </td>
            <td>
                {description ? description : '--'}
            </td>
            <td>{created_at ? created_at.split('T')[0] : '--'}</td>
            <td>{processing_status.is_ready_for_rag ? <div className='flex gap-2 items-center'><FaCheckCircle className='text-lg text-green-700' /> Done</div> : <div className='flex gap-2 items-center'><IoIosCloseCircle className='text-lg text-red-700' /> Faild</div>}</td>
            <th>
                <div className="flex gap-2">
                    <Link className="flex gap-2 btn" to={`/chat/${project_id}`}>
                        <IoChatbubble className='text-lg text-blue-700' />
                    </Link>
                    <button className="flex gap-2 btn" onClick={() => getProjectFiles(project_id, openModal)}>
                        <IoEye className='text-lg text-emerald-700' />
                    </button>
                    <button className="flex gap-2 btn" onClick={() => processProject(project_id)}>
                        <FaGears className='text-lg text-emerald-700' />
                    </button>
                    <button className="flex gap-2 btn" onClick={() => deleteProject(project_id)}>
                        <FaDeleteLeft className='text-lg text-red-700' />
                    </button>
                </div>
            </th>
        </tr>
        
    )
}