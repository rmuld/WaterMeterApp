import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import AddNewWaterMeter from './components/AddNewWaterMeter';
import AddNewAddress from './components/AddNewAddress';
import './App.css';



function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={ <SignUp />} />
        <Route path='/new-watermeter' element={ <AddNewWaterMeter />} />
        <Route path='/new-address' element={ <AddNewAddress />} />
      </Routes>
    </Router>
  </>

  );
}

export default App;
