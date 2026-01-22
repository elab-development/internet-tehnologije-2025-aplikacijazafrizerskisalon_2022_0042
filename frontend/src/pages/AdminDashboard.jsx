import { useEffect, useState } from "react";
import api from "../axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState({
    name: "",
    description: "",
    price: "",
    duration_minutes: "",
    category_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentService({
      name: "",
      description: "",
      price: "",
      duration_minutes: "",
      category_id: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setIsEditing(true);
    setCurrentService(service);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, categoriesRes] = await Promise.all([
          api.get("/services"),
          api.get("/categories"),
        ]);

        const servicesData = Array.isArray(servicesRes.data)
          ? servicesRes.data
          : servicesRes.data.data;
        setServices(servicesData || []);

        const categoriesData = Array.isArray(categoriesRes.data)
          ? categoriesRes.data
          : categoriesRes.data.data;
        setCategories(categoriesData || []);

      } catch (error) {
        console.error("Greška pri učitavanju:", error);
        alert("Nije uspelo učitavanje usluga.");
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
        await api.put(`/services/${currentService.id}`, currentService);
        setServices(
          services.map((s) =>
            s.id === currentService.id ? currentService : s,
          ),
        );
      } else {
        const response = await api.post("/services", currentService);
        setServices([...services, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      alert("Greska pri cuvanju podataka");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete ovu uslugu?")) {
      try {
        await api.delete(`/services/${id}`);
        setServices(services.filter((service) => service.id !== id));
      } catch (error) {
        alert("Greška pri brisanju.");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex bg-[#F8F7F3] min-h-screen">
      <AdminSidebar />

      <main className="ml-64 flex-1 p-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-cormorant text-4xl text-[#705B46] uppercase tracking-widest">
              Upravljanje uslugama
            </h1>
            <p className="text-[#705B46]/60 font-montserrat text-xs mt-2 italic">
              Pregled i izmena svih dostupnih tretmana u salonu
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-[#705B46] text-[#F8F7F3] px-8 py-3 rounded-full font-montserrat text-xs tracking-widest hover:bg-[#5D4B3A] transition-all shadow-md"
          >
            DODAJ NOVU USLUGU +
          </button>
        </header>

        {loading ? (
          <p className="text-center font-montserrat text-[#705B46]">
            Učitavanje usluga...
          </p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#705B46]/10 overflow-hidden">
            <table className="w-full text-left font-montserrat text-sm">
              <thead className="bg-[#F8F7F3] text-[#705B46] border-b border-[#705B46]/10">
                <tr>
                  <th className="p-5 font-semibold">Naziv usluge</th>
                  <th className="p-5 font-semibold">Cena</th>
                  <th className="p-5 font-semibold">Trajanje</th>
                  <th className="p-5 font-semibold text-center">Akcije</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="p-5 text-[#705B46] font-medium">
                      {service.name}
                    </td>
                    <td className="p-5 text-gray-600">{service.price} RSD</td>
                    <td className="p-5 text-gray-500">
                      {service.duration_minutes} min
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-6">
                        <button
                          onClick={() => openEditModal(service)}
                          className="text-amber-700 hover:text-amber-900 font-semibold text-xs uppercase tracking-tighter"
                        >
                          Izmeni
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-500 hover:text-red-700 font-semibold text-xs uppercase tracking-tighter"
                        >
                          Obriši
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="font-cormorant text-2xl text-[#705B46] uppercase mb-6">
              {isEditing ? "Izmeni uslugu" : "Nova usluga"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 font-montserrat"
            >
              <input
                type="text"
                placeholder="Naziv usluge"
                value={currentService.name}
                onChange={(e) =>
                  setCurrentService({ ...currentService, name: e.target.value })
                }
                className="border-b border-gray-300 p-2 outline-none focus:border-[#705B46]"
                required
              />
              <textarea
                placeholder="Opis usluge"
                value={currentService.description}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    description: e.target.value,
                  })
                }
                className="border-b border-gray-300 p-2 outline-none focus:border-[#705B46] resize-none"
                rows="2"
              ></textarea>
              <input
                type="number"
                placeholder="Cena (RSD)"
                value={currentService.price}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    price: e.target.value,
                  })
                }
                className="border-b border-gray-300 p-2 outline-none focus:border-[#705B46]"
                required
              />
              <input
                type="number"
                placeholder="Trajanje (min)"
                value={currentService.duration_minutes}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    duration_minutes: e.target.value,
                  })
                }
                className="border-b border-gray-300 p-2 outline-none focus:border-[#705B46]"
                required
              />
              <select
                value={currentService.category_id}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    category_id: e.target.value,
                  })
                }
                className="border-b border-gray-300 p-2 outline-none focus:border-[#705B46] bg-transparent font-montserrat"
                required
              >
                <option value="">Izaberi kategoriju</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-4 mt-6 text-xs uppercase tracking-widest">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Otkaži
                </button>
                <button
                  type="submit"
                  className="bg-[#705B46] text-white px-6 py-2 rounded-lg hover:bg-[#5D4B3A]"
                >
                  Sačuvaj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
