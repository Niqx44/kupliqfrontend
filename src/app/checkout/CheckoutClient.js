"use client";

import { useState, useEffect } from "react";
import NavbarCheckout from "../components/NavbarCheckout";
import Image from "next/image";
import Footer2 from "../components/footer2";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cartItems, setCartItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(null);
  const [userId, setUserId] = useState(null);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const table = localStorage.getItem("tableNumber");
    const user = localStorage.getItem("user_id");
    setCartItems(cart);
    setTableNumber(table);
    setUserId(user);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSubmit = async () => {
    if (!userId) {
      setNotification({ message: "User tidak ditemukan. Silakan login kembali.", type: "error" });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const payload = {
      id_customer: parseInt(userId),
      total_harga: subtotal,
      metode_pembayaran: paymentMethod,
      id_meja: parseInt(tableNumber),
      items: cartItems.map((item) => ({
        id_menu: item.id,
        jumlah: item.quantity,
        sub_total: item.price * item.quantity,
      })),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pemesanan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setNotification({ message: "Pesanan berhasil dikirim!", type: "success" });
        localStorage.removeItem("cart");
        localStorage.removeItem("tableNumber");
        setTimeout(() => {
          setNotification(null);
          router.push("/success");
        }, 2000);
      } else {
        setNotification({ message: "Gagal memproses pesanan.", type: "error" });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setNotification({ message: "Terjadi kesalahan.", type: "error" });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Notifikasi Custom */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in ${
            notification.type === "success"
              ? "bg-[#775142] text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={notification.type === "success" ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
          <span>{notification.message}</span>
        </div>
      )}

      <NavbarCheckout />

      <div className="flex-1 px-6">
        <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start justify-center">
          <div className="w-full md:w-auto flex flex-col items-center">
            <div className="flex gap-4 mb-6 mt-6 justify-start w-full max-w-md">
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`px-4 py-2 rounded-md font-medium border-2 transition ${
                  paymentMethod === "cash"
                    ? "border-[#775142] bg-[#775142] text-white"
                    : "border-[#775142] bg-white text-[#775142]"
                }`}
              >
                Bayar Langsung
              </button>
              <button
                onClick={() => setPaymentMethod("ewallet")}
                className={`px-4 py-2 rounded-md font-medium border-2 transition ${
                  paymentMethod === "ewallet"
                    ? "border-[#775142] bg-[#775142] text-white"
                    : "border-[#775142] bg-white text-[#775142]"
                }`}
              >
                E - Wallet
              </button>
            </div>

            <div className="border border-[#6B4226] rounded-md p-4 w-full max-w-md text-[#6B4226] text-sm">
              <p className="font-semibold mb-3">Meja {tableNumber}</p>
              <div className="space-y-2">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between w-full font-normal">
                    <span className="w-[100px]">{item.name}</span>
                    <span className="w-[20px] text-center">x{item.quantity}</span>
                    <span className="w-[60px] text-right">
                      {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
                <hr className="my-3 border-[#6B4226]" />
                <div className="flex justify-between font-semibold">
                  <span className="w-[100px]">Subtotal</span>
                  <span className="w-[20px]"></span>
                  <span className="w-[60px] text-right">
                    {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-start w-full max-w-md">
              <button
                onClick={handleOrderSubmit}
                className="border border-[#6B4226] text-[#6B4226] px-6 py-2 rounded-md hover:bg-[#6B4226] hover:text-white transition font-medium"
              >
                Order
              </button>
            </div>
          </div>

          {paymentMethod === "ewallet" && (
            <div className="flex flex-col items-center border border-[#6B4226] rounded-md p-6 w-full max-w-xs mx-auto text-[#6B4226]">
              <Image src="/images/qr.png" alt="QR Code" width={300} height={300} />
              <p className="mt-4 font-medium text-center">Scan QR</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <Footer2 />
      </div>

      {/* CSS untuk animasi notifikasi */}
      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}