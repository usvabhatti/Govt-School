"use client";

import Image from "next/image";
import { Facebook, Twitter, Youtube, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-gray-200 mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo + Tagline */}
        <div>
          <div className="flex items-center space-x-3">
            <Image src="/School_logo.png" width={60} height={60} alt="School Logo" className="rounded-lg" />
            <h2 className="text-xl font-bold text-white">Govt. High School No.1 Hasilpur</h2>
          </div>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            Excellence in Education and Discipline for a Bright Future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-300 transition">About Us</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Admissions</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Academics</a></li>
            <li><a href="#" className="hover:text-green-300 transition">News & Events</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <Phone size={18} className="text-green-300" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={18} className="text-green-300" />
              <span>info@govthighschoolno1.edu.pk</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin size={18} className="text-green-300" />
              <a 
                href="https://www.google.com/maps/place/27%C2%B030'11.9%22N+41%C2%B040'54.1%22E" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-300 transition"
              >
                Hasilpur, Punjab, Pakistan
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-300 transition"><Facebook size={22} /></a>
            <a href="#" className="hover:text-green-300 transition"><Twitter size={22} /></a>
            <a href="#" className="hover:text-green-300 transition"><Youtube size={22} /></a>
            <a 
              href="https://wa.me/923001234567?text=Hello%20Govt%20High%20School%20No.1" 
              target="_blank" 
              className="hover:text-green-300 transition"
            >
              <MessageCircle size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-900 py-4 text-center text-sm text-gray-400 border-t border-green-700">
        © {new Date().getFullYear()} Govt. High School No.1 Hasilpur. All rights reserved.
      </div>
    </footer>
  );
}
