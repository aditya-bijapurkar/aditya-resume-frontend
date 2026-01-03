import React, { useState } from 'react';
import { scheduleService, TimeSlot, UserDetails } from '../services/scheduleService';
import { useRecaptcha, RECAPTCHA_ACTIONS } from '../services/recaptchaService';
import './css/ScheduleModal.css';
import { NotificationInterface } from './props/NotificationInterface';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  setNotification: (notification: NotificationInterface) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, setNotification }) => {
  const { executeRecaptcha, isRecaptchaAvailable } = useRecaptcha();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails[]>([
    { firstName: '', lastName: '', emailId: '' }
  ]);

  const resetForm = () => {
    setSelectedDate('');
    setSelectedTime('');
    setTimeSlots([]);
    setDescription('');
    setLoading(false);
    setIsSubmitting(false);
    setUserDetails([{ firstName: '', lastName: '', emailId: '' }]);
  }

  const closeModal = () => {
    resetForm();
    onClose();
  }

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      slots.push({ time, available: false });
    }
    return slots;
  };

  const fetchAvailability = async (date: string) => {
    setLoading(true);
    try {
      const slots = await scheduleService.getAvailability(date);
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching availability:', error);
      setTimeSlots(generateTimeSlots());
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    if (date) {
      fetchAvailability(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const updateUserDetails = (index: number, field: keyof UserDetails, value: string) => {
    const updatedUsers = [...userDetails];
    updatedUsers[index] = { ...updatedUsers[index], [field]: value };
    setUserDetails(updatedUsers);
  };

  const addUser = () => {
    setUserDetails([...userDetails, { firstName: '', lastName: '', emailId: '' }]);
  };

  const removeUser = (index: number) => {
    if (userDetails.length > 1) {
      const updatedUsers = userDetails.filter((_, i) => i !== index);
      setUserDetails(updatedUsers);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isRecaptchaAvailable) {
      showNotification('ReCaptcha verification failed. Please refresh the page and try again.', 'error');
      return;
    }

    const validUsers = userDetails.filter(user => 
      user.firstName.trim() && user.lastName.trim() && user.emailId.trim()
    );
    
    if(validUsers.length !== userDetails.length) {
      showNotification('Please fill in all attendee\'s required details.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = await executeRecaptcha(RECAPTCHA_ACTIONS.SCHEDULE_MEETING);
      
      if (selectedDate && selectedTime) {
        const result = await scheduleService.initiateMeeting(
          {
            description: description,
            scheduleTime: `${selectedDate}T${selectedTime}:00`,
            requiredUsers: validUsers
          },
          token
        );
        
        if (result.success) {
          showNotification(result.message, 'success');
        } else {
          showNotification(result.message, 'error');
        }
      }
    }
    catch (error) {
      console.error('Error during form submission:', error);
      if (error instanceof Error && error.message.includes('recaptcha')) {
        showNotification('ReCaptcha verification failed. Please try again.', 'error');
      }
      else {
        showNotification('An error occurred while scheduling the meeting. Please try again.', 'error');
      }
    }
    finally {
      closeModal();
    }
  };

  const getMinDate = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const IST_OFFSET = 5.5 * 60 * 60000;
    const today = new Date(utc + IST_OFFSET);
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const IST_OFFSET = 5.5 * 60 * 60000;
    const maxDate = new Date(utc + IST_OFFSET);
    maxDate.setDate(now.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="schedule-modal-overlay" onClick={closeModal}>
      <div className="schedule-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="schedule-modal-header">
          <h2>Schedule a Call</h2>
          <button className="schedule-close-button" onClick={closeModal}>×</button>
        </div>
      
        <div className="schedule-modal-body">
          <div className="schedule-date-selection">
            <label htmlFor="date-picker">Select Date:</label>
            <p className="schedule-date-picker-note">All dates and times are as per IST (UTC+5:30).</p>
            <input
              type="date"
              id="date-picker"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker()}
              min={getMinDate()}
              max={getMaxDate()}
            />
          </div>

          {selectedDate && (
            <>
              <div className="schedule-time-selection">
                <h3>Available Time Slots for {selectedDate} (IST)</h3>
                {loading ? (
                  <div className="schedule-loading">Loading available slots...</div>
                ) : (
                  <div className="schedule-time-slots">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        className={`schedule-time-slot ${!slot.available ? 'schedule-unavailable' : ''} ${
                          selectedTime === slot.time ? 'schedule-selected' : ''
                        }`}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                      >
                        {slot.time}
                        {slot.available ? <span className="schedule-available-text">Available</span> : <span className="schedule-unavailable-text">Unavailable</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="schedule-form-group">
                <label htmlFor="description">Enter a meeting agenda</label>
                <input
                  type="text"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </>
          )}

          {selectedDate && selectedTime && !loading && (
            <form>
              <div className="schedule-user-details-section">
                <h3>Attendee Details</h3>
                {userDetails.map((user, index) => (
                  <div key={index} className="schedule-user-form">
                    <div className="schedule-user-header">
                      <h4>Attendee {index + 1}</h4>
                      {userDetails.length > 1 && (
                        <button 
                          type="button" 
                          className="schedule-remove-user-btn"
                          onClick={() => removeUser(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="schedule-form-row">
                      <div className="schedule-form-group">
                        <label htmlFor={`firstName-${index}`}>First Name *</label>
                        <input
                          type="text"
                          id={`firstName-${index}`}
                          value={user.firstName}
                          onChange={(e) => updateUserDetails(index, 'firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="schedule-form-group">
                        <label htmlFor={`lastName-${index}`}>Last Name *</label>
                        <input
                          type="text"
                          id={`lastName-${index}`}
                          value={user.lastName}
                          onChange={(e) => updateUserDetails(index, 'lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="schedule-form-group">
                      <label htmlFor={`email-${index}`}>Email *</label>
                      <input
                        type="email"
                        id={`email-${index}`}
                        value={user.emailId}
                        onChange={(e) => updateUserDetails(index, 'emailId', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
                
                <button 
                  type="button" 
                  className="btn btn-secondary schedule-add-user-btn"
                  onClick={addUser}
                >
                  + Add Another Attendee
                </button>
              </div>

              <div className="schedule-booking-summary">
                <h3>Booking Summary</h3>
                <p>Date: {selectedDate}</p>
                <p>Time: {selectedTime}</p>
                <p>Attendees: {userDetails.length}</p>
                <button
                  className="btn btn-primary schedule-book-button"
                  type='submit'
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Meeting Schedule'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal; 