import { ChatMessageInterface } from '../components/props/ChatMessageInterface';

export const chatService = {

    async getResponse(prompt: ChatMessageInterface) : Promise<ChatMessageInterface> {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        type: 'response',
                        message: 'This feature is under construction, thanks for your patience!',
                        timestamp: new Date().toISOString()
                    });
                }, 1000);
            });
        }
        catch (error) {
            return {                
                type: 'error',
                message: 'Some error occurred while generating AI response :(',
            }
        }
    }

}