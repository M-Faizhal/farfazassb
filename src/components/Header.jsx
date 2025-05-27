import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react' // pastikan sudah install lucide-react

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="top-0 left-0 px-6 py-4 max-w-7xl mx-auto flex items-center justify-between relative fixed">
      <div className="flex items-center space-x-2">
        <img
          src="https://storage.googleapis.com/a1aa/image/d4a3db35-e74d-46a8-743b-28f01d0479b9.jpg"
          alt="FARFAZA FC logo"
          className="w-8 h-8"
        />
        <span className="font-semibold text-sm select-none">FARFAZA FC</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8 text-sm font-medium ">
        <Link className="hover:text-gray-700 py-2" to="/">Home</Link>
        <Link className="hover:text-gray-700 py-2" to="/about">About Us</Link>
        <Link className="hover:text-gray-700 py-2" to="/staff">Staff Pelatih</Link>
        <Link className="hover:text-gray-700 py-2" to="#">Team</Link>
        <Link className="hover:text-gray-700 py-2" to="/contact">Contact</Link>
        <Link
    to="/login"
    className="ml-4 bg-[#27548A] hover:bg-[#27548aaf] text-white px-4 py-2 rounded-full"
  >
    Get Started
  </Link>
      </nav>

      {/* Mobile Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-3 text-sm font-medium md:hidden z-10">
          <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about">About Us</Link>
          <Link onClick={() => setMenuOpen(false)} to="/staff">Staff Pelatih</Link>
          <Link onClick={() => setMenuOpen(false)} to="#">Team</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>
          <Link
            onClick={() => setMenuOpen(false)}
            to="/login"
            className="bg-[#27548A] hover:bg-[#27548aaf] text-white px-4 py-2 rounded-full text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
