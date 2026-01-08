import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-royal-950 to-charcoal-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl"></div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 
                              flex items-center justify-center shadow-lg">
                <span className="text-xl">🐾</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">VCare</h3>
                <p className="text-sm text-amber-400/80">Dog & Cat Clinic</p>
              </div>
            </div>
            <p className="text-cream-300/80 text-sm leading-relaxed mb-6">
              Your trusted partner in pet healthcare. We provide premium veterinary
              care for all animals with compassion and expertise.
            </p>
            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">10K+</div>
                <div className="text-xs text-cream-400/70">Happy Pets</div>
              </div>
              <div className="w-px h-10 bg-cream-700/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">18+</div>
                <div className="text-xs text-cream-400/70">Years</div>
              </div>
              <div className="w-px h-10 bg-cream-700/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">24/7</div>
                <div className="text-xs text-cream-400/70">Support</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/shop', label: 'Shop' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/admin/login', label: 'Admin Login' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-300/80 hover:text-amber-400 transition-colors 
                               text-sm flex items-center gap-2 group"
                  >
                    <svg
                      className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 
                                 transition-all duration-300 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-amber-400">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'General Checkups', icon: '🩺' },
                { name: 'Vaccinations', icon: '💉' },
                { name: 'Dental Care', icon: '🦷' },
                { name: 'Surgery', icon: '✂️' },
                { name: 'Emergency Care', icon: '🚨' },
                { name: 'Pet Grooming', icon: '🧴' },
              ].map((service) => (
                <li key={service.name} className="flex items-center gap-2">
                  <span className="text-sm">{service.icon}</span>
                  <span className="text-cream-300/80 text-sm">{service.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-amber-400">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center 
                                flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-cream-300/80 text-sm leading-relaxed">
                  GF-96, Khazana Market Chauraha,<br />
                  Sector K, Ashiyana,<br />
                  Lucknow, UP 226012
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center 
                                flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <a href="tel:+918188000557" className="text-cream-300/80 text-sm hover:text-amber-400 transition-colors">
                  +91 81880 00557
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center 
                                flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <a href="mailto:vcaredogandcatcliniclko@gmail.com" className="text-cream-300/80 text-sm hover:text-amber-400 transition-colors break-all">
                  vcaredogandcatcliniclko@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream-800/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-cream-400/60 text-sm text-center md:text-left">
              © {currentYear} VCare Dog and Cat Clinic. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:vcaredogandcatcliniclko@gmail.com"
                className="w-10 h-10 rounded-xl bg-cream-800/20 flex items-center justify-center 
                           hover:bg-amber-500 transition-all duration-300 group"
                aria-label="Email"
                title="Email"
              >
                <svg className="w-4 h-4 text-cream-300 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
              <a
                href="tel:+918188000557"
                className="w-10 h-10 rounded-xl bg-cream-800/20 flex items-center justify-center 
                           hover:bg-amber-500 transition-all duration-300 group"
                aria-label="Phone"
                title="Phone"
              >
                <svg className="w-4 h-4 text-cream-300 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-cream-800/20 flex items-center justify-center 
                           hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 
                           transition-all duration-300 group"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-4 h-4 text-cream-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-cream-800/20 flex items-center justify-center 
                           hover:bg-blue-500 transition-all duration-300 group"
                aria-label="Twitter"
                title="Twitter"
              >
                <svg className="w-4 h-4 text-cream-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
