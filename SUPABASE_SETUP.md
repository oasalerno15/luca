# Supabase Setup Instructions

## 📋 **Step 1: Configure Environment Variables**

1. Create a `.env.local` file in your project root:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Get your credentials from your Supabase dashboard:
   - Go to Settings > API
   - Copy your Project URL and anon/public key

## 🗄️ **Step 2: Set Up Database**

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the entire contents of `database-setup.sql`
3. Click "Run" to execute the SQL
4. This will create:
   - `profiles` table for user roles and status
   - `student_applications` table for student registrations
   - `tutor_applications` table for tutor applications
   - Row Level Security policies
   - Automatic triggers for user creation

## 👨‍💼 **Step 3: Create Admin User**

1. First, sign up with your admin email using the student login form
2. Then run this SQL in the Supabase SQL Editor (replace with your email):
```sql
UPDATE profiles 
SET role = 'admin', status = 'approved' 
WHERE email = 'your-admin-email@example.com';
```

## 🚀 **What's Set Up So Far:**

✅ **Supabase Client**: Installed and configured
✅ **Database Schema**: Tables and relationships created
✅ **Authentication Context**: React context for user state
✅ **Helper Functions**: Database operations and auth
✅ **Security**: Row Level Security policies
✅ **Auto-triggers**: Profile creation on user signup

## 🎯 **Next Steps:**

1. **Set up environment variables** (above)
2. **Run the database setup SQL**
3. **Create your admin account**
4. **Test the authentication flow**

After this setup, we can:
- Update the login forms to use real authentication
- Modify registration forms to create actual accounts
- Build the admin panel for reviewing applications
- Create student and tutor dashboards

## 🔧 **Architecture Overview:**

```
User Signs Up → Creates auth.users record
              ↓ (trigger)
              Creates profiles record
              ↓
Student: Auto-approved → Can access student dashboard
Tutor: Pending status → Needs admin approval → Access tutor dashboard
```

Let me know when you've completed the setup steps and we can continue with the implementation!

