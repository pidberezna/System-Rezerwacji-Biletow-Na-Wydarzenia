import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './pages/Account';
import EventsPage from './pages/EventsPage';
import EventsFormPage from './pages/EventsFormPage';
import EventPage from './pages/EventPage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/events" element={<EventsPage />} />
          <Route path="/account/events/new" element={<EventsFormPage />} />
          <Route path="/account/events/:id" element={<EventsFormPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
