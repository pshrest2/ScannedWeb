import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Signin from './Pages/Signin';
import Unauthorized from './Pages/Unauthorized';
import NotFound from './Pages/NotFound';

import './App.scss';
import ScannlyNav from './Components/ScannlyNav/ScannlyNav';
import Register from './Pages/Register/Register';

function App() {
  return (
    <div className="app">
      <ScannlyNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
