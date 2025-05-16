import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({ id: payload.id, role: payload.role })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (err) {
        setToken('')
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [token])

  const login = async (email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      email,
      password,
    })
    const { token } = response.data
    localStorage.setItem('token', token)
    setToken(token)
  }

  const signup = async (email, password, role) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      email,
      password,
      role,
    })
    const { token } = response.data
    localStorage.setItem('token', token)
    setToken(token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)