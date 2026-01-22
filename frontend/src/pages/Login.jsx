import { useState } from "react";
import heroImg from "../assets/salon.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("Kliknuto na dugme!");
    if (e) e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });

      console.log("Šta je stiglo sa servera:", response.data);

      const token = response.data.access_token;
      const user = response.data.user;

      if (user.role === "admin" || user.role === "hairdresser") {
        localStorage.setItem("token", token);
        localStorage.setItem("user_role", user.role);
        navigate("/admin");
      } else {
        alert("Nemate administratorska prava za pristup.");
        navigate("/");
      }
    } catch (error) {
      console.error("Greška:", error);
      alert("Pogrešni podaci za prijavu.");
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
        <div className=" flex flex-col gap-5">
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
            onClick={handleLogin}
          ></Button>
        </div>
      </div>
    </div>
  );
}
export default Login;
