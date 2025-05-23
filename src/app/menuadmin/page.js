'use client'

import { useState } from "react";
import NavbarMenuAdmin from "../components/NavbarMenuAdmin";
import CardProductAdmin from "../components/CardProductAdmin";

export default function MenuPage() {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <NavbarMenuAdmin
        onCategoryChange={setCategory}
        onSearch={setSearchQuery}
      />
      <CardProductAdmin
        selectedCategory={category}
        searchQuery={searchQuery}
      />
    </div>
  );
}
