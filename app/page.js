'use client'
import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01', title: 'Stage Curtains',
    desc: 'Custom-fabricated main act curtains, legs, borders, backdrops, and cycloramas. IFR-compliant fabrics, cord-drawn track systems, hardware, full installation.',
  },
  {
    num: '02', title: 'LED Lighting',
    desc: 'Complete theatrical LED systems — ETC ColorSource fixtures, front-of-house and stage wash positioning, console control, full system design and programming.',
  },
  {
    num: '03', title: 'Rigging Systems',
    desc: 'Counterweight and rope rigging for professional stage operations. New builds, re-ropes, loft and head blocks, arbors, inspections, and ongoing service.',
  },
  {
    num: '04', title: 'Service & Repairs',
    desc: 'Track re-ropes, curtain repairs, lighting fixture service, on-site troubleshooting. Every install we do comes with our personal follow-through.',
  },
]

const DIFFERENTIATORS = [
  { label: 'Professional From Bid to Install', body: 'Every project is quoted by the owner and installed by IATSE Local 42 Union Stagehands — trained professionals who do this for a living.' },
  { label: 'Nearly 100 Years in Business', body: 'Since 1926. That kind of track record only comes from doing things right, consistently.' },
  { label: 'Transparent Pricing', body: "Itemized bids. No hidden fees. You know exactly what you're getting before you sign anything." },
  { label: 'School-Focused Expertise', body: "We work primarily with K\u201312 schools. We understand your facilities, your budgets, and your timelines." },
]

const PROCESS = [
  { num: '01', title: 'Site Visit', desc: "We come to you. We measure the space, assess what's there, and understand the full scope before quoting anything." },
  { num: '02', title: 'Custom Quote', desc: "A clear, itemized bid with no ambiguity. You know exactly what you're getting and what it costs." },
  { num: '03', title: 'Order & Schedule', desc: "We order materials and set an install date that fits your school calendar and facilities schedule." },
  { num: '04', title: 'Installation', desc: "Our crew handles everything start to finish. We walk you through the system before we leave the building." },
]

const VENUES = [
  'K\u201312 School Auditoriums',
  'Community Theaters',
  'Colleges & Universities',
  'Churches & Worship Centers',
  'Civic Auditoriums',
  'New Construction',
]

const TICKER_ITEMS = [
  'Norfolk Senior High School', 'West Holt High School', 'David City High School',
  'Wisner Pilger High School', 'Valentine High School', 'Papillion La Vista High School',
  'Wayne State College', 'Nebraska Community Playhouse', 'Omaha Performing Arts',
  'Southwest Valley High School', 'Boone Central High School', 'Opera Omaha',
  'University of Nebraska Omaha', 'Sokol Auditorium', 'Kimball Public Schools',
  "O'Neill Public Schools", 'Kenesaw Public Schools', 'Sacred Heart Catholic High School',
  'Mount Marty University', 'Newman Grove High School', 'West Monona High School',
]

