export interface ChatMessageInterface {
    message: string;
    type: 'prompt' | 'response';
    timestamp?: string;
}