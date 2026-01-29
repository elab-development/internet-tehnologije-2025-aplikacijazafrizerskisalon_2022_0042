import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("user_role");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#705B46] shadow-sm justify-between items-center flex w-full px-4 py-2 box-border overflow-hidden">
      <h1 className="font-cormorant tracking-widest text-2xl text-[#F8F7F3]">
        NURO
      </h1>

      <div className="text-[#F8F7F3] md:flex items-center gap-5 hidden">
        {token && userRole === "hairdresser" ? (
          <button
            onClick={handleLogout}
            className="hover:text-[#E8E7E3] transition-colors uppercase cursor-pointer"
          >
            Odjavi se
          </button>
        ) : (
          <>
            <Link to="/" className="hover:text-[#E8E7E3] transition-colors">
              Početna
            </Link>
            <Link
              to="/services"
              className="hover:text-[#E8E7E3] transition-colors"
            >
              Usluge
            </Link>
            {token ? (
              <>
                <Link
                  to="/reservation"
                  className="hover:text-[#E8E7E3] transition-colors"
                >
                  Rezervisi
                </Link>
                <Link
                  to="/my-reservations"
                  className="hover:text-[#E8E7E3] transition-colors"
                >
                  Moje rezervacije
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-[#E8E7E3] transition-colors uppercase cursor-pointer"
                >
                  Odjavi se
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hover:text-[#E8E7E3] transition-colors"
              >
                Prijavi se
              </Link>
            )}
          </>
        )}
      </div>

      <button onClick={toggleMenu} className="md:hidden text-[#F8F7F3] z-110">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`fixed inset-0 bg-[#705B46] transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col items-center justify-center z-100`}
      >
        <div className="flex flex-col gap-8 text-center">
          {token && userRole === "hairdresser" ? (
            <button
              onClick={handleLogout}
              className="text-[#F8F7F3] text-2xl font-cormorant tracking-widest uppercase cursor-pointer"
            >
              Odjavi se
            </button>
          ) : (
            <>
              <Link
                to="/"
                onClick={toggleMenu}
                className="text-[#F8F7F3] text-2xl font-cormorant tracking-widest uppercase"
              >
                Početna
              </Link>
              <Link
                to="/services"
                onClick={toggleMenu}
                className="text-[#F8F7F3] text-2xl font-cormorant tracking-widest uppercase"
              >
                Usluge
              </Link>
              {token ? (
                <>
                  <Link
                    to="/reservation"
                    onClick={toggleMenu}
                    className="text-[#F8F7F3] text-2xl font-cormorant tracking-widest uppercase"
                  >
                    Rezervisi
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[#F8F7F3] text-2xl font-cormorant tracking-widest uppercase cursor-pointer"
                  >
                    Odjavi se
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="text-[#F8F7F3] text-2xl font-cormorant tracking-widest uppercase"
                >
                  Prijavi se
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
