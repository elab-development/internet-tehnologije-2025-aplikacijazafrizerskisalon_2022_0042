import { useEffect, useState } from "react";
import api from "../axios";
import AdminSidebar from "../components/AdminSidebar";
import { Check, Scissors, User, X } from "lucide-react";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations");
      setReservations(res.data);
    } catch (error) {
      console.log("Greška pri učitavanju:", error);
    } finally {
      //
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  

  return (
    <div className="min-h-screen bg-[#F8F7F3] p-8 pt-24 pl-72">
      <AdminSidebar />
      <div className="max-w-6xl mx-auto">
        <h1 className="font-cormorant text-3xl text-[#705B46] mb-8 uppercase tracking-widest">
          Sve rezervacije
        </h1>

        <div className="bg-white rounded-[30px] shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#705B46] text-white text-[10px] uppercase tracking-widest">
              <tr>
                <th className="p-4">Datum & Vreme</th>
                <th className="p-4">Klijent</th>
                <th className="p-4">Usluga / Frizer</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {reservations.map((res) => (
                <tr
                  key={res.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-bold text-[#705B46]">
                    {new Date(res.start_time).toLocaleDateString()} <br />
                    <span className="text-xs font-normal text-gray-400">
                      {res.start_time.split(" ")[1].substring(0, 5)} h
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold">
                      {res.client?.first_name} {res.client?.last_name}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {res.client?.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Scissors size={12} /> {res.service?.name}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <User size={12} /> {res.hairdresser?.first_name}{" "}
                      {res.hairdresser?.last_name}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${
                        res.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : res.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : res.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
              
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminReservations;
