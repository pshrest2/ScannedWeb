import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import './App.scss';
import Camera from './Pages/Camera';
import Upload from './Pages/Upload';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/camera" element={<Camera />} />
    </Routes>
  );
}

export default App;
