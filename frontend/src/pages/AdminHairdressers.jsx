import { useEffect, useState } from "react";
import api from "../axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminHairdressers() {
  const [loading, setLoading] = useState(true);
  const [hairdressers, setHairdressers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedHairdresser, setSelectedHairdresser] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    day_of_week: "Monday",
    start_time: "08:00",
    end_time: "16:00",
  });
  const [currentHairdresser, setCurrentHairdresser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    role: "hairdresser",
    specialization: "",
    bio: "",
  });

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentHairdresser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      role: "hairdresser",
      specialization: "",
      bio: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (hairdresser) => {
    setIsEditing(true);
    setCurrentHairdresser({ ...hairdresser, password: "" });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/hairdressers");

        const hairdressersData = Array.isArray(response.data)
          ? response.data
          : response.data.data;
        setHairdressers(hairdressersData || []);
      } catch (error) {
        console.error("Greška pri učitavanju:", error);
        alert("Nije uspelo učitavanje frizera.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await api.put(
          `/users/${currentHairdresser.id}`,
          currentHairdresser,
        );
        const updated = response.data.data || response.data;

        setHairdressers(
          hairdressers.map((h) => (h.id === updated.id ? updated : h)),
        );
      } else {
        const response = await api.post("/hairdressers", currentHairdresser);
        const saved = response.data.data || response.data;
        setHairdressers([...hairdressers, saved]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Greška pri čuvanju podataka");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Da li ste sigurni da želite da obrišete ovog frizera?")
    ) {
      try {
        await api.delete(`/users/${id}`);
        setHairdressers(
          hairdressers.filter((hairdresser) => hairdresser.id !== id),
        );
      } catch (error) {
        alert("Greška pri brisanju.");
        console.log(error);
      }
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/schedules", {
        user_id: selectedHairdresser.id,
        ...newSchedule,
      });
      alert("Radno vreme dodato!");
      setIsScheduleModalOpen(false);
    } catch (error) {
      alert("Greška pri čuvanju rasporeda");
      console.log(error);
    }
  };

  return (
    <div className="flex bg-[#F8F7F3] min-h-screen">
      <AdminSidebar />

      <main className="ml-64 flex-1 p-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-cormorant text-4xl text-[#705B46] uppercase tracking-widest">
              Tim Frizera
            </h1>
            <p className="text-[#705B46]/60 font-montserrat text-xs mt-2 italic">
              Upravljaj profilima svojih stručnjaka
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-[#705B46] text-[#F8F7F3] px-8 py-3 rounded-full font-montserrat text-xs tracking-widest hover:bg-[#5D4B3A] transition-all shadow-md active:scale-95"
          >
            DODAJ NOVOG ČLANA +
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center mt-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#705B46]"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#705B46]/10 overflow-hidden">
            <table className="w-full text-left font-montserrat text-sm">
              <thead className="bg-[#F8F7F3] text-[#705B46] border-b border-[#705B46]/10 uppercase text-[10px] tracking-[0.2em]">
                <tr>
                  <th className="p-6 font-semibold">Ime i Prezime</th>
                  <th className="p-6 font-semibold">Kontakt info</th>
                  <th className="p-6 font-semibold">Specijalizacija</th>
                  <th className="p-6 font-semibold text-center">Akcije</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {hairdressers.map((hairdresser) => (
                  <tr
                    key={hairdresser.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="p-6">
                      <div className="font-medium text-[#705B46] text-base">
                        {hairdresser.first_name} {hairdresser.last_name}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-gray-600 font-medium">
                        {hairdresser.email}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {hairdresser.phone || "Nema telefona"}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="bg-[#705B46]/5 text-[#705B46] px-3 py-1 rounded-full text-[11px] font-medium tracking-wide">
                        {hairdresser.specialization || "Stilista"}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex justify-center gap-6">
                        <button
                          onClick={() => openEditModal(hairdresser)}
                          className="text-[#705B46] hover:text-[#5D4B3A] font-semibold text-[10px] uppercase tracking-widest transition-colors"
                        >
                          Izmeni
                        </button>
                        <button
                          onClick={() => handleDelete(hairdresser.id)}
                          className="text-red-400 hover:text-red-600 font-semibold text-[10px] uppercase tracking-widest transition-colors"
                        >
                          Obriši
                        </button>
                        <button
                          onClick={() => {
                            setSelectedHairdresser(hairdresser);
                            setIsScheduleModalOpen(true);
                          }}
                          className="text-blue-500 hover:text-blue-700 font-semibold text-[10px] uppercase tracking-widest transition-colors"
                        >
                          Raspored
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[95vh] border border-[#705B46]/10">
            <h2 className="font-cormorant text-3xl text-[#705B46] uppercase mb-10 tracking-[0.2em] border-b border-[#705B46]/10 pb-6 text-center">
              {isEditing ? "Izmena Profila" : "Novi Frizer"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 font-montserrat"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                    Ime
                  </label>
                  <input
                    type="text"
                    value={currentHairdresser.first_name}
                    onChange={(e) =>
                      setCurrentHairdresser({
                        ...currentHairdresser,
                        first_name: e.target.value,
                      })
                    }
                    className="border-b-2 border-gray-100 p-2 outline-none focus:border-[#705B46] transition-all text-sm bg-transparent"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                    Prezime
                  </label>
                  <input
                    type="text"
                    value={currentHairdresser.last_name}
                    onChange={(e) =>
                      setCurrentHairdresser({
                        ...currentHairdresser,
                        last_name: e.target.value,
                      })
                    }
                    className="border-b-2 border-gray-100 p-2 outline-none focus:border-[#705B46] transition-all text-sm bg-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                    Email adresa
                  </label>
                  <input
                    type="email"
                    value={currentHairdresser.email}
                    onChange={(e) =>
                      setCurrentHairdresser({
                        ...currentHairdresser,
                        email: e.target.value,
                      })
                    }
                    className="border-b-2 border-gray-100 p-2 outline-none focus:border-[#705B46] transition-all text-sm bg-transparent"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                    Telefon
                  </label>
                  <input
                    type="text"
                    value={currentHairdresser.phone}
                    onChange={(e) =>
                      setCurrentHairdresser({
                        ...currentHairdresser,
                        phone: e.target.value,
                      })
                    }
                    className="border-b-2 border-gray-100 p-2 outline-none focus:border-[#705B46] transition-all text-sm bg-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                  {isEditing
                    ? "Lozinka (ostavi prazno ako ne menjaš)"
                    : "Početna Lozinka"}
                </label>
                <input
                  type="password"
                  value={currentHairdresser.password}
                  onChange={(e) =>
                    setCurrentHairdresser({
                      ...currentHairdresser,
                      password: e.target.value,
                    })
                  }
                  className="border-b-2 border-gray-100 p-2 outline-none focus:border-[#705B46] transition-all text-sm bg-transparent"
                  required={!isEditing}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                  Specijalizacija
                </label>
                <input
                  type="text"
                  placeholder="npr. Kolorista, Stručnjak za muške frizure..."
                  value={currentHairdresser.specialization}
                  onChange={(e) =>
                    setCurrentHairdresser({
                      ...currentHairdresser,
                      specialization: e.target.value,
                    })
                  }
                  className="border-b-2 border-gray-100 p-2 outline-none focus:border-[#705B46] transition-all text-sm bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                  Biografija
                </label>
                <textarea
                  value={currentHairdresser.bio}
                  onChange={(e) =>
                    setCurrentHairdresser({
                      ...currentHairdresser,
                      bio: e.target.value,
                    })
                  }
                  className="border-2 border-gray-100 rounded-2xl p-4 outline-none focus:border-[#705B46] transition-all text-sm bg-transparent resize-none"
                  rows="3"
                />
              </div>

              <div className="flex justify-end gap-10 mt-6 border-t border-[#705B46]/10 pt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-[11px] uppercase tracking-[0.3em] text-gray-400 hover:text-gray-600 transition-colors font-bold"
                >
                  Otkaži
                </button>
                <button
                  type="submit"
                  className="bg-[#705B46] text-white px-12 py-4 rounded-xl text-[11px] uppercase tracking-[0.3em] hover:bg-[#5D4B3A] shadow-xl hover:shadow-[#705B46]/20 transition-all font-bold"
                >
                  Sačuvaj Promene
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-110 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl border border-[#705B46]/10">
            <h2 className="font-cormorant text-2xl text-[#705B46] uppercase mb-2 tracking-[0.2em] text-center">
              Radno Vreme
            </h2>
            <p className="text-center text-[#705B46]/60 font-montserrat text-[10px] uppercase tracking-widest mb-8 italic">
              Za: {selectedHairdresser?.first_name} {selectedHairdresser?.last_name}
            </p>

            <form
              onSubmit={handleScheduleSubmit}
              className="flex flex-col gap-6 font-montserrat"
            >
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                  Dan
                </label>
                <select
                  value={newSchedule.day_of_week}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      day_of_week: e.target.value,
                    })
                  }
                  className="border-b-2 border-gray-100 p-2 outline-none focus:border-[#705B46] bg-transparent text-sm"
                >
                  <option value="Monday">Ponedeljak</option>
                  <option value="Tuesday">Utorak</option>
                  <option value="Wednesday">Sreda</option>
                  <option value="Thursday">Četvrtak</option>
                  <option value="Friday">Petak</option>
                  <option value="Saturday">Subota</option>
                  <option value="Sunday">Nedelja</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                    Početak
                  </label>
                  <input
                    type="time"
                    value={newSchedule.start_time}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        start_time: e.target.value,
                      })
                    }
                    className="border-b-2 border-gray-100 p-2 outline-none focus:border-[#705B46] text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                    Kraj
                  </label>
                  <input
                    type="time"
                    value={newSchedule.end_time}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        end_time: e.target.value,
                      })
                    }
                    className="border-b-2 border-gray-100 p-2 outline-none focus:border-[#705B46] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-6 mt-6 pt-6 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold hover:text-gray-600"
                >
                  Zatvori
                </button>
                <button
                  type="submit"
                  className="bg-[#705B46] text-white px-8 py-3 rounded-xl text-[10px] uppercase tracking-[0.2em] hover:bg-[#5D4B3A] transition-all font-bold shadow-lg shadow-[#705B46]/20"
                >
                  Sačuvaj Dan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHairdressers;
