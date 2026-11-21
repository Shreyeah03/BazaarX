import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { CompareProvider } from './context/CompareContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import CompareBar from './components/compare/CompareBar'
import ToastContainer from './components/ui/ToastContainer'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('bazaarx-theme') || 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('bazaarx-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <div className="min-h-screen bg-surface">
                  <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <AppRoutes />
                  <Footer />
                  <CompareBar />
                  <CartDrawer />
                  <ToastContainer />
                </div>
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
