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
            Dr. Marcus Thompson
          </h1>
          <p className="text-xl text-white/80 font-light">Chemistry & Biology Expert</p>
        </div>

        {/* Main Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Card */}
          <div ref={profileRef} className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sticky top-8">
              {/* Profile Image Placeholder */}
              <div className="bg-white/10 border-2 border-dashed border-white/30 rounded-2xl h-64 flex items-center justify-center mb-6">
                <div className="text-center text-white/60">
                  <div className="text-5xl mb-4">👨‍⚕️</div>
                  <p className="text-lg font-light">Dr. Thompson's Photo</p>
                  <p className="text-sm font-light">Placeholder Image</p>
                </div>
              </div>

              {/* Rating & Sessions */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-xl font-medium">4.8</span>
                  <span className="text-white/60">(203 reviews)</span>
                </div>
                <p className="text-white/80">750+ sessions completed</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/60">Experience:</span>
                  <span className="text-white">12 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Response Time:</span>
                  <span className="text-white">&lt; 1 hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Languages:</span>
                  <span className="text-white">English</span>
                </div>
              </div>

              {/* Contact Button */}
              <button className="w-full rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/10 px-6 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/25 hover:to-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40">
                Contact Dr. Thompson
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div ref={detailsRef} className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-white mb-6">About Dr. Thompson</h2>
              <p className="text-white/80 font-light leading-relaxed text-lg mb-6">
                With medical school experience and years of teaching, Dr. Thompson excels at connecting scientific concepts to real-world applications. His background as an MD brings a unique perspective to chemistry and biology tutoring.
              </p>
              <p className="text-white/80 font-light leading-relaxed text-lg">
                Dr. Thompson specializes in making complex biochemical processes understandable and helping students prepare for pre-med requirements and standardized tests.
              </p>
            </div>

            {/* Education & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-light text-white mb-4">Education</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium">MD (Doctor of Medicine)</p>
                    <p className="text-white/60 text-sm">Johns Hopkins University</p>
                    <p className="text-white/50 text-xs">2006 - 2010</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">BS in Chemistry</p>
                    <p className="text-white/60 text-sm">Johns Hopkins University</p>
                    <p className="text-white/50 text-xs">2002 - 2006</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-light text-white mb-4">Experience</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium">Senior Science Tutor</p>
                    <p className="text-white/60 text-sm">Tutoring Co.</p>
                    <p className="text-white/50 text-xs">2015 - Present</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Emergency Medicine Physician</p>
                    <p className="text-white/60 text-sm">Baltimore General Hospital</p>
                    <p className="text-white/50 text-xs">2010 - 2015</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-light text-white mb-6">Teaching Specialties</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Organic Chemistry", "Biology", "MCAT Prep", "AP Sciences"].map((specialty, idx) => (
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
                "Science is all around us, and my goal is to help students see the connections between what they're learning and the world they live in. I use my medical background to show how chemistry and biology concepts apply to real healthcare situations."
              </p>
              <p className="text-white/80 font-light leading-relaxed text-lg">
                "Whether you're preparing for the MCAT or just trying to understand organic chemistry, I believe in building strong foundations and developing critical thinking skills that will serve you throughout your scientific journey."
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
                    <span className="text-white/60 text-sm">Alex, Pre-Med Student</span>
                  </div>
                  <p className="text-white/80 font-light italic">"Dr. Thompson helped me ace my MCAT prep. His real-world medical examples made everything click!"</p>
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
                    <span className="text-white/60 text-sm">Jessica, High School Senior</span>
                  </div>
                  <p className="text-white/80 font-light italic">"Amazing tutor! He made organic chemistry finally make sense. Went from a C to an A in one semester!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DrMarcusThompsonProfile() {
  return (
    <div className="w-screen flex flex-col">
      <TutorProfileSection />
    </div>
  );
}
