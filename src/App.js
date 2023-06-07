import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import UserPage from './components/UserPage';
import Watchlist from './components/Watchlist';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/user-page" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
