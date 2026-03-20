import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ── Simple in-memory rate limiter ─────────────────────────────────────────────
// Allows 3 submissions per IP per 10 minutes
const rateLimitMap = new Map()
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

// ── HTML escape to prevent injection in emails ────────────────────────────────
function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export async function POST(request) {
  try {
    // ── Rate limiting ──────────────────────────────────────────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, organization, phone, email, message, website: honeypot } = body

    // ── Honeypot check — bots fill hidden fields, humans don't ─────────────
    if (honeypot) {
      // Silently succeed so bots don't know they were blocked
      return NextResponse.json({ success: true })
    }

    // ── Basic validation ───────────────────────────────────────────────────
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Enforce field length limits
    if (name.length > 100 || email.length > 200 || (organization && organization.length > 200) || (message && message.length > 5000)) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 })
    }

    // ── Sanitize all inputs before use ────────────────────────────────────
    const safeName = escapeHtml(name)
    const safeOrg = escapeHtml(organization)
    const safePhone = escapeHtml(phone)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // ── 1. Send email via Resend ───────────────────────────────────────────
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'OSE Website <quotes@omahastageequipment.com>',
        to: ['pat@omahastageequipment.com'],
        reply_to: email,
        subject: `New Quote Request — ${safeOrg || safeName}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fff;">
            <div style="border-top: 3px solid #c5a028; padding-top: 24px; margin-bottom: 32px;">
              <h1 style="font-size: 22px; color: #0a0007; margin: 0 0 4px;">New Quote Request</h1>
              <p style="font-size: 13px; color: #888; margin: 0;">From omahastageequipment.com</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700; width: 140px;">Name</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007;">${safeName}</td>
              </tr>
              ${safeOrg ? `<tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700;">Organization</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007;">${safeOrg}</td>
              </tr>` : ''}
              ${safePhone ? `<tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700;">Phone</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007;">${safePhone}</td>
              </tr>` : ''}
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700;">Email</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007;">${safeEmail}</td>
              </tr>
              ${safeMessage ? `<tr>
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700; vertical-align: top;">Project Details</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007; line-height: 1.6;">${safeMessage.replace(/\n/g, '<br>')}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #aaa;">
              <p style="margin: 0;">Reply to this email to respond directly to ${safeName}.</p>
            </div>
          </div>
        `,
      }),
    })

    if (!emailRes.ok) {
      const emailErr = await emailRes.json().catch(() => ({}))
      console.error('Resend error:', emailErr)
    }

    // ── 2. Create Lead in Supabase ─────────────────────────────────────────
    const projectName = organization
      ? `${organization} — Website Inquiry`
      : `${name} — Website Inquiry`

    const { error: dbError } = await supabase
      .from('projects')
      .insert({
        project_name: projectName,
        project_type: 'Curtains',
        organization: organization || null,
        contact_name: name,
        contact_email: email,
        contact_phone: phone || null,
        status: 'Lead',
        notes: message
          ? `Website inquiry:\n\n${message}`
          : 'Submitted via website contact form.',
        lead_date: new Date().toISOString().split('T')[0],
        is_project_group: false,
        is_multi_location: false,
      })

    if (dbError) console.error('Supabase insert error:', dbError)

    // ── 3. Push notification for new lead ─────────────────────────────────────
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.omahastageequipment.com';
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      fetch(appUrl + '/api/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cronSecret,
        },
        body: JSON.stringify({
          title: 'New Website Lead',
          body: (organization || name) + ' — ' + (message ? message.substring(0, 80) : 'Quote request submitted'),
          url: '/projects',
          tag: 'lead-' + Date.now(),
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
