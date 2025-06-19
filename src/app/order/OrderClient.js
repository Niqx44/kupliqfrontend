"use client";

import { useEffect, useState } from "react";
import NavbarOrder from "../components/NavbarOrder";

export default function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [filter, setFilter] = useState("Newest"); // Newest | Pending | Selesai
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("user_id");
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pemesanan/${userId}`);
        if (!res.ok) throw new Error("Gagal mengambil data order");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Gagal mengambil data order:", error);
        setError("Gagal memuat pesanan. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // FILTER LOGIC
  const filteredOrders = (orders || []).filter((order) => {
    if (filter === "Pending") return order?.status === "pending";
    if (filter === "Selesai") return order?.status === "Selesai";
    if (filter === "Dibatalkan") return order?.status === "Dibatalkan";
    return true; // Newest shows all
  }).sort((a, b) => {
    if (filter === "Newest") {
      return new Date(b.tanggal_pemesanan) - new Date(a.tanggal_pemesanan);
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#6B4226] overflow-x-hidden">
      <NavbarOrder />
      <div className="px-4 sm:px-6 md:px-8 pt-5 sm:pt-5 md:pt-5 pb-4 sm:pb-6 flex-1">
        {/* Container untuk filter + orders */}
        <div className="pt-4 sm:pt-5 space-y-4 sm:space-y-6 flex flex-col items-center max-w-screen-xl mx-auto">
          {/* Filter dropdown */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex justify-start mb-3 sm:mb-5">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto border px-2 sm:px-3 py-1 sm:py-2 rounded border-[#6B4226] text-[#6B4226] text-sm sm:text-base focus:outline-none"
            >
              <option value="Newest">Newest</option>
              <option value="Pending">Pending</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Batal</option>
            </select>
          </div>

          {/* Loading or Error State */}
          {loading && <p className="text-center text-[#775142] text-base sm:text-lg">Memuat pesanan...</p>}
          {error && <p className="text-center text-red-600 text-base sm:text-lg">{error}</p>}

          {/* Pesan kosong jika tidak ada */}
          {!loading && !error && filteredOrders.length === 0 && (
            <p className="text-center text-[#775142] text-base sm:text-lg md:text-xl">
              Tidak ada pesanan ditemukan.
            </p>
          )}

          {/* Daftar Pesanan */}
          {!loading && !error && filteredOrders.map((order) => (
            <div
              key={order.id_pemesanan}
              className="border border-[#6B4226] rounded-md p-3 sm:p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
              {/* Header */}
              <div className="flex justify-between mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">
                <span>Meja {order.id_meja}</span>
                <span>
                  {new Date(order.tanggal_pemesanan).toLocaleDateString("id-ID")}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 gap-1 sm:gap-2 items-center"
                  >
                    <span className="truncate">{item.nama_menu}</span>
                    <span className="text-center">x{item.jumlah}</span>
                    <span className="text-right">
                      {(item.sub_total ?? 0).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}

                <hr className="my-1 sm:my-2 border-[#775142]" />

                <div className="grid grid-cols-3 font-semibold">
                  <span>Subtotal</span>
                  <span></span>
                  <span className="text-right">
                    {(order.total_harga ?? 0).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 sm:mt-4 text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <p>
                  Metode Bayar | {order.metode_pembayaran || "Tidak tersedia"}
                </p>
                <p className="italic">Status: {order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}