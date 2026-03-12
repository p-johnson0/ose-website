import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const body = await request.json()
    const { name, organization, phone, email, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // ── 1. Send email via Resend ──────────────────────────────────────────
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'OSE Website <onboarding@resend.dev>',
        to: ['pat@omahastageequipment.com'],
        reply_to: email,
        subject: `New Quote Request — ${organization || name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fff;">
            <div style="border-top: 3px solid #c5a028; padding-top: 24px; margin-bottom: 32px;">
              <h1 style="font-size: 22px; color: #0a0007; margin: 0 0 4px;">New Quote Request</h1>
              <p style="font-size: 13px; color: #888; margin: 0;">From omahastageequipment.com</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700; width: 140px;">Name</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007;">${name}</td>
              </tr>
              ${organization ? `<tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700;">Organization</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007;">${organization}</td>
              </tr>` : ''}
              ${phone ? `<tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700;">Phone</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007;"><a href="tel:${phone}" style="color: #0a0007;">${phone}</a></td>
              </tr>` : ''}
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700;">Email</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007;"><a href="mailto:${email}" style="color: #0a0007;">${email}</a></td>
              </tr>
              ${message ? `<tr>
                <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a028; font-weight: 700; vertical-align: top;">Project Details</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0a0007; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #aaa;">
              <p style="margin: 0;">Reply to this email to respond directly to ${name}.</p>
            </div>
          </div>
        `,
      }),
    })

    const emailResult = emailRes.ok ? 'sent' : await emailRes.json()
    if (!emailRes.ok) console.error('Resend error:', emailResult)

    // ── 2. Create Lead in Supabase (OSE App) ─────────────────────────────
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

    if (dbError) console.error('Supabase error:', dbError)

    return NextResponse.json({
      success: true,
      debug: {
        email: emailResult,
        supabase: dbError ? dbError.message : 'ok',
        env: {
          resend: !!process.env.RESEND_API_KEY,
          supabaseUrl: !!process.env.SUPABASE_URL,
          supabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        }
      }
    })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
