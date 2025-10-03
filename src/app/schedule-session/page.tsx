'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ScheduleSessionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-light tracking-tight">
            The Integrator Project
          </Link>
          <div className="flex items-center space-x-8">
            <Link 
              href="/dashboard/student" 
              className="text-white/80 hover:text-white transition-colors font-light"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-extralight mb-8">Schedule Session</h1>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <h2 className="text-xl font-light mb-6">Book a Tutoring Session</h2>
          <p className="text-white/60 mb-8">
            This feature is coming soon! You'll be able to schedule sessions with your assigned tutor here.
          </p>
          
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-light text-white mb-2">Available Features (Coming Soon)</h3>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• View tutor availability</li>
                <li>• Select preferred time slots</li>
                <li>• Choose subject/topic for session</li>
                <li>• Add session notes or goals</li>
                <li>• Receive confirmation emails</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
