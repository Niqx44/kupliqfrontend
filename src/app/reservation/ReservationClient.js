'use client';

import { useState } from 'react';
import Image from 'next/image';
import NavbarReserve from '../components/NavbarReserve';

export default function ReservationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    notes: '',
    status: 'Unconfirmed',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('User belum login.');
      return;
    }

    const payload = {
      id_costumer: parseInt(userId),
      tanggal_reservasi: formData.date,
      waktu_reservasi: formData.time,
      keterangan: formData.notes,
      status: formData.status,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservasi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const errMsg = await res.text();
        alert('Gagal mengirim reservasi: ' + errMsg);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Terjadi kesalahan saat mengirim data.');
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen overflow-y-hidden">
      <NavbarReserve />

      <div className="relative flex items-center justify-center h-[calc(100vh-64px-40px)] sm:h-[calc(90vh-72px-40px)] overflow-hidden">
        <Image
          src="/images/reservebg.png"
          alt="Background"
          fill
          className="object-cover z-0"
          sizes="90vw"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-none">
            <Image
              src="/images/reserveimg.png"
              alt="Cup Image"
              width={400}
              height={400}
              className="object-contain w-[250px] h-[250px] md:w-[400px] md:h-[400px]"
            />
          </div>

          <div
            className="w-full md:w-auto px-4 md:pl-25 py-6 md:py-10 flex flex-col justify-center space-y-4 text-white order-2 md:order-none"
            style={{ fontFamily: 'Abhaya Libre' }}
          >
            {isSubmitted ? (
              <div className="text-left">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-2">
                  Thanks For Your Reservation
                </h2>
                <p className="text-[#d2bda8] text-sm md:text-base">
                  Check “My Reservation” to see confirmation status
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    icon="📅"
                    placeholder="Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                  />
                  <InputField
                    icon="⏰"
                    placeholder="Time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                  />
                </div>

                <InputField
                  icon="📝"
                  placeholder="Notes / Keterangan"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                />

                <button
                  onClick={handleSubmit}
                  className="mt-6 py-3 px-6 border bg-[#624c3d] border-[#785d4b] text-white rounded-full hover:bg-white hover:text-[#5b2e14] transition font-semibold"
                >
                  Reserve
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center text-[#5b2e14] py-8 font-semibold">
        #TETAPDIKUPLIQ
      </footer>
    </div>
  );
}

function InputField({ icon, placeholder, type = 'text', value, onChange }) {
  return (
    <div className="flex items-center bg-white text-[#5b2e14] px-4 py-3 rounded-md">
      <span className="mr-2">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none w-full placeholder:text-[#5b2e14] text-[#5b2e14]"
      />
    </div>
  );
}