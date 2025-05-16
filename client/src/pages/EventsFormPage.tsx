import axios from 'axios';
import { useEffect, useState } from 'react';
import PhotosUploader from '../PhotosUploader';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import LocationSearch from '../LocationSearch';

export default function EventsFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/account/events/${id}`, { withCredentials: true })
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setExtraInfo(data.extraInfo);
        setDate(data.date);
        setTime(data.time);
        setPrice(data.price);
      });
  }, [id]);

  function inputHeader(text: string) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text: string) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header: string, description: string) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveEvent(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const eventData = {
      title,
      address,
      photos: addedPhotos,
      description,
      extraInfo,
      date: date,
      time: time,
      price: price,
    };
    if (id) {
      await axios.put(
        `/account/events`,
        { id, ...eventData },
        { withCredentials: true }
      );
      setRedirect(true);
    } else {
      await axios.post(`/account/events`, eventData, {
        withCredentials: true,
      });
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={'/account/events'} />;
  }
  return (
    <div>
      <AccountNav />
      <form onSubmit={saveEvent}>
        {preInput('Title', 'Title for your event')}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely event"
        />
        {preInput('Address', 'Address to this event')}
        <LocationSearch onSelect={(address) => setAddress(address)} />
        {preInput('Photos', 'More = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'description of the event')}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput('Extra info', 'event rules, etc')}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput('Date & time', 'add date & time of the event')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Date</h3>
            <input
              type="text"
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
              placeholder="14/01/2025"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Time</h3>
            <input
              type="text"
              value={time}
              onChange={(ev) => setTime(ev.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per guest</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(Number(ev.target.value))}
            />
          </div>
        </div>
        <button type="submit" className="primary my-4">
          Save
        </button>
      </form>
    </div>
  );
}
