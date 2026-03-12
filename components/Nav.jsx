'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/#services', label: 'Services' },
    { href: '/#clients', label: 'Clients' },
    { href: '/#about', label: 'About' },
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
      background: scrolled ? 'rgba(6,0,3,0.94)' : 'transparent',
      boxShadow: scrolled ? '0 1px 0 rgba(197,160,40,0.12)' : 'none',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: '0 clamp(24px,4vw,60px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? 64 : 80,
        transition: 'height 0.3s ease',
      }}>

        {/* Logo */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 14,
          textDecoration: 'none',
        }}>
          <Image src="/logo.png" alt="OSE" width={36} height={48}
            style={{ display: 'block', width: 36, height: 'auto', flexShrink: 0 }} />
          <div>
            <div style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontWeight: 700, fontSize: 15, color: '#fff',
              letterSpacing: '-0.01em', lineHeight: 1.2,
            }}>
              Omaha Stage Equipment
            </div>
            <div style={{
              fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(197,160,40,0.7)', fontWeight: 600,
            }}>
              Est. 1926
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              fontWeight: 700, color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none', transition: 'color 0.2s',
              position: 'relative',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
            >
              {l.label}
            </a>
          ))}

          <a href="/#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 22px',
            background: '#c5a028', color: '#1a1618',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.18em',
            textTransform: 'uppercase', textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d4b53a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#c5a028'; e.currentTarget.style.transform = 'none' }}
          >
            Get a Quote
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: 5, padding: 8,
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 1.5,
              background: '#fff',
              transition: 'all 0.25s ease',
              transform: menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        maxHeight: menuOpen ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
        background: '#060003',
        borderTop: menuOpen ? '1px solid rgba(197,160,40,0.15)' : 'none',
      }}>
        <div style={{ padding: '24px clamp(24px,4vw,60px) 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
              fontWeight: 700, color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
            }}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
            >{l.label}</a>
          ))}
          <a href="/#contact" onClick={() => setMenuOpen(false)} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 0', background: '#c5a028', color: '#060003',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', textDecoration: 'none', marginTop: 8,
          }}>
            Request a Quote
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 801px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  )
}
