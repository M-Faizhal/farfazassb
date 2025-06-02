import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Siswa', path: '/admin/siswa' },
    { name: 'Pelatih', path: '/admin/pelatih' },
    { name: 'Kehadiran', path: '/admin/kehadiran' },
    { name: 'Nilai', path: '/admin/nilai' },
    { name: 'Prestasi', path: '/admin/prestasi' },
    { name: 'Akun Orang Tua', path: '/admin/orangtua' },
  ];

  const SidebarContent = (
    <div className="flex flex-col px-6 py-8 space-y-6 bg-white h-full w-64 border-r border-gray-200">
      <div className="flex items-center justify-between md:justify-start space-x-2">
        <div className="flex items-center ">
          <img
            src="../../../public/assets/logo.png"
            alt="FARFAZA FC"
            className="w-18 h-16"
          />
          <span className="font-bold text-blue-900 text-sm">FARFAZA FC</span>
        </div>
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)} // close drawer after click
              className={`px-3 py-2 rounded-md text-left font-medium transition-colors ${
                isActive
                  ? 'bg-[#d8d6f4] text-black font-semibold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile topbar with menu button */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            src="https://storage.googleapis.com/a1aa/image/bb90e843-86ae-4b5d-8625-65cd7b3ae954.jpg"
            alt="FARFAZA FC"
            className="w-6 h-6"
          />
          <span className="font-bold text-blue-900 text-sm">FARFAZA FC</span>
        </div>
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-80">{SidebarContent}</aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-black/30  w-full" onClick={() => setMenuOpen(false)} />
          <div className="bg-white shadow-lg h-full w-64 animate-slide-in-left absolute left-0 top-0 z-50">
            {SidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
