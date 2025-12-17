'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/app/components/Navigation'

export default function SettingsPage() {
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
    fetchPreferences()
  }, [])

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
      <>
        <Navigation />
        <div className="min-h-screen bg-navy-900 pt-20 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-white">Loading settings...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-navy-900 pt-20 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Settings</h1>

          {saveMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              saveMessage.includes('success') 
                ? 'bg-green-900/30 border border-green-500/50 text-green-200'
                : 'bg-red-900/30 border border-red-500/50 text-red-200'
            }`}>
              {saveMessage}
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Learning Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-200 mb-2">Daily Practice Goal (minutes)</label>
                  <input
                    type="number"
                    value={preferences.dailyPracticeGoal}
                    onChange={(e) => setPreferences(prev => ({ ...prev, dailyPracticeGoal: parseInt(e.target.value) }))}
                    min="5"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 mb-2">Lesson Difficulty</label>
                  <select
                    value={preferences.lessonDifficulty}
                    onChange={(e) => setPreferences(prev => ({ ...prev, lessonDifficulty: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={preferences.emailNotifications}
                    onChange={(e) => setPreferences(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    className="w-5 h-5"
                  />
                  <label htmlFor="emailNotifications" className="text-slate-200">
                    Email notifications for new lessons
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Display Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-200 mb-2">Theme</label>
                  <select
                    value={preferences.theme}
                    onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 mb-2">Language</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 mb-2">Timezone</label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
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
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
