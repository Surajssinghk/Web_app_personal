import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const words = ['Branding.', 'UI/UX.', 'Print.', 'Motion.', 'Identity.']

function AnimatedWord() {
  const ref = useRef(null)
  const idx  = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tick = () => {
      idx.current = (idx.current + 1) % words.length
      el.textContent = words[idx.current]
    }
    const id = setInterval(tick, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      ref={ref}
      className="gradient-text glow-text"
      style={{ display: 'inline-block', minWidth: '6ch' }}
    >
      {words[0]}
    </span>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 1.5rem',
        textAlign: 'center',
      }}
    >
      {/* Background glows */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: '80vw', height: '60vw',
          background: 'radial-gradient(ellipse, rgba(192,132,252,0.12) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%', right: '-10%',
          width: '40vw', height: '40vw',
          background: 'radial-gradient(ellipse, rgba(129,140,248,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        {/* Animated grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', zIndex: 1, maxWidth: '820px', width: '100%' }}
      >
        {/* Name */}
        <motion.h1
          variants={item}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '0.75rem',
            color: 'var(--color-text)',
          }}
        >
          Yuvraj Singh
        </motion.h1>

        {/* Animated discipline */}
        <motion.div
          variants={item}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}
        >
          Graphic Designer — <AnimatedWord />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--color-muted)',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Turning ideas into unforgettable visuals. I craft brands, interfaces, and experiences that leave a mark.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="portfolio" smooth duration={700} offset={-68} style={{ cursor: 'pointer' }}>
            <motion.button
              id="hero-view-work-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(192,132,252,0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #c084fc 0%, #818cf8 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '0.85rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.01em',
              }}
            >
              View My Work ↓
            </motion.button>
          </Link>
          <Link to="contact" smooth duration={700} offset={-68} style={{ cursor: 'pointer' }}>
            <motion.button
              id="hero-contact-btn"
              whileHover={{ scale: 1.05, borderColor: 'rgba(192,132,252,0.6)', color: 'var(--color-accent)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'transparent',
                color: 'var(--color-text)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                padding: '0.85rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
