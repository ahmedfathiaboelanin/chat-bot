import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { PENDING } from "../../../Constants/PromiseStatus";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';
import useMessagesStore from '../../../Stores/useMessagesStore';
import MentionsList from './MentionsList';


const MENTION_OPTIONS = [
    { id: 1, name: 'conversation' },
    { id: 2, name: 'rag' },
    { id: 3, name: 'searchweb' },
    { id: 4, name: 'recommendation' },
    { id: 5, name: 'search_database' },
];

export default function MessageForm() {
    const [message, setMessage] = useState('');
    const [showMentions, setShowMentions] = useState(false);
    const [mentionSelected, setMentionSelected] = useState(false);
    const inputRef = useRef(null);
    const mentionsRef = useRef(null);
    const project_id = useParams().id;
    const { isLoading, sendMessage } = useMessagesStore();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isOutsideMentions = mentionsRef.current && !mentionsRef.current.contains(event.target);
            const isOutsideInput = !inputRef.current.contains(event.target);

            if (isOutsideMentions && isOutsideInput) {
                setShowMentions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        const position = e.target.selectionStart;

        if (value[position - 1] === '@' && !mentionSelected) {
            setShowMentions(true);
        }
        setMessage(value);
    };

    const handleMentionSelect = (option) => {
        const beforeMention = message.slice(0, message.lastIndexOf('@'));
        const newMessage = `${beforeMention}@${option.name} `;
        setMessage(newMessage);
        setShowMentions(false);
        setMentionSelected(true);
        inputRef.current.focus();
    };

    const extractMessageParts = (message) => {
        const matches = message.match(/@(\w+\s*)/);
        return {
            mention: matches ? matches[1].trim() : null,
            text: message.replace(/@\w+\s*/, '').trim()
        };
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            const { text, mention } = extractMessageParts(message);
            sendMessage(text, project_id, mention);
            setMessage('');
            setMentionSelected(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && mentionSelected) {
            const atIndex = message.lastIndexOf('@');
            if (message.slice(atIndex).includes(' ')) {
                setMentionSelected(false);
            }
        }
    };

    return (
        <div className="relative">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... Use @ to mention"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {isLoading === PENDING ? <AiOutlineLoading3Quarters className='animate-spin' /> : <IoSend />}
                </button>
            </form>

            {showMentions && !mentionSelected && (
                <MentionsList
                    options={MENTION_OPTIONS}
                    onSelect={handleMentionSelect}
                    mentionsRef={mentionsRef}
                />
            )}
        </div>
    );
}