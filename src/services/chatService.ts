import { ChatMessageInterface } from '../components/props/ChatMessageInterface';

export const chatService = {

    getIstDateTime() : string {
        const timeInIST = new Date().toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          });

        return `${timeInIST} IST`;
    },

    async getResponse(prompt: ChatMessageInterface, token: string) : Promise<ChatMessageInterface> {
        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'x-recaptcha-v3-token': token
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/response`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    prompt: prompt.message
                })
            });

            const data = await response.json();
            
            if(response.ok) { 
                return {
                    type: 'response',
                    message: data.data.response,
                    timestamp: chatService.getIstDateTime()
                }
            }
            return {
                type: 'error',
                message: 'Some error occurred while generating AI response :(',
            }
        }
        catch (error) {
            return {
                type: 'error',
                message: 'Some error occurred while generating AI response :(',
            }
        }
    }

}