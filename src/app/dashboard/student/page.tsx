'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getStudentTutorAssignment, StudentTutorAssignment } from '@/lib/supabase';

export default function StudentDashboard() {
  const { user, profile: dbProfile, loading, signOut } = useAuth();
  const router = useRouter();
  const [tutorAssignment, setTutorAssignment] = useState<StudentTutorAssignment | null>(null);
  const [tutorLoading, setTutorLoading] = useState(true);
  const [studentUpdates, setStudentUpdates] = useState<any[]>([]);
  const [updatesLoading, setUpdatesLoading] = useState(true);
  const [showTutorSelection, setShowTutorSelection] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [requestForm, setRequestForm] = useState({
    fullName: '',
    gradeLevel: '',
    school: '',
    subjects: '',
    learningStyle: '',
    learningDisabilities: '',
    frequency: '',
    motivation: ''
  });
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  
  // Admin functionality for student_alpha01
  const [isAdmin, setIsAdmin] = useState(false);
  const [allTutorSessionLogs, setAllTutorSessionLogs] = useState<any[]>([]);
  const [sessionLogsLoading, setSessionLogsLoading] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'session-logs'>('overview');

  // Available tutors with descriptions
  const availableTutors = [
    {
      id: 'luca-volpibeniwitz',
      username: 'student_alpha01',
      name: 'Luca Volpibeniwitz',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Calculus'],
      description: 'Passionate math and science tutor with 5+ years of experience. Specializes in helping students prepare for college entrance exams and advanced mathematics. Known for patient, visual teaching methods and making complex concepts easy to understand.',
      experience: '5+ years tutoring experience',
      education: 'PhD in Mathematics, MS in Physics',
      rating: '4.9/5',
      studentsHelped: '150+ students',
      specialties: ['Test Prep', 'Advanced Math', 'Science Concepts', 'Problem Solving']
    }
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login/student');
    }
    
    // Check if user is admin (student_alpha01)
    if (user?.email && user.email === 'student_alpha01@example.com') {
      setIsAdmin(true);
    }
  }, [user, loading, router]);


  // Fetch tutor assignment
  useEffect(() => {
    const fetchTutorAssignment = async () => {
      if (user?.id) {
        try {
          // Check if this student has been accepted by a tutor
          const acceptedStudents = JSON.parse(localStorage.getItem('accepted_students_student_alpha01') || '[]');
          const studentAssignment = acceptedStudents.find((student: any) => student.email === user.email);
          
          if (studentAssignment) {
            // Student has been accepted by a tutor
            const mockTutorAssignment = {
              id: 'assignment-' + studentAssignment.id,
              student_id: user.id,
              tutor_id: 'tutor-' + studentAssignment.tutor_username,
              assigned_at: studentAssignment.accepted_at,
              status: 'active' as const,
              created_at: new Date().toISOString(),
              tutor: {
                id: 'tutor-' + studentAssignment.tutor_username,
                email: studentAssignment.tutor_username + '@tutoringco.com',
                role: 'tutor' as const,
                status: 'approved' as const,
                created_at: new Date().toISOString(),
                tutor_application: {
                  id: 'tutor-app-' + studentAssignment.tutor_username,
                  user_id: 'tutor-' + studentAssignment.tutor_username,
                  full_name: studentAssignment.tutor_username === 'student_alpha01' ? 'Luca Volpibeniwitz' : 'Dr. Sarah Chen',
                  email: studentAssignment.tutor_username + '@tutoringco.com',
                  phone: '+1 (555) 123-4567',
                  education_level: 'PhD in Mathematics',
                  subjects: ['Mathematics', 'Physics', 'Calculus'],
                  experience: '5+ years teaching experience',
                  availability_hours: 'Monday-Friday, 2-8 PM',
                  motivation: 'Passionate about helping students succeed',
                  status: 'approved' as const,
                  created_at: new Date().toISOString()
                }
              }
            };
            setTutorAssignment(mockTutorAssignment);
          } else {
            // No tutor assigned yet
            setTutorAssignment(null);
          }
        } catch (error) {
          console.error('Error fetching tutor assignment:', error);
          setTutorAssignment(null);
        } finally {
          setTutorLoading(false);
        }
      }
    };

    if (user?.id) {
      fetchTutorAssignment();
    }
  }, [user?.id]);

  // Fetch student updates from localStorage
  useEffect(() => {
    const fetchStudentUpdates = () => {
      if (user?.email) {
        try {
          // Load updates from localStorage for this student
          const updates = JSON.parse(localStorage.getItem(`updates_${user.email}`) || '[]');
          setStudentUpdates(updates);
        } catch (error) {
          console.error('Error fetching student updates:', error);
        } finally {
          setUpdatesLoading(false);
        }
      }
    };

    if (user?.email) {
      fetchStudentUpdates();
      
      // Set up a listener for localStorage changes (when tutors add updates)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === `updates_${user.email}` && e.newValue) {
          const updates = JSON.parse(e.newValue);
          setStudentUpdates(updates);
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      // Also check periodically for updates (for same-tab updates)
      const interval = setInterval(fetchStudentUpdates, 2000);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, [user?.email]);

  // Admin function to load all tutor session logs - MOVED BEFORE CONDITIONAL RETURNS
  const loadAllTutorSessionLogs = useCallback(async () => {
    setSessionLogsLoading(true);
    
    try {
      // Get all session logs from localStorage for all tutors
      const allSessionLogs: any[] = [];
      
      // Get all accepted students to find tutor usernames
      const allAcceptedStudents = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('accepted_students_')) {
          const tutorUsername = key.replace('accepted_students_', '');
          const students = JSON.parse(localStorage.getItem(key) || '[]');
          allAcceptedStudents.push(...students.map((s: any) => ({ ...s, tutorUsername })));
        }
      }
      
      // Get session logs for each tutor
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('session_logs_')) {
          const tutorUsername = key.replace('session_logs_', '');
          const sessionLogs = JSON.parse(localStorage.getItem(key) || '[]');
          allSessionLogs.push(...sessionLogs.map((log: any) => ({ ...log, tutorUsername })));
        }
      }
      
      // Sort by date (newest first)
      allSessionLogs.sort((a, b) => new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime());
      
      setAllTutorSessionLogs(allSessionLogs);
    } catch (error) {
      console.error('Error loading session logs:', error);
    } finally {
      setSessionLogsLoading(false);
    }
  }, []);

  // Load session logs when admin tab is selected - MOVED BEFORE CONDITIONAL RETURNS
  useEffect(() => {
    if (isAdmin && activeAdminTab === 'session-logs') {
      loadAllTutorSessionLogs();
    }
  }, [isAdmin, activeAdminTab, loadAllTutorSessionLogs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
          <span className="text-white text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">No user found. Redirecting...</div>
      </div>
    );
  }

  // Create a simple profile object from user data if no database profile exists
  const profile = dbProfile || {
    id: user.id,
    email: user.email || '',
    role: 'student' as const,
    status: 'approved' as const,
    created_at: user.created_at
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleScheduleSession = () => {
    // Navigate to scheduling page or open modal
    router.push('/schedule-session');
  };

  const handleViewProgress = () => {
    // Navigate to progress page
    router.push('/progress');
  };

  const handleBrowseResources = () => {
    // Navigate to resources page
    router.push('/resources');
  };

  const handleSubmitRequest = async () => {
    if (!user?.email || !selectedTutor) return;

    setIsSubmittingRequest(true);

    // Simulate API call delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newRequest = {
      id: Date.now().toString(),
      fullName: requestForm.fullName,
      email: user.email,
      gradeLevel: requestForm.gradeLevel,
      school: requestForm.school,
      subjects: requestForm.subjects.split(',').map(s => s.trim()).filter(s => s),
      learningStyle: requestForm.learningStyle,
      learningDisabilities: requestForm.learningDisabilities || null,
      frequency: requestForm.frequency,
      motivation: requestForm.motivation,
      requestedTutor: selectedTutor.username,
      tutorName: selectedTutor.name,
      created_at: new Date().toISOString()
    };

    // Get existing requests and add the new one
    const existingRequests = JSON.parse(localStorage.getItem('student_requests') || '[]');
    const updatedRequests = [newRequest, ...existingRequests];
    
    // Save to localStorage
    localStorage.setItem('student_requests', JSON.stringify(updatedRequests));
    
    setIsSubmittingRequest(false);
    setRequestSubmitted(true);
    
    // Clear form and hide it after success animation
    setTimeout(() => {
      setRequestForm({
        fullName: '',
        gradeLevel: '',
        school: '',
        subjects: '',
        learningStyle: '',
        learningDisabilities: '',
        frequency: '',
        motivation: ''
      });
      setSelectedTutor(null);
      setShowTutorSelection(false);
      setRequestSubmitted(false);
    }, 2000);
  };

  const handleSelectTutor = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowTutorSelection(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-light tracking-tight">
            The Integrator Project
          </Link>
          <div className="flex items-center space-x-8">
            <button className="text-white/80 hover:text-white transition-colors font-light">
              Profile
            </button>
            <span className="text-white/60 text-sm">Welcome, {user.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-light text-white transition-colors hover:bg-white/20"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-extralight mb-8">
          {isAdmin ? 'Admin Dashboard' : 'Student Dashboard'}
        </h1>
        
        {/* Admin Section for student_alpha01 */}
        {isAdmin && (
          <div className="mb-8">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveAdminTab('overview')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeAdminTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveAdminTab('session-logs')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeAdminTab === 'session-logs'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                All Tutor Session Logs
              </button>
            </div>
            
            {activeAdminTab === 'session-logs' && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-light mb-6 flex items-center">
                  <span className="mr-3">📊</span>
                  All Tutor Session Logs
                </h3>
                
                {sessionLogsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                      <span className="text-white/60">Loading session logs...</span>
                    </div>
                  </div>
                ) : allTutorSessionLogs.length > 0 ? (
                  <div className="space-y-4">
                    {allTutorSessionLogs.map((log, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-medium text-white mb-2">
                              {log.session_title || log.title || 'Session'}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-white/60">
                              <span>👨‍🏫 Tutor: {log.tutorUsername}</span>
                              <span>📅 {new Date(log.date || log.created_at).toLocaleDateString()}</span>
                              <span>⏱️ Duration: {log.duration || 'N/A'}</span>
                              <span>📚 Subject: {log.subject || log.session_subject || 'N/A'}</span>
                            </div>
                          </div>
                          {log.rating && (
                            <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm font-medium">
                              ⭐ {log.rating}/5
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {log.topics_covered && (
                            <div>
                              <h5 className="text-white/80 font-medium mb-1">Topics Covered:</h5>
                              <p className="text-white/60 text-sm">{log.topics_covered}</p>
                            </div>
                          )}
                          
                          {log.comments && (
                            <div>
                              <h5 className="text-white/80 font-medium mb-1">Comments:</h5>
                              <p className="text-white/60 text-sm">{log.comments}</p>
                            </div>
                          )}
                          
                          {log.homework_assigned && (
                            <div>
                              <h5 className="text-white/80 font-medium mb-1">Homework Assigned:</h5>
                              <p className="text-white/60 text-sm">{log.homework_assigned}</p>
                            </div>
                          )}
                          
                          {log.next_session_topics && (
                            <div>
                              <h5 className="text-white/80 font-medium mb-1">Next Session Topics:</h5>
                              <p className="text-white/60 text-sm">{log.next_session_topics}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h4 className="text-xl font-light text-white mb-2">No Session Logs Found</h4>
                    <p className="text-white/60">No tutors have logged any sessions yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Dashboard Content - All verified users are approved */}
        {profile.status === 'approved' && (
          <div className="space-y-8">
            {/* My Tutor Section */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-6">My Tutor</h3>
              {tutorLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  <span className="text-white/60">Loading tutor information...</span>
                </div>
              ) : tutorAssignment?.tutor ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-light">
                        {tutorAssignment.tutor.tutor_application?.full_name?.split(' ').map(n => n[0]).join('') || 'TC'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-light text-white">
                        {tutorAssignment.tutor.tutor_application?.full_name || 'Tutor Name'}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {tutorAssignment.tutor.tutor_application?.education_level || 'Education Level'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Email:</span>
                      <p className="text-white">{tutorAssignment.tutor.email}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Phone:</span>
                      <p className="text-white">{tutorAssignment.tutor.tutor_application?.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Subjects:</span>
                      <p className="text-white">
                        {tutorAssignment.tutor.tutor_application?.subjects?.join(', ') || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="text-white/60">Availability:</span>
                      <p className="text-white">{tutorAssignment.tutor.tutor_application?.availability_hours || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={() => window.open('https://meet.google.com/demo-session', '_blank')}
                      className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-3 text-sm font-light text-white transition-colors"
                    >
                      Join Session (Google Meet)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/60 mb-4">No tutor assigned yet</p>
                  {!showTutorSelection ? (
                    <button 
                      onClick={() => setShowTutorSelection(true)}
                      className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-light text-white transition-colors hover:bg-white/20"
                    >
                      Choose a Tutor
                    </button>
                  ) : (
                    <div className="max-w-6xl mx-auto space-y-6">
                      <h4 className="text-white font-light mb-4">Available Tutors</h4>
                      <div className="space-y-4">
                        {availableTutors.map((tutor) => (
                          <div key={tutor.id} className="bg-white/5 border border-white/10 rounded-lg p-6 text-left">
                            <div className="flex items-start gap-6 mb-4">
                              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                <span className="text-white font-bold text-2xl">
                                  {tutor.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h5 className="text-white font-light text-xl mb-1">{tutor.name}</h5>
                                    <p className="text-white/60 text-sm mb-2">{tutor.education}</p>
                                    <p className="text-white/80 text-sm leading-relaxed max-w-2xl">{tutor.description}</p>
                                  </div>
                                  <div className="text-right ml-6">
                                    <div className="text-yellow-400 text-lg font-medium">{tutor.rating}</div>
                                    <div className="text-white/60 text-sm">{tutor.studentsHelped}</div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6 text-sm mb-4">
                                  <div>
                                    <span className="text-white/60 text-xs uppercase tracking-wide">Subjects</span>
                                    <p className="text-white text-sm mt-1">{tutor.subjects.join(', ')}</p>
                                  </div>
                                  <div>
                                    <span className="text-white/60 text-xs uppercase tracking-wide">Experience</span>
                                    <p className="text-white text-sm mt-1">{tutor.experience}</p>
                                  </div>
                                  <div>
                                    <span className="text-white/60 text-xs uppercase tracking-wide">Specialties</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {tutor.specialties.map((specialty) => (
                                        <span key={specialty} className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">
                                          {specialty}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleSelectTutor(tutor)}
                                  className="rounded-lg bg-green-600 hover:bg-green-700 px-6 py-2 text-sm font-medium text-white transition-colors"
                                >
                                  Request {tutor.name}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowTutorSelection(false)}
                        className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-light text-white transition-colors hover:bg-white/20"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  
            {selectedTutor && (
              <div className="max-w-md mx-auto space-y-4 mt-6 relative">
                {requestSubmitted && (
                  <div className="absolute inset-0 bg-green-600/30 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-6 rounded-2xl flex flex-col items-center space-y-4 shadow-2xl transform scale-110 animate-bounce">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">Successfully Requested!</h3>
                        <p className="text-green-100">Your request has been sent to {selectedTutor.name}</p>
                        <p className="text-green-200 text-sm mt-1">They'll review your request and get back to you soon.</p>
                      </div>
                    </div>
                  </div>
                )}
                <h4 className="text-white font-light mb-4">Submit Request to {selectedTutor.name}</h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={requestForm.fullName}
                          onChange={(e) => setRequestForm({...requestForm, fullName: e.target.value})}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                        />
                        <input
                          type="text"
                          placeholder="Grade Level (e.g., 10th Grade)"
                          value={requestForm.gradeLevel}
                          onChange={(e) => setRequestForm({...requestForm, gradeLevel: e.target.value})}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                        />
                        <input
                          type="text"
                          placeholder="School Name"
                          value={requestForm.school}
                          onChange={(e) => setRequestForm({...requestForm, school: e.target.value})}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                        />
                        <input
                          type="text"
                          placeholder="Subjects (comma-separated)"
                          value={requestForm.subjects}
                          onChange={(e) => setRequestForm({...requestForm, subjects: e.target.value})}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                        />
                        <select
                          value={requestForm.learningStyle}
                          onChange={(e) => setRequestForm({...requestForm, learningStyle: e.target.value})}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white focus:outline-none focus:border-white/40"
                        >
                          <option value="">Select Learning Style</option>
                          <option value="Visual">Visual</option>
                          <option value="Auditory">Auditory</option>
                          <option value="Kinesthetic">Kinesthetic</option>
                          <option value="Reading/Writing">Reading/Writing</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Special Needs (optional)"
                          value={requestForm.learningDisabilities}
                          onChange={(e) => setRequestForm({...requestForm, learningDisabilities: e.target.value})}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                        />
                        <input
                          type="text"
                          placeholder="Frequency (e.g., 2 hours per week)"
                          value={requestForm.frequency}
                          onChange={(e) => setRequestForm({...requestForm, frequency: e.target.value})}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                        />
                        <textarea
                          placeholder="Why do you need tutoring?"
                          value={requestForm.motivation}
                          onChange={(e) => setRequestForm({...requestForm, motivation: e.target.value})}
                          rows={3}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSubmitRequest}
                          disabled={isSubmittingRequest || requestSubmitted}
                          className={`flex-1 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all duration-300 transform ${
                            isSubmittingRequest 
                              ? 'bg-blue-500 cursor-not-allowed opacity-75 scale-95' 
                              : requestSubmitted
                              ? 'bg-green-600 cursor-not-allowed scale-105'
                              : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-105 shadow-lg hover:shadow-xl'
                          }`}
                        >
                          {isSubmittingRequest ? (
                            <div className="flex items-center justify-center space-x-3">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span className="font-medium">Submitting Request...</span>
                            </div>
                          ) : requestSubmitted ? (
                            <div className="flex items-center justify-center space-x-2">
                              <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="font-semibold">Successfully Sent!</span>
                            </div>
                          ) : (
                            <span className="font-semibold">Submit Request</span>
                          )}
                        </button>
                        <button
                          onClick={() => setSelectedTutor(null)}
                          disabled={isSubmittingRequest || requestSubmitted}
                          className={`flex-1 rounded-lg border px-4 py-2 text-sm font-light text-white transition-all duration-300 ${
                            isSubmittingRequest || requestSubmitted
                              ? 'border-white/10 bg-white/5 cursor-not-allowed opacity-50'
                              : 'border-white/20 bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Main Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Upcoming Sessions */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-light mb-6">Upcoming Sessions</h3>
                <p className="text-white/60 mb-6">No sessions scheduled</p>
                <button 
                  onClick={handleScheduleSession}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-light text-white transition-colors hover:bg-white/20"
                >
                  Schedule Session
                </button>
              </div>

              {/* Progress */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-light mb-6">Progress</h3>
                <p className="text-white/60 mb-6">View your learning progress</p>
                <button 
                  onClick={handleViewProgress}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-light text-white transition-colors hover:bg-white/20"
                >
                  View Progress
                </button>
              </div>

              {/* Resources */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-light mb-6">Resources</h3>
                <p className="text-white/60 mb-6">Access study materials</p>
                <button 
                  onClick={handleBrowseResources}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-light text-white transition-colors hover:bg-white/20"
                >
                  Browse Resources
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Student Updates from Tutor */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <h3 className="text-xl font-light mb-6">Updates from Your Tutor</h3>
          {updatesLoading ? (
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
              <span className="text-white/60">Loading updates...</span>
            </div>
          ) : studentUpdates.length > 0 ? (
            <div className="space-y-4">
              {studentUpdates.map((update) => (
                <div key={update.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-light">{update.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      update.update_type === 'progress' ? 'bg-blue-600' :
                      update.update_type === 'assignment' ? 'bg-orange-600' :
                      update.update_type === 'session_feedback' ? 'bg-purple-600' :
                      update.update_type === 'goals' ? 'bg-green-600' :
                      'bg-gray-600'
                    }`}>
                      {update.update_type.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-2">{update.content}</p>
                  <p className="text-white/60 text-xs">
                    {new Date(update.created_at).toLocaleDateString()} at {new Date(update.created_at).toLocaleTimeString()}
                    {!update.is_read && <span className="ml-2 text-blue-400">• New</span>}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60">No updates from your tutor yet.</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-light text-white mb-2">0</div>
            <div className="text-white/60 text-sm">Sessions Completed</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-light text-white mb-2">0</div>
            <div className="text-white/60 text-sm">Tutors Connected</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-light text-white mb-2">0</div>
            <div className="text-white/60 text-sm">Subjects Studied</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-light text-white mb-2">0</div>
            <div className="text-white/60 text-sm">Hours of Learning</div>
          </div>
        </div>
      </div>
    </div>
  );
}
