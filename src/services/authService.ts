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

const getAuthBaseUrl = (): string => {
  const base = process.env.REACT_APP_AUTH_BASE_URL;
  if (!base) {
    throw new Error('REACT_APP_AUTH_BASE_URL is not set');
  }
  return base.replace(/\/$/, '');
};

const hashPassword = async (password: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch {
    throw new Error('Failed to hash password');
  }
};

export const authService = {

  async getCurrentUser(): Promise<LoggedInUserDetails | null> {
    try {
      const response = await fetch(`${getAuthBaseUrl()}/me`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (data?.user?.username) {
        return { username: data.user.username };
      }
      return null;
    } catch {
      return null;
    }
  },

  async signup(signUpDetails: SignUpDetails): Promise<{ success: boolean; message: string }> {
    try {
      const hashedPassword = await hashPassword(signUpDetails.password);
      const response = await fetch(`${getAuthBaseUrl()}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...signUpDetails, password: hashedPassword }),
      });
      const data = await response.json();
      const status = response.status;

      if (status === 201) {
        return { success: true, message: 'Sign up successful. Check your email (and SPAM folder) to verify your account.' };
      }
      return { success: false, message: data.message ?? 'Sign up failed.' };
    } catch {
      return { success: false, message: 'Error signing up. Please try again later.' };
    }
  },

  async login(loginDetails: LoginDetails): Promise<{ success: boolean; message?: string }> {
    try {
      const hashedPassword = await hashPassword(loginDetails.password);
      const response = await fetch(`${getAuthBaseUrl()}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...loginDetails, password: hashedPassword }),
        credentials: 'include',
      });
      const data = await response.json();
      const status = response.status;

      if (status === 200) {
        return { success: true };
      }
      return { success: false, message: data.error ?? data.message ?? 'Login failed.' };
    } catch {
      return { success: false, message: 'Error logging in. Please try again later.' };
    }
  },

  async logout(): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${getAuthBaseUrl()}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      
      return { success: response.ok, message: data.message ?? 'Logout failed.' };
    } catch {
      return { success: false, message: 'Error logging out. Please try again later.' };
    }
  },
  
};
