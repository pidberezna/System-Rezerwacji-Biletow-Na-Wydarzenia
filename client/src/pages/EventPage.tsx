import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Event } from './EventsPage';
import BookingWidget from '../BookingWidget';
import EventGallery from '../EventGallery';
import AddressLink from '../AddressLink';

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event>();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/account/events/${id}`, { withCredentials: true })
      .then((response) => {
        setEvent(response.data);
      });
  }, [id]);
  if (!event) return '';
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{event.title}</h1>
      <AddressLink>{event.address}</AddressLink>
      <EventGallery event={event} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {event.description}
          </div>
          Date: {event.date}
          <br />
          Time: {event.time}
          <br />
        </div>
        <div>
          <BookingWidget event={event} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {event.extraInfo}
        </div>
      </div>
    </div>
  );
}
