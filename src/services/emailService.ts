export interface ContactFormData {
  name: string;
  emailId: string;
  subject: string;
  text: string;
}

export const emailService = {
  async sendContactEmail(formData: ContactFormData, token: string): Promise<{ success: boolean; message: string }> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-recaptcha-v3-token': token
      };
      
      const response = await fetch(`/contact/send`, {
        method: 'POST',
        headers,
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