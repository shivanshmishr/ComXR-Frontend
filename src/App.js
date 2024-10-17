import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeForm } from './pages/HomeForm';
import { BookingDashboard } from './pages/BookingDashboard';
import { DashboardDetails } from './pages/DashboardDetails';

function App() {

  const apiUrl = process.env.REACT_APP_API_URL;
  console.log("Api Url: ", apiUrl);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeForm />} />
        <Route path="/bookingdashboard" element={<BookingDashboard />} />
        <Route path="/bookingconfirmslot" element={<DashboardDetails />} />
      </Routes>
    </Router  >
  );
}

export default App;