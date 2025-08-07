import React, { useState, useRef, useEffect } from 'react';
import './css/ChatModal.css';
import { ChatMessageInterface } from './props/ChatMessageInterface';
import { chatService } from '../services/chatService';
import { NotificationInterface } from './props/NotificationInterface';
import Notification from './Notification';

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
    const [currInput, setCurrInput] = useState<string>('');
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);
    const [notification, setNotification] = useState<NotificationInterface>({
        message: '',
        type: 'error',
        isVisible: false
    });

    const [chatMessages, setChatMessages] = useState<ChatMessageInterface[]>(() => {
        const saved = localStorage.getItem('chatMessages');
        return saved ? JSON.parse(saved) : [];
    });
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const chatBodyRef = useRef<HTMLDivElement>(null);
 
    const closeModal = () : void => {
        onClose();
    }

    const addDataToChat = (data: ChatMessageInterface) : void => {
        setChatMessages(prevMessages => {
            const newMessages = [...prevMessages, data];
            localStorage.setItem('chatMessages', JSON.stringify(newMessages));
            return newMessages;
        });
    }

    const getDayFromTimestamp = (timestamp: string | undefined) : string => {
        if(!timestamp) return '';
        return timestamp.split('T')[0].split('-').slice(1, 3).join('/');
    }

    const getTimeFromTimestamp = (timestamp: string | undefined) : string => {
        if(!timestamp) return '';
        return timestamp.split('T')[1].split('.')[0].split(':').slice(0, 2).join(':');
    }

    const getTimeDisplayString = (timestamp: string | undefined) : string => {
        return `${getDayFromTimestamp(timestamp)}, ${getTimeFromTimestamp(timestamp)}`;
    }

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleSendMessage = async () => {
        if(currInput.trim() === '') return;
        setInputDisabled(true);
        setCurrInput('');

        const prompt : ChatMessageInterface = {
            type: 'prompt',
            message: currInput,
            timestamp: new Date().toISOString()
        }
        addDataToChat(prompt);

        const response : ChatMessageInterface = await chatService.getResponse(prompt);
        if(response.type === 'error') {
            setNotification({
                message: response.message || 'Something went wrong!',
                type: 'error',
                isVisible: true
            });
        }
        else {
            addDataToChat(response);
        }

        setInputDisabled(false);
    }

    const clearChatHistory = () : void => {
        setChatMessages([]);
        localStorage.removeItem('chatMessages');
        setShowMenu(false);
    }

    const toggleMenu = () : void => {
        setShowMenu(!showMenu);
    }

    if(!isOpen) return null;

    const showNotification = () : React.ReactNode => {
        return (
            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={() => setNotification({...notification, isVisible: false})}
            />
        )
    }

    return (
        <div className="modal-overlay" onClick={closeModal}>
            {showNotification()}

            <div className={`chat-container ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="chat-header">
                    <h1>Ask RAG model</h1>
                    <div className="chat-menu-container">
                        <button 
                            className="chat-menu-btn" 
                            onClick={toggleMenu}
                            title="More options"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="6" r="2" fill="currentColor"/>
                                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                                <circle cx="12" cy="18" r="2" fill="currentColor"/>
                            </svg>
                        </button>
                        {showMenu && (
                            <div className="chat-menu-dropdown">
                                <button 
                                    className="chat-menu-item" 
                                    onClick={clearChatHistory}
                                >
                                    Clear Chat
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="chat-body" ref={chatBodyRef}>
                    {
                        chatMessages.length === 0
                         ? (
                            <div className="empty-chat-message">Start a new Chat!</div>
                         )
                        : chatMessages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.type}`}>
                                <div className="chat-message-content">
                                    <div className="chat-message-text">{message.message}</div>
                                    <div className="chat-message-timestamp">{getTimeDisplayString(message.timestamp)}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="chat-input-container">
                    <textarea className="chat-input" 
                        placeholder={inputDisabled ? "Generating AI response..." : "Ask anything about me..."} 
                        value={currInput} onChange={(e) => setCurrInput(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && !inputDisabled) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        disabled={inputDisabled}/>
                    {
                    inputDisabled ? (
                         <div className="chat-input-button-loading">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                            </svg>
                        </div>
                        ) : (
                         <button className="chat-input-button" onClick={handleSendMessage}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white"/>
                            </svg>
                        </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatModal;