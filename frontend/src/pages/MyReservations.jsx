import { useEffect, useState } from "react";
import api from "../axios";
import { Calendar, Clock, Trash2, User } from "lucide-react";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations");
      setReservations(res.data);
    } catch (error) {
      console.error("Greška pri učitavanju:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (
      window.confirm("Da li ste sigurni da želite da otkažete ovaj termin?")
    ) {
      try {
        await api.put(`/reservations/${id}/cancel`);
        fetchReservations();
      } catch (error) {
        console.log(error.error);
        alert("Greška pri otkazivanju.");
      }
    }
  };

  if (loading)
    return (
      <div className="pt-32 text-center font-cormorant text-2xl text-[#705B46]">
        Učitavanje vaših termina...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F7F3] pt-24 px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-cormorant text-4xl text-[#705B46] mb-12 uppercase tracking-[0.2em] text-center">
          Moje Rezervacije
        </h1>

        {reservations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[40px] shadow-sm">
            <p className="text-gray-400 uppercase tracking-widest text-xs">
              Nemate zakazanih termina.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reservations.map((res) => (
              <div
                key={res.id}
                className={`bg-white p-6 md:p-8 rounded-[30px] shadow-sm border-l-8 flex flex-col md:flex-row justify-between items-center transition-all ${
                  res.status === "cancelled"
                    ? "border-red-200 opacity-60"
                    : "border-[#705B46]"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-[#705B46]">
                    <Calendar size={18} />
                    <span className="font-bold text-sm tracking-tighter">
                      {new Date(res.start_time).toLocaleDateString("sr-RS")}
                    </span>
                    <Clock size={18} className="ml-2" />
                    <span className="font-bold text-sm">
                      {res.start_time.split(" ")[1].substring(0, 5)} h
                    </span>
                  </div>

                  <h3 className="text-xl font-cormorant uppercase tracking-widest font-bold mt-2">
                    {res.service?.name}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest">
                    <User size={14} />
                    <span>Stilista: {res.hairdresser?.first_name}</span>
                  </div>
                </div>

                <div className="mt-6 md:mt-0 flex items-center gap-4">
                  <span
                    className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      res.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : res.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {res.status}
                  </span>

                  {res.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(res.id)}
                      className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                      title="Otkaži termin"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyReservations;
