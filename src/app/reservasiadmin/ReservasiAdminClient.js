"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReservationCard from '../components/ReservationCard';
import ReservationFilter from '../components/ReservationFilter';
import NavbarAdminReservation from '../components/NavbarReservasiAdmin';

const AdminReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [filters, setFilters] = useState({ name: '', date: '', time: '', status: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Ambil data reservasi dari backend
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservasi`);
        if (!res.ok) throw new Error("Gagal mengambil data reservasi");

        const data = await res.json();
        // Jika backend tidak menyertakan nama customer dan status, bisa disimulasikan
        const processed = data.map((r) => ({
          id: r.id_reservasi,
          name: `Customer ${r.id_costumer}`, // atau ambil nama dari relasi jika tersedia
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
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = reservations.filter(r =>
    (!filters.name || r.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.date || r.date === filters.date) &&
    (!filters.time || r.time === filters.time) &&
    (!filters.status || r.status === filters.status)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-auto min-h-screen bg-[#FDFDFD]">
      <NavbarAdminReservation />

      <div className='px-20'>
        <ReservationFilter onFilterChange={handleFilterChange} />
      </div>

      {/* Daftar reservasi */}
      <div className="px-20 space-y-4 mt-4">
        {paginatedData.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada data reservasi.</p>
        ) : (
          paginatedData.map((res) => (
            <Link key={res.id} href={`/detailreservasi/${res.id}`}>
              <ReservationCard {...res} />
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
        <div className="flex justify-center items-center gap-3 text-[#5C4033] font-medium text-base px-4 py-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 disabled:opacity-30"
          >
            {'<'}
          </button>

          <span>{currentPage}</span>

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 disabled:opacity-30"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReservationPage;
