'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import { supabase, getCurrentUser } from '@/lib/supabase';

interface PracticeSession {
  id: string;
  user_id: string;
  lesson_number: number | null;
  session_date: string;
  duration: number;
  techniques_practiced: string[];
  songs_practiced: string[];
  focus_areas: string[];
  notes: string;
  rating: number;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

function PracticePageContent() {
  const searchParams = useSearchParams();
  const lessonFromUrl = searchParams.get('lesson');
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    lesson_number: lessonFromUrl || '',
    session_date: new Date().toISOString().split('T')[0],
    duration: 30,
    techniques_practiced: '',
    songs_practiced: '',
    focus_areas: '',
    notes: '',
    rating: 3,
  });

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]);

  useEffect(() => {
    if (lessonFromUrl) {
      setFormData(prev => ({ ...prev, lesson_number: lessonFromUrl }));
    }
  }, [lessonFromUrl]);

  async function loadUser() {
    try {
      const { user: currentUser } = await getCurrentUser();
      console.log('Current user:', currentUser?.id);
      setUser(currentUser);
    } catch (err: any) {
      console.error('Error loading user:', err);
      setError(`Failed to load user: ${err.message || JSON.stringify(err)}`);
    }
  }

  async function loadSessions() {
    try {
      setError(null);
      console.log('Loading sessions for user:', user?.id);

      const { data, error: fetchError } = await supabase
        .from('practice_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('session_date', { ascending: false })
        .limit(20);

      console.log('Supabase response:', { data, error: fetchError });

      if (fetchError) {
        console.error('Supabase fetch error:', JSON.stringify(fetchError, null, 2));
        setError(`Database error: ${fetchError.message || JSON.stringify(fetchError)}`);
        return;
      }
      
      console.log(`Loaded ${data?.length || 0} sessions`);
      if (data) setSessions(data);
    } catch (error: any) {
      console.error('Error loading sessions:', error);
      setError(error?.message || JSON.stringify(error));
    }
  }

  async function handleVideoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('Video file must be under 100MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }

    setVideoFile(file);
    const preview = URL.createObjectURL(file);
    setVideoPreview(preview);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      console.log('Starting submit...', { user: user?.id });

      if (!user) {
        setError('Not authenticated - please refresh and try again');
        setLoading(false);
        return;
      }

      let videoUrl = null;

      // Upload video if provided
      if (videoFile) {
        console.log('Uploading video...');
        const fileExt = videoFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('practice-videos')
          .upload(fileName, videoFile, {
            cacheControl: '3600',
            upsert: false
          });

        console.log('Video upload result:', { uploadData, uploadError });

        if (uploadError) {
          console.error('Video upload error:', JSON.stringify(uploadError, null, 2));
          setError(`Failed to upload video: ${uploadError.message || JSON.stringify(uploadError)}`);
          setLoading(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from('practice-videos')
          .getPublicUrl(fileName);

        videoUrl = urlData.publicUrl;
        console.log('Video URL:', videoUrl);
      }

      // Convert comma-separated strings to arrays
      const techniquesArray = formData.techniques_practiced
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
      
      const songsArray = formData.songs_practiced
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      const focusArray = formData.focus_areas
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const insertData = {
        user_id: user.id,
        lesson_number: formData.lesson_number ? parseInt(formData.lesson_number) : null,
        session_date: formData.session_date,
        duration: formData.duration,
        techniques_practiced: techniquesArray.length > 0 ? techniquesArray : [],
        songs_practiced: songsArray.length > 0 ? songsArray : [],
        focus_areas: focusArray.length > 0 ? focusArray : [],
        notes: formData.notes || '',
        rating: formData.rating,
        video_url: videoUrl,
      };

      console.log('Inserting data:', insertData);

      const { data: insertedData, error: insertError } = await supabase
        .from('practice_sessions')
        .insert([insertData])
        .select();

      console.log('Insert result:', { insertedData, insertError });

      if (insertError) {
        console.error('Insert error details:', JSON.stringify(insertError, null, 2));
        setError(`Failed to save: ${insertError.message || insertError.hint || JSON.stringify(insertError)}`);
        setLoading(false);
        return;
      }

      console.log('Successfully saved session');

      // Reset form
      setFormData({
        lesson_number: lessonFromUrl || '',
        session_date: new Date().toISOString().split('T')[0],
        duration: 30,
        techniques_practiced: '',
        songs_practiced: '',
        focus_areas: '',
        notes: '',
        rating: 3,
      });
      setVideoFile(null);
      setVideoPreview(null);
      setShowForm(false);
      await loadSessions();
    } catch (error: any) {
      console.error('Catch block error:', error);
      setError(`Unexpected error: ${error?.message || JSON.stringify(error)}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-white text-lg">Loading user...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-navy">Practice Log</h1>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-3 bg-gold text-navy rounded-lg font-semibold hover:bg-gold/90 transition"
              >
                {showForm ? 'Cancel' : '+ New Session'}
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {showForm && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-navy mb-4">Log Practice Session</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Lesson Number (Optional)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="32"
                        value={formData.lesson_number}
                        onChange={(e) => setFormData({...formData, lesson_number: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                        placeholder="e.g., 5"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Practice Date *
                      </label>
                      <input
                        type="date"
                        value={formData.session_date}
                        onChange={(e) => setFormData({...formData, session_date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Duration (minutes) *
                    </label>
                    <input
                      type="number"
                      min="5"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Techniques Practiced (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.techniques_practiced}
                      onChange={(e) => setFormData({...formData, techniques_practiced: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="e.g., Chord transitions, Fingerpicking, Strumming"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Songs Practiced (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.songs_practiced}
                      onChange={(e) => setFormData({...formData, songs_practiced: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="e.g., Stand By Me, Knockin' on Heaven's Door"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Focus Areas (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.focus_areas}
                      onChange={(e) => setFormData({...formData, focus_areas: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="e.g., Timing, Clean chord changes, Rhythm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Session Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                      rows={4}
                      placeholder="How did the session go? What worked well? What needs improvement?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Session Rating: {formData.rating}/5
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Poor</span>
                      <span>Fair</span>
                      <span>Good</span>
                      <span>Great</span>
                      <span>Excellent</span>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📹 Upload Practice Video (Optional)
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoSelect}
                      className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-navy hover:file:bg-gold/90"
                    />
                    {videoFile && (
                      <div className="mt-3 text-sm text-gray-600">
                        Selected: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    )}
                    {videoPreview && (
                      <video src={videoPreview} controls className="mt-3 w-full max-h-64 rounded" />
                    )}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-3">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gold h-2 rounded-full transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-gold text-navy rounded-lg font-semibold hover:bg-gold/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving...' : 'Save Session'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setVideoFile(null);
                        setVideoPreview(null);
                        setError(null);
                      }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4 mt-8">
              <h2 className="text-2xl font-bold text-navy border-b-2 border-gold pb-2">
                Recent Sessions ({sessions.length})
              </h2>
              
              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No practice sessions yet.</p>
                  <p className="text-gray-500 mt-2">Click "+ New Session" to log your first one!</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <div key={session.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-gold transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-navy">
                          {session.lesson_number ? `Lesson ${session.lesson_number}` : 'General Practice'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(session.session_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gold">{session.duration} min</div>
                        <div className="text-sm text-gray-600">
                          {'⭐'.repeat(session.rating)}
                        </div>
                      </div>
                    </div>

                    {session.techniques_practiced && session.techniques_practiced.length > 0 && (
                      <div className="mb-3">
                        <span className="font-semibold text-navy text-sm">Techniques:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {session.techniques_practiced.map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {session.songs_practiced && session.songs_practiced.length > 0 && (
                      <div className="mb-3">
                        <span className="font-semibold text-navy text-sm">Songs:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {session.songs_practiced.map((song, idx) => (
                            <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                              {song}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {session.focus_areas && session.focus_areas.length > 0 && (
                      <div className="mb-3">
                        <span className="font-semibold text-navy text-sm">Focus:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {session.focus_areas.map((focus, idx) => (
                            <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {session.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-700">{session.notes}</p>
                      </div>
                    )}

                    {session.video_url && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <video src={session.video_url} controls className="w-full rounded" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    }>
      <PracticePageContent />
    </Suspense>
  );
}
