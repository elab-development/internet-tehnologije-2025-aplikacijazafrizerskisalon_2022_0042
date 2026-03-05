import { useEffect, useState } from "react";
import api from "../axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminStats() {
  const [reservations, setReservations] = useState([]);
  const [chartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.onload = () => {
      window.google.charts.load("current", { packages: ["corechart", "bar"] });
      window.google.charts.setOnLoadCallback(() => setChartsLoaded(true));
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/reservations");
      setReservations(res.data);
    };
    fetchData();
  }, []);

  const drawCharts = () => {
    const meseci = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Maj",
      "Jun",
      "Jul",
      "Avg",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ];
    const poMesecima = Array(12).fill(0);
    reservations.forEach((r) => {
      const mesec = new Date(r.start_time).getMonth();
      poMesecima[mesec]++;
    });

    const data1 = new window.google.visualization.DataTable();
    data1.addColumn("string", "Mesec");
    data1.addColumn("number", "Rezervacije");
    meseci.forEach((m, i) => data1.addRow([m, poMesecima[i]]));
    new window.google.visualization.ColumnChart(
      document.getElementById("chart-meseci"),
    ).draw(data1, {
      title: "Rezervacije po mesecima",
      colors: ["#705B46"],
      backgroundColor: "transparent",
      legend: { position: "none" },
    });

    const uslugeCount = {};
    reservations.forEach((r) => {
      const naziv = r.service?.name || "Nepoznato";
      uslugeCount[naziv] = (uslugeCount[naziv] || 0) + 1;
    });
    const data2 = new window.google.visualization.DataTable();
    data2.addColumn("string", "Usluga");
    data2.addColumn("number", "Broj");
    Object.entries(uslugeCount).forEach(([k, v]) => data2.addRow([k, v]));
    new window.google.visualization.PieChart(
      document.getElementById("chart-usluge"),
    ).draw(data2, {
      title: "Najpopularnije usluge",
      backgroundColor: "transparent",
      colors: ["#705B46", "#9B7E6A", "#C4A882", "#E8D5B7", "#5D4B3A"],
    });

    const statusiCount = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };
    reservations.forEach((r) => {
      if (statusiCount[r.status] !== undefined) statusiCount[r.status]++;
    });
    const data3 = new window.google.visualization.DataTable();
    data3.addColumn("string", "Status");
    data3.addColumn("number", "Broj");
    data3.addRow(["Na čekanju", statusiCount.pending]);
    data3.addRow(["Potvrđeno", statusiCount.confirmed]);
    data3.addRow(["Završeno", statusiCount.completed]);
    data3.addRow(["Otkazano", statusiCount.cancelled]);
    new window.google.visualization.PieChart(
      document.getElementById("chart-statusi"),
    ).draw(data3, {
      title: "Statusi rezervacija",
      backgroundColor: "transparent",
      colors: ["#F59E0B", "#10B981", "#705B46", "#EF4444"],
    });
  };

  useEffect(() => {
    if (!chartsLoaded || reservations.length === 0) return;
    drawCharts();
  }, [chartsLoaded, reservations]);

  return (
    <div className="flex bg-[#F8F7F3] min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-10">
        <header className="mb-12">
          <h1 className="font-cormorant text-4xl text-[#705B46] uppercase tracking-widest">
            Statistike
          </h1>
          <p className="text-[#705B46]/60 font-montserrat text-xs mt-2 italic">
            Grafički prikaz podataka salona
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#705B46]/10">
            <div id="chart-meseci" style={{ height: "350px" }}></div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#705B46]/10">
              <div id="chart-usluge" style={{ height: "350px" }}></div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#705B46]/10">
              <div id="chart-statusi" style={{ height: "350px" }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminStats;
