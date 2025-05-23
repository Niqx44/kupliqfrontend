'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Kirim ke parent
  };

  return (
    <div className="flex items-center space-x-2 w-full max-w-4xl rounded-full text-[#775142] border-2 border-[#775142] bg-white px-4 py-2">
      <img
        src="/Frame.svg"
        alt="Search Icon"
        className="h-5 w-5"
      />
      <input
        type="text"
        className="flex-1 bg-transparent outline-none pl-2 text-[#775142]"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}
