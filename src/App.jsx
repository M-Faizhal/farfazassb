import { Routes, Route, useLocation } from 'react-router-dom'

// Public Pages
import UserLogin from './pages/Public/Login'
import Home from './pages/Public/Home'
import StaffPelatih from './pages/Public/StaffPelatih'
import About from './pages/Public/About'
import Contact from './pages/Public/Contact'

// Admin Pages
import AdminLogin from './pages/Admin/Auth/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import Siswa from './pages/Admin/Siswa'
import CreateSiswa from './pages/Admin/Siswa/CreateSiswa'
import EditSiswa from './pages/Admin/Siswa/EditSiswa'

function App() {
  const location = useLocation()
  const hideHeaderRoutes = ['/login', '/admin/login']

  return (
    <div className="font-poppins">
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/staff" element={<StaffPelatih />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/siswa" element={<Siswa />} />
        <Route path="/admin/siswa/create" element={<CreateSiswa />} />  
        <Route path="/admin/siswa/edit" element={<EditSiswa />} />  
      </Routes>
    </div>
  )
}

export default App
