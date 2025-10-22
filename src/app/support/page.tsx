'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function SupportPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      gsap.set([titleRef.current, descRef.current, cardsRef.current], {
        autoAlpha: 0,
        y: 40
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      tl.to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8
      })
      .to(descRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6
      }, "-=0.4")
      .to(cardsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7
      }, "-=0.3");
    },
    { scope: heroRef }
  );

  return (
    <div className="min-h-screen w-screen bg-black">
      <Navigation />
      
      <section ref={heroRef} className="relative min-h-screen w-screen overflow-hidden">
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 py-20 md:px-10 lg:px-16">
          <h1 ref={titleRef} className="text-center text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Support Our Mission
          </h1>
          
          <p ref={descRef} className="max-w-3xl text-center text-lg font-light leading-relaxed tracking-tight text-white/75 sm:text-xl">
            There are many ways to support our work in making quality tutoring accessible to all students. Choose how you'd like to make a difference.
          </p>
          
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-12">
            {/* Volunteer Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col">
              <div className="text-5xl mb-6">🤝</div>
              <h2 className="text-2xl font-light text-white mb-4">Volunteer as a Tutor</h2>
              <p className="text-white/75 font-light leading-relaxed mb-6 flex-grow">
                Share your knowledge and expertise by becoming a volunteer tutor. Make a direct impact on students' lives.
              </p>
              <Link 
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/10 px-6 py-3 text-base font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/25 hover:to-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Apply to Volunteer →
              </Link>
            </div>

            {/* Partner Inquiry Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col">
              <div className="text-5xl mb-6">🏢</div>
              <h2 className="text-2xl font-light text-white mb-4">Partner Inquiry</h2>
              <p className="text-white/75 font-light leading-relaxed mb-6 flex-grow">
                Collaborate with us on workshops, outreach programs, or educational exhibitions to amplify our impact.
              </p>
              <Link 
                href="/#contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/10 px-6 py-3 text-base font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/25 hover:to-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Get in Touch →
              </Link>
            </div>

            {/* Donate Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col relative overflow-hidden">
              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                Coming Soon
              </div>
              
              <div className="text-5xl mb-6">💝</div>
              <h2 className="text-2xl font-light text-white mb-4">Donate</h2>
              <p className="text-white/75 font-light leading-relaxed mb-6 flex-grow">
                Financial contributions help us expand our reach and provide free or low-cost tutoring to more students in need.
              </p>
              <button 
                disabled
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-base font-light tracking-tight text-white/50 backdrop-blur-sm cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 mt-12">
            <h3 className="text-2xl font-light text-white mb-6 text-center">Why Support Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/75 font-light">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">✓</span>
                  <span>Directly impact students from low-income communities</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">✓</span>
                  <span>Support inclusive education for students with learning differences</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">✓</span>
                  <span>Help bridge educational opportunity gaps</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">✓</span>
                  <span>Promote equity and access in mathematics education</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">✓</span>
                  <span>Join a community committed to educational justice</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">✓</span>
                  <span>Make a lasting difference in students' lives</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <p className="text-white/75 font-light mb-4">
              Have questions about how you can support us?
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors underline"
            >
              <span>Contact us</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


