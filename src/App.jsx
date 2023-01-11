import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Unauthorized from './Pages/Unauthorized';
import NotFound from './Pages/NotFound';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Pages/Loading';
import './App.scss';
import BackgroundContainer from './Components/Common/BackgroundContainer';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;
  return (
    <BackgroundContainer className="app">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BackgroundContainer>
  );
}

export default App;
