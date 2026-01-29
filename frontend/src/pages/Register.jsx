import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import heroImg from "../assets/salon.png";
import Button from "../components/Button";
import Swal from "sweetalert2";
function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    role: "client",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", formData);
      Swal.fire({
        title: "USPEŠNO!",
        text: "Uspešno ste se registrovali! Sada se možete prijaviti.",
        icon: "success",
        confirmButtonColor: "#705B46",
        borderRadius: "20px",
        fontFamily: "Cormorant Garamond",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
              title: "GREŠKA",
              text: "Greška pri registraciji. Pokušajte ponovo!",
              icon: "error",
              confirmButtonColor: "#705B46",
            });
      console.log(error.error);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <img
        src={heroImg}
        className="absolute inset-0 w-full h-full object-cover blur-xs scale-110"
        alt="Salon"
      />{" "}
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="z-50 bg-[#F8F7F3] rounded-4xl md:m-32 md:py-15 md:px-28 py-10 px-8 m-8 text-[#705B46] text-center">
        <h1 className="font-cormorant uppercase text-3xl md:text-4xl pb-10 tracking-wider">
          Registracija korisnika
        </h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ime"
            value={formData.first_name}
            className="border-b border-[#705B46] p-3 bg-transparent outline-none font-montserrat text-sm"
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          ></input>
          <input
            type="text"
            placeholder="Prezime"
            value={formData.last_name}
            className="border-b border-[#705B46] p-3 bg-transparent outline-none font-montserrat text-sm"
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          ></input>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="border-b border-[#705B46] p-3 bg-transparent outline-none font-montserrat text-sm"
          />
          <input
            type="text"
            placeholder="Telefon"
            value={formData.phone}
            className="border-b border-[#705B46] p-3 bg-transparent outline-none font-montserrat text-sm"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="border-b border-[#705B46] p-3 bg-transparent outline-none font-montserrat text-sm"
          />
          <Button
            text="PRIJAVI SE"
            variant="secondary"
            className="text-[12px] md:text-sm"
            type="submit"
          ></Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
