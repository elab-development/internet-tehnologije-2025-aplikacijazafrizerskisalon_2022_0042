import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Footer from "./components/Footer";

import { useLocation } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHairdressers from "./pages/AdminHairdressers";
import AdminSchedules from "./pages/AdminSchedules";
import Register from "./pages/Register";
import MyReservations from "./pages/MyReservations";

function AppContent() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("user_role");
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/reservation"
          element={token ? <Reservation /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-reservations"
          element={token ? <MyReservations /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={
            token && (userRole === "admin" || userRole === "hairdresser") ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/hairdressers"
          element={
            token && (userRole === "admin" || userRole === "hairdresser") ? (
              <AdminHairdressers />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/schedules"
          element={
            token && (userRole === "admin" || userRole === "hairdresser") ? (
              <AdminSchedules />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      {!isLoginPage && !isAdminPage && !isRegisterPage && <Footer />}
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
