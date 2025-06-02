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
        <Route path="/admin/dashboard/siswa" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App
