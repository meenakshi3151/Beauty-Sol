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
import PrivateRoute from './components/PrivateRoute';
import YourService from './components/YourService';
function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usersignup" element={<UserSignUp/>}/>
        <Route path="/orgsignup" element={<OrgSignUp/>}/>
        <Route path="/service" element={<PrivateRoute Component={YourBookings}/>}/>
        <Route path="/dashboardu" element={<PrivateRoute Component={UserDashboard} />}/>
        <Route path="/yourbookings" element={<PrivateRoute Component={YourBookings}/>}/>
        <Route path="/dashboarda" element={<PrivateRoute Component={AdminDashboard}/>}/>
        <Route path="/addservice" element={<PrivateRoute Component={AddService}/>} />
        <Route path="/yourservice" element={<PrivateRoute Component={YourService}/>} />
      </Routes>
  );
}

export default App;
