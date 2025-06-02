import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Public/Login'
import Home from './pages/Public/Home'
import StaffPelatih from './pages/Public/StaffPelatih'
import About from './pages/Public/About'
import Contact from './pages/Public/Contact'

function App() {
  const location = useLocation()
  const hideHeaderRoutes = ['/login']

  return (
    <div className='font-poppins'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff" element={<StaffPelatih />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
