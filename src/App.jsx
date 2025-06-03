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
import Presence from './pages/Admin/Siswa/Presence'
import Orangtua from './pages/Admin/Orangtua'
import ProtectAdmin from './utils/ProtectAdmin'
import AlreadyLogin from './utils/AlreadyLogin'


function App() {

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
        
        <Route path='/admin' element={<ProtectAdmin />} >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="siswa" element={<Siswa />} />
          <Route path="siswa/create" element={<CreateSiswa />} />  
          <Route path="siswa/edit" element={<EditSiswa />} />  
          <Route path="kehadiran" element={<Presence/>} />
          <Route path="orangtua" element={<Orangtua />} />
        </Route>

        <Route element={<AlreadyLogin />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
