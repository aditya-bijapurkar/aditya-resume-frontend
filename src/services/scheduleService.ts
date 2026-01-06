export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  emailId: string;
}

export interface LoggedInUserDetails {
  username: string;
}

export interface SignUpDetails {
  username: string;
  email: string;
  password: string;
}
export interface LoginDetails {
  email: string;
  password: string;
}

export interface BookingRequest {
  description?: string;
  scheduleTime: string;
  requiredUsers?: UserDetails[];
}

export interface ScheduledCall {
  scheduledAt: string;
  description: string;
  meetPlatform: string;
  meetLink: string;
  meetPassword: string | null;
  status: 'scheduled' | 'declined' | 'pending_approval';
}

const decodeJWT = (token: string): { exp?: number, loggedInUserDetails?: LoggedInUserDetails } | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const payload = parts[1];

    let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const decoded = JSON.parse(atob(base64));
    return { exp: decoded.exp, loggedInUserDetails: { username: decoded.username } };
  }
  catch (error) {
    return null;
  }
};

const setTokenWithTTL = (token: string): void => {
  const decoded = decodeJWT(token);
  let expiresAt = null;
  if (decoded && decoded.exp) {
    expiresAt = decoded.exp * 1000;
  }
  else {
    // 1 day
    expiresAt = Date.now() + 1000 * 60 * 60 * 24;
  }

  const tokenData = {
    token,
    expiresAt
  };

  localStorage.setItem('jwtToken', JSON.stringify(tokenData));
};

const removeToken = (): void => {
  localStorage.removeItem('jwtToken');
}

const getTokenWithTTL = (): string | null => {
  const tokenDataStr = localStorage.getItem('jwtToken');
  if (!tokenDataStr) {
    return null;
  }
  
  try {
    const tokenData = JSON.parse(tokenDataStr);
    
    const now = Date.now();

    if (now >= tokenData.expiresAt) {
      removeToken();
      return null;
    }
    
    return tokenData.token;
  }
  catch (error) {
    removeToken();
    return null;
  }
};

const hashPassword = async (password: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    throw new Error('Failed to hash password');
  }
};

export const scheduleService = {
  async getAvailability(date: string): Promise<{ success: boolean; slots?: TimeSlot[]; message?: string } > {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/schedule/meet/availability?date=${date}`);
      const data = await response.json();
      const availableSlots = data.data.availableSlots;
      
      const slots: TimeSlot[] = [];
      for (let hour = 9; hour < 18; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        const expectedISOString = `${date}T${time}:00`;

        const available = availableSlots.includes(expectedISOString);
        
        slots.push({ time, available });
      }
      
      return { success: true, slots };
    }
    catch (error) {
      return { success: false, message: 'Error fetching availability. Please try again later.' };
    }
  },

  async initiateMeeting(booking: BookingRequest, token: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/schedule/meet/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-recaptcha-v3-token': token
        },
        body: JSON.stringify(booking),
      });
      const data = await response.json();
      const status = data.status;
      
      if (status === 200) {
        return {
          success: true,
          message: `Successfully initiated meeting schedule for ${booking.scheduleTime.split('T')[0]} at ${booking.scheduleTime.split('T')[1]},\nplease check your email (and SPAM folder) for next steps...`
        };
      }
      else {
        return {
          success: false,
          message: data.message
        };
      }
    } catch (error) {
      throw error;
    }
  },

  async getScheduledCalls(): Promise<{ success: boolean; scheduledCalls?: ScheduledCall[], message?: string }> {
    try {
      const token = getTokenWithTTL();
      if (!token) {
        return { success: false, message: 'No authentication token found. Please login again.' };
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/schedule/meet/fetch`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch scheduled calls' }));
        return { success: false, message: errorData.message || `Error: ${response.status}` };
      }

      const data = await response.json();
      
      if (response.status === 200) {
        return { success: true, scheduledCalls: data.data.scheduleList as ScheduledCall[] };
      }
      else {
        return { success: false, message: data.message || 'Failed to fetch scheduled calls' };
      }
    } 
    catch (error) {
      return { success: false, message: 'Error fetching scheduled calls. Please try again later.' };
    }
  },

  async isUserLoggedIn(): Promise<LoggedInUserDetails | null> {
    try {
      const token = getTokenWithTTL();
      if (!token) {
        return null;
      }
      
      const decoded = decodeJWT(token);
      if (decoded && decoded.loggedInUserDetails) {
        return decoded.loggedInUserDetails;
      }
      
      return null;
    }
    catch (error) {
      throw error;
    }
  },

  async signup(signUpDetails: SignUpDetails): Promise<{ success: boolean; message: string }> {
    try {
      const hashedPassword = await hashPassword(signUpDetails.password);
      const request = {
        ...signUpDetails,
        password: hashedPassword
      };

      const response = await fetch(`${process.env.REACT_APP_AUTH_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      const status = data.status;
      
      if (status === 201) {
        return { success: true, message: 'Sign up successful. Please check your email (and SPAM folder) verify your account.' };
      }
      else {
        return { success: false, message: data.message };
      }
    }
    catch (error) {
      return { success: false, message: 'Error signing up. Please try again later.' };
    }
  },

  async login(loginDetails: LoginDetails): Promise<{ success: boolean, message?: string }> {
    try {
      const hashedPassword = await hashPassword(loginDetails.password);
      const request = {
        ...loginDetails,
        password: hashedPassword
      };

      const response = await fetch(`${process.env.REACT_APP_AUTH_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      const status = data.status;

      if (status === 200) {
        setTokenWithTTL(data.token);
        return { success: true };
      }
      else {
        return { success: false, message: data.error };
      }
    }
    catch (error) {
      return { success: false, message: 'Error logging in. Please try again later.' };
    }
  },

  async logout(): Promise<{ success: boolean }> {
    try {
      removeToken();
      return { success: true };
    }
    catch (error) {
      return { success: false };
    }
  }

}