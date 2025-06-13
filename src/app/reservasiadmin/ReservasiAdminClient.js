"use client";

import { useEffect, useState } from "react";
import ReservationCard from "../components/ReservationCard";
import ReservationFilter from "../components/ReservationFilter";
import NavbarAdminReservation from "../components/NavbarReservasiAdmin";

const AdminReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    time: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservasi`
        );
        if (!res.ok) throw new Error("Gagal mengambil data reservasi");

        const data = await res.json();
        const processed = data.map((r) => ({
          id: r.id_reservasi,
          name: r.nama_costumer,
          date: r.tanggal_reservasi,
          time: r.waktu_reservasi,
          keterangan: r.keterangan || "Unconfirmed",
          status: r.status || "Pending",
        }));
        setReservations(processed);
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data reservasi. Silakan cek koneksi atau server.");
      }
    };

    fetchReservations();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Yakin ingin menghapus reservasi ini?");
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservasi/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Gagal menghapus reservasi");

      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus reservasi.");
    }
  };

  const filteredData = reservations.filter(
    (r) =>
      (!filters.name ||
        r.name?.toLowerCase().includes(filters.name.toLowerCase()) ||
        r.keterangan?.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.date || r.date === filters.date) &&
      (!filters.time || r.time === filters.time) &&
      (!filters.status || r.status === filters.status)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <NavbarAdminReservation />

      <div className="px-20">
        <ReservationFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="px-20 space-y-4 mt-4">
        {paginatedData.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada data reservasi.</p>
        ) : (
          paginatedData.map((res) => (
            <ReservationCard
              key={res.id}
              {...res}
              onDelete={(e) => {
                e.stopPropagation();
                handleDelete(res.id);
              }}
              onClick={() =>
                (window.location.href = `/detailreservasi/${res.id}`)
              }
            />
          ))
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 text-[#5C4033] font-medium text-base pt-6 pb-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 disabled:opacity-30"
            >
              {"<"}
            </button>

            <span>{currentPage}</span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 disabled:opacity-30"
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservationPage;
