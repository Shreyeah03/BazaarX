import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'bazaarx-auth'
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')

function readStoredAuth() {
  if (typeof window === 'undefined') return { token: null, user: null }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { token: null, user: null }
    const parsed = JSON.parse(raw)
    return { token: parsed?.token || null, user: parsed?.user || null }
  } catch {
    return { token: null, user: null }
  }
}

async function request(endpoint, payload, method = 'POST') {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload ? JSON.stringify(payload) : undefined,
  })

  let data = {}
  try {
    data = await response.json()
  } catch {
    data = {}
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Authentication failed')
  }

  return data
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredAuth().user)
  const [token, setToken] = useState(() => readStoredAuth().token)

  const persistAuth = (nextToken, nextUser) => {
    if (nextToken && nextUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: nextToken, user: nextUser }))
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  const login = async ({ email, password }) => {
    const data = await request('/auth/login', { email, password })
    setToken(data.token)
    setUser(data.user)
    persistAuth(data.token, data.user)
    return data
  }

  const register = async ({ name, email, password }) => {
    const data = await request('/auth/register', { name, email, password })
    setToken(data.token)
    setUser(data.user)
    persistAuth(data.token, data.user)
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    persistAuth(null, null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
