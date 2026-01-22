import axios from "axios";
import { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/services")
      .then((response) => {
        setServices(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Greška pri učitavanju:", error);
        setLoading(false);
      });
  }, []);

  const groupedServices = services.reduce((acc, service) => {
    const catName = service.category.category_name;
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(service);
    return acc;
  }, {});

  if (loading)
    return (
      <div className="text-center py-20 font-cormorant text-2xl">
        Učitavanje cenovnika...
      </div>
    );
  return (
    <div className="bg-[#F8F7F3] min-h-screen pt-24 pb-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-cormorant text-5xl text-center mb-4 text-[#705B46] uppercase tracking-widest">
          Cenovnik
        </h1>
        <p className="text-center font-montserrat text-xs mb-16 tracking-[0.4em] opacity-60 uppercase">
          Vrhunska nega za nju i njega
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {Object.keys(groupedServices).map((category) => (
            <div key={category} className="mb-8">
              <h2 className="font-cormorant text-2xl italic border-b border-[#705B46]/20 pb-2 mb-6 text-[#705B46]">
                {category}
              </h2>
              <div className="space-y-6">
                {groupedServices[category].map((s) => (
                  <div key={s.id} className="group">
                    <div className="flex justify-between items-end gap-2">
                      <div className="flex-1">
                        <h3 className="font-montserrat text-sm font-semibold uppercase tracking-wider text-[#4B3928]">
                          {s.name}
                        </h3>
                        <p className="text-[10px] italic opacity-60 leading-tight mt-1">
                          {s.description}
                        </p>
                      </div>
                      <div className="flex-1 border-b border-dotted border-[#705B46]/30 mb-1"></div>
                      <div className="text-right">
                        <span className="block font-montserrat font-bold text-[#705B46] text-sm">
                          {s.price} RSD
                        </span>
                        <span className="block text-[9px] opacity-50 uppercase tracking-tighter">
                          {s.duration_minutes} min
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
