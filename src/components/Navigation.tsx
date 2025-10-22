'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationProps {
  transparent?: boolean;
}

export default function Navigation({ transparent = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPartnerComingSoon, setShowPartnerComingSoon] = useState(false);
  const { user, profile, signOut } = useAuth();
  const loginDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close login dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target as Node)) {
        setIsLoginOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePartnerClick = () => {
    setShowPartnerComingSoon(true);
    setTimeout(() => setShowPartnerComingSoon(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <nav className={`relative z-50 ${transparent ? 'bg-transparent' : 'bg-black/80 backdrop-blur-md border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-6 py-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-light tracking-tight text-white hover:text-white/80 transition-colors">
            The Integrator Project
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
              About
            </Link>
            <Link href="/tutors" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
              Tutors
            </Link>
            <Link href="/volunteer" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
              Volunteer
            </Link>
            <Link href="/support" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
              Support
            </Link>
            <div className="relative">
              <button
                onClick={handlePartnerClick}
                className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white"
              >
                Partner
              </button>
              {showPartnerComingSoon && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/90 text-black px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap animate-pulse">
                  Coming Soon!
                </div>
              )}
            </div>
            <Link href="/#contact" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
              Contact
            </Link>

            {/* User Menu or Login */}
            {user && profile ? (
              <div className="flex items-center gap-4">
                <Link 
                  href={profile.role === 'student' ? '/dashboard/student' : profile.role === 'tutor' ? '/dashboard/tutor' : '/admin'}
                  className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-light tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div ref={loginDropdownRef} className="relative">
                <button
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-light tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 flex items-center space-x-2"
                >
                  <span>Login</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isLoginOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isLoginOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-black/90 border border-white/20 rounded-xl backdrop-blur-lg shadow-xl overflow-hidden">
                    <Link
                      href="/login/student"
                      className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
                      onClick={() => setIsLoginOpen(false)}
                    >
                      Student Login
                    </Link>
                    <div className="border-t border-white/10"></div>
                    <Link
                      href="/login/tutor"
                      className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
                      onClick={() => setIsLoginOpen(false)}
                    >
                      Tutor Login
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2 text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/10 pt-4">
            <Link
              href="/#about"
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/tutors"
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tutors
            </Link>
            <Link
              href="/volunteer"
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Volunteer
            </Link>
            <Link
              href="/support"
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <button
              onClick={handlePartnerClick}
              className="block w-full text-left text-white/80 hover:text-white transition-colors py-2"
            >
              Partner {showPartnerComingSoon && <span className="ml-2 text-xs">(Coming Soon!)</span>}
            </button>
            <Link
              href="/#contact"
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="border-t border-white/10 pt-3 mt-3 space-y-2">
              {user && profile ? (
                <>
                  <Link
                    href={profile.role === 'student' ? '/dashboard/student' : profile.role === 'tutor' ? '/dashboard/tutor' : '/admin'}
                    className="block text-white/80 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-white/80 hover:text-white transition-colors py-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login/student"
                    className="block text-white/80 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Student Login
                  </Link>
                  <Link
                    href="/login/tutor"
                    className="block text-white/80 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tutor Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


