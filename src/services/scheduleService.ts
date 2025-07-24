const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  emailId: string;
}

export interface BookingRequest {
  description?: string;
  scheduleTime: string;
  requiredUsers?: UserDetails[];
}

export const scheduleService = {
  async getAvailability(date: string): Promise<TimeSlot[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule/meet/availability?date=${date}`);
      const data = await response.json();
      console.log(data);
      const availableSlots = data.data.availableSlots;
      
      const slots: TimeSlot[] = [];
      for (let hour = 9; hour < 18; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        const expectedISOString = `${date}T${time}:00`;

        const available = availableSlots.includes(expectedISOString);
        
        slots.push({ time, available });
      }
      
      return slots;
    } catch (error) {
      console.error('Error fetching availability:', error);
      throw error;
    }
  },

  async initiateMeeting(booking: BookingRequest): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule/meet/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });
      const data = await response.json();
      const success = data.status;
      
      if (success == 200) {
        return {
          success: true,
          message: `Successfully initiated meeting schedule for ${booking.scheduleTime.split('T')[0]} at ${booking.scheduleTime.split('T')[1]}, please check your email for next steps...`
        };
      } else {
        throw new Error('Slot is no longer available');
      }
    } catch (error) {
      console.error('Error booking slot:', error);
      throw error;
    }
  }
}; 