import { useState } from "react";
import heroImg from "../assets/salon.png";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("Kliknuto na dugme!");
    if (e) e.preventDefault();
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      console.log("Šta je stiglo sa servera:", response.data);

      const token = response.data.access_token;
      const user = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user_role", user.role);
      if (user.role === "hairdresser") {
        navigate("/hairdresser/schedule");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Greška:", error);
      Swal.fire({
        title: "GREŠKA",
        text: "Pogrešni podaci za prijavu!",
        icon: "error",
        confirmButtonColor: "#705B46",
      });
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
      <div className="z-50 bg-[#F8F7F3] rounded-4xl md:m-32 md:py-20 md:px-28 py-20 px-8 m-8 text-[#705B46] text-center">
        <h1 className="font-cormorant uppercase text-3xl md:text-4xl pb-10 tracking-wider">
          Prijava korisnika
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-b border-[#705B46] p-3 bg-transparent outline-none font-montserrat text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-[#705B46] p-3 bg-transparent outline-none font-montserrat text-sm"
          />
          <Button
            text="PRIJAVI SE"
            variant="secondary"
            className="text-[12px] md:text-sm"
            type="submit"
          ></Button>
        </form>
        <div className="mt-10 pt-6 border-t border-[#705B46]/10">
          <p className="font-montserrat text-[10px] tracking-[0.2em] text-[#705B46]/60">
            NEMATE PROFIL?
          </p>
          <Link
            to="/register"
            className="inline-block mt-2 font-montserrat text-[11px] font-bold tracking-[0.3em] text-[#705B46] hover:text-[#5D4B3A] transition-colors border-b border-[#705B46]"
          >
            KREIRAJTE NALOG
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
