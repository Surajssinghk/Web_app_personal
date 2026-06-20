import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'

const navLinks = [
  { label: 'About',     to: 'about'     },
  { label: 'Skills',    to: 'skills'    },
  { label: 'Work',      to: 'portfolio' },
  { label: 'Contact',   to: 'contact'   },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [activeLink,  setActiveLink]  = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'background 0.4s, box-shadow 0.4s, border-color 0.4s',
          background: scrolled
            ? 'rgba(10,10,15,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to="hero" smooth duration={700} style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.35rem',
                letterSpacing: '-0.03em',
              }}
            >
              <span className="gradient-text">YS</span>
              <span style={{ color: 'var(--color-muted)', marginLeft: '0.4rem', fontWeight: 400, fontSize: '0.95rem' }}>
                portfolio
              </span>
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                smooth
                duration={700}
                offset={-68}
                spy
                onSetActive={() => setActiveLink(to)}
                style={{ cursor: 'pointer' }}
              >
                <motion.span
                  whileHover={{ color: '#c084fc' }}
                  style={{
                    display: 'block',
                    padding: '0.4rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: activeLink === to ? 'var(--color-accent)' : 'var(--color-muted)',
                    transition: 'color 0.2s',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.01em',
                  }}
                >
                  {label}
                </motion.span>
              </Link>
            ))}
            <Link to="contact" smooth duration={700} offset={-68} style={{ cursor: 'pointer', marginLeft: '0.5rem' }}>
              <motion.button
                id="nav-cta"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(192,132,252,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'linear-gradient(135deg, #c084fc, #818cf8)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Let's Talk
              </motion.button>
            </Link>
          </div>

          {/* Hamburger */}
          <motion.button
            id="hamburger-btn"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="show-mobile"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
            }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={{
                  rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y:      menuOpen && i === 0 ? 11 : menuOpen && i === 2 ? -11 : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  background: 'var(--color-accent)',
                  borderRadius: '2px',
                }}
              />
            ))}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '68px',
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'rgba(10,10,15,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '1rem 1.5rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                smooth
                duration={700}
                offset={-68}
                onClick={() => setMenuOpen(false)}
                style={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ x: 8, color: '#c084fc' }}
                  style={{
                    padding: '0.75rem 0',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {label}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  )
}
