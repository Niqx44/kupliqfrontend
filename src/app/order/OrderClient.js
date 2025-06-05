'use client';

import { useEffect, useState } from 'react';
import NavbarOrder from '../components/NavbarOrder';

export default function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [filter, setFilter] = useState('Newest'); // Newest | Pending | Selesai

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('user_id');
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pemesanan/${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Gagal mengambil data order:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  // FILTER LOGIC
  const filteredOrders = orders
    .filter((order) => {
      if (filter === 'Pending') return order.status === 'Pending';
      if (filter === 'Selesai') return order.status === 'Selesai';
      return true; // Newest shows all
    })
    .sort((a, b) => {
      if (filter === 'Newest') {
        return new Date(b.tanggal_pemesanan) - new Date(a.tanggal_pemesanan);
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#6B4226]">
      <div className="px-6 pt-32 pb-6 flex-1">
        <NavbarOrder />

        {/* Container untuk filter + orders */}
        <div className="pt-5 space-y-6 flex flex-col items-center px-15">
          
          {/* Filter dropdown sejajar dengan box order */}
          <div className="w-full max-w-xl flex justify-start mb-5">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-[#6B4226] text-[#6B4226] px-4 py-2 rounded-full focus:outline-none"
            >
              <option value="Newest">Newest</option>
              <option value="Pending">Pending</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          {/* Pesan kosong jika tidak ada */}
          {filteredOrders.length === 0 && (
            <p className="text-center text-[#775142] text-lg">
              Tidak ada pesanan ditemukan.
            </p>
          )}

          {/* Daftar Pesanan */}
          {filteredOrders.map((order) => (
            <div
              key={order.id_pemesanan}
              className="relative border border-[#6B4226] rounded-md p-4 w-full max-w-xl"
            >
              {/* Header */}
              <div className="flex justify-between mb-4 text-sm font-semibold">
                <span>Meja {order.id_meja}</span>
                <span>
                  {new Date(order.tanggal_pemesanan).toLocaleDateString('id-ID')}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2 text-sm">
                {order.items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2">
                    <span className="truncate">{item.nama_menu}</span>
                    <span className="text-center">x{item.jumlah}</span>
                    <span className="text-right">
                      {(item.sub_total ?? 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}

                <hr className="my-2 border-[#775142]" />

                <div className="grid grid-cols-3 font-semibold">
                  <span>Subtotal</span>
                  <span></span>
                  <span className="text-right">
                    {(order.total_harga ?? 0).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Footer */}
                <div className="mt-4 text-sm flex justify-between items-center">
                  <p>Metode Bayar | {order.metode_pembayaran || "Tidak tersedia"}</p>
                  <p className="italic">Status: {order.status}</p>
                </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
