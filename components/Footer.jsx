import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(197,160,40,0.12)' }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)',
      }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 'clamp(32px,4vw,60px)',
          marginBottom: 60,
          paddingBottom: 60,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{ flexShrink: 0 }}>
                <Image src="/logo.png" alt="OSE" width={36} height={48}
                  style={{ display: 'block', width: 36, height: 'auto' }} />
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontWeight: 700, fontSize: 14, color: '#fff',
                  letterSpacing: '-0.01em',
                }}>Omaha Stage Equipment, Inc.</div>
                <div style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(197,160,40,0.6)', textTransform: 'uppercase', marginTop: 2 }}>Est. 1926</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, maxWidth: 280, margin: '0 0 24px' }}>
              Nearly a century of theatrical equipment supply and installation. Serving schools and performance venues across the Midwest.
            </p>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
              NE · IA · KS · SD · MO
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{
              fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#c5a028', fontWeight: 700, marginBottom: 20,
            }}>Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Stage Curtains', 'LED Lighting', 'Rigging Systems', 'Service & Repairs', 'New Construction'].map(s => (
                <a key={s} href="/#services" style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none', transition: 'color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div style={{
              fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#c5a028', fontWeight: 700, marginBottom: 20,
            }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Our Clients', href: '/#clients' },
                { label: 'About Us', href: '/#about' },
                { label: 'Get a Quote', href: '/#contact' },
              ].map(item => (
                <a key={item.label} href={item.href} style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none', transition: 'color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                >{item.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{
              fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#c5a028', fontWeight: 700, marginBottom: 20,
            }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="tel:4023454427" style={{
                fontSize: 18,
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontWeight: 700, color: '#fff', textDecoration: 'none',
                transition: 'color 0.15s', letterSpacing: '-0.01em',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#c5a028'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >402-345-4427</a>
              <a href="mailto:Pat@omahastageequipment.com" style={{
                fontSize: 12, color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none', transition: 'color 0.15s',
                wordBreak: 'break-all',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >Pat@omahastageequipment.com</a>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                8547 Lake St.<br />Omaha, NE 68134
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>
            © {year} Omaha Stage Equipment, Inc. All rights reserved.
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>
            Licensed & Insured · Nebraska & Surrounding States
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 520px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
