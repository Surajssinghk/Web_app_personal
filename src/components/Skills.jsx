import { motion } from 'framer-motion'

const skills = [
  {
    name: 'Figma',
    level: 95,
    color: '#a259ff',
    icon: (
      <svg viewBox="0 0 38 57" fill="none" width="32" height="32">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#FF7262"/>
      </svg>
    ),
  },
  {
    name: 'Photoshop',
    level: 90,
    color: '#31a8ff',
    icon: (
      <svg viewBox="0 0 100 100" width="32" height="32">
        <rect width="100" height="100" rx="16" fill="#001E36"/>
        <text x="50" y="68" textAnchor="middle" fontSize="44" fontWeight="700" fill="#31A8FF" fontFamily="serif">Ps</text>
      </svg>
    ),
  },
  {
    name: 'Illustrator',
    level: 88,
    color: '#ff9a00',
    icon: (
      <svg viewBox="0 0 100 100" width="32" height="32">
        <rect width="100" height="100" rx="16" fill="#300E05"/>
        <text x="50" y="68" textAnchor="middle" fontSize="44" fontWeight="700" fill="#FF9A00" fontFamily="serif">Ai</text>
      </svg>
    ),
  },
  {
    name: 'After Effects',
    level: 75,
    color: '#9999ff',
    icon: (
      <svg viewBox="0 0 100 100" width="32" height="32">
        <rect width="100" height="100" rx="16" fill="#00005B"/>
        <text x="50" y="68" textAnchor="middle" fontSize="44" fontWeight="700" fill="#9999FF" fontFamily="serif">Ae</text>
      </svg>
    ),
  },
  {
    name: 'InDesign',
    level: 82,
    color: '#ff3366',
    icon: (
      <svg viewBox="0 0 100 100" width="32" height="32">
        <rect width="100" height="100" rx="16" fill="#49021F"/>
        <text x="50" y="68" textAnchor="middle" fontSize="44" fontWeight="700" fill="#FF3366" fontFamily="serif">Id</text>
      </svg>
    ),
  },
  {
    name: 'Procreate',
    level: 80,
    color: '#c084fc',
    icon: (
      <svg viewBox="0 0 100 100" width="32" height="32">
        <rect width="100" height="100" rx="16" fill="#1c0a30"/>
        <circle cx="50" cy="50" r="26" fill="none" stroke="#c084fc" strokeWidth="6"/>
        <circle cx="50" cy="50" r="10" fill="#c084fc"/>
      </svg>
    ),
  },
  {
    name: 'Blender',
    level: 65,
    color: '#ea7600',
    icon: (
      <svg viewBox="0 0 100 100" width="32" height="32">
        <rect width="100" height="100" rx="16" fill="#0e0e0e"/>
        <circle cx="50" cy="50" r="28" fill="none" stroke="#ea7600" strokeWidth="5"/>
        <circle cx="50" cy="50" r="13" fill="#ea7600"/>
        <line x1="50" y1="22" x2="78" y2="50" stroke="#ea7600" strokeWidth="5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Canva',
    level: 92,
    color: '#00c4cc',
    icon: (
      <svg viewBox="0 0 100 100" width="32" height="32">
        <rect width="100" height="100" rx="16" fill="#0a1628"/>
        <text x="50" y="68" textAnchor="middle" fontSize="44" fontWeight="700" fill="#00C4CC" fontFamily="sans-serif">C</text>
      </svg>
    ),
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Skills() {
  return (
    <section id="skills" className="section" style={{
      background: 'linear-gradient(to bottom, var(--color-bg) 0%, var(--color-surface) 50%, var(--color-bg) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG accent */}
      <div aria-hidden style={{
        position: 'absolute', right: '-10%', top: '20%',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(ellipse, rgba(192,132,252,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
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
          Tools & Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
            color: 'var(--color-text)',
          }}
        >
          My Design Toolkit
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            textAlign: 'center',
            color: 'var(--color-muted)',
            fontSize: '1rem',
            maxWidth: '480px',
            margin: '0 auto 3.5rem',
            lineHeight: 1.7,
          }}
        >
          I use industry-standard tools to bring creative visions to life, from concept sketches to polished deliverables.
        </motion.p>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {skills.map(({ name, level, color, icon }) => (
            <motion.div
              key={name}
              variants={cardAnim}
              whileHover={{ y: -6, boxShadow: `0 16px 48px ${color}22` }}
              className="glass"
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                cursor: 'default',
                transition: 'box-shadow 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${color}18`,
                  flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--color-text)',
                  }}>
                    {name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                    {level >= 90 ? 'Expert' : level >= 80 ? 'Advanced' : level >= 70 ? 'Proficient' : 'Intermediate'}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                height: '4px',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                    borderRadius: '4px',
                  }}
                />
              </div>
              <div style={{
                marginTop: '0.35rem',
                fontSize: '0.75rem',
                color: color,
                fontWeight: 600,
                textAlign: 'right',
              }}>
                {level}%
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