const CLIENTS = {
  'K\u201312 Schools': [
    'Alta-Aurelia School','Arlington High School','Aquinas High School','Axtell Community Schools',
    'Bellevue East High School','Bloomfield Community Schools','Boone Central High School',
    'CAM High School','CAM Middle School','Cambridge Public Schools','Cedar Bluffs Jr-Sr High School',
    'Central Community School District','Central Lyons High School','Cherokee Community School District',
    'Clarkson Public Schools','Conestoga Jr/Sr High School','Council Bluffs School District',
    'Creighton High School','Dakota City Elementary School','Danbury Catholic School',
    'David City High School','Deshler Public Schools','Doniphan-Trumbull Public Schools',
    'Douglas County West Community Schools','Dundee Elementary School','Dundy County Stratton Schools',
    'Elba Public Schools','Elkhorn Valley Schools','Emmanuel Faith Lutheran School',
    'Fairbury High School','Friend Public Schools','Fullerton Public Schools',
    'Gehlen Catholic School','Gothenburg Public Schools','Grand Island High School',
    'Hastings Catholic Schools','Hastings Senior High School','Hayward Elementary School',
    'High Plains Community Schools','Hinton Community Schools','Independence Jr/Sr High School',
    'Indianola Community Schools','Johnson County Central Public Schools',
    'Johnston Community School District','Jones County School District','Joslyn Elementary School',
    'Kenesaw Public Schools','Kimball Public Schools','Kulm Public Schools',
    'Langford Area School District','Leigh High School','Lenox Jr/Sr High School',
    'Lincoln Lutheran Middle School','Logan Magnolia Community Schools','Logan View Public Schools',
    'Loomis Public Schools','Lutheran High School Northeast','Manson Northwest Webster High School',
    'McPherson County High School','Mead High School','Medicine Valley Public Schools',
    'Midland Community School District','Millard North High School','Nebraska Center for Education of Blind',
    'Nebraska City High School','Nevada Community School District','Newman Grove High School',
    'Norfolk Catholic Schools','Norfolk Junior High School','Norfolk Senior High School',
    'North Bend Public Schools','Northwest High School','Northwood Kensett Community School District',
    "O'Neill Public Schools",'Omaha Public Schools','OPS-Howard Kennedy Elementary School',
    'Papillion La Vista High School','Papillion La Vista South High School','Pender Public Schools',
    'Perkins County Schools','Pierce Public Schools','Ralston High School','Randolph High School',
    'Raymond Central Public Schools','River Valley Community Schools','Rock County Public Schools',
    'Sabetha Middle School','Sacred Heart Catholic High School','Sandy Creek Schools',
    'Sargent Public Schools','Schaller Crestland Community Schools','Schuyler Community School District',
    'Scribner Snyder Community Schools','Shelby Rising City School','South Central Unified School District',
    'South Platte High School','South Sioux City Middle School','Southwest Valley High School',
    'Southwest Valley Middle School','St. Albert High School','St. Columbkille Catholic School',
    'St. Edmond Catholic School','St Pius X St Leo School','Storm Lake Community School District',
    'Tekamah High School','TF Riggs High School','Tri County High School','Tri-County Jr/Sr High',
    'Valentine High School','Wakefield Community Schools','Walt Hill Public Schools',
    'Waterloo High Schools','Waterloo Public Schools','West Harrison Community Schools',
    'West Holt High School','West Monona High School','West Sioux High School','Westside High School',
    'Winside Public Schools','Wisner Pilger High School','Wynot Public Schools',
    'York High School','Yutan Public Schools',
  ],
  'Colleges & Universities': [
    'Bellevue University','Central Community College','Doane University',
    'Iowa Western Community College','Midland University','Mount Marty University',
    'Southwestern Community College','University Nebraska Lincoln',
    'University of Nebraska Omaha','Wayne State College',
  ],
  'Theaters & Performing Arts': [
    'Astro Theater','Bluebarn Theater','Dreamland Theatre','Holland Performing Arts',
    'Nebraska Community Playhouse','Omaha Performing Arts','Opera Omaha',
    'River Valley Players','Rose Theater','The 402 Arts Collective',
    'Union of Contemporary Arts','West Point Community Theatre','What Cheer Opera House',
    'Wilson Performing Arts Center',
  ],
  'Churches & Houses of Worship': [
    'Brookside Church','Christ Lutheran Church','Christ the King','Cornerstone Church',
    'Elevate Church','Grace Bible Church','Harvest Church','King of Kings Church',
    'St. Patricks Catholic Church','St Wenceslaus Church','Trinity Lutheran Church and School',
  ],
  'Community & Civic Venues': [
    'Atkinson County Memorial Building','Baxter Arena','Boys Town National Headquarters',
    'Carroll Recreation Center','City of Oakland','City of York Auditorium',
    'Hastings City Auditorium','Kadoka City Auditorium','Kiewit Luminarium',
    'Multi-Cultural Center of Sioux Falls','Naponee City Auditorium','Offutt Air Force Base',
    "Omaha Children's Museum",'Pender Community Center','Ralston Arena',
    'Sioux City Parks and Recreation','Sokol Auditorium','Sokol Hall NE',
    'Tekamah City Auditorium','Volga City Opera House','Wisner City Auditorium',
  ],
}

