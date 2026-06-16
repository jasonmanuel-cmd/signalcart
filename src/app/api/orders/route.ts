import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

const SQUARE_API = 'https://connect.squareupsandbox.com'
const SQUARE_PROD = 'https://connect.squareup.com'

export async function POST(req: Request) {
  try {
    const { sourceId, amount } = await req.json()

    if (!sourceId || !amount) {
      return NextResponse.json({ error: 'Missing sourceId or amount' }, { status: 400 })
    }

    const isSandbox = process.env.NEXT_PUBLIC_SQUARE_APP_ID?.includes('sandbox')
    const base = isSandbox ? SQUARE_API : SQUARE_PROD
    const accessToken = process.env.SQUARE_ACCESS_TOKEN
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

    if (!accessToken || !locationId) {
      return NextResponse.json({ error: 'Square not configured' }, { status: 500 })
    }

    const idempotencyKey = `${Date.now()}-${Math.random().toString(36).slice(2)}`

    const squareRes = await fetch(`${base}/v2/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        sourceId,
        idempotencyKey,
        amountMoney: { amount: Math.round(amount * 100), currency: 'USD' },
        locationId,
        autocomplete: true,
      }),
    })

    const payment = await squareRes.json()

    if (!squareRes.ok || payment.error) {
      const msg = payment.errors?.[0]?.detail || payment.error?.message || 'Payment failed'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const supabase = getServiceClient()

    const { error: dbError } = await supabase.from('orders').insert({
      square_payment_id: payment.payment.id,
      amount_total: amount,
      status: 'completed',
      payment_details: payment.payment,
      created_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error('Supabase order insert failed:', dbError)
    }

    // Send email notification
    const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL
    if (notificationEmail) {
      try {
        await fetch(`${base}/v2/emails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            email: notificationEmail,
            subject: `New Order — $${amount.toFixed(2)}`,
            body: `New order received!\n\nAmount: $${amount.toFixed(2)}\nSquare Payment ID: ${payment.payment.id}\nTime: ${new Date().toISOString()}`,
          }),
        })
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr)
      }
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.payment.id,
      orderId: payment.payment.id,
    })
  } catch (err: any) {
    console.error('Order error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
