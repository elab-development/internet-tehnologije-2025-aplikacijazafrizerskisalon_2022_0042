import { useEffect, useState } from "react";
import api from "../axios";
import { AlertCircle, Check, Scissors } from "lucide-react";

function HairdresserDashboard() {
  const [reservations, setReservations] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);

  const fetchSchedule = async () => {
    try {
      const res = await api.get("/reservations");
      setReservations(res.data);

      const scheduleRes = await api.get("/my-schedule");

      const daysOfWeek = [
        "Ponedeljak",
        "Utorak",
        "Sreda",
        "Četvrtak",
        "Petak",
        "Subota",
        "Nedelja",
      ];
      const fullSchedule = daysOfWeek.map((dayName) => {
        const dayMapping = {
          Ponedeljak: "Monday",
          Utorak: "Tuesday",
          Sreda: "Wednesday",
          Četvrtak: "Thursday",
          Petak: "Friday",
          Subota: "Saturday",
          Nedelja: "Sunday",
        };

        const englishDay = dayMapping[dayName];
        const found = scheduleRes.data.find(
          (d) => d.day_of_week === englishDay,
        );

        if (found) {
          return { ...found, display_name: dayName, is_working: true };
        }
        return {
          day_of_week: englishDay,
          display_name: dayName,
          is_working: false,
        };
      });
      setWorkingHours(fullSchedule);
    } catch (error) {
      console.log(error.error);
    } finally {
      //
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/reservations/${id}`, { status: newStatus });
      fetchSchedule();
    } catch (error) {
      console.error("Greška pri izmeni statusa:", error);
      alert("Nije uspelo ažuriranje statusa.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F3]">
      <div className="flex-1 p-8">
        <h1 className="font-cormorant text-3xl text-[#705B46] mb-8 uppercase tracking-widest">
          Moji termini
        </h1>

        <div className="space-y-4">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-wrap md:flex-nowrap justify-between items-center gap-4"
            >
              <div className="flex items-center gap-6">
                <div className="text-center bg-[#705B46] text-white p-3 rounded-xl min-w-28">
                  <p className="text-[10px] uppercase opacity-80 font-bold">
                    {new Date(res.start_time).toLocaleDateString("sr-RS", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </p>
                  <p className="text-lg font-bold border-t border-[#8b7661] mt-1 pt-1">
                    {res.start_time.split(" ")[1].substring(0, 5)}h
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg uppercase">
                    {res.client?.first_name} {res.client?.last_name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Scissors size={14} /> {res.service?.name} (
                    {res.service?.duration_minutes} min)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase ${
                    res.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : res.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100"
                  }`}
                >
                  {res.status}
                </span>
                <div className="flex gap-2">
                  {res.status === "pending" && (
                    <button
                      onClick={() => updateStatus(res.id, "confirmed")}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  {res.status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(res.id, "completed")}
                      className="px-4 py-2 bg-[#705B46] text-white rounded-lg text-xs font-bold hover:bg-black transition-colors uppercase"
                    >
                      Završi tretman
                    </button>
                  )}
                  {res.status !== "cancelled" && res.status !== "completed" && (
                    <button
                      onClick={() => updateStatus(res.id, "no_show")}
                      className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Klijent se nije pojavio"
                    >
                      <AlertCircle size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-cormorant text-2xl text-[#705B46] mb-6 uppercase tracking-widest border-b border-[#705B46]/20 pb-2">
            Moj plan rada
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {workingHours.map((day) => (
              <div
                key={day.day_of_week}
                className={`p-4 rounded-2xl border transition-all ${
                  day.is_working
                    ? "bg-white border-gray-100 shadow-sm"
                    : "bg-gray-100/50 border-dashed border-gray-200 opacity-60"
                } text-center`}
              >
                <p className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold mb-1">
                  {day.display_name}
                </p>

                {day.is_working ? (
                  <div className="text-[#705B46]">
                    <p className="text-sm font-bold">
                      {day.start_time.substring(0, 5)}h
                    </p>
                    <div className="w-4 h-px bg-[#705B46]/30 mx-auto my-1"></div>
                    <p className="text-sm font-bold">
                      {day.end_time.substring(0, 5)}h
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic py-2">
                    Slobodan dan
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HairdresserDashboard;
