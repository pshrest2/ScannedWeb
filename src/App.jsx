import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import './App.scss';
import Signin from './Pages/Signin/Signin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Signin />} />
    </Routes>
  );
}

export default App;
