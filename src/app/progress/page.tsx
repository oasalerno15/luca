'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProgressPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-light tracking-tight">
            Tutoring Co.
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
      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-extralight mb-8">Learning Progress</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Progress Overview */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-light mb-6">Overall Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Mathematics</span>
                  <span className="text-white">75%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Physics</span>
                  <span className="text-white">60%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Calculus</span>
                  <span className="text-white">45%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-light mb-6">Recent Sessions</h2>
            <div className="space-y-4">
              <div className="text-white/60 text-sm">
                <p>No recent sessions</p>
                <p className="text-xs mt-2">Start scheduling sessions to track your progress!</p>
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-light mb-6">Learning Goals</h2>
            <div className="space-y-4">
              <div className="text-white/60 text-sm">
                <p>No goals set yet</p>
                <p className="text-xs mt-2">Set learning goals to stay motivated!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Progress */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <h2 className="text-xl font-light mb-6">Detailed Progress Tracking</h2>
          <p className="text-white/60 mb-8">
            This feature is coming soon! You'll be able to view detailed progress reports, session history, and learning analytics here.
          </p>
          
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-light text-white mb-2">Available Features (Coming Soon)</h3>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Session history and notes</li>
                <li>• Performance analytics</li>
                <li>• Learning milestones</li>
                <li>• Goal setting and tracking</li>
                <li>• Progress reports</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
