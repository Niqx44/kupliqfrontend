'use client'
import { useRouter } from 'next/navigation'

export default function Success() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#704E39] text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Transaksi Berhasil</h1>

      <div className="bg-[#704E39] rounded-full w-60 h-60 flex items-center justify-center mb-6 border-8 border-black">
        <svg
          className="w-40 h-40 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth={6}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="space-y-3 mb-8 w-[200px]"> {/* ukuran tetap */}
        <button
          onClick={() => router.push("/home")}
          className="bg-[#704E39] text-white px-6 py-2 rounded hover:opacity-90 w-full"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/order")}
          className="bg-[#704E39] text-white px-6 py-2 rounded hover:opacity-90 w-full"
        >
          Lihat Pesanan
        </button>
      </div>

      <p className="text-lg mb-2">JUST SIT N ENJOY UR COFFEE!</p>
      <p className="text-sm font-bold">#TETAPDIKUPLIQ</p>
    </div>
  )
}
