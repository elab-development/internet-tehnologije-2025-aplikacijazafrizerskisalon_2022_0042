import { Link } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#705B46] shadow-sm justify-between items-center flex w-full px-4 py-2 box-border overflow-hidden">
      <h1 className="font-cormorant tracking-widest text-2xl text-[#F8F7F3]">
        NURO
      </h1>
      <div className="text-[#F8F7F3] md:flex items-center gap-5 hidden">
        <Link to="/" className="hover:text-[#E8E7E3] transition-colors">
          Početna
        </Link>
        <Link to="/services" className="hover:text-[#E8E7E3] transition-colors">
          Usluge
        </Link>
        <Link
          to="/reservation"
          className="hover:text-[#E8E7E3] transition-colors"
        >
          Rezervacije
        </Link>
        <Link to="/login" className="hover:text-[#E8E7E3] transition-colors">
          Prijavi se
        </Link>
      </div>

      <button onClick={toggleMenu} className="md:hidden text-[#F8F7F3] z-110">
        {isOpen ? <X size={28}></X> : <Menu size={28}></Menu>}
      </button>

      <div
        className={`fixed inset-0 bg-[#705B46] transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col items-center justify-center z-100`}
      >
        <div className="flex flex-col gap-8 text-center">
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
          <Link
            to="/reservation"
            onClick={toggleMenu}
            className="text-[#F8F7F3] text-2xl font-cormorant tracking-widest uppercase"
          >
            Rezervacije
          </Link>
          <Link
            to="/login"
            onClick={toggleMenu}
            className="text-[#F8F7F3] text-2xl font-cormorant tracking-widest uppercase"
          >
            Prijavi se
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
