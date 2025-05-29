import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { Mail, Lock, UserCircle } from 'lucide-react'

function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('normal')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(email, password, role)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        {error && (
          <p className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-center text-sm">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="mb-1 text-sm font-medium text-gray-700">
              Select Role
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="normal">Normal User</option>
                <option value="organizer">Organizer</option>
              </select>
              <UserCircle className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:bg-blue-400"
          >
            {loading ? <Spinner /> : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
