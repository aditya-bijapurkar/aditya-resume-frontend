import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export interface RecaptchaHook {
  executeRecaptcha: (action: string) => Promise<string>;
  isRecaptchaAvailable: boolean;
}

export const useRecaptcha = (): RecaptchaHook => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const executeRecaptchaWithErrorHandling = async (action: string): Promise<string> => {
    if (!executeRecaptcha) {
      throw new Error('ReCaptcha is not available. Please refresh the page and try again.');
    }

    try {
      return await executeRecaptcha(action);
    } 
    catch (error) {
      console.error('ReCaptcha execution failed:', error);
      throw new Error('ReCaptcha verification failed. Please try again.');
    }
  };

  return {
    executeRecaptcha: executeRecaptchaWithErrorHandling,
    isRecaptchaAvailable: !!executeRecaptcha
  };
};

export const RECAPTCHA_ACTIONS = {
  SCHEDULE_MEETING: 'schedule_meeting',
  CONTACT_FORM: 'contact_form',
} as const;

export type RecaptchaAction = typeof RECAPTCHA_ACTIONS[keyof typeof RECAPTCHA_ACTIONS]; 