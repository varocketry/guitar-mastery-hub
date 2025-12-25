'use client'

import { useState } from 'react'
import { signIn } from '@/lib/supabase'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await signIn(email)

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Check your email for the login link!')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border-2 border-gold/20">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
            <span className="text-3xl">🎸</span>
          </div>
          <h1 className="text-4xl font-bold text-navy mb-2 font-accent">
            Guitar Mastery Hub
          </h1>
          <p className="text-navy/70 text-lg">
            Your journey to guitar mastery starts here
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-navy font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
            message.includes('Error') 
              ? 'bg-red-100 border-2 border-red-400 text-red-700' 
              : 'bg-green-100 border-2 border-green-400 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-navy/70">
          <p className="font-medium">We'll send you a magic link to sign in.</p>
          <p className="mt-2">No password needed! 🎉</p>
        </div>

        <div className="mt-8 pt-8 border-t-2 border-gold/30">
          <h3 className="text-navy font-bold mb-4 text-center text-lg">What You'll Get:</h3>
          <ul className="space-y-3 text-navy/80">
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm">✓</span>
              <span className="font-medium">32 comprehensive lessons</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm">✓</span>
              <span className="font-medium">Progress tracking with videos</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm">✓</span>
              <span className="font-medium">Learn at your own pace</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm">✓</span>
              <span className="font-medium">Expert-designed curriculum</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-navy/60">
            Trusted by guitar learners worldwide
          </p>
        </div>
      </div>
    </div>
  )
}
