import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import OrgSignUp from './components/OrgSignUp';
import DisplayServices from './components/DisplayServices';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import YourBookings from './pages/YourBookings';
import AddService from './components/AddService';
import YourService from './components/YourService';
function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usersignup" element={<UserSignUp/>}/>
        <Route path="/orgsignup" element={<OrgSignUp/>}/>
        <Route path="/service" element={<DisplayServices/>}/>
        <Route path="/dashboardu" element={<UserDashboard/>}/>
        <Route path="/yourbookings" element={<YourBookings/>}/>
        <Route path="/dashboarda" element={<AdminDashboard/>}/>
        <Route path="/addservice" element={<AddService />} />
        <Route path="/yourservice" element={<YourService />} />
      </Routes>
  );
}

export default App;
