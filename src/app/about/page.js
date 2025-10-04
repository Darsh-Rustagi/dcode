import React from 'react';
import { Target, Users, Code, GitBranch, MessageSquare, BarChart, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-amber-100 min-h-screen text-zinc-900 font-sans pt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-900">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-zinc-700 max-w-3xl mx-auto">
            Our vision is to make open source truly open for everyone. We're building a collaborative ecosystem where every learner can become a mentor, and every mentor keeps learning.
          </p>
        </div>

        {/* What We Do Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">The Peer-Driven Path to Contribution</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/80 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-200 p-4 rounded-full border border-amber-300/50">
                  <Target className="text-amber-800" size={28} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Your First Step</h3>
              <p className="text-zinc-700">Discover beginner-friendly issues and projects tailored to your skills.</p>
            </div>
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/80 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-200 p-4 rounded-full border border-amber-300/50">
                  <Code className="text-amber-800" size={28} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Decipher the Code</h3>
              <p className="text-zinc-700">Understand complex, real-world repositories with expert guidance.</p>
            </div>
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/80 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-200 p-4 rounded-full border border-amber-300/50">
                  <GitBranch className="text-amber-800" size={28} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contribute with Confidence</h3>
              <p className="text-zinc-700">Get practical code reviews, feedback, and support from a thriving community.</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Steps, Maximum Growth</h2>
          <div className="grid md:grid-cols-4 gap-4 md:gap-8">
              {/* Step 1 */}
              <div className="text-center p-4">
                  <div className="relative mb-4">
                      <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full text-lg text-white flex items-center justify-center font-bold">1</div>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">Define Your Journey</h3>
                  <p className="text-sm text-zinc-700 mt-1">Share your skills and goals, whether you want to learn, teach, or both.</p>
              </div>
              {/* Step 2 */}
              <div className="text-center p-4">
                  <div className="relative mb-4">
                      <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full text-lg text-white flex items-center justify-center font-bold">2</div>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">Get Matched Smartly</h3>
                  <p className="text-sm text-zinc-700 mt-1">Our algorithm connects you based on shared goals, skills, and needs.</p>
              </div>
              {/* Step 3 */}
              <div className="text-center p-4">
                  <div className="relative mb-4">
                      <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full text-lg text-white flex items-center justify-center font-bold">3</div>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">Connect & Collaborate</h3>
                  <p className="text-sm text-zinc-700 mt-1">Use real-time chat, group sessions, and one-on-one calls.</p>
              </div>
              {/* Step 4 */}
              <div className="text-center p-4">
                   <div className="relative mb-4">
                       <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full text-lg text-white flex items-center justify-center font-bold">4</div>
                   </div>
                  <h3 className="text-lg font-semibold mt-4">Grow Together</h3>
                  <p className="text-sm text-zinc-700 mt-1">Track progress, exchange feedback, and transition from mentee to mentor.</p>
              </div>
          </div>
        </div>
        
        {/* The Mentora Difference */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Why We're Unique</h2>
          <div className="overflow-x-auto bg-white/80 rounded-2xl border border-zinc-200/80 shadow-md">
            <table className="w-full text-left">
              <thead className="border-b border-zinc-300">
                <tr>
                  <th className="p-4 md:p-6 text-sm font-semibold text-zinc-900">Feature</th>
                  <th className="p-4 md:p-6 text-sm font-semibold text-zinc-900">Description</th>
                  <th className="p-4 md:p-6 text-sm font-semibold text-zinc-900">Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200">
                  <td className="p-4 md:p-6 font-semibold">Two-way Mentorship</td>
                  <td className="p-4 md:p-6 text-zinc-700">Everyone can be a mentor and a mentee—knowledge is a continuous flow.</td>
                  <td className="p-4 md:p-6 text-zinc-800">Scalable and sustainable growth model.</td>
                </tr>
                 <tr className="border-b border-zinc-200">
                  <td className="p-4 md:p-6 font-semibold">Smart Matching</td>
                  <td className="p-4 md:p-6 text-zinc-700">Connects people based on specialties, goals, and learning styles.</td>
                  <td className="p-4 md:p-6 text-zinc-800">Higher quality and more relevant relationships.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-semibold">Built-in Collaboration</td>
                  <td className="p-4 md:p-6 text-zinc-700">Integrated real-time chat, notifications, and scheduling features.</td>
                  <td className="p-4 md:p-6 text-zinc-800">Makes mentorship seamless and immediately actionable.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Our Belief */}
        <div className="text-center">
          <div className="bg-white/80 inline-block p-8 rounded-2xl border border-zinc-200/80 shadow-lg">
              <Heart className="text-amber-600 mx-auto mb-4" size={32} fill="currentColor" />
              <p className="text-2xl italic text-zinc-800 max-w-2xl mx-auto">
                  "Teach something. Learn something. Grow together."
              </p>
          </div>
        </div>

      </div>
    </main>
  );
}