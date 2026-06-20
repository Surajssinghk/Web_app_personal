import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      padding: '2rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '1.1rem',
          letterSpacing: '-0.02em',
        }}>
          <span className="gradient-text">YS</span>
          <span style={{ color: 'var(--color-muted)', fontWeight: 400, fontSize: '0.85rem', marginLeft: '0.35rem' }}>
            portfolio
          </span>
        </div>

        {/* Copyright */}
        <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
          © {year} Yuvraj Singh. All rights reserved.
        </p>

        {/* Back to top */}
        <Link to="hero" smooth duration={900} style={{ cursor: 'pointer' }}>
          <motion.button
            id="back-to-top-btn"
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 20px rgba(192,132,252,0.3)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(192,132,252,0.1)',
              border: '1px solid rgba(192,132,252,0.3)',
              color: 'var(--color-accent)',
              borderRadius: '8px',
              padding: '0.45rem 1rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            ↑ Back to top
          </motion.button>
        </Link>
      </div>
    </footer>
  )
}
