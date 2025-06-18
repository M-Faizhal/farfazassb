import { Routes, Route, useLocation } from 'react-router-dom'

// Public Pages
import UserLogin from './pages/Public/Login'
import Home from './pages/Public/Home'
import StaffPelatih from './pages/Public/StaffPelatih'
import About from './pages/Public/About'
import Contact from './pages/Public/Contact'
import Team from './pages/Public/Team' 

// Private Pages
import UserDashboard from './pages/Private/Dashboard'
import ProfilSiswa from './pages/Private/ProfilSiswa'
import DaftarTesSiswa from './pages/Private/DaftarTes'
import HasilTes from './pages/Private/HasilTes'


// Admin Pages
import AdminLogin from './pages/Admin/Auth/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import Siswa from './pages/Admin/Siswa'
import CreateSiswa from './pages/Admin/Siswa/CreateSiswa'
import EditSiswa from './pages/Admin/Siswa/EditSiswa'
import Pelatih from './pages/Admin/Pelatih'
import CreatePelatih from './pages/Admin/Pelatih/CreatePelatih'
import EditPelatih from './pages/Admin/Pelatih/EditPelatih'
import DaftarTes from './pages/Admin/DaftarTes'
import CreateTes from './pages/Admin/Tes/CreateTes'
import EditTes from './pages/Admin/Tes/EditTes'
import PenilaianSiswa from './pages/Admin/Penilaian/PenilaianSiswa'
import CreatePenilaian from './pages/Admin/Penilaian/CreatePenilaian'
import EditPenilaian from './pages/Admin/Penilaian/EditPenilaian'
import Kehadiran from './pages/Admin/Kehadiran'
import KalenderAbsensi from './pages/Admin/Kehadiran/KalenderAbsensi'
import AbsensiTanggal from './pages/Admin/Kehadiran/AbsensiTanggal'
import Orangtua from './pages/Admin/Orangtua'
import CreateOrangtua from './pages/Admin/Orangtua/CreateOrangtua'
import EditOrangtua from './pages/Admin/Orangtua/EditOrangtua'
import Prestasi from './pages/Admin/Prestasi'
import CreatePrestasi from './pages/Admin/Prestasi/CreatePrestasi'
import EditPrestasi from './pages/Admin/Prestasi/EditPrestasi'
import ProtectAdmin from './utils/ProtectAdmin'
import AlreadyLogin from './utils/AlreadyLogin'
import DetailSiswa from './pages/Admin/Siswa/DetailSiswa'
import DetailPelatih from './pages/Admin/Pelatih/DetailPelatih'
import DetailOrangtua from './pages/Admin/Orangtua/DetailOrangTua'
import DetailPenilaian from './pages/Admin/Penilaian/DetailPenilaian'


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
        <Route path="/team" element={<Team />} />

        {/* Private Pages */}
        <Route path='/user/dashboard' element={<UserDashboard />} />
        <Route path='/user/siswa' element={<ProfilSiswa />} />
        <Route path='/user/penilaian' element={<DaftarTesSiswa />} />
        <Route path='/user/penilaian/:id' element={<HasilTes />} />


        {/* Admin Pages */}
        <Route path='/admin' element={<ProtectAdmin />} >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="siswa" element={<Siswa />} />
          <Route path="siswa/detail/:id" element={<DetailSiswa />} />  
          <Route path="siswa/create" element={<CreateSiswa />} />  
          <Route path="siswa/edit/:id" element={<EditSiswa />} />  
          <Route path="pelatih" element={<Pelatih />} />  
          <Route path="pelatih/create" element={<CreatePelatih />} />  
          <Route path="pelatih/detail/:id" element={<DetailPelatih />} />  
          <Route path="pelatih/edit/:id" element={<EditPelatih />} />  
          <Route path="daftartes" element={<DaftarTes />} />  
          <Route path="daftartes/create" element={<CreateTes />} />  
          <Route path="daftartes/edit/:id" element={<EditTes />} />  
          <Route path="daftartes/penilaian/:id" element={<PenilaianSiswa />} />  
          <Route path="daftartes/penilaian/create/:id" element={<CreatePenilaian />} />  
          <Route path="daftartes/penilaian/edit/:id" element={<EditPenilaian />} />  
          <Route path="daftartes/penilaian/detail/:id" element={<DetailPenilaian />} />  
          <Route path="kehadiran" element={<Kehadiran/>} />
          <Route path="kehadiran/kalender/:level" element={<KalenderAbsensi/>} />
          <Route path="kehadiran/kalender/absensi/:level" element={<AbsensiTanggal/>} />
          <Route path="orangtua" element={<Orangtua />} />
          <Route path="orangtua/create" element={<CreateOrangtua />} />
          <Route path="orangtua/detail/:id" element={<DetailOrangtua />} />
          <Route path="orangtua/edit/:id" element={<EditOrangtua />} />
          <Route path="prestasi" element={<Prestasi />} />
          <Route path="prestasi/create" element={<CreatePrestasi />} />
          <Route path="prestasi/edit/:id" element={<EditPrestasi />} />
        </Route>

        <Route element={<AlreadyLogin />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
