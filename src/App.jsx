import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
/*
import LoginOptions from './pages/LoginOptions/LoginOptions';
*/
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import User from './pages/User/User';
import About from './pages/About/About';
import Admin from './pages/Admin/Admin';
import Contact from './pages/Contact/Contact';
import EventDetails from './pages/EventDetails/EventDetails';
import Events from './pages/Events/Events';
import StorageManager from './pages/StorageManager/StorageManager';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/*
            <Route path="/loginoptions" element={<LoginOptions />} />
            */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/storage-manager" element={<StorageManager />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 