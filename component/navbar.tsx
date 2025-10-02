"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white rounded-b-2xl border-b-4 border-green-600 shadow-lg z-50 relative">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-green-800 hover:text-green-900"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <div
          className={`${open ? "block" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8 text-gray-800 font-semibold z-40 border-t md:border-t-0 border-gray-200`}
        >
          <a href="#home" onClick={() => setOpen(false)} className="hover:text-green-700 transition-colors py-2 md:py-0">Home</a>
          <a href="#admissions" onClick={() => setOpen(false)} className="hover:text-green-700 transition-colors py-2 md:py-0">Admissions</a>
          <a href="#contact" onClick={() => setOpen(false)} className="hover:text-green-700 transition-colors py-2 md:py-0">Contact</a>
          <a href="#about" onClick={() => setOpen(false)} className="hover:text-green-700 transition-colors py-2 md:py-0">About</a>
        </div>

        {/* Notification button */}
        <div className="pr-3">
          <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium">
            Notifications
          </button>
        </div>
      </nav>
    </header>
  );
}