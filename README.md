# Luca - Personalized Tutoring Platform

A modern, responsive tutoring platform built with Next.js, Supabase, and beautiful animations. Connect students with qualified tutors for personalized 1-on-1 learning experiences.

## Features

- 🎨 **Beautiful UI**: Neural network-inspired hero section with GSAP animations
- 👥 **User Management**: Student and tutor registration with Supabase authentication
- 📊 **Dashboard System**: Separate dashboards for students and tutors
- 📅 **Session Scheduling**: Book and manage tutoring sessions
- 🔒 **Secure Authentication**: Role-based access control with RLS policies
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Real-time Updates**: Live progress tracking and notifications

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, GSAP animations
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel
- **3D Graphics**: Three.js, React Three Fiber

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oasalerno15/luca.git
cd luca
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL commands from `database-setup.sql` in your Supabase SQL editor
   - Copy your project URL and anon key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Setup

The application uses Supabase with the following main tables:

- `profiles` - User profiles with role-based access
- `student_applications` - Student registration data
- `tutor_applications` - Tutor application data
- `student_tutor_assignments` - Matching students with tutors
- `sessions` - Tutoring session management
- `student_updates` - Progress tracking and communication

See `database-setup.sql` for the complete schema and RLS policies.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

The app will be live at `https://your-project-name.vercel.app`

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Student and tutor dashboards
│   ├── login/             # Authentication pages
│   ├── tutors/            # Tutor profiles and listings
│   └── ...
├── components/            # Reusable UI components
│   └── ui/               # Custom UI components
├── contexts/             # React contexts (Auth)
├── lib/                  # Utilities and configurations
│   ├── supabase.ts       # Supabase client and helpers
│   └── utils.ts          # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
