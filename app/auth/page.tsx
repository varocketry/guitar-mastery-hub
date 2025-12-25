'use client'

import { useState } from 'react'
import { signIn } from '@/lib/supabase'

export default function AuthPage() {
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
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
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
            className="w-full bg-gold hover:bg-gold-dark text-navy font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>

          {message && (
            <div className={`p-4 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-navy/60">
          We'll send you a magic link to sign in.<br />
          No password needed! 🎉
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <h3 className="text-lg font-bold text-navy mb-3">What You'll Get:</h3>
          <ul className="text-left space-y-2 text-navy/80">
            <li className="flex items-start gap-2">
              <span className="text-gold">✓</span>
              <span>32 comprehensive lessons</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">✓</span>
              <span>Progress tracking with videos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">✓</span>
              <span>Learn at your own pace</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">✓</span>
              <span>Expert-designed curriculum</span>
            </li>
          </ul>
        </div>

        <p className="mt-6 text-center text-xs text-navy/50">
          Trusted by guitar learners worldwide
        </p>
      </div>
    </div>
  )
}
