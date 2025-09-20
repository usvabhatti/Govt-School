export default function Navbar() {
  return (
    <nav className="w-full bg-gray-100 shadow-md">
      <ul className="flex justify-center gap-8 py-4 text-lg font-medium text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">Feed</li>
        <li className="hover:text-blue-600 cursor-pointer">About</li>
        <li className="hover:text-blue-600 cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
}
