"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white rounded-b-2xl border-b-4 border-green-500 shadow z-50 relative">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-green-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <div
          className={`${
            open ? "block" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-6 text-gray-700 font-medium z-40`}
        >
          <a href="#" className="hover:text-green-800">Home</a>
          <a href="#admissions" className="hover:text-green-800">Admissions</a>
          <a href="#contact" className="hover:text-green-800">Contact</a>
          <a href="#about" className="hover:text-green-800">About</a>
        </div>

        {/* Notification button */}
        <div className="pr-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">
            Notifications
          </button>
        </div>
      </nav>
    </header>
  );
}
