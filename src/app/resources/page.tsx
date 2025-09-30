'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResourcesPage() {
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
        <h1 className="text-4xl font-extralight mb-8">Study Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Mathematics Resources */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-light mb-6">Mathematics</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="font-light text-white mb-2">Algebra Basics</h3>
                <p className="text-white/60 text-sm mb-3">Fundamental concepts and practice problems</p>
                <button className="text-white/80 hover:text-white text-sm transition-colors">
                  View Resources →
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="font-light text-white mb-2">Calculus I</h3>
                <p className="text-white/60 text-sm mb-3">Limits, derivatives, and integrals</p>
                <button className="text-white/80 hover:text-white text-sm transition-colors">
                  View Resources →
                </button>
              </div>
            </div>
          </div>

          {/* Physics Resources */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-light mb-6">Physics</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="font-light text-white mb-2">Mechanics</h3>
                <p className="text-white/60 text-sm mb-3">Kinematics, dynamics, and energy</p>
                <button className="text-white/80 hover:text-white text-sm transition-colors">
                  View Resources →
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="font-light text-white mb-2">Electricity & Magnetism</h3>
                <p className="text-white/60 text-sm mb-3">Electric fields, circuits, and magnetism</p>
                <button className="text-white/80 hover:text-white text-sm transition-colors">
                  View Resources →
                </button>
              </div>
            </div>
          </div>

          {/* Study Tools */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-light mb-6">Study Tools</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="font-light text-white mb-2">Practice Tests</h3>
                <p className="text-white/60 text-sm mb-3">Test your knowledge with practice exams</p>
                <button className="text-white/80 hover:text-white text-sm transition-colors">
                  Take Test →
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="font-light text-white mb-2">Study Planner</h3>
                <p className="text-white/60 text-sm mb-3">Organize your study schedule</p>
                <button className="text-white/80 hover:text-white text-sm transition-colors">
                  Plan Study →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <h2 className="text-xl font-light mb-6">Additional Resources</h2>
          <p className="text-white/60 mb-8">
            This feature is coming soon! You'll have access to a comprehensive library of study materials, practice problems, and interactive tools.
          </p>
          
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-light text-white mb-2">Available Features (Coming Soon)</h3>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Interactive video lessons</li>
                <li>• Practice problem sets</li>
                <li>• Study guides and cheat sheets</li>
                <li>• Online calculators and tools</li>
                <li>• Collaborative study groups</li>
                <li>• Progress tracking and analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
