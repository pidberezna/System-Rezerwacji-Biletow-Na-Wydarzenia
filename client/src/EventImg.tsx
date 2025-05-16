import { Event } from './pages/EventsPage';

export default function EventImg({
  event,
  index = 0,
  className = 'object-cover',
}: {
  event: Event;
  index?: number;
  className?: string;
}) {
  if (!event.photos?.length) return '';
  return (
    <img className={className} src={`/uploads/` + event.photos[index]} alt="" />
  );
}
