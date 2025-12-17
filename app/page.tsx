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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎸 Guitar Mastery Hub
          </h1>
          <p className="text-purple-300">
            Your journey to guitar mastery starts here
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-purple-200 mb-2 font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg text-center ${
            message.includes('Error') 
              ? 'bg-red-900/30 border border-red-500/30 text-red-200' 
              : 'bg-green-900/30 border border-green-500/30 text-green-200'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-purple-300 text-sm">
          <p>We'll send you a magic link to sign in.</p>
          <p className="mt-2">No password needed! 🎉</p>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-500/30">
          <h3 className="text-white font-semibold mb-4 text-center">What You'll Get:</h3>
          <ul className="space-y-2 text-purple-200 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              32 comprehensive lessons
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Progress tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Learn at your own pace
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}