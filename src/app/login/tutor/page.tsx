'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ===================== LOGIN DROPDOWN =====================
function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-light tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 flex items-center space-x-2"
      >
        <span>Login</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-white/20 rounded-xl backdrop-blur-lg shadow-xl overflow-hidden z-50">
          <a
            href="/login/student"
            className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
            onClick={() => setIsOpen(false)}
          >
            Student Login
          </a>
          <div className="border-t border-white/10"></div>
          <a
            href="/login/tutor"
            className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
            onClick={() => setIsOpen(false)}
          >
            Tutor Login
          </a>
        </div>
      )}
    </div>
  );
}

function TutorLoginSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Hardcoded tutor credentials
  const tutorCredentials = {
    'student_alpha01': 'P@ssW0rd!92xL',
    'learner_beta22': 'TutoR#2025xyZ!',
    'math_master33': 'Z!3rA8@plM72',
    'user_delta44': 'uSer#44$LoGIn',
    'science_star55': 'Sc13nce^$2025ok',
    'reader_gamma66': 'Re@dM3!xYz78',
    'tutor_test77': 'Tut0r!#QwEr12',
    'trial_user88': 'Tr!@lP@ssw0rd88',
    'study_hero99': 'S7udY#^Hero99',
    'newstudent100': 'N3w$tuD3nt@100'
  };


  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Set initial states
      gsap.set([titleRef.current, formRef.current], {
        autoAlpha: 0,
        y: 40
      });

      // Create timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      tl.to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8
      })
      .to(formRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6
      }, "-=0.4");
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // Check if credentials match our hardcoded list
      if (tutorCredentials[email as keyof typeof tutorCredentials] === password) {
        // Valid tutor credentials - store username and redirect to tutor dashboard
        sessionStorage.setItem('tutorUsername', email);
        router.push('/dashboard/tutor');
      } else {
        // Invalid credentials
        setError('Invalid tutor credentials. Please check your username and password.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-8 md:px-12 lg:px-20">
        <Link href="/" className="text-2xl font-light tracking-tight text-white hover:text-white/80 transition-colors">
          Integrator Project
        </Link>
        <div className="hidden md:flex items-center gap-12">
          <Link href="/#about" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
            About Us
          </Link>
          <Link href="/#contact" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
            Contact Us
          </Link>
          <LoginDropdown />
        </div>
      </nav>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-8 px-6 py-20 md:px-10">
        <div className="w-full">
          <h1 ref={titleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl mb-2">
            Tutor Login
          </h1>
          <p className="text-center text-white/60 font-light mb-8">
            Access your tutor dashboard and student sessions
          </p>
          
          <form ref={formRef} onSubmit={handleSubmit} className="w-full">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Username</label>
                <input 
                  type="text" 
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                  placeholder="student_alpha01"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-white bg-white/10 border-white/30 rounded focus:ring-white/40 focus:ring-2" 
                  />
                  <span className="text-white/80 font-light text-sm">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-white/60 hover:text-white/80 text-sm font-light transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-white/30 bg-gradient-to-r from-white/10 to-white/5 px-8 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-white/10 disabled:hover:to-white/5 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In to Tutor Portal"
                )}
              </button>

            </div>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-white/60 text-sm font-light">
              Are you a student?{' '}
              <Link href="/login/student" className="text-white/80 hover:text-white transition-colors underline">
                Student Login
              </Link>
            </p>
            <p className="text-white/60 text-sm font-light">
              Need credentials?{' '}
              <Link href="/volunteer" className="text-white/80 hover:text-white transition-colors underline">
                Contact Admin
              </Link>
            </p>
            <p className="text-white/50 text-xs font-light">
              Need help? <Link href="/#contact" className="text-white/70 hover:text-white/80 transition-colors underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TutorLoginPage() {
  return (
    <div className="w-screen flex flex-col">
      <TutorLoginSection />
    </div>
  );
}
