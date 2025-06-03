import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FiLogOut } from 'react-icons/fi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

const AdminSidebar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [, removeCookie] = useCookies([import.meta.env.VITE_COOKIES_NAME]);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Siswa', path: '/admin/siswa' },
    { name: 'Pelatih', path: '/admin/pelatih' },
    { name: 'Kehadiran', path: '/admin/kehadiran' },
    { name: 'Penilaian', path: '/admin/daftartes' },
    { name: 'Prestasi', path: '/admin/prestasi' },
    { name: 'Akun Orang Tua', path: '/admin/orangtua' },
  ];

  const logout = () => {
    removeCookie(import.meta.env.VITE_COOKIES_NAME);
    navigate('/');
  };

  const SidebarContent = (
    <div className="flex flex-col px-6 py-8 space-y-6 bg-white h-full w-64 border-r border-gray-200">
      <div className="flex items-center justify-between md:justify-start space-x-2">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="FARFAZA FC" className="w-18 h-16" />
          <span className="font-bold text-blue-900 text-sm">FARFAZA FC</span>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(false)}>
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
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-md text-left font-medium transition-colors ${
                isActive
                  ? 'bg-primary-200/20 text-black font-semibold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {item.name}
            </NavLink>
          );
        })}

        <div
          onClick={() => setShowLogoutModal(true)}
          className="flex flex-row gap-2 items-center px-3 py-2 rounded-md text-red-500 cursor-pointer bg-red-200 text-left font-medium transition-colors"
        >
          <FiLogOut width={20} />
          <p>Logout</p>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile topbar - Fixed at top */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-4 bg-white shadow-sm mb-6">
        <div className="flex items-center space-x-2">
          <img src="/assets/logo.png" alt="FARFAZA FC" className="w-18 h-16" />
          <span className="font-bold text-blue-900 text-sm">FARFAZA FC</span>
        </div>
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop sidebar - Fixed at left side */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-80 z-30">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="bg-black/30 w-full h-full" onClick={() => setMenuOpen(false)} />
          <div className="bg-white shadow-lg h-full w-64 animate-slide-in-left absolute left-0 top-0 z-50">
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Konfirmasi Logout</h2>
            <p className="text-sm text-gray-600 mb-6">Apakah Anda yakin ingin logout dari akun admin?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-800 text-sm"
              >
                Batal
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;