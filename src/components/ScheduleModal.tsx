import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import React, { useState } from 'react';
import { scheduleService, TimeSlot, UserDetails } from '../services/scheduleService';
import './ScheduleModal.css';
import { NotificationInterface } from './props/NotificationInterface';

const RECAPTCHA_SITE_KEY = process.env.GOOGLE_RECAPCHA_V3_SITE_KEY;
interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  setNotification: (notification: NotificationInterface) => void;
}

const ScheduleModalContent: React.FC<ScheduleModalProps> = ({ isOpen, onClose, setNotification }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails[]>([
    { firstName: '', lastName: '', emailId: '' }
  ]);

  const resetForm = () => {
    setSelectedDate('');
    setSelectedTime('');
    setTimeSlots([]);
    setDescription('');
    setLoading(false);
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

  const handleSubmit = async () => {
    if(!executeRecaptcha) {
      showNotification('ReCaptcha V3 could not verify you are not a robot.', 'error');
      closeModal();
      return;
    }

    const token = await executeRecaptcha('schedule_meeting');
    
    if (selectedDate && selectedTime && userDetails.length > 0) {
      const validUsers = userDetails.filter(user => 
        user.firstName.trim() && user.lastName.trim() && user.emailId.trim()
      );
      
      if (validUsers.length === 0) {
        showNotification('Please fill in at least one attendee\'s details.', 'error');
        return;
      }
      
      try {
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
        }
        else {
          showNotification(result.message, 'error');
        }
      }
      catch (error) {
        console.error('Error booking slot:', error);
        showNotification('Some error occurred. Please try again.', 'error');
      }
      finally {
        closeModal();
      }
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Schedule a Call</h2>
          <button className="close-button" onClick={closeModal}>×</button>
        </div>
      
        <div className="modal-body">
          <div className="date-selection">
            <label htmlFor="date-picker">Select Date:</label>
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
              <div className="time-selection">
                <h3>Available Time Slots for {selectedDate} (IST)</h3>
                {loading ? (
                  <div className="loading">Loading available slots...</div>
                ) : (
                  <div className="time-slots">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        className={`time-slot ${!slot.available ? 'unavailable' : ''} ${
                          selectedTime === slot.time ? 'selected' : ''
                        }`}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                      >
                        {slot.time}
                        {slot.available ? <span className="available-text">Available</span> : <span className="unavailable-text">Unavailable</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="form-group">
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
            <div className="user-details-section">
              <h3>Attendee Details</h3>
              {userDetails.map((user, index) => (
                <div key={index} className="user-form">
                  <div className="user-header">
                    <h4>Attendee {index + 1}</h4>
                    {userDetails.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-user-btn"
                        onClick={() => removeUser(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`firstName-${index}`}>First Name *</label>
                      <input
                        type="text"
                        id={`firstName-${index}`}
                        value={user.firstName}
                        onChange={(e) => updateUserDetails(index, 'firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
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
                  <div className="form-group">
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
                className="btn btn-secondary add-user-btn"
                onClick={addUser}
              >
                + Add Another Attendee
              </button>
            </div>
          )}

          {selectedDate && selectedTime && !loading && (
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <p>Date: {selectedDate}</p>
              <p>Time: {selectedTime}</p>
              <p>Attendees: {userDetails.length}</p>
              <button
                className="btn btn-primary book-button" 
                onClick={handleSubmit}
              >
                Confirm Meeting Schedule
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScheduleModal: React.FC<ScheduleModalProps> = (props) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY || ''}>
      <ScheduleModalContent {...props} />
    </GoogleReCaptchaProvider>
  );
};

export default ScheduleModal; 