export interface NotificationInterface {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
    duration?: number;
}