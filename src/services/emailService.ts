const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface ContactFormData {
  name: string;
  emailId: string;
  subject: string;
  text: string;
}

export const emailService = {
  async sendContactEmail(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          message: 'Thank you for your mail! I will get back to you soon.'
        };
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw error;
    }
  }
}; 