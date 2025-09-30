-- Supabase Database Setup
-- Run this in your Supabase SQL Editor

-- Create custom profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'tutor', 'admin')) DEFAULT 'student',
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create student applications table
CREATE TABLE IF NOT EXISTS student_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  school TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  frequency TEXT NOT NULL,
  learning_disabilities TEXT,
  learning_style TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('approved', 'pending')) DEFAULT 'approved',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create tutor applications table
CREATE TABLE IF NOT EXISTS tutor_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  education_level TEXT NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  experience TEXT,
  availability_hours TEXT NOT NULL,
  motivation TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for student applications
CREATE POLICY "Students can view their own applications" ON student_applications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Students can create their own applications" ON student_applications
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can view all student applications" ON student_applications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for tutor applications
CREATE POLICY "Tutors can view their own applications" ON tutor_applications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Tutors can create their own applications" ON tutor_applications
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can view all tutor applications" ON tutor_applications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, status)
  VALUES (new.id, new.email, 'student', 'approved');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create student-tutor assignments table
CREATE TABLE IF NOT EXISTS student_tutor_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tutor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'completed')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(student_id, tutor_id)
);

-- Enable RLS for student_tutor_assignments
ALTER TABLE student_tutor_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for student_tutor_assignments
CREATE POLICY "Students can view their own assignments" ON student_tutor_assignments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Tutors can view their own assignments" ON student_tutor_assignments
  FOR SELECT USING (tutor_id = auth.uid());

CREATE POLICY "Admin can view all assignments" ON student_tutor_assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_student_applications_updated_at
  BEFORE UPDATE ON student_applications
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_tutor_applications_updated_at
  BEFORE UPDATE ON tutor_applications
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_student_tutor_assignments_updated_at
  BEFORE UPDATE ON student_tutor_assignments
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tutor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')) DEFAULT 'scheduled',
  google_meet_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create student updates table (for tutor updates)
CREATE TABLE IF NOT EXISTS student_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_email TEXT NOT NULL,
  tutor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  update_type TEXT NOT NULL CHECK (update_type IN ('progress', 'assignment', 'note', 'session_feedback', 'goals')) DEFAULT 'note',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for new tables
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for sessions
CREATE POLICY "Students can view their own sessions" ON sessions
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Tutors can view sessions they're assigned to" ON sessions
  FOR SELECT USING (tutor_id = auth.uid());

CREATE POLICY "Tutors can create sessions for their students" ON sessions
  FOR INSERT WITH CHECK (
    tutor_id = auth.uid() AND 
    EXISTS (
      SELECT 1 FROM student_tutor_assignments 
      WHERE student_id = sessions.student_id AND tutor_id = auth.uid()
    )
  );

CREATE POLICY "Tutors can update their sessions" ON sessions
  FOR UPDATE USING (tutor_id = auth.uid());

-- Create policies for student_updates
CREATE POLICY "Students can view updates for their email" ON student_updates
  FOR SELECT USING (
    student_email = (SELECT email FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Tutors can create updates for any student" ON student_updates
  FOR INSERT WITH CHECK (tutor_id = auth.uid());

CREATE POLICY "Tutors can update their own updates" ON student_updates
  FOR UPDATE USING (tutor_id = auth.uid());

CREATE POLICY "Admin can view all updates" ON student_updates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_student_updates_updated_at
  BEFORE UPDATE ON student_updates
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Insert admin user (replace email with your admin email)
-- You'll need to sign up with this email first, then run this
-- INSERT INTO profiles (id, email, role, status) 
-- VALUES (
--   (SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com'),
--   'your-admin-email@example.com',
--   'admin',
--   'approved'
-- );

-- Test tutor accounts (create these users in Supabase Auth first, then run these inserts)
-- Password for both: TestTutor123!
-- INSERT INTO profiles (id, email, role, status) 
-- VALUES (
--   (SELECT id FROM auth.users WHERE email = 'tutor@sarahchen.com'),
--   'tutor@sarahchen.com',
--   'tutor',
--   'approved'
-- );

-- INSERT INTO profiles (id, email, role, status) 
-- VALUES (
--   (SELECT id FROM auth.users WHERE email = 'test@tutor.com'),
--   'test@tutor.com',
--   'tutor',
--   'approved'
-- );