/* ─── SUB-COMPONENTS ─────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {}, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(36px)',
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function HeroLine({ children, delay }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.18em', marginBottom: '-0.18em' }}>
      <div style={{ animation: `heroUp 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`, paddingBottom: '0.05em' }}>
        {children}
      </div>
    </div>
  )
}

function Label({ children, light = false }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 14,
      fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase',
      color: '#c5a028', fontWeight: 700, marginBottom: 20,
    }}>
      <span style={{ width: 28, height: 1, background: '#c5a028', flexShrink: 0 }} />
      {children}
    </div>
  )
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '20px 0',
    }}>
      <div style={{
        display: 'flex', width: 'max-content',
        animation: 'ticker 50s linear infinite',
      }}>
        {items.map((name, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 32, padding: '0 32px',
            whiteSpace: 'nowrap', fontSize: 12, letterSpacing: '0.13em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 600,
          }}>
            {name}
            <span style={{ width: 4, height: 4, background: '#c5a028', borderRadius: '50%', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', organization: '', phone: '', email: '', message: '', website: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const field = {
    width: '100%', padding: '16px 0', background: 'transparent',
    border: 'none', borderBottom: '1px solid #ccc',
    color: '#0a0007', fontSize: 15, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.25s', boxSizing: 'border-box',
  }
  const lbl = {
    display: 'block', fontSize: 11, letterSpacing: '0.22em',
    textTransform: 'uppercase', color: 'rgba(197,160,40,0.95)',
    marginBottom: 6, fontWeight: 700,
  }
  const focus = e => e.target.style.borderBottomColor = '#c5a028'
  const blur  = e => e.target.style.borderBottomColor = '#ccc'

  const handleChange = e => setValues(v => ({ ...v, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (res.ok) {
        setStatus('success')
        setValues({ name: '', organization: '', phone: '', email: '', message: '', website: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ padding: '48px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, background: 'rgba(197,160,40,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c5a028" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 22, fontWeight: 700, color: '#0a0007', letterSpacing: '-0.01em' }}>Message Received</div>
            <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>We\'ll be in touch within one business day.</div>
          </div>
        </div>
        <button onClick={() => setStatus('idle')} style={{ fontSize: 12, color: '#c5a028', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, padding: 0 }}>Send another message</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Honeypot — hidden from humans, bots fill it in */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
        {[
          { label: 'Full Name', name: 'name', type: 'text', required: true },
          { label: 'Organization / School', name: 'organization', type: 'text' },
          { label: 'Phone Number', name: 'phone', type: 'tel' },
          { label: 'Email Address', name: 'email', type: 'email', required: true },
        ].map(f => (
          <div key={f.name} style={{ marginBottom: 36 }}>
            <label style={lbl}>{f.label}{f.required ? ' *' : ''}</label>
            <input name={f.name} type={f.type} required={f.required} value={values[f.name]} onChange={handleChange} style={field} onFocus={focus} onBlur={blur} />
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 48 }}>
        <label style={lbl}>Project Details</label>
        <textarea name="message" rows={4} value={values.message} onChange={handleChange} style={{ ...field, resize: 'none' }}
          placeholder="School name, location, what you need, timeline..."
          onFocus={focus} onBlur={blur}
        />
      </div>
      {status === 'error' && (
        <div style={{ marginBottom: 20, fontSize: 13, color: '#c0392b' }}>Something went wrong. Please try again or call us directly.</div>
      )}
      <button type="submit" disabled={status === 'loading'} style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        padding: '17px 44px', background: '#c5a028', color: '#0a0007',
        border: 'none', fontWeight: 800, fontSize: 12, letterSpacing: '0.2em',
        textTransform: 'uppercase', cursor: status === 'loading' ? 'wait' : 'pointer',
        fontFamily: 'inherit', transition: 'background 0.2s, transform 0.2s',
        opacity: status === 'loading' ? 0.7 : 1,
      }}
        onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.background='#d4b53a'; e.currentTarget.style.transform='translateY(-2px)' }}}
        onMouseLeave={e => { e.currentTarget.style.background='#c5a028'; e.currentTarget.style.transform='none' }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
        {status !== 'loading' && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
      </button>
    </form>
  )
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [lineGrown, setLineGrown] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setLineGrown(true), 150)
    return () => clearTimeout(id)
  }, [])

  const SP = 'clamp(80px,10vw,140px)'
  const PX = 'clamp(24px,5vw,80px)'

  return (
    <>
      <Nav />

      {/* ─── FLOATING CTA ──────────────────────────────────────────────── */}
      <a href="#contact" style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 200,
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '12px 22px',
        background: '#c5a028', color: '#1a1618',
        fontWeight: 800, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
        textDecoration: 'none',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(197,160,40,0.3)',
        opacity: scrolled ? 1 : 0,
        transform: scrolled ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.35s, transform 0.35s, background 0.2s',
        pointerEvents: scrolled ? 'auto' : 'none',
      }}
        onMouseEnter={e => { e.currentTarget.style.background='#d4b53a' }}
        onMouseLeave={e => { e.currentTarget.style.background='#c5a028' }}
      >
        Get a Quote
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section style={{
        background: '#0a0007', minHeight: '100vh', position: 'relative',
        overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 3,
          background: 'linear-gradient(90deg, #c5a028 0%, rgba(197,160,40,0.15) 60%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', left: 44, top: 0, width: 1, zIndex: 3,
          height: lineGrown ? '100%' : '0%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(197,160,40,0.4) 15%, rgba(197,160,40,0.4) 85%, transparent 100%)',
          transition: 'height 1.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
        }} />
        <div style={{
          position: 'relative', zIndex: 4,
          maxWidth: 1240, margin: '0 auto', width: '100%',
          padding: `clamp(110px,14vw,160px) ${PX} clamp(90px,11vw,130px) clamp(60px,7vw,90px)`,
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center',
        }}>
          <div style={{ maxWidth: 680 }}>
            <HeroLine delay={80}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40,
                fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase',
                color: '#c5a028', fontWeight: 700,
              }}>
                <span style={{ width: 36, height: 1, background: '#c5a028', flexShrink: 0 }} />
                Theatrical Equipment · Omaha, Nebraska · Est. 1926
              </div>
            </HeroLine>
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(58px, 8.5vw, 108px)',
              fontWeight: 700, lineHeight: 1.05,
              margin: '0 0 36px', letterSpacing: '-0.03em',
            }}>
              <HeroLine delay={200}><span style={{ color: '#fff', display: 'block' }}>The Stage</span></HeroLine>
              <HeroLine delay={340}><span style={{ color: '#fff', display: 'block' }}>Starts</span></HeroLine>
              <HeroLine delay={470}>
                <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '2px #c5a028' }}>Here.</span>
              </HeroLine>
            </h1>
            <HeroLine delay={560}>
              <div style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(18px, 2.2vw, 26px)', fontWeight: 400,
                color: 'rgba(255,255,255,0.75)', letterSpacing: '0.01em',
                lineHeight: 1.4, marginBottom: 32, fontStyle: 'italic',
              }}>
                Stage Curtains &nbsp;&middot;&nbsp; Theatrical Lighting &nbsp;&middot;&nbsp; Rigging
              </div>
            </HeroLine>
            <HeroLine delay={640}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40 }}>
                <a href="#contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                  padding: '20px 52px', background: '#c5a028', color: '#060003',
                  fontWeight: 800, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                  textDecoration: 'none', transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 0 0 0 rgba(197,160,40,0.5)',
                  animation: 'ctaPulse 2.8s ease-in-out 2s infinite',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background='#d4b53a'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(197,160,40,0.35)'; e.currentTarget.style.animation='none' }}
                  onMouseLeave={e => { e.currentTarget.style.background='#c5a028'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 0 0 0 rgba(197,160,40,0.5)'; e.currentTarget.style.animation='ctaPulse 2.8s ease-in-out 2s infinite' }}
                >
                  Request a Quote
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#services" style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '20px 32px', color: 'rgba(255,255,255,0.7)',
                  fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                  textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(255,255,255,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)' }}
                >
                  Our Services
                </a>
              </div>
            </HeroLine>
            <HeroLine delay={740}>
              <p style={{
                color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.9,
                maxWidth: 480, marginBottom: 40, fontWeight: 300,
              }}>
                Supplied and installed by our own crew for schools and performance
                venues across Nebraska and the Midwest — for nearly a century.
              </p>
            </HeroLine>
            <HeroLine delay={860}>
              <div style={{
                paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)',
                fontSize: 12, color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
              }}>
                Omaha, Nebraska &nbsp;&middot;&nbsp; Est. 1926 &nbsp;&middot;&nbsp; Nebraska &middot; Iowa &middot; Kansas &middot; South Dakota
              </div>
            </HeroLine>
          </div>
          <div className="hero-logo" style={{ animation: 'fadeInSlow 1.6s ease 1.1s both' }}>
            <Image src="/logo.png" alt="Omaha Stage Equipment" width={340} height={373}
              style={{ display: 'block', width: 340, height: 'auto' }} />
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 72, background: '#0a0007', zIndex: 3,
          clipPath: 'polygon(0 100%, 100% 20%, 100% 100%)',
        }} />
      </section>



      {/* ─── SERVICES ──────────────────────────────────────────────────── */}
      <section id="services" style={{ background: '#fff', padding: `${SP} ${PX}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal style={{ marginBottom: 64 }}>
            <Label>What We Do</Label>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700,
              color: '#060003', letterSpacing: '-0.025em', lineHeight: 1.08, margin: 0,
            }}>Complete Stage<br />Solutions</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: '#e6e0d6' }} className="services-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <div style={{
                  background: '#fff', padding: '52px 44px', height: '100%',
                  boxSizing: 'border-box', transition: 'background 0.25s', cursor: 'default',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#faf8f5'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <div style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 64, fontWeight: 700, lineHeight: 1,
                    color: '#ede8df', marginBottom: 36, letterSpacing: '-0.04em', userSelect: 'none',
                  }}>{s.num}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 22, fontWeight: 700, color: '#060003',
                    marginBottom: 10, letterSpacing: '-0.01em',
                  }}>{s.title}</h3>
                  <div style={{ width: 28, height: 2, background: '#c5a028', marginBottom: 18 }} />
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} style={{ marginTop: 48, textAlign: 'center' }}>
            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 38px', background: '#c5a028', color: '#060003',
              fontWeight: 800, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background='#d4b53a'; e.currentTarget.style.transform='translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='#c5a028'; e.currentTarget.style.transform='none' }}
            >
              Get a Quote for Your Project
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ─── WHY OSE ───────────────────────────────────────────────────── */}
      <section style={{ background: '#0a0007', padding: `${SP} ${PX}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal style={{ marginBottom: 72 }}>
            <Label>Why Omaha Stage Equipment</Label>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700,
              color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.08, margin: 0,
            }}>What Sets Us Apart</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.06)' }} className="why-grid">
            {[
              {
                num: '01',
                title: 'Owner-Managed, Start to Finish',
                body: 'Every project is handled directly by ownership — not handed off to a project manager you\'ve never met. You get the same level of attention whether it\'s a small curtain job or a full stage system.',
              },
              {
                num: '02',
                title: 'Union-Trained Installation Crew',
                body: 'All installation is performed by IATSE Local 42 Union Stagehands. These are trained theatrical professionals — not general contractors moonlighting on a stage job.',
              },
              {
                num: '03',
                title: 'Nearly 100 Years in Business',
                body: 'Founded in 1926. That kind of longevity only happens when you consistently do right by your customers. Schools come back to us — and they send their neighbors.',
              },
              {
                num: '04',
                title: 'Clear Proposals. No Runaround.',
                body: 'We assess the job, write a straightforward proposal, and tell you exactly what to expect. No upsells after the fact, no surprises mid-job, no chasing us down for answers.',
              },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div style={{
                  background: '#0a0007', padding: 'clamp(36px,5vw,56px) clamp(32px,4vw,52px)',
                  height: '100%', boxSizing: 'border-box',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 56, fontWeight: 700, color: 'rgba(197,160,40,0.18)',
                    lineHeight: 1, marginBottom: 24, letterSpacing: '-0.04em',
                  }}>{item.num}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 'clamp(18px,2vw,22px)', fontWeight: 700,
                    color: '#fff', margin: '0 0 16px', letterSpacing: '-0.01em', lineHeight: 1.2,
                  }}>{item.title}</h3>
                  <div style={{ width: 32, height: 2, background: '#c5a028', marginBottom: 18 }} />
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, margin: 0 }}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─────────────────────────────────────────────────────── */}
      <section id="about" style={{ background: '#fff', padding: `${SP} ${PX}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px,7vw,110px)', alignItems: 'center' }} className="two-col">
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {[
                  { value: '1926', label: 'Est.' },
                  { value: '100+', label: 'Years Active' },
                  { value: '200+', label: 'Schools Served' },
                  { value: '5', label: 'States' },
                ].map((item, i) => (
                  <div key={item.label} style={{
                    padding: '40px 32px',
                    borderRight: (i % 2 === 0) ? '1px solid #ddd4c5' : 'none',
                    borderBottom: i < 2 ? '1px solid #ddd4c5' : 'none',
                  }}>
                    <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(36px,4vw,54px)', fontWeight: 700, color: '#c5a028', lineHeight: 1 }}>{item.value}</div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#888', marginTop: 10 }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <Label>Our Story</Label>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700,
                color: '#0a0007', letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 32px',
              }}>Nearly 100 Years of Stage Expertise</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  "Omaha Stage Equipment has been supplying and installing theatrical equipment since 1926 \u2014 one of the longest-running stage equipment companies in the Midwest.",
                  "We work primarily with K\u201312 schools across Nebraska and surrounding states, providing custom curtains, LED lighting systems, and rigging for auditoriums of all sizes.",
                  "Every project is owner-managed. When you call, you reach Pat \u2014 the person who bid the job. Installation is handled by IATSE Local 42 Union Stagehands.",
                ].map((p, i) => (
                  <p key={i} style={{ fontSize: 15, color: '#666', lineHeight: 1.85, margin: 0, fontWeight: 300 }}>{p}</p>
                ))}
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
                background: '#ddd4c5', marginTop: 44,
              }}>
                {[
                  { label: 'Founded', value: '1926' },
                  { label: 'Headquarters', value: 'Omaha, NE' },
                  { label: 'Service Area', value: 'NE \u00b7 IA \u00b7 KS \u00b7 SD \u00b7 MO' },
                  { label: 'Specialty', value: 'K\u201312 Schools' },
                ].map(item => (
                  <div key={item.label} style={{ background: '#fff', padding: '22px 26px' }}>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#888', marginBottom: 7 }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 16, fontWeight: 700, color: '#c5a028' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── CLIENTS ───────────────────────────────────────────────────── */}
      <section id="clients" style={{ background: '#0a0007', padding: `${SP} ${PX}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal style={{ marginBottom: 72 }}>
            <Label>Our Track Record</Label>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700,
              color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.08, margin: '0 0 20px',
            }}>Past Clients</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 500, lineHeight: 1.75 }}>
              Schools, colleges, and venues we’ve served across Nebraska, Iowa, Kansas, South Dakota, and Missouri.
            </p>
          </Reveal>
          {Object.entries(CLIENTS).map(([cat, names], ci) => (
            <Reveal key={cat} delay={ci * 60} style={{ marginBottom: 56 }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 20,
                paddingBottom: 16, marginBottom: 20, borderBottom: '1px solid #ddd4c5',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 18, fontWeight: 700, color: '#c5a028', margin: 0,
                }}>{cat}</h3>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.13em', textTransform: 'uppercase' }}>{names.length} clients</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 5px' }}>
                {names.map(name => (
                  <span key={name} style={{
                    fontSize: 13, padding: '7px 15px',
                    border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)',
                    background: 'transparent', letterSpacing: '0.02em',
                    cursor: 'default', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background='#c5a028'; e.currentTarget.style.color='#060003'; e.currentTarget.style.borderColor='#c5a028' }}
                    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.18)' }}
                  >{name}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ───────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: '#f7f4ef', padding: `${SP} ${PX}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(48px,7vw,100px)' }} className="contact-grid">
            <Reveal>
              <Label>Get Started</Label>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(30px,4vw,50px)', fontWeight: 700,
                color: '#0a0007', letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 44px',
              }}>Request<br />a Quote</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {[
                  { label: 'Phone', content: (
                    <a href="tel:4023454427" style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: 22, fontWeight: 700, color: '#0a0007',
                      textDecoration: 'none', transition: 'color 0.15s', letterSpacing: '-0.01em',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color='#800020'}
                      onMouseLeave={e => e.currentTarget.style.color='#0a0007'}
                    >402-345-4427</a>
                  )},
                  { label: 'Email', content: (
                    <a href="mailto:Pat@omahastageequipment.com" style={{
                      fontSize: 14, color: '#555',
                      textDecoration: 'none', transition: 'color 0.15s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color='#0a0007'}
                      onMouseLeave={e => e.currentTarget.style.color='#555'}
                    >Pat@omahastageequipment.com</a>
                  )},
                  { label: 'Address', content: (
                    <p style={{ fontSize: 14, color: '#555', margin: 0, lineHeight: 1.65 }}>8547 Lake St.<br />Omaha, NE 68134</p>
                  )},
                  { label: 'Response Time', content: (
                    <p style={{ fontSize: 14, color: '#555', margin: 0 }}>Most inquiries answered within one business day.</p>
                  )},
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#c5a028', marginBottom: 8, fontWeight: 700 }}>{item.label}</div>
                    {item.content}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={160}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(197,160,40,0.45); }
          50% { box-shadow: 0 0 0 12px rgba(197,160,40,0); }
        }
        @keyframes heroUp {
          from { opacity: 0; transform: translateY(72px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        .hero-logo { display: flex; }
        @media (max-width: 860px) {
          .hero-logo { display: none !important; }
          .two-col, .contact-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-band { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  )
}
