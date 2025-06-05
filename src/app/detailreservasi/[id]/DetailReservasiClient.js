"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaPhone } from 'react-icons/fa';
import NavbarDetailNav from '../../components/NavbarDetailRev';

export default function ReservationDetailPage() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [status, setStatus] = useState("Unconfirmed");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // tambahan

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservasi/by/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data reservasi");

        const data = await res.json();
        setReservation({
          id: data.id_reservasi,
          name: `Customer ${data.id_costumer}`,
          date: data.tanggal_reservasi,
          time: data.waktu_reservasi,
          keterangan: data.keterangan,
          status: data.status,
        });
        setStatus(data.status);
      } catch (error) {
        console.error(error);
        setReservation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservasi/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Gagal memperbarui status");

      // Update status di UI setelah berhasil
      setStatus(newStatus);
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-10 flex justify-center items-center bg-white">
        <p className="text-[#775142] text-xl font-semibold">Memuat reservasi...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen p-10 flex justify-center items-center bg-white">
        <p className="text-[#775142] text-xl font-semibold">Reservasi tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavbarDetailNav />

      <div className="flex flex-col items-center justify-center px-6 pt-40 pb-10">
        <div className="bg-[#775142] p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="space-y-4">
            <InputWithIcon icon={<FaCalendarAlt />} value={reservation.date} />
            <InputWithIcon icon={<FaClock />} value={reservation.time} />
            <InputWithIcon icon={<FaUser />} value={reservation.name} />
            <InputWithIcon icon={<FaPhone />} value={reservation.keterangan} />
          </div>

          {status === "Pending" && !updating ? (
            <div className="flex justify-end items-center gap-3 mt-6 min-h-[56px]">
              <button
                onClick={() => handleStatusChange("Rejected")}
                className="bg-[#f2f2f2] text-[#775142] px-4 py-2 rounded hover:bg-[#e4e4e4]"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatusChange("Confirmed")}
                className="bg-[#f2f2f2] text-[#775142] px-4 py-2 rounded hover:bg-[#e4e4e4]"
              >
                Confirm
              </button>
            </div>
          ) : (
            <div className="mt-6 text-white text-center font-semibold min-h-[56px] flex items-center justify-center">
              Status:{" "}
              <span className={status === "Confirmed" ? "text-green-400" : "text-red-400"}>
                {status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const InputWithIcon = ({ icon, value }) => (
  <div className="flex items-center bg-white rounded px-3 py-2 text-[#5C4033]">
    <div className="mr-2">{icon}</div>
    <input
      type="text"
      value={value}
      readOnly
      className="bg-transparent outline-none w-full"
    />
  </div>
);
