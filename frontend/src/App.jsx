import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Reservation from './pages/Reservation';
import Login from './pages/Login';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8F7F3]/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;