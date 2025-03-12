import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import {PENDING} from "../../../Constants/PromiseStatus";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';
import useMessagesStore from '../../../Stores/useMessagesStore';
export default function MessageForm() {
    const [message, setMessage] = useState('');
    const project_id = useParams().id;

    const { isLoading, sendMessage } = useMessagesStore();
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('here');
            
            sendMessage(message, project_id)
            setMessage('')
        }
    };
    return (
        <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {
                    isLoading === PENDING ? <AiOutlineLoading3Quarters className='animate-spin' /> : <IoSend/>
                }
            </button>
        </form>
    )
}