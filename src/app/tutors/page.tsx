'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

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
        <div className="absolute right-0 top-full mt-2 w-56 bg-black/90 border border-white/20 rounded-xl backdrop-blur-lg shadow-xl overflow-hidden z-50">
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
          <div className="border-t border-white/10"></div>
          <a
            href="/dashboard/tutor"
            className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
            onClick={() => setIsOpen(false)}
          >
            View Tutor Dashboard
          </a>
        </div>
      )}
    </div>
  );
}

function TutorsHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Set initial states
      gsap.set([titleRef.current, descRef.current, ctaRef.current], {
        autoAlpha: 0,
        y: 50
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
      .to(descRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6
      }, "-=0.4")
      .to(ctaRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-8 md:px-12 lg:px-20">
        <Link href="/" className="text-2xl font-light tracking-tight text-white hover:text-white/80 transition-colors">
          Integrator Project
        </Link>
        <div className="hidden md:flex items-center gap-12">
          <PartnerButton />
          <Link href="/#about" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
            About Us
          </Link>
          <Link href="/#contact" className="text-base font-light tracking-tight text-white/80 transition-colors hover:text-white">
            Contact Us
          </Link>
          <LoginDropdown />
        </div>
      </nav>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-8 px-6 text-center md:px-10 lg:px-16 -mt-20">
        <h1 ref={titleRef} className="max-w-5xl text-center text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Meet Our Tutors
        </h1>
        
        <p ref={descRef} className="max-w-4xl text-center text-lg font-light leading-relaxed tracking-tight text-white/75 sm:text-xl md:text-2xl">
          Discover exceptional educators who are passionate about helping students succeed. Our carefully selected tutors bring expertise, patience, and dedication to every session.
        </p>
        
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Link
            href="#browse-tutors"
            className="rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/10 px-10 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/25 hover:to-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Browse Tutors
          </Link>
          <Link
            href="/#register"
            className="rounded-2xl border border-white/20 bg-white/10 px-10 py-4 text-lg font-light tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Get Matched
          </Link>
        </div>
      </div>
    </section>
  );
}

function TutorQualitiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const qualities = [
    {
      icon: "🎓",
      title: "Expert Knowledge",
      description: "Our tutors hold advanced degrees and have deep expertise in their subject areas, ensuring you receive top-quality instruction."
    },
    {
      icon: "💡",
      title: "Proven Teaching Methods",
      description: "Each tutor uses evidence-based teaching strategies tailored to different learning styles and academic needs."
    },
    {
      icon: "❤️",
      title: "Patient & Supportive",
      description: "Our tutors create a comfortable, encouraging environment where students feel safe to ask questions and make mistakes."
    },
    {
      icon: "🎯",
      title: "Goal-Oriented",
      description: "Every session is designed with clear objectives, helping students make measurable progress toward their academic goals."
    },
    {
      icon: "🌟",
      title: "Inspiring Mentors",
      description: "Beyond academic support, our tutors serve as role models, inspiring confidence and a love for learning."
    },
    {
      icon: "📈",
      title: "Track Record of Success",
      description: "Our tutors have consistently helped students improve grades, test scores, and overall academic performance."
    }
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set([titleRef.current, cardsRef.current], {
        autoAlpha: 0,
        y: 40
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      })
      .to(cardsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 py-20 md:px-10 lg:px-16">
        <h2 ref={titleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          What Makes Our Tutors Special
        </h2>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {qualities.map((quality, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{quality.icon}</div>
              <h3 className="text-xl font-light text-white mb-4">{quality.title}</h3>
              <p className="text-white/75 font-light leading-relaxed">{quality.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TutorProfilesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const profilesRef = useRef<HTMLDivElement | null>(null);

  const tutorProfiles = [
    {
      name: "Sarah Chen",
      subject: "Mathematics & Physics",
      education: "PhD in Applied Mathematics, MIT",
      experience: "8 years",
      specialties: ["Calculus", "Linear Algebra", "Physics", "SAT/ACT Math"],
      bio: "Sarah brings a passion for making complex mathematical concepts accessible and engaging. Her students consistently improve their understanding and grades.",
      rating: "4.9",
      sessions: "500+"
    },
    {
      name: "Dr. Marcus Thompson",
      subject: "Chemistry & Biology",
      education: "MD from Johns Hopkins, BS in Chemistry",
      experience: "12 years",
      specialties: ["Organic Chemistry", "Biology", "MCAT Prep", "AP Sciences"],
      bio: "With medical school experience and years of teaching, Dr. Thompson excels at connecting scientific concepts to real-world applications.",
      rating: "4.8",
      sessions: "750+"
    },
    {
      name: "Elena Rodriguez",
      subject: "English & Writing",
      education: "MA in English Literature, Columbia",
      experience: "6 years",
      specialties: ["Essay Writing", "Literature Analysis", "SAT Writing", "Creative Writing"],
      bio: "Elena helps students find their voice in writing while mastering grammar, structure, and literary analysis with creativity and precision.",
      rating: "4.9",
      sessions: "400+"
    },
    {
      name: "David Park",
      subject: "Computer Science",
      education: "MS Computer Science, Stanford",
      experience: "5 years",
      specialties: ["Python", "Java", "Data Structures", "AP Computer Science"],
      bio: "David combines industry experience with teaching expertise to make programming concepts clear and exciting for students of all levels.",
      rating: "4.8",
      sessions: "300+"
    },
    {
      name: "Prof. Amanda Wright",
      subject: "History & Social Studies",
      education: "PhD in History, Harvard",
      experience: "15 years",
      specialties: ["World History", "US History", "AP History", "Research Methods"],
      bio: "Professor Wright brings historical events to life with engaging storytelling and helps students develop critical thinking skills.",
      rating: "4.9",
      sessions: "600+"
    },
    {
      name: "Miguel Santos",
      subject: "Spanish & French",
      education: "MA in Romance Languages, UCLA",
      experience: "7 years",
      specialties: ["Conversational Practice", "Grammar", "AP Spanish", "Business French"],
      bio: "Miguel creates immersive language learning experiences that build confidence and fluency through practical, engaging conversations.",
      rating: "4.8",
      sessions: "450+"
    }
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set([titleRef.current, profilesRef.current], {
        autoAlpha: 0,
        y: 40
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      })
      .to(profilesRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="browse-tutors" className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 py-20 md:px-10 lg:px-16">
        <h2 ref={titleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          Featured Tutors
        </h2>
        
        <div ref={profilesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {tutorProfiles.map((tutor, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">{tutor.name}</h3>
                  <p className="text-white/70 font-light text-sm">{tutor.subject}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white/80 text-sm font-medium">{tutor.rating}</span>
                </div>
              </div>

              {/* Education & Experience */}
              <div className="space-y-2 mb-4">
                <p className="text-white/60 text-sm">
                  <span className="font-medium">Education:</span> {tutor.education}
                </p>
                <p className="text-white/60 text-sm">
                  <span className="font-medium">Experience:</span> {tutor.experience}
                </p>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-white/80 text-sm font-medium mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white/70 text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <p className="text-white/75 text-sm leading-relaxed mb-4">{tutor.bio}</p>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-white/60 text-sm">{tutor.sessions} sessions</span>
                <Link 
                  href={`/tutors/${tutor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 text-sm hover:bg-white/20 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const subjects = [
    {
      category: "Mathematics",
      icon: "🔢",
      subjects: ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry", "Pre-Calculus"],
      levels: "Middle School through College"
    },
    {
      category: "Sciences",
      icon: "🔬",
      subjects: ["Biology", "Chemistry", "Physics", "Environmental Science", "Anatomy", "Earth Science"],
      levels: "High School through College"
    },
    {
      category: "English & Writing",
      icon: "📚",
      subjects: ["Essay Writing", "Literature", "Grammar", "Creative Writing", "Reading Comprehension", "Poetry"],
      levels: "Elementary through College"
    },
    {
      category: "Social Studies",
      icon: "🌍",
      subjects: ["World History", "US History", "Government", "Economics", "Geography", "Psychology"],
      levels: "Middle School through College"
    },
    {
      category: "Foreign Languages",
      icon: "🗣️",
      subjects: ["Spanish", "French", "German", "Mandarin", "Italian", "Japanese"],
      levels: "Beginner through Advanced"
    },
    {
      category: "Test Preparation",
      icon: "📝",
      subjects: ["SAT", "ACT", "AP Exams", "GRE", "GMAT", "MCAT"],
      levels: "High School through Graduate"
    },
    {
      category: "Computer Science",
      icon: "💻",
      subjects: ["Python", "Java", "JavaScript", "Data Structures", "Algorithms", "Web Development"],
      levels: "High School through College"
    },
    {
      category: "Specialized Support",
      icon: "🎯",
      subjects: ["Study Skills", "Time Management", "Learning Disabilities", "ADHD Support", "Executive Function", "Organization"],
      levels: "All Ages"
    }
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set([titleRef.current, contentRef.current], {
        autoAlpha: 0,
        y: 40
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      })
      .to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 py-20 md:px-10 lg:px-16">
        <h2 ref={titleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          Subjects We Cover
        </h2>
        
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{subject.icon}</div>
              <h3 className="text-lg font-medium text-white mb-3">{subject.category}</h3>
              <p className="text-white/60 text-sm mb-3">{subject.levels}</p>
              <div className="space-y-1">
                {subject.subjects.map((sub, idx) => (
                  <div key={idx} className="text-white/75 text-sm">• {sub}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);

  const steps = [
    {
      number: "1",
      title: "Tell Us Your Needs",
      description: "Complete our quick assessment to help us understand your academic goals, learning style, and subject requirements.",
      icon: "📋"
    },
    {
      number: "2",
      title: "Get Matched",
      description: "Our advanced matching system pairs you with the perfect tutor based on your needs, schedule, and learning preferences.",
      icon: "🎯"
    },
    {
      number: "3",
      title: "Meet Your Tutor",
      description: "Have a brief introductory session to ensure it's a great fit. If not, we'll find you another tutor at no extra cost.",
      icon: "👋"
    },
    {
      number: "4",
      title: "Start Learning",
      description: "Begin your personalized tutoring journey with flexible scheduling, progress tracking, and ongoing support.",
      icon: "🚀"
    }
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set([titleRef.current, stepsRef.current], {
        autoAlpha: 0,
        y: 40
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      })
      .to(stepsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 py-20 md:px-10 lg:px-16">
        <h2 ref={titleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          How It Works
        </h2>
        
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="w-12 h-12 bg-white/10 border-2 border-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-medium text-lg">{step.number}</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{step.title}</h3>
                <p className="text-white/75 font-light leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <Link
            href="/#register"
            className="rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/10 px-12 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/25 hover:to-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function TutorsPage() {
  return (
    <div className="w-screen flex flex-col">
      <TutorsHeroSection />
      <TutorQualitiesSection />
      <TutorProfilesSection />
      <SubjectsSection />
      <HowItWorksSection />
    </div>
  );
}
