"use client";

import { useState, useEffect } from "react";
import NavbarPesananAd from "../components/NavbarPesananAd";

export default function DaftarPesananPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pemesanan/all`); // endpoint semua pesanan
        if (!res.ok) throw new Error("Gagal memuat pesanan");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pemesanan/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Gagal update status");

      // update status di frontend
      const updated = orders.map((order) =>
        order.id_pemesanan === id ? { ...order, status: newStatus } : order
      );
      setOrders(updated);
    } catch (error) {
      console.error("Update status gagal:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavbarPesananAd />

      <div className="p-6 space-y-6 max-w-3xl mx-auto">
        {orders.map((order) => {
          const subtotal = order.items.reduce(
            (sum, item) => sum + item.sub_total,
            0
          );
          return (
            <div
              key={order.id_pemesanan}
              className="border rounded-lg p-4 shadow-sm border-[#5C4033]"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-[#5C4033]">Meja {order.id_meja}</span>
                <span className="text-[#5C4033]">{order.tanggal_pemesanan}</span>
              </div>

              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 text-[#5C4033] text-sm"
                  >
                    <div>{item.nama_menu}</div>
                    <div className="text-center">x{item.jumlah}</div>
                    <div className="text-right">{item.sub_total}</div>
                  </div>
                ))}
              </div>

              <hr className="my-2 border-[#5C4033]" />
              <div className="flex justify-between text-[#5C4033] font-semibold">
                <span>Total</span>
                <span>{subtotal}</span>
              </div>

              <div className="mt-2 text-[#5C4033] font-medium">
                Status | {order.status}
              </div>

              {order.status.toLowerCase() === "pending" ? (
                <div className="mt-2 flex gap-3 justify-end">
                  <button
                    onClick={() => handleStatusChange(order.id_pemesanan, "Dibatalkan")}
                    className="bg-red-600 text-white px-4 py-1 rounded shadow"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id_pemesanan, "Selesai")}
                    className="bg-green-600 text-white px-4 py-1 rounded shadow"
                  >
                    Selesai
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex justify-end text-[#5C4033] font-semibold">
                  {order.status}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
