import React from 'react';
import { format, parse } from 'date-fns';

interface BookingDatesProps {
  className?: string;
  booking: {
    date: string;
    time: string;
    event: {
      date: string;
      time: string;
    };
  };
}

const BookingDates: React.FC<BookingDatesProps> = ({ booking }) => {
  const bookingDate = booking.date || booking.event?.date || '';
  const bookingTime = booking.time || booking.event?.time || '';

  const renderDate = () => {
    if (!bookingDate) return 'N/A';
    try {
      const parsedDate = parse(bookingDate, 'dd/MM/yyyy', new Date());
      return format(parsedDate, 'dd.MM.yyyy');
    } catch (error) {
      console.error('Invalid date format:', bookingDate);
      return 'Invalid date';
    }
  };

  const renderTime = () => {
    if (!bookingTime) return 'N/A';
    return bookingTime;
  };

  return (
    <div className="flex gap-1 items-center">
      <span className="text-gray-500">📅</span>
      <span>{renderDate()}</span>
      <span className="text-gray-500">🕒</span>
      <span>{renderTime()}</span>
    </div>
  );
};

export default BookingDates;
