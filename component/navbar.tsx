import { Home, BookOpen, Info, Image, Phone, InfoIcon, User, User2, User2Icon } from "lucide-react";
export default function Navbar() {
  return (
    <>
      <nav className="bg-[rgb(24,59,78)] text-[rgb(245,238,220)] px-6 py-4 shadow-md">
        <ul className="flex justify-center space-x-20 text-lg font-semibold">
          <li><a href="/home" className="flex items-center gap-2 hover:text-[rgb(221,168,83)] transition duration-300"><Home size={20} />Home</a></li>
          <li><a href="/academics" className=" flex items-center gap-2 hover:text-[rgb(221,168,83)] transition duration-300"><BookOpen size={20} />Academics</a></li>
          <li><a href="/gallery" className="flex items-center gap-2 hover:text-[rgb(221,168,83)] transition duration-300"><Image size={20} />Gallery</a></li>
          <li><a href="/about" className="flex items-center gap-2 hover:text-[rgb(221,168,83)] transition duration-300"><User size={20} />About</a></li>
          <li><a href="/contact" className="flex items-center gap-2 hover:text-[rgb(221,168,83)] transition duration-300"><Phone size={20} />Contact</a></li>
        </ul>
      </nav>
    </>

  );
}