-- QUICK FIX FOR FETCH ERRORS
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create volunteer applications table
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  educationLevel TEXT NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  experience TEXT,
  availabilityHours TEXT NOT NULL,
  motivation TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for contact submissions
CREATE POLICY "Anyone can create contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all contact submissions" ON contact_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for volunteer applications
CREATE POLICY "Anyone can create volunteer applications" ON volunteer_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Volunteers can view their own applications" ON volunteer_applications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admin can view all volunteer applications" ON volunteer_applications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create trigger for volunteer_applications updated_at
CREATE TRIGGER update_volunteer_applications_updated_at
  BEFORE UPDATE ON volunteer_applications
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Verify tables were created
SELECT 'Tables created successfully!' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('contact_submissions', 'volunteer_applications');

