import React, { useEffect } from 'react'
import Message from './Message'
import useMessagesStore from '../../../Stores/useMessagesStore'
import { PiEmptyFill } from 'react-icons/pi'

export default function ChatWindow() {
    const { resetHistory, messages } = useMessagesStore()
    useEffect(() => resetHistory(), [])
    return (
        <div className="h-full overflow-y-auto mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50" >
            {
                messages.map((msg, index) => (
                    <Message {...msg} key={index} />
                ))
            }
            {messages.length === 0 &&
                <div className="text-center text-gray-500 h-full w-full flex flex-col items-center justify-center">
                    <PiEmptyFill className='text-9xl' />
                    No messages yet
                </div>}
        </div >
    )
}
