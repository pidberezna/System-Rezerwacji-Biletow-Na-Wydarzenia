import { useContext, useEffect, useState } from 'react';
import { Event } from './pages/EventsPage';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

interface BookingWidgetProps {
  event: Event;
}

export default function BookingWidget({ event }: BookingWidgetProps) {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  async function bookThisEvent() {
    const response = await axios.post(
      `/account/bookings`,
      {
        numberOfGuests,
        name,
        email,
        phone,
        event: event._id,
        price: numberOfGuests * event.price,
      },
      { withCredentials: true }
    );
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${event.price} / per guest
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(Number(ev.target.value))}
          />
        </div>
        {numberOfGuests > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisEvent} className="primary mt-4 ">
        Book this event for{' '}
        {numberOfGuests > 0 && <span>${numberOfGuests * event.price}</span>}
      </button>
    </div>
  );
}
