'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface EmailSubscriber {
  id: string;
  user_id: string;
  email: string;
  is_subscribed: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
  subscription_source: string;
  email_preferences: {
    product_updates: boolean;
    practice_tips: boolean;
    new_lessons: boolean;
    feedback_requests: boolean;
    marketing: boolean;
  };
  last_email_sent: string | null;
  total_emails_sent: number;
  total_emails_opened: number;
  total_clicks: number;
}

export default function AdminSubscribersPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<EmailSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'unsubscribed'>('all');
  const [filterPreference, setFilterPreference] = useState<string>('all');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    unsubscribed: 0,
    product_updates: 0,
    practice_tips: 0,
    new_lessons: 0,
    feedback_requests: 0,
    marketing: 0
  });

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [subscribers, searchTerm, filterStatus, filterPreference]);

  async function fetchSubscribers() {
    try {
      const { data, error } = await supabase
        .from('email_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;

      setSubscribers(data || []);
      calculateStats(data || []);
    } catch (err) {
      console.error('Error fetching subscribers:', err);
    } finally {
      setLoading(false);
    }
  }

  function calculateStats(data: EmailSubscriber[]) {
    const stats = {
      total: data.length,
      active: data.filter(s => s.is_subscribed).length,
      unsubscribed: data.filter(s => !s.is_subscribed).length,
      product_updates: data.filter(s => s.is_subscribed && s.email_preferences?.product_updates).length,
      practice_tips: data.filter(s => s.is_subscribed && s.email_preferences?.practice_tips).length,
      new_lessons: data.filter(s => s.is_subscribed && s.email_preferences?.new_lessons).length,
      feedback_requests: data.filter(s => s.is_subscribed && s.email_preferences?.feedback_requests).length,
      marketing: data.filter(s => s.is_subscribed && s.email_preferences?.marketing).length
    };
    setStats(stats);
  }

  function applyFilters() {
    let filtered = [...subscribers];

    // Filter by status
    if (filterStatus === 'active') {
      filtered = filtered.filter(s => s.is_subscribed);
    } else if (filterStatus === 'unsubscribed') {
      filtered = filtered.filter(s => !s.is_subscribed);
    }

    // Filter by preference
    if (filterPreference !== 'all') {
      filtered = filtered.filter(s => 
        s.is_subscribed && s.email_preferences?.[filterPreference as keyof typeof s.email_preferences]
      );
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.subscription_source?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSubscribers(filtered);
  }

  function exportToCSV() {
    const headers = ['Email', 'Status', 'Source', 'Subscribed At', 'Product Updates', 'Practice Tips', 'New Lessons', 'Feedback Requests', 'Marketing'];
    
    const rows = filteredSubscribers.map(s => [
      s.email,
      s.is_subscribed ? 'Active' : 'Unsubscribed',
      s.subscription_source || '',
      new Date(s.subscribed_at).toLocaleDateString(),
      s.email_preferences?.product_updates ? 'Yes' : 'No',
      s.email_preferences?.practice_tips ? 'Yes' : 'No',
      s.email_preferences?.new_lessons ? 'Yes' : 'No',
      s.email_preferences?.feedback_requests ? 'Yes' : 'No',
      s.email_preferences?.marketing ? 'Yes' : 'No'
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function exportEmailsOnly() {
    const emails = filteredSubscribers.map(s => s.email).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email_list_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Email Subscribers</h1>
          <p className="mt-2 text-gray-600">Manage your email list and export contacts</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Active</div>
            <div className="text-3xl font-bold text-green-600 mt-1">{stats.active}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Unsubscribed</div>
            <div className="text-3xl font-bold text-red-600 mt-1">{stats.unsubscribed}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Feedback OK</div>
            <div className="text-3xl font-bold text-blue-600 mt-1">{stats.feedback_requests}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Marketing OK</div>
            <div className="text-3xl font-bold text-purple-600 mt-1">{stats.marketing}</div>
          </div>
        </div>

        {/* Filters and Export */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Email or source..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subscribers</option>
                <option value="active">Active Only</option>
                <option value="unsubscribed">Unsubscribed Only</option>
              </select>
            </div>

            {/* Preference Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preference</label>
              <select
                value={filterPreference}
                onChange={(e) => setFilterPreference(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Preferences</option>
                <option value="product_updates">Product Updates</option>
                <option value="practice_tips">Practice Tips</option>
                <option value="new_lessons">New Lessons</option>
                <option value="feedback_requests">Feedback Requests</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            {/* Export Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Export</label>
              <div className="flex gap-2">
                <button
                  onClick={exportToCSV}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  CSV
                </button>
                <button
                  onClick={exportEmailsOnly}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                  Emails
                </button>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredSubscribers.length} of {subscribers.length} subscribers
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscribed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preferences
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscriber.is_subscribed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.is_subscribed ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscriber.subscription_source || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.subscribed_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {subscriber.is_subscribed && subscriber.email_preferences && (
                          <>
                            {subscriber.email_preferences.product_updates && (
                              <span className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                Updates
                              </span>
                            )}
                            {subscriber.email_preferences.practice_tips && (
                              <span className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                Tips
                              </span>
                            )}
                            {subscriber.email_preferences.new_lessons && (
                              <span className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                                Lessons
                              </span>
                            )}
                            {subscriber.email_preferences.feedback_requests && (
                              <span className="inline-flex px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                                Feedback
                              </span>
                            )}
                            {subscriber.email_preferences.marketing && (
                              <span className="inline-flex px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded">
                                Marketing
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubscribers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No subscribers found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Export Guides</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="font-medium text-blue-900 min-w-[200px]">Feedback Request:</span>
              <span className="text-blue-800">Filter by "Feedback Requests" → Export Emails → Send survey</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="font-medium text-blue-900 min-w-[200px]">Practice Tips Newsletter:</span>
              <span className="text-blue-800">Filter by "Practice Tips" → Export CSV → Import to email tool</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="font-medium text-blue-900 min-w-[200px]">New Lesson Announcement:</span>
              <span className="text-blue-800">Filter by "New Lessons" → Export Emails → Send announcement</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="font-medium text-blue-900 min-w-[200px]">Promotional Campaign:</span>
              <span className="text-blue-800">Filter by "Marketing" → Export CSV → Import to Mailchimp/SendGrid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
