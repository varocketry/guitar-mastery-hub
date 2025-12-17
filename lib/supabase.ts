import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signIn = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/lessons/1`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const markLessonComplete = async (lessonNumber: number) => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return { data: null, error: new Error('Not authenticated') }
  
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert({
      user_id: user.id,
      lesson_number: lessonNumber,
      completed: true,
      completed_at: new Date().toISOString()
    })
    .select()
  
  return { data, error }
}

export const getLessonProgress = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return { data: null, error: new Error('Not authenticated') }
  
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', user.id)
    .order('lesson_number')
  
  return { data, error }
}