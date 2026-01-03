import React, { useState, useRef, useEffect } from 'react';
import './css/ChatModal.css';
import { ChatMessageInterface } from './props/ChatMessageInterface';
import { chatService } from '../services/chatService';
import { NotificationInterface } from './props/NotificationInterface';
import { useRecaptcha, RECAPTCHA_ACTIONS } from '../services/recaptchaService'

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    setNotification: (notification: NotificationInterface) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, setNotification }) => {
    const { executeRecaptcha, isRecaptchaAvailable } = useRecaptcha();
    const [currInput, setCurrInput] = useState<string>('');
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);
    const [chatMessages, setChatMessages] = useState<ChatMessageInterface[]>(() => {
        const saved = localStorage.getItem('chatMessages');
        return saved ? JSON.parse(saved) : [];
    });
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
 
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showMenu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

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

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleSendMessage = async () => {
        if (!isRecaptchaAvailable) {
            throw new Error('ReCaptcha verification failed. Please refresh the page and try again.');
        }
        const token = await executeRecaptcha(RECAPTCHA_ACTIONS.CHAT_RESPONSE);
        
        if(currInput.trim() === '') return;
        setInputDisabled(true);
        setCurrInput('');

        const prompt : ChatMessageInterface = {
            type: 'prompt',
            message: currInput,
            timestamp: chatService.getIstDateTime()
        }
        addDataToChat(prompt);

        const response : ChatMessageInterface = await chatService.getResponse(prompt, token);
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

    return (
        <div className="chat-modal-overlay" onClick={closeModal}>
            <div className={`chat-container ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="chat-header">
                    <h1>Ask RAG framework</h1>
                    <div className="chat-menu-container" ref={menuRef}>
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
                            <div className="chat-empty-chat-message">Start a new Chat!</div>
                         )
                        : chatMessages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.type}`}>
                                <div className="chat-message-content">
                                    <div className="chat-message-text">{message.message}</div>
                                    <div className="chat-message-timestamp">{message.timestamp}</div>
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