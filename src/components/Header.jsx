import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center space-x-2">
        <img
          src="https://storage.googleapis.com/a1aa/image/d4a3db35-e74d-46a8-743b-28f01d0479b9.jpg"
          alt="FARFAZA FC logo"
          className="w-8 h-8"
        />
        <span className="font-semibold text-sm select-none">FARFAZA FC</span>
      </div>
      <nav className="hidden md:flex space-x-8 text-sm font-medium">
        <a className="hover:text-gray-700" href="#">Home</a>
        <a className="hover:text-gray-700" href="#">About Us</a>
        <a className="hover:text-gray-700" href="#">Staff Pelatih</a>
        <a className="hover:text-gray-700" href="#">Team</a>
        <a className="hover:text-gray-700" href="#">Contact</a>
      </nav>
      <Link
        to="/login"
        className="hidden md:inline-block bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full"
      >
        Get Started
      </Link>
    </header>
  )
}

export default Header
