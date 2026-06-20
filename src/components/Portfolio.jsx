import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import axios from 'axios'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

const CATEGORIES = ['All', 'Branding', 'UI/UX', 'Print', 'Social Media', 'Identity']

// Fallback placeholder projects shown when Cloudinary is not configured
const PLACEHOLDER_PROJECTS = [
  { id: 1, title: 'Bloom — Brand Identity',    category: 'Branding',      color: '#c084fc', emoji: '🌸' },
  { id: 2, title: 'Nexus App UI',              category: 'UI/UX',         color: '#818cf8', emoji: '📱' },
  { id: 3, title: 'Annual Report 2024',        category: 'Print',         color: '#fbbf24', emoji: '📄' },
  { id: 4, title: 'Pulse Social Campaign',     category: 'Social Media',  color: '#34d399', emoji: '📣' },
  { id: 5, title: 'Ember Coffee Identity',     category: 'Identity',      color: '#fb923c', emoji: '☕' },
  { id: 6, title: 'Orion SaaS Dashboard',      category: 'UI/UX',         color: '#38bdf8', emoji: '🖥️' },
  { id: 7, title: 'Verdant Packaging',         category: 'Branding',      color: '#4ade80', emoji: '🌿' },
  { id: 8, title: 'Luna Magazine Layout',      category: 'Print',         color: '#f472b6', emoji: '🌙' },
  { id: 9, title: 'Nova Startup Identity',     category: 'Identity',      color: '#a78bfa', emoji: '🚀' },
]

function PlaceholderCard({ project, onClick, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'var(--color-surface2)',
        border: '1px solid var(--color-border)',
        position: 'relative',
      }}
    >
      {/* Faux image */}
      <div style={{
        aspectRatio: '4/3',
        background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${project.color}15 1px, transparent 1px), linear-gradient(90deg, ${project.color}15 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />
        <span style={{ fontSize: '3rem', zIndex: 1 }}>{project.emoji}</span>
        <span style={{
          fontSize: '0.75rem',
          color: project.color,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          zIndex: 1,
          padding: '0.25rem 0.75rem',
          background: `${project.color}18`,
          borderRadius: '100px',
        }}>
          {project.category}
        </span>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, ${project.color}55, transparent)`,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <span style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.02em',
          }}>
            ↗ View Project
          </span>
        </motion.div>
      </div>

      {/* Title */}
      <div style={{ padding: '1rem 1.25rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '0.95rem',
          color: 'var(--color-text)',
          marginBottom: '0.25rem',
        }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>{project.category}</p>
      </div>
    </motion.div>
  )
}

function CloudinaryCard({ image, onClick, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'var(--color-surface2)',
        border: '1px solid var(--color-border)',
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3' }}>
        <img
          src={image.url}
          alt={image.public_id}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,15,0.85), rgba(10,10,15,0.2))',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
            ↗ View Project
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter]     = useState('All')
  const [cloudImages, setCloudImages]       = useState([])
  const [cloudLoading, setCloudLoading]     = useState(false)
  const [lightboxOpen, setLightboxOpen]     = useState(false)
  const [lightboxIndex, setLightboxIndex]   = useState(0)

  // Try to load Cloudinary images if cloud name is set
  useEffect(() => {
    if (!CLOUD_NAME) return
    setCloudLoading(true)
    axios
      .get(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/portfolio.json`)
      .then(res => {
        const imgs = (res.data.resources || []).map(r => ({
          src: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${r.public_id}`,
          url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_800/${r.public_id}`,
          public_id: r.public_id,
        }))
        setCloudImages(imgs)
      })
      .catch(console.error)
      .finally(() => setCloudLoading(false))
  }, [])

  const usingCloudinary = CLOUD_NAME && cloudImages.length > 0

  const filtered = usingCloudinary
    ? cloudImages
    : activeFilter === 'All'
      ? PLACEHOLDER_PROJECTS
      : PLACEHOLDER_PROJECTS.filter(p => p.category === activeFilter)

  const lightboxSlides = usingCloudinary
    ? cloudImages.map(img => ({ src: img.src }))
    : []

  const openLightbox = useCallback((idx) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }, [])

  return (
    <section id="portfolio" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* BG accent */}
      <div aria-hidden style={{
        position: 'absolute', left: '50%', top: '0',
        transform: 'translateX(-50%)',
        width: '80vw', height: '30vw',
        background: 'radial-gradient(ellipse, rgba(129,140,248,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.03em',
            marginBottom: '3rem',
            color: 'var(--color-text)',
          }}
        >
          Portfolio Gallery
        </motion.h2>

        {/* Cloudinary notice (dev) */}
        {!CLOUD_NAME && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass"
            style={{
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              borderLeft: '3px solid var(--color-accent)',
              fontSize: '0.85rem',
              color: 'var(--color-muted)',
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: 'var(--color-accent)' }}>ℹ Cloudinary not configured.</strong>{' '}
            Set <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '4px' }}>VITE_CLOUDINARY_CLOUD_NAME</code>{' '}
            in a <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '4px' }}>.env</code> file to display your real work. Showing placeholder projects below.
          </motion.div>
        )}

        {/* Category filters (placeholder mode only) */}
        {!usingCloudinary && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              marginBottom: '3rem',
            }}
          >
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\//g, '-')}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '100px',
                  border: '1px solid',
                  borderColor: activeFilter === cat ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
                  background: activeFilter === cat ? 'rgba(192,132,252,0.15)' : 'transparent',
                  color: activeFilter === cat ? 'var(--color-accent)' : 'var(--color-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Loading */}
        {cloudLoading && (
          <div style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '4rem' }}>
            Loading portfolio…
          </div>
        )}

        {/* Grid */}
        {!cloudLoading && (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: '1.25rem',
            }}
          >
            <AnimatePresence mode="popLayout">
              {usingCloudinary
                ? cloudImages.map((img, i) => (
                    <CloudinaryCard key={img.public_id} image={img} index={i} onClick={() => openLightbox(i)} />
                  ))
                : filtered.map((proj, i) => (
                    <PlaceholderCard key={proj.id} project={proj} index={i} onClick={() => {}} />
                  ))
              }
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox (only for Cloudinary images) */}
      {usingCloudinary && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={lightboxIndex}
        />
      )}
    </section>
  )
}
