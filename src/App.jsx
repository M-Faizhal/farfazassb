import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import StaffPelatih from './pages/StaffPelatih'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  const location = useLocation()
  const hideHeaderRoutes = ['/login']

  return (
    <div className='font-poppins'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/staff" element={<StaffPelatih />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
