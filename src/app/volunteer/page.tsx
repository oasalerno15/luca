'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { signUp, supabase } from '@/lib/supabase';

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
        </div>
      )}
    </div>
  );
}

function VolunteerHeroSection() {
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
          The Integrator Project
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
          Volunteer as a Tutor
        </h1>
        
        <p ref={descRef} className="max-w-4xl text-center text-lg font-light leading-relaxed tracking-tight text-white/75 sm:text-xl md:text-2xl">
          Make a meaningful impact by sharing your knowledge and helping students reach their full potential. Join our community of dedicated tutors.
        </p>
        
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Link
            href="#application"
            className="rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/10 px-10 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/25 hover:to-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Apply to Volunteer
          </Link>
          <Link
            href="#learn-more"
            className="rounded-2xl border border-white/20 bg-white/10 px-10 py-4 text-lg font-light tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyVolunteerSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const benefits = [
    {
      icon: "🎯",
      title: "Make a Real Impact",
      description: "Help students overcome academic challenges and build confidence in their abilities."
    },
    {
      icon: "🌱",
      title: "Develop Your Skills",
      description: "Enhance your communication, leadership, and teaching abilities while gaining valuable experience."
    },
    {
      icon: "🤝",
      title: "Flexible Commitment",
      description: "Choose your own schedule and commitment level. Volunteer when it works best for you."
    },
    {
      icon: "🏆",
      title: "Recognition & Growth",
      description: "Receive certificates, recommendations, and opportunities for professional development."
    },
    {
      icon: "💡",
      title: "Share Your Expertise",
      description: "Use your knowledge and experience to guide the next generation of learners."
    },
    {
      icon: "🌟",
      title: "Join Our Community",
      description: "Connect with like-minded individuals who are passionate about education and making a difference."
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
    <section ref={sectionRef} id="learn-more" className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 py-20 md:px-10 lg:px-16">
        <h2 ref={titleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          Why Volunteer With Us?
        </h2>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-light text-white mb-4">{benefit.title}</h3>
              <p className="text-white/75 font-light leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RequirementsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const requirements = [
    "High school diploma or equivalent (college students and graduates preferred)",
    "Strong knowledge in at least one subject area",
    "Excellent communication and interpersonal skills",
    "Patience and enthusiasm for helping others learn",
    "Reliable internet connection for online tutoring sessions",
    "Commitment to at least 2 hours per week for a minimum of 3 months"
  ];

  const process = [
    {
      step: "1",
      title: "Submit Application",
      description: "Fill out our comprehensive volunteer application form with your background and subject expertise."
    },
    {
      step: "2",
      title: "Interview & Assessment",
      description: "Participate in a brief interview and subject knowledge assessment to ensure the best match."
    },
    {
      step: "3",
      title: "Training & Orientation",
      description: "Complete our online training program covering tutoring best practices and platform usage."
    },
    {
      step: "4",
      title: "Start Tutoring",
      description: "Get matched with students and begin making a positive impact through personalized tutoring sessions."
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
          Requirements & Process
        </h2>
        
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-6xl">
          {/* Requirements */}
          <div className="space-y-8">
            <h3 className="text-2xl font-light text-white border-b border-white/10 pb-4">Requirements</h3>
            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80 font-light leading-relaxed">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div className="space-y-8">
            <h3 className="text-2xl font-light text-white border-b border-white/10 pb-4">Application Process</h3>
            <div className="space-y-6">
              {process.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{step.step}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg mb-2">{step.title}</h4>
                    <p className="text-white/75 font-light leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplicationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set([titleRef.current, formRef.current], {
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
      .to(formRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      // Get checkbox values
      const subjects = Array.from(formData.getAll('subjects'));
      
      const volunteerData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: email,
        phone: formData.get('phone') as string,
        educationLevel: formData.get('educationLevel') as string,
        subjects: subjects,
        experience: formData.get('experience') as string,
        availabilityHours: formData.get('availabilityHours') as string,
        motivation: formData.get('motivation') as string,
        created_at: new Date().toISOString()
      };

      // Create tutor account with signUp
      const { data, error: signUpError } = await signUp(email, password);
      
      if (signUpError) throw signUpError;
      
      if (!data.user) {
        throw new Error('Account was not created properly. Please try again.');
      }

      // Save volunteer application to Supabase
      const { error: insertError } = await supabase
        .from('volunteer_applications')
        .insert([{
          ...volunteerData,
          user_id: data.user.id,
          full_name: `${volunteerData.firstName} ${volunteerData.lastName}`
        }]);

      if (insertError) throw insertError;

      setSubmitSuccess(true);
      
      // Animate form out and success message in
      if (formRef.current && successRef.current) {
        gsap.to(formRef.current, {
          autoAlpha: 0,
          y: -30,
          duration: 0.5,
          ease: "power3.out"
        });
        
        gsap.set(successRef.current, { autoAlpha: 0, y: 30 });
        gsap.to(successRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3
        });
      }
    } catch (err) {
      console.error('Volunteer application error:', err);
      setSubmitError((err as Error).message || 'Failed to submit application. Please try again or contact us at Luca@integratorproject.org');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="application" className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-12 px-6 py-20 md:px-10 lg:px-16">
        {!submitSuccess && (
          <>
            <h2 ref={titleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Apply to Volunteer
            </h2>
            
            <form ref={formRef} onSubmit={handleVolunteerSubmit} className="w-full max-w-3xl">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
            
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}
            
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-white border-b border-white/10 pb-3">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                  placeholder="Create a password (minimum 6 characters)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Education & Experience */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-white border-b border-white/10 pb-3">Education & Experience</h3>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Highest Level of Education</label>
                <select name="educationLevel" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200">
                  <option value="">Select education level</option>
                  <option value="high-school">High School Diploma</option>
                  <option value="some-college">Some College</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD/Doctorate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Subject Expertise (select at least one)</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Math", "Science", "English", "History", "Foreign Language", "Computer Science", "SAT/ACT Prep", "Other"].map((subject) => (
                    <label key={subject} className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                      <input type="checkbox" name="subjects" value={subject} className="w-5 h-5 text-white bg-white/10 border-white/30 rounded-md focus:ring-white/40 focus:ring-2" />
                      <span className="text-white font-medium">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Previous Teaching/Tutoring Experience</label>
                <textarea 
                  name="experience"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 h-24 resize-none transition-all duration-200"
                  placeholder="Describe any previous teaching, tutoring, or mentoring experience..."
                />
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-white border-b border-white/10 pb-3">Availability</h3>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">How many hours per week can you commit?</label>
                <select name="availabilityHours" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200">
                  <option value="">Select hours per week</option>
                  <option value="2-4">2-4 hours</option>
                  <option value="5-7">5-7 hours</option>
                  <option value="8-10">8-10 hours</option>
                  <option value="10+">10+ hours</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Why do you want to volunteer as a tutor?</label>
                <textarea 
                  name="motivation"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 h-32 resize-none transition-all duration-200"
                  placeholder="Tell us about your motivation to help students and make a difference..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/10">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-white/30 bg-gradient-to-r from-white/10 to-white/5 px-8 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </div>
        </form>
          </>
        )}
        
        {/* Success Message */}
        {submitSuccess && (
          <div ref={successRef} className="w-full max-w-3xl text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl">
              Application Submitted Successfully!
            </h2>

            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-lg font-light leading-relaxed tracking-tight text-white/75 sm:text-xl">
                Thank you for your interest in volunteering with The Integrator Project! Your application has been received.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-light text-white">What happens next?</h3>
                <ul className="space-y-3 text-white/75 font-light text-left">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">1</span>
                    <span>Our team will review your application within 2-3 business days</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">2</span>
                    <span>If selected, we'll contact you to schedule an interview and subject assessment</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">3</span>
                    <span>Complete our online training program to learn tutoring best practices</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">4</span>
                    <span>Get matched with students and start making a difference!</span>
                  </li>
                </ul>
              </div>

              <p className="text-base font-light text-white/60">
                Questions? Contact us at{' '}
                <a href="mailto:Luca@integratorproject.org" className="text-white/80 hover:text-white transition-colors underline">
                  Luca@integratorproject.org
                </a>
              </p>

              <div className="pt-8">
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-2xl border border-white/30 bg-gradient-to-r from-white/10 to-white/5 text-white font-medium tracking-tight backdrop-blur-sm transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function VolunteerPage() {
  return (
    <div className="w-screen flex flex-col">
      <VolunteerHeroSection />
      <WhyVolunteerSection />
      <RequirementsSection />
      <ApplicationSection />
    </div>
  );
}
