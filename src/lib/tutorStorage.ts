// Tutor-specific data storage system
// Each tutor account has its own isolated data storage

export interface TutorProgress {
  username: string;
  studentsAssigned: string[];
  sessionsCompleted: number;
  hoursTutored: number;
  subjectsTaught: string[];
  rating: number;
  notes: string;
  lastLogin: string;
  profile: {
    fullName: string;
    email: string;
    subjects: string[];
    experience: string;
    bio: string;
  };
  schedule: {
    [key: string]: {
      time: string;
      student: string;
      subject: string;
      status: 'scheduled' | 'completed' | 'cancelled';
    };
  };
}

const TUTOR_CREDENTIALS = [
  'student_alpha01',
  'learner_beta22', 
  'math_master33',
  'user_delta44',
  'science_star55',
  'reader_gamma66',
  'tutor_test77',
  'trial_user88',
  'study_hero99',
  'newstudent100'
];

// Get storage key for specific tutor
function getTutorStorageKey(username: string): string {
  return `tutor_data_${username}`;
}

// Get default tutor data
function getDefaultTutorData(username: string): TutorProgress {
  return {
    username,
    studentsAssigned: [],
    sessionsCompleted: 0,
    hoursTutored: 0,
    subjectsTaught: [],
    rating: 0,
    notes: '',
    lastLogin: new Date().toISOString(),
    profile: {
      fullName: username.replace(/_/g, ' ').replace(/\d+/g, '').trim(),
      email: `${username}@tutoringco.com`,
      subjects: [],
      experience: 'New tutor',
      bio: `Welcome ${username}! Complete your profile to get started.`
    },
    schedule: {}
  };
}

// Load tutor data from localStorage
export function loadTutorData(username: string): TutorProgress {
  if (!TUTOR_CREDENTIALS.includes(username)) {
    throw new Error('Invalid tutor username');
  }

  const storageKey = getTutorStorageKey(username);
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    try {
      const data = JSON.parse(storedData) as TutorProgress;
      // Update last login
      data.lastLogin = new Date().toISOString();
      saveTutorData(data);
      return data;
    } catch (error) {
      console.error('Error loading tutor data:', error);
    }
  }
  
  // Return default data if no stored data exists
  const defaultData = getDefaultTutorData(username);
  saveTutorData(defaultData);
  return defaultData;
}

// Save tutor data to localStorage
export function saveTutorData(data: TutorProgress): void {
  if (!TUTOR_CREDENTIALS.includes(data.username)) {
    throw new Error('Invalid tutor username');
  }

  const storageKey = getTutorStorageKey(data.username);
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving tutor data:', error);
  }
}

// Update specific fields in tutor data
export function updateTutorData(username: string, updates: Partial<TutorProgress>): TutorProgress {
  const currentData = loadTutorData(username);
  const updatedData = { ...currentData, ...updates };
  saveTutorData(updatedData);
  return updatedData;
}

// Add a student assignment
export function assignStudent(username: string, studentName: string): TutorProgress {
  const currentData = loadTutorData(username);
  if (!currentData.studentsAssigned.includes(studentName)) {
    currentData.studentsAssigned.push(studentName);
  }
  return updateTutorData(username, { studentsAssigned: currentData.studentsAssigned });
}

// Complete a session
export function completeSession(username: string, hours: number = 1): TutorProgress {
  const currentData = loadTutorData(username);
  return updateTutorData(username, {
    sessionsCompleted: currentData.sessionsCompleted + 1,
    hoursTutored: currentData.hoursTutored + hours
  });
}

// Update tutor profile
export function updateTutorProfile(username: string, profileUpdates: Partial<TutorProgress['profile']>): TutorProgress {
  const currentData = loadTutorData(username);
  const updatedProfile = { ...currentData.profile, ...profileUpdates };
  return updateTutorData(username, { profile: updatedProfile });
}

// Schedule a session
export function scheduleSession(username: string, date: string, time: string, student: string, subject: string): TutorProgress {
  const currentData = loadTutorData(username);
  const scheduleKey = `${date}_${time}`;
  currentData.schedule[scheduleKey] = {
    time,
    student,
    subject,
    status: 'scheduled'
  };
  return updateTutorData(username, { schedule: currentData.schedule });
}

// Get all tutors data (for admin purposes)
export function getAllTutorsData(): { [username: string]: TutorProgress } {
  const allData: { [username: string]: TutorProgress } = {};
  
  TUTOR_CREDENTIALS.forEach(username => {
    try {
      allData[username] = loadTutorData(username);
    } catch (error) {
      console.error(`Error loading data for ${username}:`, error);
    }
  });
  
  return allData;
}

