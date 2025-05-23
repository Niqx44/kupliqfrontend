"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import NavbarCart from "../components/NavbarCart";
import { useRouter } from "next/navigation";

const CartItem = ({
  id,
  name,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl mb-4 shadow-sm mx-10">
      <img src={image} alt={name} className="w-auto h-16 object-cover rounded" />

      <div className="w-32">
        <div className="font-semibold text-gray-800">{name}</div>
      </div>

      <div className="flex items-center space-x-2 w-32 justify-center">
        <button onClick={() => onUpdateQuantity(id, quantity - 1)} className="px-2 py-1 text-gray-800">▼</button>
        <span className="text-gray-800">{quantity}</span>
        <button onClick={() => onUpdateQuantity(id, quantity + 1)} className="px-2 py-1 text-gray-800">▲</button>
      </div>

      <div className="text-right w-20 font-semibold text-gray-700">
        Rp {(price * quantity).toLocaleString("id-ID")}
      </div>

      <button
        onClick={() => onRemove(id)}
        className="text-black hover:text-red-700 ml-4"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default function CartClient() {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tableNumber, setTableNumber] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong!");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="mb-10">
        <NavbarCart />
      </div>

      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-1">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
      </main>

      <footer className="flex items-center justify-between mt-5 px-20 pb-5">
        <div className="text-lg font-semibold text-gray-700">
          Total: Rp{" "}
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toLocaleString("id-ID")}
        </div>

        <button
          onClick={handleOrder}
          className={`p-2 px-8 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition ${
            cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={cartItems.length === 0}
        >
          Pesan
        </button>
      </footer>

      {/* Modal Nomor Meja */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md text-center w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold text-[#775142] mb-6">Pilih Nomor Meja</h2>
            <input
              type="number"
              min={1}
              max={99}
              value={tableNumber}
              onChange={(e) => setTableNumber(parseInt(e.target.value))}
              className="border-2 border-[#775142] text-[#775142] text-xl text-center rounded-md px-4 py-2 mb-4 w-20"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("tableNumber", tableNumber);
                  router.push("/checkout");
                }}
                className="bg-[#775142] text-white px-4 py-2 rounded-md"
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
