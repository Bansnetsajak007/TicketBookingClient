import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import EventCreate from './pages/EventCreate'
import TicketPurchase from './pages/TicketPurchase'

function App() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/events/create"
            element={
              user && user.role === 'organizer' ? (
                <EventCreate />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/events/purchase/:eventId"
            element={
              user && user.role === 'normal' ? (
                <TicketPurchase />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App