export interface ChatMessageInterface {
    type: 'prompt' | 'response' | 'error';
    message?: string;
    timestamp?: string;
}