import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Thank You | Omaha Stage Equipment',
}

export default function ThankYou() {
  return (
    <>
      <Nav />
      <section
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: 'linear-gradient(160deg, #3a000f 0%, #800020 100%)' }}
      >
        <div className="text-center max-w-lg">
          <div className="text-5xl mb-6">🎭</div>
          <h1 className="font-display text-4xl font-bold text-white mb-4">Message Received</h1>
          <p className="text-white/70 text-lg mb-8">
            Thanks for reaching out. We typically respond within one business day.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded font-bold text-sm uppercase tracking-widest"
            style={{ background: '#c5a028', color: '#1a0008' }}
          >
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
