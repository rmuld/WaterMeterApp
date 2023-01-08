import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './user/pages/Login';
import LandingPage from './user/pages/LandingPage';
import AddNewWaterUsage from './user/pages/AddNewWaterUsage';
import WaterUsage from './user/pages/WaterUsage';
import Register from './user/pages/Register';
import { AuthContext } from './shared/context/AuthContext';
import { useAuth } from './shared/hooks/AuhtHook';
import MainHeader from './shared/components/Mainheader';


function App() {
  const { token, login, logout } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        {/* <Route path='/user/:id' element={ <UserItem />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path='/waterusage' element={<WaterUsage />} />
        <Route path='/new-waterusage' element={<AddNewWaterUsage />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<Login />} />
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
