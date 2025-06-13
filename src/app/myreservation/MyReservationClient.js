"use client";

import { useEffect, useState } from 'react';
import NavbarMyReservation from '../components/NavbarMyReservation';
import ReservationCard from '../components/ReservationCard';
import ReservationFilter from '../components/ReservationFilter';

const MyReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [filters, setFilters] = useState({ name: '', date: '', time: '', keterangan: '', status: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

  useEffect(() => {
    if (userId) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservasi/${userId}`)
        .then(res => res.json())
        .then(data => setReservations(data))
        .catch(err => console.error("Failed to fetch reservations:", err));
    }
  }, [userId]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = reservations.filter(r => {
  const matchNameOrKeterangan =
    !filters.name ||
    r.nama_costumer?.toLowerCase().includes(filters.name.toLowerCase()) ||
    r.keterangan?.toLowerCase().includes(filters.name.toLowerCase());

  const matchDate = !filters.date || r.tanggal_reservasi === filters.date;
  const matchTime = !filters.time || r.waktu_reservasi === filters.time;
  const matchKeterangan = !filters.keterangan || r.keterangan?.toLowerCase().includes(filters.keterangan.toLowerCase());
  const matchStatus = !filters.status || r.status?.toLowerCase() === filters.status.toLowerCase();

  return matchNameOrKeterangan && matchDate && matchTime && matchKeterangan && matchStatus;
});

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-auto min-h-screen bg-[#FDFDFD]">
      <NavbarMyReservation />
      <div className='px-20'>
          <ReservationFilter onFilterChange={handleFilterChange} />
      </div>
      {paginatedData.map((res, idx) => (
        <ReservationCard
          key={idx}
          name={res.nama_costumer}
          date={res.tanggal_reservasi}
          time={res.waktu_reservasi}
          keterangan={res.keterangan}
          status={res.status}
        />
      ))}

      {filteredData.length > 0 && (
  <div className="mt-6 mb-10 w-full flex justify-center">
    <div className="flex justify-center items-center gap-3 text-[#5C4033] font-medium text-base">
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
)}


    </div>
  );
};

export default MyReservationPage;
