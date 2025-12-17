'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface EmailPreferences {
  product_updates: boolean;
  practice_tips: boolean;
  new_lessons: boolean;
  feedback_requests: boolean;
  marketing: boolean;
}

interface EmailSubscriber {
  id: string;
  email: string;
  is_subscribed: boolean;
  email_preferences: EmailPreferences;
  subscribed_at: string;
}

export default function EmailPreferencesPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subscriber, setSubscriber] = useState<EmailSubscriber | null>(null);
  const [preferences, setPreferences] = useState<EmailPreferences>({
    product_updates: true,
    practice_tips: true,
    new_lessons: true,
    feedback_requests: true,
    marketing: true
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSubscription();
  }, []);

  async function fetchSubscription() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('email_subscribers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore "not found" error
        console.error('Error fetching subscription:', error);
        setLoading(false);
        return;
      }

      if (data) {
        setSubscriber(data);
        setPreferences(data.email_preferences);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handlePreferenceChange(key: keyof EmailPreferences, value: boolean) {
    setPreferences(prev => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage({ type: 'error', text: 'Please log in to update preferences' });
        setSaving(false);
        return;
      }

      const { error } = await supabase
        .from('email_subscribers')
        .update({ email_preferences: preferences })
        .eq('user_id', user.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Preferences saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Error saving preferences:', err);
      setMessage({ type: 'error', text: 'Failed to save preferences' });
    } finally {
      setSaving(false);
    }
  }

  async function handleUnsubscribeAll() {
    if (!confirm('Are you sure you want to unsubscribe from ALL emails? You can resubscribe anytime.')) {
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage({ type: 'error', text: 'Please log in' });
        setSaving(false);
        return;
      }

      const { error } = await supabase
        .from('email_subscribers')
        .update({ 
          is_subscribed: false,
          unsubscribed_at: new Date().toISOString(),
          email_preferences: {
            product_updates: false,
            practice_tips: false,
            new_lessons: false,
            feedback_requests: false,
            marketing: false
          }
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setPreferences({
        product_updates: false,
        practice_tips: false,
        new_lessons: false,
        feedback_requests: false,
        marketing: false
      });

      setMessage({ type: 'success', text: 'You have been unsubscribed from all emails.' });
    } catch (err) {
      console.error('Error unsubscribing:', err);
      setMessage({ type: 'error', text: 'Failed to unsubscribe' });
    } finally {
      setSaving(false);
    }
  }

  async function handleResubscribe() {
    setSaving(true);
    setMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage({ type: 'error', text: 'Please log in' });
        setSaving(false);
        return;
      }

      const { error } = await supabase
        .from('email_subscribers')
        .update({ 
          is_subscribed: true,
          unsubscribed_at: null
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Welcome back! You are now resubscribed.' });
      await fetchSubscription();
    } catch (err) {
      console.error('Error resubscribing:', err);
      setMessage({ type: 'error', text: 'Failed to resubscribe' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Preferences</h1>
          <p className="text-gray-600 mb-8">
            Choose which emails you'd like to receive from Guitar Mastery Hub
          </p>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          {subscriber && !subscriber.is_subscribed ? (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 mb-4">
                You are currently unsubscribed from all emails.
              </p>
              <button
                onClick={handleResubscribe}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {saving ? 'Resubscribing...' : 'Resubscribe to Emails'}
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="product_updates"
                    checked={preferences.product_updates}
                    onChange={(e) => handlePreferenceChange('product_updates', e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="product_updates" className="ml-3">
                    <div className="font-medium text-gray-900">Product Updates</div>
                    <div className="text-sm text-gray-600">
                      Important updates about new features, improvements, and changes to Guitar Mastery Hub
                    </div>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="practice_tips"
                    checked={preferences.practice_tips}
                    onChange={(e) => handlePreferenceChange('practice_tips', e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="practice_tips" className="ml-3">
                    <div className="font-medium text-gray-900">Practice Tips & Advice</div>
                    <div className="text-sm text-gray-600">
                      Weekly tips to improve your practice routine and accelerate your progress
                    </div>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="new_lessons"
                    checked={preferences.new_lessons}
                    onChange={(e) => handlePreferenceChange('new_lessons', e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="new_lessons" className="ml-3">
                    <div className="font-medium text-gray-900">New Lesson Announcements</div>
                    <div className="text-sm text-gray-600">
                      Be the first to know when new lessons and content are added to the curriculum
                    </div>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="feedback_requests"
                    checked={preferences.feedback_requests}
                    onChange={(e) => handlePreferenceChange('feedback_requests', e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="feedback_requests" className="ml-3">
                    <div className="font-medium text-gray-900">Feedback Requests</div>
                    <div className="text-sm text-gray-600">
                      Occasional surveys and feedback requests to help us improve the platform
                    </div>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={preferences.marketing}
                    onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="marketing" className="ml-3">
                    <div className="font-medium text-gray-900">Promotional Emails</div>
                    <div className="text-sm text-gray-600">
                      Special offers, discounts, and promotions on premium content
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {saving ? 'Saving...' : 'Save Preferences'}
                </button>
                
                <button
                  onClick={handleUnsubscribeAll}
                  disabled={saving}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:bg-gray-100"
                >
                  Unsubscribe All
                </button>
              </div>
            </>
          )}

          {subscriber && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Email: <span className="font-medium text-gray-700">{subscriber.email}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Subscribed since: {new Date(subscriber.subscribed_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
