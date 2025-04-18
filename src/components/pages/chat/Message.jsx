import React from 'react'
import Markdown from 'markdown-to-jsx'

export default function Message({ sender, text }) {
    return (
        <>
            <div className={`chat ${sender === 'user' ? 'chat-start' : 'chat-end'}`}>
                <div className="chat-header">
                    {sender==='user' ? 'User' : `AI Chatbot (${sender})`}
                </div>
                <div className="chat-bubble bg-accent-content text-white">
                    { 
                        text && <Markdown>{text}</Markdown>
                    }
                </div>
            </div>
        </>
    )
}
