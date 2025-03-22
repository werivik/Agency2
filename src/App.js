import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*Pages*/
import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import EventDetails from './pages/EventDetails/EventDetails';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Admin from './pages/Admin/Admin';
import User from './pages/User/User';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

/*Components*/
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <Router>
      
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />

    </Router>
  );
}

export default App;