import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Footer from "./components/Footer";

import { useLocation } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHairdressers from "./pages/AdminHairdressers";

function AppContent() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/hairdressers" element={<AdminHairdressers />} />
      </Routes>

      {!isLoginPage && !isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
