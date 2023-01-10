import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Unauthorized from './Pages/Unauthorized';
import NotFound from './Pages/NotFound';
import ScannlyNav from './Components/ScannlyNav/ScannlyNav';
import { useAuth0 } from '@auth0/auth0-react';
import './App.scss';
import Loading from './Pages/Loading';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;
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
