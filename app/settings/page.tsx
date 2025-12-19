'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/app/components/Navigation'
import { getCurrentUser } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [preferences, setPreferences] = useState({
    dailyPracticeGoal: 30,
    emailNotifications: true,
    lessonDifficulty: 'beginner',
    theme: 'dark',
    language: 'en',
    timezone: 'UTC'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    async function loadUser() {
      const { user: currentUser } = await getCurrentUser();
      if (!currentUser) {
        router.push('/');
        return;
      }
      setUser(currentUser);
      fetchPreferences();
    }
    loadUser();
  }, [router]);

  const fetchPreferences = async () => {
    try {
      const response = await fetch('/api/preferences')
      if (response.ok) {
        const data = await response.json()
        if (data.preferences) {
          setPreferences({
            dailyPracticeGoal: data.preferences.daily_practice_goal,
            emailNotifications: data.preferences.email_notifications,
            lessonDifficulty: data.preferences.lesson_difficulty,
            theme: data.preferences.theme,
            language: data.preferences.language,
            timezone: data.preferences.timezone
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch preferences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')

    try {
      const response = await fetch('/api/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      })

      if (!response.ok) throw new Error('Failed to save')

      setSaveMessage('Settings saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      setSaveMessage('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <h1 className="text-4xl font-bold text-navy mb-6 font-accent">Settings</h1>

            {saveMessage && (
              <div className={`mb-6 p-4 rounded-lg font-semibold ${
                saveMessage.includes('success') 
                  ? 'bg-green-100 border-2 border-green-400 text-green-700'
                  : 'bg-red-100 border-2 border-red-400 text-red-700'
              }`}>
                {saveMessage}
              </div>
            )}

            <div className="space-y-6">
              <div className="bg-navy/5 rounded-xl p-6 border-2 border-navy/20">
                <h2 className="text-2xl font-bold text-navy mb-6 font-accent">Learning Preferences</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-navy font-semibold mb-2">Daily Practice Goal (minutes)</label>
                    <input
                      type="number"
                      value={preferences.dailyPracticeGoal}
                      onChange={(e) => setPreferences(prev => ({ ...prev, dailyPracticeGoal: parseInt(e.target.value) }))}
                      min="5"
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-navy font-semibold mb-2">Lesson Difficulty</label>
                    <select
                      value={preferences.lessonDifficulty}
                      onChange={(e) => setPreferences(prev => ({ ...prev, lessonDifficulty: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={preferences.emailNotifications}
                      onChange={(e) => setPreferences(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      className="w-5 h-5 text-gold focus:ring-gold"
                    />
                    <label htmlFor="emailNotifications" className="text-navy font-medium">
                      Email notifications for new lessons
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-navy/5 rounded-xl p-6 border-2 border-navy/20">
                <h2 className="text-2xl font-bold text-navy mb-6 font-accent">Display Preferences</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-navy font-semibold mb-2">Theme</label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-navy font-semibold mb-2">Language</label>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-navy font-semibold mb-2">Timezone</label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>

              <div className="flex gap-4 flex-wrap pt-4">
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
    </div>
  )
}
