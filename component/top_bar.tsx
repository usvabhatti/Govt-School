import { Phone, MapPin } from "lucide-react";

export default function TopBar() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md px-6 py-4 space-y-3 md:space-y-0">
      {/* Logo + Title */}
      <div className="flex items-center space-x-4">
        <img
          className="h-14 w-auto"
          src="/School_logo.png"
          alt="GOVT HIGH SCHOOL NO.01 HASILPUR LOGO"
        />
        <h1 className="text-base sm:text-xl md:text-2xl font-extrabold text-green-900 tracking-wide text-center md:text-left">
          GOVT. HIGH SCHOOL NO.01
        </h1>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 items-center text-green-800 font-medium text-sm sm:text-base">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Hasilpur</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5" />
          <span>+92 344 7148208</span>
        </div>
      </div>
    </header>
  );
}
