import axios from 'axios';
import { useEffect, useState } from 'react';
import { Event } from './EventsPage';
import { Link } from 'react-router-dom';
import Image from '../Image.tsx';

export default function IndexPage() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    axios.get(`/account/events`, { withCredentials: true }).then((response) => {
      setEvents(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.length > 0 &&
        events.map((event) => (
          <Link to={'/event/' + event._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {event.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={event.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{event.address}</h2>
            <h3 className="text-sm text-gray-500">{event.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${event.price}</span> per guest
            </div>
          </Link>
        ))}
    </div>
  );
}
