import { useEffect, useState } from "react";
import api from "../axios";
import Button from "../components/Button";
function Reservation() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [hairdressers, setHairdressers] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [booking, setBooking] = useState({
    service_id: "",
    hairdresser_id: "",
    date: "",
    start_time: "",
  });

  useEffect(() => {
    api
      .get("/services")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setServices(data || []);
      })
      .catch((err) => {
        console.error("Greška pri učitavanju usluga:", err);
        setServices([]);
      });

    api.get("/hairdressers").then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setHairdressers(data || []);
    });
  }, []);

  useEffect(() => {
    if (booking.date && booking.hairdresser_id && booking.service_id) {
      api
        .get("/available-slots", { params: booking })
        .then((res) => setAvailableSlots(res.data))
        .catch(() => setAvailableSlots([]));
    }
  }, [booking.date, booking.hairdresser_id, booking.service_id]);

  const handleFinish = async () => {
    try {
      const startTime = `${booking.date} ${booking.start_time}`;
      await api.post("/reservations", { ...booking, start_time: startTime });
      alert("Uspešno ste rezervisali termin!");
      setStep(1);
    } catch (error) {
      alert("Greška pri zakazivanju.");
      console.log(error.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] pt-24 px-6 pb-12 font-montserrat">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-12 text-[10px] tracking-[0.3em] text-[#705B46]/40 uppercase font-bold">
          <span className={step >= 1 ? "text-[#705B46]" : ""}>01 Usluga</span>
          <span className={step >= 2 ? "text-[#705B46]" : ""}>02 Frizer</span>
          <span className={step >= 3 ? "text-[#705B46]" : ""}>03 Termin</span>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <h2 className="col-span-full font-cormorant text-3xl text-[#705B46] mb-4 uppercase tracking-widest text-center">
              Izaberite uslugu
            </h2>
            {services.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setBooking({ ...booking, service_id: s.id });
                  setStep(2);
                }}
                className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#705B46] cursor-pointer transition-all group shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[#705B46] font-bold text-sm uppercase tracking-widest">
                      {s.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">
                      {s.duration_minutes} MIN
                    </p>
                  </div>
                  <span className="font-cormorant text-xl text-[#705B46] italic">
                    {s.price} RSD
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
            <h2 className="col-span-full font-cormorant text-3xl text-[#705B46] mb-4 uppercase tracking-widest text-center">
              Vaš frizer
            </h2>
            {hairdressers.map((h) => (
              <div
                key={h.id}
                onClick={() => {
                  setBooking({ ...booking, hairdresser_id: h.id });
                  setStep(3);
                }}
                className="bg-white p-6 rounded-3xl text-center border border-gray-100 hover:border-[#705B46] cursor-pointer transition-all shadow-sm"
              >
                <div className="w-20 h-20 bg-[#705B46]/10 rounded-full mx-auto mb-4 flex items-center justify-center text-[#705B46] font-bold text-xl uppercase">
                  {h.first_name[0]}
                  {h.last_name[0]}
                </div>
                <h3 className="text-[#705B46] text-sm font-bold uppercase tracking-wider">
                  {h.first_name} {h.last_name}
                </h3>
              </div>
            ))}
            <button
              onClick={() => setStep(1)}
              className="col-span-full text-[10px] uppercase tracking-widest text-gray-400 underline"
            >
              Povratak na usluge
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50 text-center animate-fadeIn">
            <h2 className="font-cormorant text-3xl text-[#705B46] mb-8 uppercase tracking-widest">
              Izaberite termin
            </h2>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="mb-8 border-b border-[#705B46] p-2 outline-none text-[#705B46] bg-transparent"
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
            />

            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot.start}
                  onClick={() =>
                    setBooking({ ...booking, start_time: slot.start })
                  }
                  className={`p-3 rounded-full text-[10px] tracking-widest font-bold border transition-all ${booking.start_time === slot.start ? "bg-[#705B46] text-white" : "border-[#705B46]/20 text-[#705B46] hover:border-[#705B46]"}`}
                >
                  {slot.start}
                </button>
              ))}
            </div>

            {booking.start_time && (
              <Button
                text="POTVRDI REZERVACIJU"
                onClick={handleFinish}
                className="w-full mt-10"
              />
            )}
            <button
              onClick={() => setStep(2)}
              className="block mx-auto mt-6 text-[10px] uppercase tracking-widest text-gray-400 underline"
            >
              Promeni frizera
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservation;
