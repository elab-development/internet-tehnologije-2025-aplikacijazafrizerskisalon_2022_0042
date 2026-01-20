import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  return (
    <nav className="bg-[#705B46] shadow-sm justify-between items-center flex w-full px-4 py-2">
      <h1 className="font-cormorant tracking-widest text-2xl text-[#F8F7F3]">
        NURO
      </h1>
      <div className="text-[#F8F7F3] flex items-center gap-5">
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
    </nav>
  );
}

export default Navbar;
