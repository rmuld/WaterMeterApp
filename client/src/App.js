import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login, { setAuthToken } from './user/pages/Login';
import AddNewWaterMeter from './watermeter/AddNewWaterMeter';
import AddNewAddress from './address/AddNewAddress';
import WaterUsage from './user/pages/WaterUsage';

import Register from './user/pages/Register';


function App() {
  //const { token, login, logout, userId } = useAuth();

  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={ <Register />} />
  
        {/* <Route path='/user/:id' element={ <UserItem />} /> */}
        <Route path='/new-watermeter' element={<AddNewWaterMeter />} />
        <Route path='/new-address' element={ <AddNewAddress />} />
        <Route path='/waterusage' element={ <WaterUsage />} />
 
      </Routes>
    </Router>

  );
}

export default App;
