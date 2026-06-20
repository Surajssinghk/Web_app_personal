import { useState } from 'react'
import { motion } from 'framer-motion'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const socials = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yuvrajsingh',
    color: '#0a66c2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'behance',
    label: 'Behance',
    href: 'https://behance.net/yuvrajsingh',
    color: '#1769ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.051-1.977-5.051-5.064 0-2.976 1.875-5.041 5.089-5.041 3.518 0 4.976 2.164 5.085 5.482H15.5c.13 1.38.932 2.213 2.125 2.213 1.014 0 1.68-.498 1.95-1.59h4.151zM7.326 9.26c.938 0 1.607.437 1.607 1.276 0 .8-.532 1.214-1.607 1.214H4.893V9.26H7.326zM4.893 15.457V12.7h2.67c1.161 0 1.889.472 1.889 1.4 0 .984-.787 1.357-1.889 1.357H4.893zm6.926-5.6c0-2.72-1.85-4.083-5.079-4.083H1v14.443h5.813c3.426 0 5.24-1.424 5.24-4.14 0-1.682-.794-2.797-2.054-3.307.989-.476 1.82-1.424 1.82-2.913zM17.65 14c-.131-1.12-.724-1.85-1.732-1.85-1.039 0-1.709.699-1.875 1.85H17.65z"/>
      </svg>
    ),
  },
  {
    id: 'dribbble',
    label: 'Dribbble',
    href: 'https://dribbble.com/yuvrajsingh',
    color: '#ea4c89',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.048 6.39 1.73 1.35 3.92 2.166 6.333 2.166 1.42 0 2.77-.29 4.01-.815l-.04-.01zm-8.74-2.23c.23-.4 3.045-5.055 8.298-6.766.12-.04.24-.078.358-.113-.18-.408-.37-.82-.57-1.222-5.071 1.515-9.993 1.44-10.46 1.43-.002.062-.004.124-.004.186 0 2.584.985 4.94 2.577 6.485zm-2.44-8.52c.486.01 4.543.017 9.298-1.226C12.11 6.8 10.42 4.19 10.14 3.7c-2.73 1.29-4.825 3.63-5.547 6.535zm6.71-8.85c.295.45 2.06 3.05 3.065 6.27 3.065-.966 4.37-2.425 4.515-2.615C17.555 3.05 14.966 1.89 12.02 1.89c-.41 0-.815.025-1.21.07l-.17.01z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/yuvrajsingh.design',
    color: '#e1306c',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section" style={{
      background: 'linear-gradient(to bottom, var(--color-bg), var(--color-surface))',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG accents */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-5%', left: '50%',
        transform: 'translateX(-50%)',
        width: '60vw', height: '30vw',
        background: 'radial-gradient(ellipse, rgba(192,132,252,0.1) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.p {...fadeUp(0)} style={{
          textAlign: 'center',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: '1rem',
        }}>
          Contact
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} style={{
          textAlign: 'center',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          color: 'var(--color-text)',
        }}>
          Let's Create Together
        </motion.h2>
        <motion.p {...fadeUp(0.2)} style={{
          textAlign: 'center',
          color: 'var(--color-muted)',
          fontSize: '1rem',
          maxWidth: '480px',
          margin: '0 auto 3rem',
          lineHeight: 1.7,
        }}>
          Have a project in mind? I'd love to hear from you. Send a message or reach out via any of the links below.
        </motion.p>

        {/* Email CTA */}
        <motion.div {...fadeUp(0.25)} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.a
            id="email-link"
            href="mailto:hello@yuvrajsingh.design"
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(192,132,252,0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #c084fc, #818cf8)',
              borderRadius: '14px',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.05rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.01em',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            hello@yuvrajsingh.design
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div {...fadeUp(0.3)} style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3.5rem',
        }}>
          {socials.map(({ id, label, href, color, icon }) => (
            <motion.a
              key={id}
              id={`social-${id}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, boxShadow: `0 8px 24px ${color}44`, borderColor: color, color }}
              className="glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                color: 'var(--color-muted)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                transition: 'all 0.25s',
              }}
            >
              {icon}
              {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact form */}
        <motion.div {...fadeUp(0.35)}>
          <div className="glass" style={{
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.25rem',
              marginBottom: '1.5rem',
              color: 'var(--color-text)',
            }}>
              Send a Message
            </h3>

            {status === 'success' ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: '#4ade80',
                fontWeight: 600,
                fontSize: '1rem',
              }}>
                ✓ Message sent! I'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label htmlFor="name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project…"
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#f87171', fontSize: '0.85rem' }}>
                    Something went wrong. Please try again or email directly.
                  </p>
                )}

                <motion.button
                  id="submit-form-btn"
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(192,132,252,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    alignSelf: 'flex-start',
                    background: 'linear-gradient(135deg, #c084fc, #818cf8)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.75rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-body)',
                    opacity: status === 'sending' ? 0.7 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '0.75rem 1rem',
  fontSize: '0.95rem',
  color: 'var(--color-text)',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}
