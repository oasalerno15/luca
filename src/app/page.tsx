'use client';

import Hero from "@/components/ui/neural-network-hero";
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

// Section 1: About Us with Mission
function AboutUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const missionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Set initial states
      gsap.set([titleRef.current, descRef.current, missionRef.current, imageRef.current], {
        autoAlpha: 0,
        y: 50
      });

      // Create timeline with ScrollTrigger
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
        duration: 0.8,
        ease: "power3.out"
      })
      .to(descRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .to([missionRef.current, imageRef.current], {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-12 px-6 text-center md:px-10 lg:px-16">
        <h2 ref={titleRef} className="max-w-4xl text-center text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
          About Us
        </h2>
        
        <p ref={descRef} className="max-w-4xl text-center text-lg font-light leading-relaxed tracking-tight text-white/75 sm:text-xl md:text-2xl">
          We&apos;re passionate educators dedicated to unlocking each student&apos;s potential through personalized learning experiences that foster curiosity, build confidence, and inspire academic excellence.
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-6xl items-center">
          {/* Mission Statement */}
          <div ref={missionRef} className="space-y-8">
            <h3 className="text-3xl font-extralight text-white text-left">Our Mission</h3>
            <p className="text-white/80 font-light leading-relaxed text-lg text-left">
              At Tutoring Co., we believe that every student has untapped potential waiting to be discovered. Our mission is to bridge the gap between where students are and where they aspire to be, providing not just academic support, but mentorship, encouragement, and the tools necessary for lifelong learning.
            </p>
            <p className="text-white/80 font-light leading-relaxed text-lg text-left">
              We are committed to creating an inclusive, supportive environment where students feel empowered to ask questions, make mistakes, and grow from every challenge they encounter.
            </p>
          </div>

          {/* Placeholder Image */}
          <div ref={imageRef} className="bg-white/10 border-2 border-dashed border-white/30 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-lg font-light">Image Placeholder</p>
              <p className="text-sm font-light">Add your photo here</p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 2: Core Values
function CoreValuesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const valuesRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Set initial states
      gsap.set([titleRef.current, valuesRef.current, imageRef.current], {
        autoAlpha: 0,
        y: 50
      });

      // Create timeline with ScrollTrigger
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
        duration: 0.8,
        ease: "power3.out"
      })
      .to([valuesRef.current, imageRef.current], {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.4");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-16 px-6 text-center md:px-10 lg:px-16">
        <h2 ref={titleRef} className="text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
          Our Core Values
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-6xl items-center">
          {/* Placeholder Image */}
          <div ref={imageRef} className="bg-white/10 border-2 border-dashed border-white/30 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-lg font-light">Image Placeholder</p>
              <p className="text-sm font-light">Add your photo here</p>
            </div>
          </div>

          {/* Core Values */}
          <div ref={valuesRef} className="grid grid-cols-2 gap-8">
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-light text-white mb-3">Excellence</h4>
              <p className="text-white/75 font-light text-sm leading-relaxed">We strive for excellence in everything we do, from our teaching methods to our student relationships.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-light text-white mb-3">Integrity</h4>
              <p className="text-white/75 font-light text-sm leading-relaxed">We operate with complete honesty and transparency, building trust through consistent actions.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">💡</div>
              <h4 className="text-xl font-light text-white mb-3">Innovation</h4>
              <p className="text-white/75 font-light text-sm leading-relaxed">We embrace modern teaching techniques and technology to create engaging experiences.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">🌱</div>
              <h4 className="text-xl font-light text-white mb-3">Growth</h4>
              <p className="text-white/75 font-light text-sm leading-relaxed">We believe in continuous improvement, celebrating every step forward along the way.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 3: Our Approach
function OurApproachSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const approachRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Set initial states
      gsap.set([titleRef.current, approachRef.current, imageRef.current], {
        autoAlpha: 0,
        y: 50
      });

      // Create timeline with ScrollTrigger
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
        duration: 0.8,
        ease: "power3.out"
      })
      .to([approachRef.current, imageRef.current], {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.4");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-16 px-6 text-center md:px-10 lg:px-16">
        <h2 ref={titleRef} className="text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
          Our Approach
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-6xl items-center">
          {/* Our Approach */}
          <div ref={approachRef} className="space-y-8 text-left">
            <div>
              <h4 className="text-2xl font-light text-white mb-4">🎨 Personalized Learning Plans</h4>
              <p className="text-white/75 font-light leading-relaxed">Every student is unique, which is why we create customized learning plans that address individual strengths, challenges, and learning preferences.</p>
            </div>
            <div>
              <h4 className="text-2xl font-light text-white mb-4">📊 Data-Driven Progress Tracking</h4>
              <p className="text-white/75 font-light leading-relaxed">We use comprehensive assessment tools and regular progress evaluations to track student improvement and adjust our approach.</p>
            </div>
            <div>
              <h4 className="text-2xl font-light text-white mb-4">🧠 Holistic Development</h4>
              <p className="text-white/75 font-light leading-relaxed">Beyond academic subjects, we focus on developing critical thinking skills, study strategies, time management, and confidence.</p>
            </div>
            <div>
              <h4 className="text-2xl font-light text-white mb-4">👨‍👩‍👧‍👦 Family Partnership</h4>
              <p className="text-white/75 font-light leading-relaxed">We believe successful tutoring involves collaboration with parents and families through regular updates and open communication.</p>
            </div>
          </div>

          {/* Placeholder Image */}
          <div ref={imageRef} className="bg-white/10 border-2 border-dashed border-white/30 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-lg font-light">Image Placeholder</p>
              <p className="text-sm font-light">Add your photo here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegistrationSection() {
  const formSectionRef = useRef<HTMLElement | null>(null);
  const formTitleRef = useRef<HTMLHeadingElement | null>(null);
  const formDescRef = useRef<HTMLParagraphElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);
  const submitRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useGSAP(
    () => {
      if (!formSectionRef.current) return;

      // Set initial states
      gsap.set([formTitleRef.current, formDescRef.current, leftColumnRef.current, rightColumnRef.current, submitRef.current], {
        autoAlpha: 0,
        y: 40
      });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: formSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(formTitleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      })
      .to(formDescRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3")
      .to(leftColumnRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2")
      .to(rightColumnRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .to(submitRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.2");
    },
    { scope: formSectionRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setIsSubmitting(false);
      setError('Registration is taking longer than expected. Please try again or contact support.');
    }, 30000); // 30 second timeout

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const fullName = formData.get('fullName') as string;
      const grade = formData.get('grade') as string;
      const school = formData.get('school') as string;
      
      console.log('Starting registration process...', { email, fullName });

      // Create Supabase account
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'student',
            grade,
            school
          }
        }
      });

      console.log('Signup response:', { data, error: signUpError });

      if (signUpError) {
        throw signUpError;
      }

      if (!data.user) {
        throw new Error('User account was not created properly. Please try again.');
      }

      console.log('User created successfully:', data.user.id);
      
      // Profile will be created automatically by the database trigger
      // No need to manually create it - this was causing the infinite recursion error
      
      console.log('Registration completed successfully!');
      clearTimeout(timeoutId);
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error('Registration error:', err);
      clearTimeout(timeoutId);
      setError((err as Error).message || 'An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
    
    // Animate out the form and animate in the success message
    if (formRef.current && successRef.current) {
      gsap.to([formTitleRef.current, formDescRef.current, formRef.current], {
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
  };

  const handleNewForm = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    
    // Reset form if needed
    if (formRef.current) {
      formRef.current.reset();
    }
    
    // Animate out success message and animate in form
    if (formRef.current && successRef.current) {
      gsap.to(successRef.current, {
        autoAlpha: 0,
        y: -30,
        duration: 0.5,
        ease: "power3.out"
      });
      
      gsap.set([formTitleRef.current, formDescRef.current, formRef.current], { autoAlpha: 0, y: 30 });
      gsap.to([formTitleRef.current, formDescRef.current, formRef.current], {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3
      });
    }
  };

  return (
    <section ref={formSectionRef} id="register" className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-6 px-6 py-12 md:px-10 lg:px-16">
        {!isSubmitted && (
          <>
            <h2 ref={formTitleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Register for Tutoring
            </h2>
            
            <p ref={formDescRef} className="max-w-2xl text-center text-base font-light leading-relaxed tracking-tight text-white/75 sm:text-lg">
              Tell us about yourself so we can match you with the perfect tutor.
            </p>
            
            <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-6xl mt-8">
              {/* Form Container with consistent spacing */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
                
                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
                  <div ref={leftColumnRef} className="space-y-8">
              {/* Basic Information */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-white border-b border-white/10 pb-3">Basic Information</h3>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">Grade Level</label>
                            <select name="grade" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200">
                      <option value="">Select grade</option>
                      <option value="6">6th Grade</option>
                      <option value="7">7th Grade</option>
                      <option value="8">8th Grade</option>
                      <option value="9">9th Grade</option>
                      <option value="10">10th Grade</option>
                      <option value="11">11th Grade</option>
                      <option value="12">12th Grade</option>
                      <option value="college">College</option>
                    </select>
                  </div>
                </div>
                <div>
                          <label className="block text-sm font-medium text-white/90 mb-2">School</label>
                  <input 
                    type="text" 
                    name="school"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                    placeholder="Enter your school name"
                  />
                </div>
                <div>
                          <label className="block text-sm font-medium text-white/90 mb-2">Contact Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
                    placeholder="Enter your email address"
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
                </div>
              </div>

              {/* Frequency */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-white border-b border-white/10 pb-3">Tutoring Frequency</h3>
                      <div className="space-y-4">
                        <label className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                          <input type="radio" name="frequency" value="weekly" className="w-5 h-5 text-white bg-white/10 border-white/30 focus:ring-white/40 focus:ring-2" />
                          <div>
                            <span className="text-white font-medium">Consistent (Weekly sessions)</span>
                            <p className="text-white/60 text-sm mt-1">Regular weekly meetings for ongoing support</p>
                          </div>
                  </label>
                        <label className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                          <input type="radio" name="frequency" value="as-needed" className="w-5 h-5 text-white bg-white/10 border-white/30 focus:ring-white/40 focus:ring-2" />
                          <div>
                            <span className="text-white font-medium">As needed (Flexible scheduling)</span>
                            <p className="text-white/60 text-sm mt-1">Book sessions when you need help most</p>
                          </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column */}
                  <div ref={rightColumnRef} className="space-y-8">
              {/* Subjects */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-white border-b border-white/10 pb-3">Subjects Needed</h3>
                      <div className="grid grid-cols-1 gap-3">
                  {["Math", "Science", "English", "History", "Foreign Language", "Computer Science", "SAT/ACT Prep", "Other"].map((subject) => (
                          <label key={subject} className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                            <input type="checkbox" name="subjects" value={subject} className="w-5 h-5 text-white bg-white/10 border-white/30 rounded-md focus:ring-white/40 focus:ring-2" />
                            <span className="text-white font-medium">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Learning Preferences */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-white border-b border-white/10 pb-3">Learning Preferences</h3>
                      <div className="space-y-5">
                <div>
                          <label className="block text-sm font-medium text-white/90 mb-2">Learning Disabilities or Accommodations</label>
                  <textarea 
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 h-24 resize-none transition-all duration-200"
                    placeholder="Please describe any learning disabilities or accommodations needed"
                  />
                </div>
                <div>
                          <label className="block text-sm font-medium text-white/90 mb-2">Preferred Learning Style</label>
                          <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200">
                    <option value="">Select learning style</option>
                    <option value="visual">Visual (charts, diagrams, images)</option>
                    <option value="auditory">Auditory (listening, discussion)</option>
                    <option value="kinesthetic">Kinesthetic (hands-on, movement)</option>
                    <option value="reading">Reading/Writing (text-based)</option>
                    <option value="mixed">Mixed approach</option>
                  </select>
                        </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
                <div ref={submitRef} className="pt-6 border-t border-white/10">
            <button 
              type="submit"
              disabled={isSubmitting}
                    className="w-full rounded-2xl border border-white/30 bg-gradient-to-r from-white/10 to-white/5 px-8 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-white/10 disabled:hover:to-white/5"
            >
              {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Registration"
              )}
            </button>
                </div>
          </div>
        </form>
          </>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <div ref={successRef} className="w-full max-w-4xl text-center space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Title */}
            <h2 className="text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl">
              Application Submitted Successfully!
            </h2>

            {/* Success Message */}
            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-lg font-light leading-relaxed tracking-tight text-white/75 sm:text-xl">
                Welcome to our tutoring platform! Your account has been created successfully. Please check your email to verify your account, then you can immediately log in and start browsing tutors.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-light text-white">What happens next?</h3>
                <ul className="space-y-3 text-white/75 font-light">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">1</span>
                    <span>Check your email and click the verification link to activate your account</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">2</span>
                    <span>Log in to your student dashboard - you'll have immediate access!</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-sm text-white/80 mt-0.5">3</span>
                    <span>Browse tutors and schedule your first session</span>
                  </li>
                </ul>
                
                <div className="pt-6 flex justify-center">
                  <a 
                    href="/login/student"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-2xl border border-white/30 bg-gradient-to-r from-white/10 to-white/5 text-white font-medium tracking-tight backdrop-blur-sm transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    Login to Your Account
                  </a>
                </div>
              </div>

              <p className="text-base font-light text-white/60">
                If you have any immediate questions, feel free to{' '}
                <a href="#contact" className="text-white/80 hover:text-white transition-colors underline">
                  contact us
                </a>{' '}
                directly.
              </p>

              {/* Register Another Student Button */}
              <div className="pt-8">
                <button 
                  onClick={handleNewForm}
                  className="rounded-2xl border border-white/30 bg-gradient-to-r from-white/10 to-white/5 px-10 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  Register Another Student
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FAQSection() {
  const faqSectionRef = useRef<HTMLElement | null>(null);
  const faqTitleRef = useRef<HTMLHeadingElement | null>(null);
  const faqDescRef = useRef<HTMLParagraphElement | null>(null);
  const faqListRef = useRef<HTMLDivElement | null>(null);

  const faqs = [
    {
      question: "How do you match students with tutors?",
      answer: "We use a comprehensive matching system that considers your academic needs, learning style, personality, and schedule preferences to pair you with the most suitable tutor from our expert network."
    },
    {
      question: "What subjects do you offer tutoring for?",
      answer: "We offer tutoring across all major subjects including Math, Science, English, History, Foreign Languages, Computer Science, and standardized test preparation (SAT/ACT). If you don't see your subject listed, just ask!"
    },
    {
      question: "How flexible is the scheduling?",
      answer: "Very flexible! We offer both consistent weekly sessions and as-needed scheduling. You can book sessions at times that work for your schedule, including evenings and weekends."
    },
    {
      question: "What if I'm not satisfied with my tutor?",
      answer: "Your satisfaction is our priority. If you're not completely happy with your tutor match, we'll find you a new one at no additional cost. We want to ensure you have the best possible learning experience."
    },
    {
      question: "Do you accommodate learning disabilities?",
      answer: "Absolutely! Many of our tutors are specially trained to work with students who have learning disabilities. We customize our approach to match your specific needs and learning accommodations."
    },
    {
      question: "How much does tutoring cost?",
      answer: "Our pricing varies based on subject, tutor expertise, and session frequency. We offer competitive rates and flexible payment options. Contact us for a personalized quote based on your specific needs."
    },
    {
      question: "Can I switch between online and in-person sessions?",
      answer: "Yes! We offer both online and in-person tutoring options. You can choose what works best for each session or stick with your preferred format throughout."
    },
    {
      question: "How quickly can I get started?",
      answer: "Usually within 24-48 hours! Once you complete our registration form, we'll match you with a tutor and can often schedule your first session within a couple of days."
    }
  ];

  useGSAP(
    () => {
      if (!faqSectionRef.current) return;

      // Set initial states
      gsap.set([faqTitleRef.current, faqDescRef.current, faqListRef.current], {
        autoAlpha: 0,
        y: 40
      });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: faqSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(faqTitleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      })
      .to(faqDescRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3")
      .to(faqListRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2");
    },
    { scope: faqSectionRef }
  );

  return (
    <section ref={faqSectionRef} id="faq" className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-8 px-6 py-20 md:px-10 lg:px-16">
        <h2 ref={faqTitleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          Frequently Asked Questions
        </h2>
        
        <p ref={faqDescRef} className="max-w-2xl text-center text-base font-light leading-relaxed tracking-tight text-white/75 sm:text-lg">
          Got questions? We've got answers. Hover over any question to see the answer.
        </p>
        
        <div ref={faqListRef} className="w-full max-w-4xl space-y-4 mt-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer"
            >
              {/* Question */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-light text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 transform transition-transform duration-300 group-hover:rotate-90">
                  <svg
                    className="w-5 h-5 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Answer - Hidden by default, shown on hover */}
              <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-40 group-hover:mt-4">
                <p className="text-white/75 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactSectionRef = useRef<HTMLElement | null>(null);
  const contactTitleRef = useRef<HTMLHeadingElement | null>(null);
  const contactDescRef = useRef<HTMLParagraphElement | null>(null);
  const contactInfoRef = useRef<HTMLDivElement | null>(null);
  const contactFormRef = useRef<HTMLFormElement | null>(null);

  useGSAP(
    () => {
      if (!contactSectionRef.current) return;

      // Set initial states
      gsap.set([contactTitleRef.current, contactDescRef.current, contactInfoRef.current, contactFormRef.current], {
        autoAlpha: 0,
        y: 40
      });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(contactTitleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      })
      .to(contactDescRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3")
      .to([contactInfoRef.current, contactFormRef.current], {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.2");
    },
    { scope: contactSectionRef }
  );

  return (
    <section ref={contactSectionRef} id="contact" className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 px-6 py-20 md:px-10 lg:px-16">
        <h2 ref={contactTitleRef} className="text-center text-4xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          Get in Touch
        </h2>
        
        <p ref={contactDescRef} className="max-w-2xl text-center text-base font-light leading-relaxed tracking-tight text-white/75 sm:text-lg">
          Ready to start your learning journey? Have questions? We'd love to hear from you.
        </p>
        
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <h3 className="text-2xl font-light text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-light text-lg">Email</h4>
                  <p className="text-white/75 font-light">hello@tutoringco.com</p>
                  <p className="text-white/75 font-light">support@tutoringco.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-light text-lg">Phone</h4>
                  <p className="text-white/75 font-light">(555) 123-4567</p>
                  <p className="text-white/60 font-light text-sm">Mon-Fri: 8AM-8PM, Sat-Sun: 10AM-6PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-light text-lg">Office</h4>
                  <p className="text-white/75 font-light">123 Education Street</p>
                  <p className="text-white/75 font-light">Learning City, LC 12345</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-light text-lg">Response Time</h4>
                  <p className="text-white/75 font-light">Usually within 2-4 hours</p>
                  <p className="text-white/60 font-light text-sm">We're committed to quick responses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form ref={contactFormRef} className="space-y-6">
              <h3 className="text-2xl font-light text-white mb-6">Send us a Message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-white/80 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-white/80 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-white/80 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-white/80 mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="tutoring">Tutoring Services</option>
                  <option value="pricing">Pricing Information</option>
                  <option value="scheduling">Scheduling Questions</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-light text-white/80 mb-2">Message</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent h-32 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button 
                type="submit"
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base font-light tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full max-w-6xl border-t border-white/10 pt-8 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 font-light text-sm">
              © 2024 Tutoring Co. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white/80 transition-colors font-light text-sm">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white/80 transition-colors font-light text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-screen flex flex-col">
      <Hero 
        title="Where curiosity fuels success."
        description="A tutoring company for students who are ambitious, curious, and ready to aim higher with personalized 1-on-1 guidance every step of the way."
        ctaButtons={[
          { text: "Get started", href: "#register" },
          { text: "Find tutors", href: "/tutors" },
          { text: "Volunteer as a tutor", href: "/volunteer" }
        ]}
      />
      <AboutUsSection />
      <CoreValuesSection />
      <OurApproachSection />
      <RegistrationSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
