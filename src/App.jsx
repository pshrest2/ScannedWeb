import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Unauthorized from './Pages/Unauthorized';
import NotFound from './Pages/NotFound';
import ScannlyNav from './Components/ScannlyNav/ScannlyNav';
import './App.scss';

function App() {
  return (
    <div className="app">
      <ScannlyNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
