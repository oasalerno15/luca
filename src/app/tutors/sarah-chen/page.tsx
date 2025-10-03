'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';

// ===================== PARTNER BUTTON =====================
function PartnerButton() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleClick = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000); // Hide after 2 seconds
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white"
      >
        Partner
      </button>
      {showComingSoon && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/90 text-black px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap animate-pulse">
          Coming Soon!
        </div>
      )}
    </div>
  );
}

// ===================== LOGIN DROPDOWN =====================
function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

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

function TutorProfileSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set([headerRef.current, profileRef.current, detailsRef.current], {
        autoAlpha: 0,
        y: 40
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      tl.to(headerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8
      })
      .to(profileRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6
      }, "-=0.4")
      .to(detailsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-8 md:px-12 lg:px-20">
        <Link href="/" className="text-2xl font-light tracking-tight text-white hover:text-white/80 transition-colors">
          The Integrator Project
        </Link>
        <div className="hidden md:flex items-center gap-12">
          <PartnerButton />
          <Link href="/tutors" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
            ← Back to Tutors
          </Link>
          <Link href="/#about" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
            About Us
          </Link>
          <Link href="/#contact" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
            Contact Us
          </Link>
          <LoginDropdown />
        </div>
      </nav>

      <div className="relative mx-auto max-w-6xl px-6 py-12 md:px-10 lg:px-16">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl mb-4">
            Sarah Chen
          </h1>
          <p className="text-xl text-white/80 font-light">Mathematics & Physics Expert</p>
        </div>

        {/* Main Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Card */}
          <div ref={profileRef} className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sticky top-8">
              {/* Profile Image Placeholder */}
              <div className="bg-white/10 border-2 border-dashed border-white/30 rounded-2xl h-64 flex items-center justify-center mb-6">
                <div className="text-center text-white/60">
                  <div className="text-5xl mb-4">👩‍🏫</div>
                  <p className="text-lg font-light">Sarah's Photo</p>
                  <p className="text-sm font-light">Placeholder Image</p>
                </div>
              </div>

              {/* Rating & Sessions */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-xl font-medium">4.9</span>
                  <span className="text-white/60">(127 reviews)</span>
                </div>
                <p className="text-white/80">500+ sessions completed</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/60">Experience:</span>
                  <span className="text-white">8 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Response Time:</span>
                  <span className="text-white">&lt; 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Languages:</span>
                  <span className="text-white">English, Mandarin</span>
                </div>
              </div>

              {/* Contact Button */}
              <button className="w-full rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/10 px-6 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/25 hover:to-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40">
                Contact Sarah
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div ref={detailsRef} className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-white mb-6">About Sarah</h2>
              <p className="text-white/80 font-light leading-relaxed text-lg mb-6">
                Sarah brings a passion for making complex mathematical concepts accessible and engaging. Her students consistently improve their understanding and grades through her patient, methodical approach to problem-solving.
              </p>
              <p className="text-white/80 font-light leading-relaxed text-lg">
                With a PhD in Applied Mathematics from MIT and 8 years of tutoring experience, Sarah specializes in helping students overcome math anxiety and build confidence in their analytical abilities.
              </p>
            </div>

            {/* Education & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-light text-white mb-4">Education</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium">PhD in Applied Mathematics</p>
                    <p className="text-white/60 text-sm">Massachusetts Institute of Technology</p>
                    <p className="text-white/50 text-xs">2012 - 2016</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">BS in Mathematics & Physics</p>
                    <p className="text-white/60 text-sm">Stanford University</p>
                    <p className="text-white/50 text-xs">2008 - 2012</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-light text-white mb-4">Experience</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium">Senior Math Tutor</p>
                    <p className="text-white/60 text-sm">Tutoring Co.</p>
                    <p className="text-white/50 text-xs">2019 - Present</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Research Assistant</p>
                    <p className="text-white/60 text-sm">MIT Applied Mathematics</p>
                    <p className="text-white/50 text-xs">2016 - 2019</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-light text-white mb-6">Teaching Specialties</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Calculus", "Linear Algebra", "Physics", "SAT/ACT Math"].map((specialty, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center"
                  >
                    <span className="text-white/80 font-medium text-sm">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Philosophy */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-light text-white mb-6">Teaching Philosophy</h3>
              <p className="text-white/80 font-light leading-relaxed text-lg mb-4">
                "I believe that every student can excel in mathematics when concepts are presented clearly and systematically. My approach focuses on building strong foundations and helping students develop problem-solving confidence."
              </p>
              <p className="text-white/80 font-light leading-relaxed text-lg">
                "I use real-world examples and interactive problem-solving techniques to make abstract mathematical concepts tangible and interesting for my students."
              </p>
            </div>

            {/* Student Reviews */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-light text-white mb-6">Recent Reviews</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-white/20 pl-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">Emily, Grade 11</span>
                  </div>
                  <p className="text-white/80 font-light italic">"Sarah helped me go from failing calculus to getting an A-. Her explanations are so clear and she's incredibly patient!"</p>
                </div>
                
                <div className="border-l-4 border-white/20 pl-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">Marcus, College Freshman</span>
                  </div>
                  <p className="text-white/80 font-light italic">"Best math tutor I've ever had. Sarah makes complex topics feel manageable and actually interesting!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SarahChenProfile() {
  return (
    <div className="w-screen flex flex-col">
      <TutorProfileSection />
    </div>
  );
}
