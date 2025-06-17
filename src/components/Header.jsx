import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react' 

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-2">
          <img
            src="public/assets/logo.png"
            alt="FARFAZA FC logo"
            className="w-18 h-16"
          />
          <span className="font-semibold text-sm select-none">FARFAZA FC</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link className="hover:text-gray-700 py-2" to="/">Home</Link>
          <Link className="hover:text-gray-700 py-2" to="/about">About Us</Link>
          <Link className="hover:text-gray-700 py-2" to="/staff">Staff Pelatih</Link>
          <Link className="hover:text-gray-700 py-2" to="/Team">Team</Link>
          <Link className="hover:text-gray-700 py-2" to="/contact">Contact</Link>
          <Link
            to="/login"
            className="ml-4 bg-primary hover:bg-primary-200 text-white px-4 py-2 rounded-full"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-3 text-sm font-medium z-40">
          <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about">About Us</Link>
          <Link onClick={() => setMenuOpen(false)} to="/staff">Staff Pelatih</Link>
          <Link onClick={() => setMenuOpen(false)} to="/Team">Team</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>
          <Link
            onClick={() => setMenuOpen(false)}
            to="/login"
            className="bg-primary hover:bg-[#27548aaf] text-white px-4 py-2 rounded-full text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
