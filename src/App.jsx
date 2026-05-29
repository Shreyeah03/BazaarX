import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
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
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen bg-surface">
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <AppRoutes />
              <Footer />
              <CartDrawer />
              <ToastContainer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
