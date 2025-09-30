'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TutorDashboard() {
  const [tutorUsername, setTutorUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'requests' | 'students'>('requests');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [updateType, setUpdateType] = useState<'progress' | 'assignment' | 'note' | 'session_feedback' | 'goals'>('note');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionSubject, setSessionSubject] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [googleMeetLink, setGoogleMeetLink] = useState('');
  const [studentUpdates, setStudentUpdates] = useState<any[]>([]);
  const [studentRequests, setStudentRequests] = useState<any[]>([]);
  const [acceptedStudents, setAcceptedStudents] = useState<any[]>([]);

  useEffect(() => {
    // Get the tutor username from sessionStorage or redirect to login
    const storedUsername = sessionStorage.getItem('tutorUsername');
    if (storedUsername) {
      setTutorUsername(storedUsername);
      
      // Load student requests and accepted students from localStorage
      let requests = JSON.parse(localStorage.getItem('student_requests') || '[]');
      const students = JSON.parse(localStorage.getItem(`accepted_students_${storedUsername}`) || '[]');
      
      // Note: Student requests will be added when students submit them
      // Sample requests are not automatically created anymore
      
      setStudentRequests(requests);
      setAcceptedStudents(students);
    } else {
      router.push('/login/tutor');
    }
    setLoading(false);
  }, [router]);

  const handleSignOut = () => {
    sessionStorage.removeItem('tutorUsername');
    router.push('/');
  };

  const handleAcceptStudent = (request: any) => {
    // Add student to accepted students list
    const newAcceptedStudent = {
      ...request,
      accepted_at: new Date().toISOString(),
      tutor_username: tutorUsername
    };
    
    const updatedAcceptedStudents = [...acceptedStudents, newAcceptedStudent];
    setAcceptedStudents(updatedAcceptedStudents);
    localStorage.setItem(`accepted_students_${tutorUsername}`, JSON.stringify(updatedAcceptedStudents));
    
    // Remove from requests
    const updatedRequests = studentRequests.filter(req => req.id !== request.id);
    setStudentRequests(updatedRequests);
    localStorage.setItem('student_requests', JSON.stringify(updatedRequests));
    
    // Notify student of acceptance
    const acceptanceNotification = {
      id: Date.now().toString(),
      student_email: request.email,
      tutor_username: tutorUsername,
      update_type: 'note',
      title: 'Tutor Assignment Confirmed',
      content: `You have been accepted by ${tutorUsername}. You can now schedule sessions and receive updates from your tutor.`,
      is_read: false,
      created_at: new Date().toISOString()
    };
    
    const existingUpdates = JSON.parse(localStorage.getItem(`updates_${request.email}`) || '[]');
    localStorage.setItem(`updates_${request.email}`, JSON.stringify([acceptanceNotification, ...existingUpdates]));
    
    alert('Student accepted successfully!');
  };

  const handleRejectStudent = (request: any) => {
    // Remove from requests
    const updatedRequests = studentRequests.filter(req => req.id !== request.id);
    setStudentRequests(updatedRequests);
    localStorage.setItem('student_requests', JSON.stringify(updatedRequests));
    
    alert('Student request rejected.');
  };

  const handleSelectStudent = (student: any) => {
    setSelectedStudent(student);
    
    // Load any existing updates from localStorage for this student
    const existingUpdates = JSON.parse(localStorage.getItem(`updates_${student.email}`) || '[]');
    setStudentUpdates(existingUpdates);
  };

  const handleCreateUpdate = async () => {
    if (!selectedStudent || !updateTitle.trim() || !updateContent.trim()) return;

    try {
      // Create a new update object
      const newUpdate = {
        id: Date.now().toString(),
        student_email: selectedStudent.email,
        tutor_username: tutorUsername,
        update_type: updateType,
        title: updateTitle,
        content: updateContent,
        is_read: false,
        created_at: new Date().toISOString()
      };

      // Get existing updates and add the new one
      const existingUpdates = JSON.parse(localStorage.getItem(`updates_${selectedStudent.email}`) || '[]');
      const updatedUpdates = [newUpdate, ...existingUpdates];
      
      // Save to localStorage
      localStorage.setItem(`updates_${selectedStudent.email}`, JSON.stringify(updatedUpdates));
      setStudentUpdates(updatedUpdates);

      // Clear form
      setUpdateTitle('');
      setUpdateContent('');
      
      alert('Update created successfully!');
    } catch (error) {
      console.error('Error creating update:', error);
      alert('Error creating update. Please try again.');
    }
  };

  const handleCreateSession = async () => {
    if (!selectedStudent || !sessionTitle.trim() || !sessionSubject.trim() || !sessionDate || !sessionTime) return;

    try {
      // Create a new session object
      const newSession = {
        id: Date.now().toString(),
        student_id: selectedStudent.id,
        tutor_username: tutorUsername,
        title: sessionTitle,
        subject: sessionSubject,
        scheduled_at: new Date(`${sessionDate}T${sessionTime}`).toISOString(),
        duration_minutes: 60,
        status: 'scheduled',
        google_meet_link: googleMeetLink || undefined,
        created_at: new Date().toISOString()
      };

      // Get existing sessions and add the new one
      const existingSessions = JSON.parse(localStorage.getItem(`sessions_${selectedStudent.email}`) || '[]');
      const updatedSessions = [newSession, ...existingSessions];
      
      // Save to localStorage
      localStorage.setItem(`sessions_${selectedStudent.email}`, JSON.stringify(updatedSessions));

      // Clear form
      setSessionTitle('');
      setSessionSubject('');
      setSessionDate('');
      setSessionTime('');
      setGoogleMeetLink('');
      
      alert('Session created successfully!');
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Error creating session. Please try again.');
    }
  };

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

  if (!tutorUsername) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Unable to load dashboard</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-light tracking-tight">
            Tutoring Co.
          </Link>
          <div className="flex items-center space-x-8">
            <button className="text-white/80 hover:text-white transition-colors font-light">
              Profile
            </button>
            <span className="text-white/60 text-sm">Welcome, {tutorUsername}</span>
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
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-extralight mb-8">Tutor Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-3 rounded-lg font-light transition-colors ${
              activeTab === 'requests'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-white/60 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            Requests ({studentRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 rounded-lg font-light transition-colors ${
              activeTab === 'students'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-white/60 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            Your Students ({acceptedStudents.length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Requests or Students List */}
          <div className="space-y-6">
            {activeTab === 'requests' ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-light mb-6">Student Requests</h3>
                {studentRequests.length > 0 ? (
                  <div className="space-y-4">
                    {studentRequests.map((request) => (
                      <div key={request.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-white font-light">{request.fullName}</h4>
                            <p className="text-white/60 text-sm">{request.email}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleAcceptStudent(request)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs font-light text-white transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRejectStudent(request)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs font-light text-white transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-white/60">Grade:</span> <span className="text-white">{request.gradeLevel}</span></p>
                          <p><span className="text-white/60">School:</span> <span className="text-white">{request.school}</span></p>
                          <p><span className="text-white/60">Subjects:</span> <span className="text-white">{request.subjects?.join(', ')}</span></p>
                          <p><span className="text-white/60">Learning Style:</span> <span className="text-white">{request.learningStyle}</span></p>
                          {request.learningDisabilities && (
                            <p><span className="text-white/60">Special Needs:</span> <span className="text-white">{request.learningDisabilities}</span></p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 text-center py-8">No pending student requests</p>
                )}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-light mb-6">Your Students</h3>
                {acceptedStudents.length > 0 ? (
                  <div className="space-y-3">
                    {acceptedStudents.map((student) => (
                      <button
                        key={student.id}
                        onClick={() => handleSelectStudent(student)}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          selectedStudent?.id === student.id
                            ? 'bg-white/10 border-white/30'
                            : 'bg-white/5 border-white/10 hover:bg-white/8'
                        }`}
                      >
                        <h4 className="text-white font-light">{student.fullName}</h4>
                        <p className="text-white/60 text-sm">{student.email}</p>
                        <p className="text-white/40 text-xs mt-1">Grade {student.gradeLevel} • {student.school}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 text-center py-8">No students assigned yet</p>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Student Profile and Management */}
          <div className="space-y-6">
            {selectedStudent ? (
              <>
                {/* Student Profile */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-light mb-6">Student Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-light text-lg">{selectedStudent.fullName}</h4>
                      <p className="text-white/60">{selectedStudent.email}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Grade Level:</span>
                        <p className="text-white">{selectedStudent.gradeLevel}</p>
                      </div>
                      <div>
                        <span className="text-white/60">School:</span>
                        <p className="text-white">{selectedStudent.school}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Subjects:</span>
                        <p className="text-white">{selectedStudent.subjects?.join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Learning Style:</span>
                        <p className="text-white">{selectedStudent.learningStyle}</p>
                      </div>
                      {selectedStudent.learningDisabilities && (
                        <div className="col-span-2">
                          <span className="text-white/60">Special Needs:</span>
                          <p className="text-white">{selectedStudent.learningDisabilities}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Create Update */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-light mb-6">Create Update</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Update Type</label>
                      <select
                        value={updateType}
                        onChange={(e) => setUpdateType(e.target.value as any)}
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                      >
                        <option value="note">Note</option>
                        <option value="progress">Progress Update</option>
                        <option value="assignment">Assignment</option>
                        <option value="session_feedback">Session Feedback</option>
                        <option value="goals">Learning Goals</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Title</label>
                      <input
                        type="text"
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                        placeholder="Update title"
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Content</label>
                      <textarea
                        value={updateContent}
                        onChange={(e) => setUpdateContent(e.target.value)}
                        placeholder="Enter update content..."
                        rows={3}
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <button
                      onClick={handleCreateUpdate}
                      className="w-full rounded-lg bg-green-600 hover:bg-green-700 px-4 py-3 text-sm font-light text-white transition-colors"
                    >
                      Create Update
                    </button>
                  </div>
                </div>

                {/* Schedule Session */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-light mb-6">Schedule Session</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Session Title</label>
                        <input
                          type="text"
                          value={sessionTitle}
                          onChange={(e) => setSessionTitle(e.target.value)}
                          placeholder="e.g., Algebra Review"
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Subject</label>
                        <input
                          type="text"
                          value={sessionSubject}
                          onChange={(e) => setSessionSubject(e.target.value)}
                          placeholder="e.g., Mathematics"
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Date</label>
                        <input
                          type="date"
                          value={sessionDate}
                          onChange={(e) => setSessionDate(e.target.value)}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Time</label>
                        <input
                          type="time"
                          value={sessionTime}
                          onChange={(e) => setSessionTime(e.target.value)}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Google Meet Link (Optional)</label>
                      <input
                        type="url"
                        value={googleMeetLink}
                        onChange={(e) => setGoogleMeetLink(e.target.value)}
                        placeholder="https://meet.google.com/..."
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <button
                      onClick={handleCreateSession}
                      className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 px-4 py-3 text-sm font-light text-white transition-colors"
                    >
                      Schedule Session
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                <p className="text-white/60">Select a student to view their profile and manage their learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}