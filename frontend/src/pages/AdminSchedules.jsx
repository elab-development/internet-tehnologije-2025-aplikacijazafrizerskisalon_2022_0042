import { useEffect, useState } from "react";
import api from "../axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminSchedules() {
  const [loading, setLoading] = useState(true);
  const [hairdressers, setHairdressers] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const daysSerbian = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hRes, sRes] = await Promise.all([
          api.get("/hairdressers"),
          api.get("/schedules"),
        ]);
        setHairdressers(hRes.data.data || hRes.data);
        setSchedules(sRes.data.data || sRes.data);
      } catch (error) {
        console.error("Greška:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTimeForDay = (hairdresserId, day) => {
    const entry = schedules.find(
      (s) => s.user_id === hairdresserId && s.day_of_week === day,
    );
    return entry
      ? `${entry.start_time.substring(0, 5)} - ${entry.end_time.substring(0, 5)}`
      : "—";
  };

  return (
    <div className="flex bg-[#F8F7F3] min-h-screen font-montserrat text-[#705B46]">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-10">
        <header className="mb-12">
          <h1 className="font-cormorant text-4xl uppercase tracking-[0.2em]">
            Nedeljni Planer
          </h1>
          <p className="text-[10px] uppercase tracking-widest mt-2 italic opacity-60">
            Pregled svih smena na jednom mestu
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center mt-20 font-bold uppercase tracking-widest text-[10px]">
            Učitavanje rasporeda...
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl border border-[#705B46]/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#705B46] text-[#F8F7F3]">
                    <th className="p-6 font-cormorant text-xl tracking-widest border-r border-white/10">
                      Frizer
                    </th>
                    {daysSerbian.map((day) => (
                      <th
                        key={day}
                        className="p-4 text-center text-[10px] uppercase tracking-widest font-bold border-r border-white/10 last:border-0"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {hairdressers.map((hairdresser) => (
                    <tr
                      key={hairdresser.id}
                      className="hover:bg-[#F8F7F3]/50 transition-colors"
                    >
                      <td className="p-6 border-r border-gray-100">
                        <div className="font-bold uppercase text-[11px] tracking-widest">
                          {hairdresser.first_name} {hairdresser.last_name}
                        </div>
                        <div className="text-[9px] text-gray-400 italic">
                          {hairdresser.specialization}
                        </div>
                      </td>
                      {days.map((day) => (
                        <td
                          key={day}
                          className="p-4 text-center border-r border-gray-100 last:border-0"
                        >
                          <span
                            className={`text-[11px] font-medium ${getTimeForDay(hairdresser.id, day) === "—" ? "text-gray-300" : "text-[#705B46]"}`}
                          >
                            {getTimeForDay(hairdresser.id, day)}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminSchedules;
