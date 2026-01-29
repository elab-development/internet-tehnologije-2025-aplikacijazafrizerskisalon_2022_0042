import { useEffect, useState } from "react";
import api from "../axios";
import { User, Mail, Calendar, Trash2, Search } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import Swal from "sweetalert2";

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchClients = async () => {
    try {
      const res = await api.get("/clients");
      setClients(res.data.clients || res.data);
    } catch (error) {
      console.log("Greška pri učitavanju:", error);
    } finally {
      //
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      `${client.first_name} ${client.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "DA LI STE SIGURNI?",
      text: "Ova akcija će trajno obrisati klijenta iz baze!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#705B46",
      cancelButtonColor: "#d33",
      confirmButtonText: "DA, OBRIŠI",
      cancelButtonText: "ODUSTANI",
      borderRadius: "20px",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/clients/${id}`);

        setClients(clients.filter((client) => client.id !== id));

        Swal.fire({
          title: "OBRISANO!",
          text: "Klijent je uspešno uklonjen.",
          icon: "success",
          confirmButtonColor: "#705B46",
        });
      } catch (error) {
        console.error("Greška pri brisanju:", error);
        Swal.fire(
          "GREŠKA",
          "Nije moguće obrisati klijenta. Možda ima aktivne rezervacije?",
          "error",
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F3]">
      <AdminSidebar />
      <div className="flex-1 pt-24 px-6 pb-12 font-montserrat ml-64">
        {" "}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="font-cormorant text-4xl text-[#705B46] uppercase tracking-[0.2em]">
                Klijenti
              </h1>
              <p className="text-[#705B46]/60 text-xs mt-2 tracking-widest uppercase">
                Upravljanje bazom registrovanih korisnika
              </p>
            </div>

            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#705B46]/40"
                size={18}
              />
              <input
                type="text"
                placeholder="Pretraži klijente..."
                className="pl-10 pr-4 py-2 bg-white border border-[#705B46]/10 rounded-full outline-none focus:border-[#705B46] transition-all text-sm w-full md:w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#705B46] text-[#F8F7F3] text-[10px] uppercase tracking-[0.2em]">
                    <th className="px-8 py-4 font-bold">Klijent</th>
                    <th className="px-8 py-4 font-bold">Email Adresa</th>
                    <th className="px-8 py-4 font-bold text-center">Akcije</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredClients.map((client) => (
                    <tr
                      key={client.id}
                      className="hover:bg-[#F8F7F3]/50 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#705B46]/5 rounded-full flex items-center justify-center text-[#705B46] font-bold text-sm border border-[#705B46]/10">
                            {client.first_name[0]}
                            {client.last_name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#705B46] uppercase tracking-wider">
                              {client.first_name} {client.last_name}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              ID: #{client.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-600 font-light">
                        {client.email}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Obriši klijenta"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredClients.length === 0 && (
              <div className="py-20 text-center">
                <User className="mx-auto text-[#705B46]/20 mb-4" size={48} />
                <p className="text-[#705B46]/40 italic">
                  Nije pronađen nijedan klijent.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#705B46] p-6 rounded-[25px] text-[#F8F7F3]">
              <p className="text-[10px] uppercase tracking-widest opacity-70">
                Ukupno klijenata
              </p>
              <p className="text-3xl font-cormorant mt-1">{clients.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminClients;
