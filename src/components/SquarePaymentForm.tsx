'use client'

import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window {
    Square?: any
  }
}

interface SquarePaymentFormProps {
  amount: number
  onSuccess: (result: any) => void
  onError: (error: string) => void
}

export default function SquarePaymentForm({ amount, onSuccess, onError }: SquarePaymentFormProps) {
  const [loaded, setLoaded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const cardRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (document.querySelector('#square-sdk')) return

    const script = document.createElement('script')
    script.id = 'square-sdk'
    script.src = 'https://web.squarecdn.com/v1/square.js'
    script.async = true
    script.onload = () => setLoaded(true)
    document.body.appendChild(script)

    return () => {
      const s = document.querySelector('#square-sdk')
      if (s) s.remove()
    }
  }, [])

  useEffect(() => {
    if (!loaded || !window.Square || !containerRef.current) return

    const initializeCard = async () => {
      try {
        const payments = window.Square.payments(process.env.NEXT_PUBLIC_SQUARE_APP_ID!, process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!)
        const card = await payments.card()
        await card.attach('#sq-card-element')
        cardRef.current = card
      } catch (e) {
        console.error('Square card init error:', e)
        onError('Failed to load payment form')
      }
    }

    if (containerRef.current.children.length === 0) {
      const div = document.createElement('div')
      div.id = 'sq-card-element'
      containerRef.current.appendChild(div)
    }

    initializeCard()
  }, [loaded, onError])

  const handlePayment = async () => {
    if (!cardRef.current) {
      onError('Payment form not loaded yet')
      return
    }

    setProcessing(true)
    try {
      const result = await cardRef.current.tokenize()
      if (result.status === 'OK') {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sourceId: result.token, amount }),
        })

        const data = await res.json()
        if (data.error) {
          onError(data.error)
        } else {
          onSuccess(data)
        }
      } else {
        onError('Card information is invalid')
      }
    } catch (e: any) {
      onError(e.message || 'Payment failed')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div>
      <div ref={containerRef} className="min-h-[80px]" />
      {!loaded && <p className="text-xs text-[#9c958e] mt-2">Loading secure payment form...</p>}
      <button
        onClick={handlePayment}
        disabled={processing || !loaded}
        className="mt-4 w-full px-6 py-4 bg-[#c8914a] text-white text-sm font-semibold rounded-lg hover:bg-[#b8803a] transition-all hover:shadow-lg hover:shadow-[#c8914a]/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </div>
  )
}
