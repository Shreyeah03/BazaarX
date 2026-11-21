import { Link } from 'react-router-dom'
import { Instagram, Twitter, Youtube } from 'lucide-react'

const footerLinks = {
  Shop: ['Sneakers', 'Streetwear', 'Watches', 'Headphones'],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Collections', to: '/collections' },
    { label: 'Careers' },
    { label: 'Press' },
    { label: 'Blog' },
  ],
  Support: ['Help Center', 'Shipping', 'Returns', 'Contact'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-2xl font-bold gradient-text">
              BazaarX
            </Link>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed max-w-xs">
              Sneakers, streetwear, watches, and gear sold online across India.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-xl glass glass-hover text-gray-400 hover:text-white transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((item) => {
                  const link = typeof item === 'string' ? { label: item } : item
                  const className = 'text-sm text-gray-500 hover:text-white transition-colors'
                  return (
                    <li key={link.label}>
                      {link.to ? (
                        <Link to={link.to} className={className}>
                          {link.label}
                        </Link>
                      ) : (
                        <a href="#" className={className}>
                          {link.label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2026 BazaarX. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
