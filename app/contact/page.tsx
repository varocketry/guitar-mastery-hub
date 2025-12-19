'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/app/components/Navigation'
import { getCurrentUser } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null)

  useEffect(() => {
    async function loadUser() {
      const { user: currentUser } = await getCurrentUser();
      if (!currentUser) {
        router.push('/');
        return;
      }
      setUser(currentUser);
    }
    loadUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to submit')

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
      })
      
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email us directly at support@guitarmasteryhub.com'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-navy mb-4 font-accent">Contact Us</h1>
              <p className="text-navy/70 text-lg">
                Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            {submitStatus && (
              <div className={`mb-8 p-4 rounded-lg font-semibold ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 border-2 border-green-400 text-green-700'
                  : 'bg-red-100 border-2 border-red-400 text-red-700'
              }`}>
                <p className="flex items-center gap-2">
                  {submitStatus.type === 'success' ? '✓' : '✗'}
                  {submitStatus.message}
                </p>
              </div>
            )}

            <div className="bg-navy/5 rounded-xl p-6 border-2 border-navy/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-navy font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-navy font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-navy font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-navy font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold resize-none"
                    placeholder="Tell us more about your question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-navy/5 rounded-lg p-6 border-2 border-navy/20 text-center">
                <div className="text-gold text-3xl mb-3">📧</div>
                <h3 className="text-navy font-bold mb-2">Email</h3>
                <p className="text-navy/70 text-sm">support@guitarmasteryhub.com</p>
              </div>

              <div className="bg-navy/5 rounded-lg p-6 border-2 border-navy/20 text-center">
                <div className="text-gold text-3xl mb-3">⏰</div>
                <h3 className="text-navy font-bold mb-2">Response Time</h3>
                <p className="text-navy/70 text-sm">Within 24-48 hours</p>
              </div>

              <div className="bg-navy/5 rounded-lg p-6 border-2 border-navy/20 text-center">
                <div className="text-gold text-3xl mb-3">💬</div>
                <h3 className="text-navy font-bold mb-2">Support Hours</h3>
                <p className="text-navy/70 text-sm">Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap justify-center">
              <a 
                href="/dashboard" 
                className="px-6 py-3 bg-navy hover:bg-navy-light text-white font-bold rounded-lg transition-all shadow-lg"
              >
                🏠 Dashboard
              </a>
              <a 
                href="/lessons" 
                className="px-6 py-3 bg-white hover:bg-gray-50 text-navy font-bold rounded-lg transition-all shadow-md border-2 border-navy"
              >
                📚 Lessons
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
