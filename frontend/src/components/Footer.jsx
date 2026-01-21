import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoMail,
  IoCall,
  IoLocation,
} from "react-icons/io5";

function Footer() {
  return (
    <footer className="bg-[#705B46] text-[#F8F7F3] pt-16 pb-8 px-10 md:px-20 font-montserrat">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#EBE5D7]/20 pb-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-cormorant text-3xl mb-4 italic tracking-widest uppercase">
            STUDIO <br />{" "}
            <span className="text-sm tracking-[0.5em] not-italic opacity-80">
              NURO
            </span>
          </h3>
          <p className="text-[10px] md:text-xs opacity-70 leading-relaxed uppercase tracking-widest mb-6 max-w-xs">
            Vaša lepota je naša misija. Dođite i uverite se u vrhunski kvalitet
            i profesionalizam.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#EBE5D7] transition-colors">
              <IoLogoInstagram size={20} />
            </a>
            <a href="#" className="hover:text-[#EBE5D7] transition-colors">
              <IoLogoFacebook size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-semibold mb-6 text-sm tracking-[0.2em] uppercase">
            Kontakt
          </h4>
          <ul className="text-xs space-y-4 opacity-80 uppercase tracking-tighter font-light">
            <li className="flex items-center gap-3">
              <IoLocation size={16} /> Vojvode Stepe, Beograd
            </li>
            <li className="flex items-center gap-3">
              <IoCall size={16} /> +381 11 123 4567
            </li>
            <li className="flex items-center gap-3">
              <IoMail size={16} /> salon@nuro.rs
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-semibold mb-6 text-sm tracking-[0.2em] uppercase">
            Radno vreme
          </h4>
          <ul className="text-xs space-y-2 opacity-80 uppercase tracking-widest font-light">
            <li className="flex justify-between w-full gap-8">
              <span>Pon - Pet:</span> <span>09:00 - 20:00</span>
            </li>
            <li className="flex justify-between w-full gap-8">
              <span>Subota:</span> <span>09:00 - 16:00</span>
            </li>
            <li className="flex justify-between w-full gap-8 text-red-300">
              <span>Nedelja:</span> <span>Zatvoreno</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-8 text-[9px] opacity-40 uppercase tracking-[0.3em]">
        © 2026 STUDIO NURO | VAŠ OMILJENI KUTAK ZA STIL I NEGU
      </div>
    </footer>
  );
}

export default Footer;
