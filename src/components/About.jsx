import { motion } from 'framer-motion'

const fadeLeft  = { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }
const fadeRight = { hidden: { opacity: 0, x:  60 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }
const fadeUp    = { hidden: { opacity: 0, y:  30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

const stats = [
  { value: '5+',  label: 'Years Experience' },
  { value: '120+', label: 'Projects Delivered' },
  { value: '40+',  label: 'Happy Clients' },
]

export default function About() {
  return (
    <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* BG accent */}
      <div aria-hidden style={{
        position: 'absolute', left: '-20%', top: '10%',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(ellipse, rgba(129,140,248,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            textAlign: 'center',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '1rem',
          }}
        >
          About Me
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.03em',
            marginBottom: '4rem',
            color: 'var(--color-text)',
          }}
        >
          The designer behind the work
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Photo side */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '300px', height: '380px' }}>
              {/* Decorative frame */}
              <div style={{
                position: 'absolute',
                top: '-12px', left: '-12px', right: '12px', bottom: '12px',
                borderRadius: '20px',
                border: '2px solid rgba(192,132,252,0.3)',
              }} />
              {/* Photo card */}
              <div
                className="glass"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(192,132,252,0.15) 0%, rgba(129,140,248,0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Avatar placeholder */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(160deg, #1a1025 0%, #0f0f1a 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}>
                  <div style={{
                    width: '110px', height: '110px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #c084fc, #818cf8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                    color: '#fff',
                    boxShadow: '0 0 40px rgba(192,132,252,0.4)',
                  }}>
                    AM
                  </div>
                  <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    Your photo here
                  </span>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="glass"
                style={{
                  position: 'absolute',
                  bottom: '-20px', right: '-20px',
                  padding: '0.6rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 32px rgba(192,132,252,0.2)',
                }}
              >
                ✦ Graphic Designer
              </motion.div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'var(--color-muted)',
              marginBottom: '1.5rem',
            }}>
              Hi, I'm Alex — a graphic designer with a passion for crafting visual stories that resonate. I specialise in brand identity, UI/UX, and print design, working at the intersection of strategy and aesthetics.
            </p>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--color-muted)',
              marginBottom: '2.5rem',
            }}>
              Every project I take on starts with deep listening. I believe great design isn't just beautiful — it solves real problems and creates lasting impressions. Whether it's a startup's first logo or a rebranding of an established company, I bring the same level of care and craft to every brief.
            </p>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="glass"
                  style={{
                    padding: '1rem',
                    borderRadius: '14px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '1.8rem',
                    letterSpacing: '-0.03em',
                    marginBottom: '0.25rem',
                  }}
                  className="gradient-text"
                  >
                    {value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV button */}
            <motion.a
              id="download-cv-btn"
              href="#"
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(192,132,252,0.25)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.5rem',
                border: '1px solid rgba(192,132,252,0.4)',
                borderRadius: '10px',
                color: 'var(--color-accent)',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s',
              }}
            >
              ↓ Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
