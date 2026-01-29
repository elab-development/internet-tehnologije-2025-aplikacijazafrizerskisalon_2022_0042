import { AppleIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios";
import Button from "./Button";
function AdminSidebar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="w-64 h-screen bg-[#705B46] text-[#F8F7F3] flex flex-col p-6 fixed left-0 top-0">
      <h2 className="font-cormorant text-2xl uppercase tracking-widest border-b border-[#F8F7F3]/20 pb-4 mb-10">
        Salon Admin
      </h2>
      <nav className="flex flex-col gap-4">
        <Link
          title="Usluge"
          to="/admin"
          className="hover:translate-x-2 transition-transform py-2 border-b border-transparent hover:border-[#F8F7F3]/30"
        >
          UPRAVLJANJE USLUGAMA
        </Link>
        <Link
          title="Rezervacije"
          to="/admin/reservations"
          className="hover:translate-x-2 transition-transform py-2 border-b border-transparent hover:border-[#F8F7F3]/30"
        >
          REZERVACIJE
        </Link>
        <Link
          title="Zaposleni"
          to="/admin/hairdressers"
          className="hover:translate-x-2 transition-transform py-2 border-b border-transparent hover:border-[#F8F7F3]/30"
        >
          ZAPOSLENI
        </Link>
        <Link
          title="Raspored zaposlenih"
          to="/admin/schedules"
          className="hover:translate-x-2 transition-transform py-2 border-b border-transparent hover:border-[#F8F7F3]/30"
        >
          RASPORED ZAPOSLENIH
        </Link>
        <Link
          title="Klijenti"
          to="/admin/clients"
          className="hover:translate-x-2 transition-transform py-2 border-b border-transparent hover:border-[#F8F7F3]/30"
        >
          KLIJENTI
        </Link>
        <Button
          onClick={handleLogout}
          variant="primary"
          text="ODJAVI SE"
        ></Button>
      </nav>
    </div>
  );
}

export default AdminSidebar;
