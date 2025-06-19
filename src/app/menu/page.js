"use client";

import { useState } from "react";
import NavbarMenu from "../components/NavbarMenu";
import CardProduct from "../components/CardProduct";

export default function MenuPage() {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarMenu
        onCategoryChange={setCategory}
        onSearch={setSearchQuery}
      />
      <CardProduct
        selectedCategory={category}
        searchQuery={searchQuery}
      />
    </div>
  );
}