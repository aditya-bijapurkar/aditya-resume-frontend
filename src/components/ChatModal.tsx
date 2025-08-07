import React, { useState } from 'react';
import './css/ChatModal.css';
import { ChatMessageInterface } from './props/ChatMessageInterface';

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
    const [chatMessages, setChatMessages] = useState<ChatMessageInterface[]>([]);
    
    if(!isOpen) return null;
 
    const closeModal = () : void => {
        onClose();
    }

    const addDataToChat = (data: ChatMessageInterface) : void => {
        setChatMessages([...chatMessages, data]);
    }

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className={`chat-container ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="chat-header">
                    <h1>Under Construction</h1>   
                </div>
                <div className="chat-body">
                    {chatMessages.map((message, index) => (
                        <div key={index} className={`chat-message ${message.type}`}>
                            {message.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatModal;