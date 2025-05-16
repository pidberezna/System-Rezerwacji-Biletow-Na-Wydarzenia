import { Link } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EventImg from '../EventImg';

export interface Event {
  _id: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  extraInfo: string;
  date: string;
  time: string;
  price: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    axios.get(`/user-events`, { withCredentials: true }).then(({ data }) => {
      setEvents(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={'/account/events/new'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new event
        </Link>
      </div>
      <div className="mt-4">
        {events.length > 0 &&
          events.map((event) => (
            <Link
              to={'/account/events/' + event._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <EventImg event={event} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{event.title}</h2>
                <p className="text-sm mt-2">{event.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
