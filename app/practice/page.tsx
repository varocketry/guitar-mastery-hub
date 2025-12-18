'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import PageLayout from '@/app/components/PageLayout';
import ContentCard from '@/app/components/ContentCard';
import { styles } from '@/lib/designSystem';
import { getHintForLesson, getPlaceholderText } from '@/lib/lessonHints';

interface PracticeSession {
  id: string;
  user_id: string;
  lesson_number: number | null;
  practice_date: string;
  duration_minutes: number;
  techniques_practiced: string;
  songs_practiced: string;
  wins: string;
  challenges: string;
  notes_for_next: string;
  progress_rating: number;
  focus_rating: number;
  video_url: string | null;
  video_thumbnail: string | null;
  is_public: boolean;
  created_at: string;
}

export default function PracticePage() {
  // Initialize Supabase client (standard method)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const searchParams = useSearchParams();
  const lessonFromUrl = searchParams.get('lesson');
  
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
  // Form state with lesson number from URL if available
  const [formData, setFormData] = useState({
    lesson_number: lessonFromUrl || '',
    practice_date: new Date().toISOString().split('T')[0],
    duration_minutes: 30,
    techniques_practiced: '',
    songs_practiced: '',
    wins: '',
    challenges: '',
    notes_for_next: '',
    progress_rating: 3,
    focus_rating: 3,
    is_public: false,
  });

  // Get lesson-specific hints
  const lessonNumber = formData.lesson_number ? parseInt(formData.lesson_number) : null;
  const lessonHint = lessonNumber ? getHintForLesson(parseInt(lessonNumber || '1')) : null;

  useEffect(() => {
    loadSessions();
  }, []);

  // Update lesson number if URL changes
  useEffect(() => {
    if (lessonFromUrl) {
      setFormData(prev => ({ ...prev, lesson_number: lessonFromUrl }));
    }
  }, [lessonFromUrl]);

  async function loadSessions() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from('practice_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('practice_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      if (data) setSessions(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  }

  async function handleVideoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('Video file is too large. Maximum size is 100MB.');
      return;
    }
    
    setVideoFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please sign in to save practice sessions');
        return;
      }

      let videoUrl = null;
      let videoThumbnail = null;

      // Upload video if present
      if (videoFile) {
        const fileExt = videoFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('practice-videos')
          .upload(fileName, videoFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('practice-videos')
          .getPublicUrl(fileName);
        
        videoUrl = publicUrl;
      }

      // Save practice session
      const { error } = await supabase
        .from('practice_sessions')
        .insert([
          {
            user_id: user.id,
            lesson_number: formData.lesson_number ? parseInt(formData.lesson_number) : null,
            practice_date: formData.practice_date,
            duration_minutes: formData.duration_minutes,
            techniques_practiced: formData.techniques_practiced,
            songs_practiced: formData.songs_practiced,
            wins: formData.wins,
            challenges: formData.challenges,
            notes_for_next: formData.notes_for_next,
            progress_rating: formData.progress_rating,
            focus_rating: formData.focus_rating,
            video_url: videoUrl,
            video_thumbnail: videoThumbnail,
            is_public: formData.is_public,
          },
        ]);

      if (error) throw error;

      // Reset form
      setFormData({
        lesson_number: lessonFromUrl || '',
        practice_date: new Date().toISOString().split('T')[0],
        duration_minutes: 30,
        techniques_practiced: '',
        songs_practiced: '',
        wins: '',
        challenges: '',
        notes_for_next: '',
        progress_rating: 3,
        focus_rating: 3,
        is_public: false,
      });
      setVideoFile(null);
      setVideoPreview(null);

      setShowForm(false);
      loadSessions();
      alert('Practice session saved! 🎸');
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Error saving practice session');
    } finally {
      setLoading(false);
    }
  }

