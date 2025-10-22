# Deployment Guide - The Integrator Project

This guide will help you deploy The Integrator Project to production.

## Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- A domain name (optional but recommended)
- Vercel account (recommended for deployment)

## Step 1: Database Setup

1. **Create a Supabase Project**
   - Go to https://supabase.com and create a new project
   - Note your project URL and anon key

2. **Run Database Setup**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy the contents of `database-setup.sql`
   - Run the SQL script to create all tables, policies, and functions

3. **Verify Tables**
   - Check that the following tables were created:
     - `profiles`
     - `student_applications`
     - `tutor_applications`
     - `volunteer_applications`
     - `contact_submissions`
     - `student_tutor_assignments`
     - `sessions`
     - `student_updates`

## Step 2: Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- Student registration
- Volunteer application
- Contact form
- Login flows

## Step 5: Deploy to Vercel

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables (same as `.env.local`)
   - Deploy!

3. **Set Up Custom Domain** (optional)
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain (e.g., integratorproject.org)
   - Follow DNS configuration instructions

## Step 6: Configure Google Analytics

1. **Create GA4 Property**
   - Go to https://analytics.google.com
   - Create a new GA4 property
   - Get your Measurement ID (starts with G-)

2. **Add to Environment Variables**
   - In Vercel, add `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Redeploy your site

## Step 7: Post-Deployment Checklist

- [ ] Test all forms (registration, volunteer, contact)
- [ ] Verify email confirmation works
- [ ] Test student and tutor login
- [ ] Check that database policies work correctly
- [ ] Verify Google Analytics is tracking
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit for performance
- [ ] Submit sitemap to Google Search Console

## Troubleshooting

### Forms Not Submitting
- Check Supabase RLS policies
- Verify environment variables are set
- Check browser console for errors

### Email Verification Not Working
- Configure email templates in Supabase
- Check spam folder
- Verify SMTP settings in Supabase

### Login Issues
- Clear browser cache and cookies
- Check that profiles table has correct user data
- Verify Supabase auth is enabled

## Maintenance

### Regular Tasks
- Monitor Supabase usage and storage
- Review contact form submissions
- Process volunteer applications
- Update tutor profiles

### Database Backups
- Supabase provides automatic backups
- You can also export data via SQL Editor

## Support

For issues or questions:
- Email: Luca@integratorproject.org
- Check `/database-setup.sql` for schema reference
- Review Supabase documentation

## Security Notes

- Never commit `.env.local` to version control
- Keep your Supabase keys secure
- Regularly review RLS policies
- Monitor for suspicious activity
- Keep dependencies updated

## Performance Optimization

- Images are automatically optimized by Next.js
- Static pages are cached at the edge
- API routes use Supabase connection pooling
- Enable Vercel Analytics for detailed metrics

---

Built with ❤️ for accessible education


