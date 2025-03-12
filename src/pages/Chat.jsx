import ChatWindow from '../components/pages/chat/ChatWindow';
import MessageForm from '../components/pages/chat/MessageForm';

const Chat = () => {
    return (
        <main className='h-[calc(100vh-4rem)]'>
            <div className="max-w-screen flex flex-col gap-4 h-full mx-auto p-6 rounded-lg shadow-md">
                <ChatWindow />
                <MessageForm />
            </div>
        </main>
    );
};

export default Chat;