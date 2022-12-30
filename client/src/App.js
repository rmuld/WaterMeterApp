import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login, { setAuthToken } from './user/pages/Login';
import AddNewWaterMeter from './watermeter/AddNewWaterMeter';
import AddNewAddress from './address/AddNewAddress';
import WaterUsage from './user/pages/WaterUsage';

import Register from './user/pages/Register';
import { AuthContext } from './shared/context/AuthContext';
import { useAuth } from './shared/hooks/AuhtHook';
import MainHeader from './shared/components/Mainheader';


function App() {
  const { token, login, logout } = useAuth();

  // const token = localStorage.getItem("token");
  // if (token) {
  //     setAuthToken(token);
  // }

  let routes;

  if (token) {
    routes = (
      <Routes>
          {/* <Route path='/user/:id' element={ <UserItem />} /> */}
          <Route path='/new-watermeter' element={<AddNewWaterMeter />} />
          <Route path='/new-address' element={ <AddNewAddress />} />
          <Route path='/waterusage' element={ <WaterUsage />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    );
  }
  
  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, login: login, logout: logout} }>
      <Router>
        <MainHeader/>
          {routes}
        </Router>
    </AuthContext.Provider>
  );
}

export default App;