function StarRating({ value, onChange, name }: { value: number; onChange: (val: number) => void; name: string }) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  
  return (
    <div className="flex gap-2 items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoveredStar ?? value);
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            className={`text-3xl transition-all transform hover:scale-125 cursor-pointer ${
              isActive ? 'text-yellow-400' : 'text-gray-300'
            }`}
            style={{ 
              filter: isActive ? 'drop-shadow(0 0 3px #fbbf24)' : 'none'
            }}
          >
            ★
          </button>
        );
      })}
      <span className="ml-2 text-sm font-medium text-gray-600">{value}/5</span>
    </div>
  );
}

  return (
    <PageLayout maxWidth="wide">
      <ContentCard>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={styles.heading1}>
              🎸 Practice Tracker
            </h1>
            <p className="text-gray-600 mt-2">
              Track your guitar practice sessions and monitor your progress
            </p>
            {lessonHint && (
              <p className="text-orange-600 font-semibold mt-2">
                Lesson {lessonHint.lessonNumber}: {lessonHint.title}
              </p>
            )}
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className={styles.buttonPrimary}
          >
            {showForm ? '✕ Cancel' : '+ New Session'}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 text-sm font-semibold mb-1">Total Sessions</div>
            <div className="text-2xl font-bold text-slate-900">{sessions.length}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 text-sm font-semibold mb-1">Total Practice Time</div>
            <div className="text-2xl font-bold text-slate-900">
              {sessions.reduce((sum, s) => sum + s.duration_minutes, 0)} min
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 text-sm font-semibold mb-1">Avg Session Length</div>
            <div className="text-2xl font-bold text-slate-900">
              {sessions.length > 0 
                ? Math.round(sessions.reduce((sum, s) => sum + s.duration_minutes, 0) / sessions.length)
                : 0} min
            </div>
          </div>
        </div>

        {/* New Session Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-slate-50 rounded-lg p-6 space-y-6 border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Lesson Number
                </label>
                <input
                  type="number"
                  value={formData.lesson_number}
                  onChange={(e) => setFormData({ ...formData, lesson_number: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., 5"
                  min="1"
                  max="46"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.practice_date}
                  onChange={(e) => setFormData({ ...formData, practice_date: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Techniques Practiced
              </label>
              <textarea
                value={formData.techniques_practiced}
                onChange={(e) => setFormData({ ...formData, techniques_practiced: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={2}
                placeholder={getPlaceholderText('techniques', parseInt(lessonNumber || '1'))}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Songs Practiced
              </label>
              <textarea
                value={formData.songs_practiced}
                onChange={(e) => setFormData({ ...formData, songs_practiced: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={2}
                placeholder={getPlaceholderText('songs', parseInt(lessonNumber || '1'))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  🎉 Wins & Progress
                </label>
                <textarea
                  value={formData.wins}
                  onChange={(e) => setFormData({ ...formData, wins: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-green-50"
                  rows={3}
                  placeholder="What went well? Any breakthroughs?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  🎯 Challenges & Focus Areas
                </label>
                <textarea
                  value={formData.challenges}
                  onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-red-50"
                  rows={3}
                  placeholder="What needs work? What to focus on next?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                📝 Notes for Next Session
              </label>
              <textarea
                value={formData.notes_for_next}
                onChange={(e) => setFormData({ ...formData, notes_for_next: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-yellow-50"
                rows={2}
                placeholder="Reminders, ideas, or things to try next time..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Progress Rating
                </label>
                <StarRating 
                  value={formData.progress_rating} 
                  onChange={(val) => setFormData({ ...formData, progress_rating: val })}
                  name="progress_rating"
                />
                <p className="text-xs text-gray-500 mt-1">How much progress did you make?</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Focus Rating
                </label>
                <StarRating 
                  value={formData.focus_rating} 
                  onChange={(val) => setFormData({ ...formData, focus_rating: val })}
                  name="focus_rating"
                />
                <p className="text-xs text-gray-500 mt-1">How focused were you?</p>
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                📹 Optional: Upload Practice Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">Max 100MB - Review your technique later!</p>
              
              {videoPreview && (
                <div className="mt-3">
                  <video 
                    src={videoPreview} 
                    controls 
                    className="w-full max-w-md rounded-lg border border-slate-200"
                  />
                </div>
              )}
            </div>

            {/* Public/Private Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_public"
                checked={formData.is_public}
                onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="is_public" className="text-sm text-slate-700">
                Make this session public (share with community)
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={styles.buttonPrimary}
              >
                {loading ? 'Saving...' : '💾 Save Practice Session'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className={styles.buttonSecondary}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Practice History */}
        <div>
          <h2 className={styles.heading2}>
            Recent Practice Sessions
          </h2>
          
          {sessions.length === 0 ? (
            <div className={styles.warningBox}>
              <p className="text-orange-800 font-semibold mb-2">No practice sessions yet!</p>
              <p className="text-orange-700">
                Click "+ New Session" above to log your first practice session and start tracking your progress.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-semibold text-slate-900">
                        {new Date(session.practice_date).toLocaleDateString()}
                      </div>
                      {session.lesson_number && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                          Lesson {session.lesson_number}
                        </span>
                      )}
                      <span className="text-gray-600 text-sm">
                        {session.duration_minutes} minutes
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-600">Progress:</span>
                      <span className="text-yellow-400">{'⭐'.repeat(session.progress_rating)}</span>
                    </div>
                  </div>
                  
                  {session.video_url && (
                    <div className="mb-3">
                      <video 
                        src={session.video_url} 
                        controls 
                        className="w-full max-w-md rounded-lg border border-slate-200"
                      />
                    </div>
                  )}
                  
                  {session.techniques_practiced && (
                    <div className="mb-2">
                      <span className="font-semibold text-sm text-slate-700">Practiced:</span>
                      <span className="text-gray-600 text-sm ml-2">{session.techniques_practiced}</span>
                    </div>
                  )}
                  
                  {session.wins && (
                    <div className="bg-green-50 rounded p-2 text-sm text-green-900 mb-2">
                      <strong>🎉 Wins:</strong> {session.wins}
                    </div>
                  )}
                  
                  {session.challenges && (
                    <div className="bg-red-50 rounded p-2 text-sm text-red-900">
                      <strong>🎯 Focus:</strong> {session.challenges}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ContentCard>
    </PageLayout>
  );
}
