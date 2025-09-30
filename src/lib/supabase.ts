import { createClient } from '@supabase/supabase-js'

// You'll need to replace these with your actual Supabase project values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  email: string
  role: 'student' | 'tutor' | 'admin'
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at?: string
}

export interface StudentApplication {
  id: string
  user_id: string
  full_name: string
  grade_level: string
  school: string
  contact_email: string
  subjects: string[]
  frequency: string
  learning_disabilities?: string
  learning_style: string
  status: 'approved' | 'pending'
  created_at: string
  updated_at?: string
}

export interface TutorApplication {
  id: string
  user_id: string
  full_name: string
  email: string
  phone: string
  education_level: string
  subjects: string[]
  experience?: string
  availability_hours: string
  motivation: string
  status: 'pending' | 'approved' | 'rejected'
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
  updated_at?: string
}

export interface StudentTutorAssignment {
  id: string
  student_id: string
  tutor_id: string
  assigned_at: string
  status: 'active' | 'inactive' | 'completed'
  created_at: string
  updated_at?: string
  tutor?: Profile & { tutor_application?: TutorApplication }
}

export interface Session {
  id: string
  student_id: string
  tutor_id: string
  title: string
  description?: string
  subject: string
  scheduled_at: string
  duration_minutes: number
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  google_meet_link?: string
  notes?: string
  created_at: string
  updated_at?: string
}

export interface StudentUpdate {
  id: string
  student_email: string
  tutor_id: string
  update_type: 'progress' | 'assignment' | 'note' | 'session_feedback' | 'goals'
  title: string
  content: string
  metadata?: any
  is_read: boolean
  created_at: string
  updated_at?: string
}

// Auth helper functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database helper functions
export const createProfile = async (profile: Omit<Profile, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .select()
    .single()
  
  return { data, error }
}

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  return { data, error }
}

export const createStudentApplication = async (application: Omit<StudentApplication, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('student_applications')
    .insert([application])
    .select()
    .single()
  
  return { data, error }
}

export const createTutorApplication = async (application: Omit<TutorApplication, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('tutor_applications')
    .insert([application])
    .select()
    .single()
  
  return { data, error }
}

export const getPendingTutorApplications = async () => {
  const { data, error } = await supabase
    .from('tutor_applications')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const updateTutorApplicationStatus = async (
  applicationId: string, 
  status: 'approved' | 'rejected',
  reviewedBy: string
) => {
  const { data, error } = await supabase
    .from('tutor_applications')
    .update({ 
      status, 
      reviewed_by: reviewedBy, 
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', applicationId)
    .select()
    .single()
  
  return { data, error }
}

// Student-Tutor Assignment functions
export const getStudentTutorAssignment = async (studentId: string) => {
  const { data, error } = await supabase
    .from('student_tutor_assignments')
    .select(`
      *,
      tutor:profiles!student_tutor_assignments_tutor_id_fkey(*),
      tutor_application:tutor_applications(*)
    `)
    .eq('student_id', studentId)
    .eq('status', 'active')
    .single()
  
  return { data, error }
}

export const createStudentTutorAssignment = async (
  studentId: string, 
  tutorId: string
) => {
  const { data, error } = await supabase
    .from('student_tutor_assignments')
    .insert([{
      student_id: studentId,
      tutor_id: tutorId
    }])
    .select()
    .single()
  
  return { data, error }
}

// Session management functions
export const createSession = async (session: Omit<Session, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('sessions')
    .insert([session])
    .select()
    .single()
  
  return { data, error }
}

export const getStudentSessions = async (studentId: string) => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('student_id', studentId)
    .order('scheduled_at', { ascending: true })
  
  return { data, error }
}

export const getTutorSessions = async (tutorId: string) => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('tutor_id', tutorId)
    .order('scheduled_at', { ascending: true })
  
  return { data, error }
}

export const updateSession = async (sessionId: string, updates: Partial<Session>) => {
  const { data, error } = await supabase
    .from('sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single()
  
  return { data, error }
}

// Student update functions
export const createStudentUpdate = async (update: Omit<StudentUpdate, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('student_updates')
    .insert([update])
    .select()
    .single()
  
  return { data, error }
}

export const getStudentUpdates = async (studentEmail: string) => {
  const { data, error } = await supabase
    .from('student_updates')
    .select('*')
    .eq('student_email', studentEmail)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const markUpdateAsRead = async (updateId: string) => {
  const { data, error } = await supabase
    .from('student_updates')
    .update({ is_read: true })
    .eq('id', updateId)
    .select()
    .single()
  
  return { data, error }
}

export const getStudentByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .eq('role', 'student')
    .single()
  
  return { data, error }
}

