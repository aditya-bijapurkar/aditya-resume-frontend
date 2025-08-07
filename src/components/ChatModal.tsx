import React from 'react';
import './css/ChatModal.css';

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {

    const closeModal = () : void => {
        onClose();
    }


    if(!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className={`chat-container ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="chat-header">
                    <h1>Under Construction</h1>   
                </div>
                <div className="chat-body">
                    <div className="chat-message">AI Chatbot is under construction</div>
                    <div className="chat-message">Rag Model implementation is in progress</div>
                    <div className="chat-message">LLM Ollama approach is being tested</div>
                </div>
            </div>
        </div>
    )
}

export default ChatModal;