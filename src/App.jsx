import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import StaffPelatih from './pages/StaffPelatih'
import About from './pages/About'

function App() {
  const location = useLocation()
  const hideHeaderRoutes = ['/login']

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/staff" element={<StaffPelatih />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
