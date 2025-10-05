'use client'
import React, { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';

// Mentor data focused on open source and technology with shorter descriptions
const mentorsData = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    role: 'Principal Engineer, Google',
    image: 'https://placehold.co/600x800/fecaca/000000?text=ER',
    expertise: ['Kubernetes', 'Go', 'Distributed Systems'],
    description: 'Core contributor to Kubernetes, passionate about building scalable and resilient cloud infrastructure.',
  },
  {
    id: 2,
    name: 'Ben Carter',
    role: 'Staff Engineer, Vercel',
    image: 'https://placehold.co/600x800/bfdbfe/000000?text=BC',
    expertise: ['React', 'Next.js', 'Web Performance'],
    description: 'Focuses on front-end performance and has contributed to popular open-source JS frameworks.',
  },
  {
    id: 3,
    name: 'Aisha Khan',
    role: 'AI Researcher, OpenAI',
    image: 'https://placehold.co/600x800/bbf7d0/000000?text=AK',
    expertise: ['Machine Learning', 'Python', 'TensorFlow'],
    description: 'Works on large language models, dedicated to making AI more accessible and ethical for developers.',
  },
  {
    id: 4,
    name: 'Marcus Chen',
    role: 'Principal Designer, Figma',
    image: 'https://placehold.co/600x800/fed7aa/000000?text=MC',
    expertise: ['UI/UX Design', 'Design Systems', 'Accessibility'],
    description: 'Champions accessible design and has helped build design systems for major tech companies.',
  },
  {
    id: 5,
    name: 'Sofia Petrova',
    role: 'PostgreSQL Core Team',
    image: 'https://placehold.co/600x800/e9d5ff/000000?text=SP',
    expertise: ['PostgreSQL', 'Database Architecture', 'SQL'],
    description: 'A PostgreSQL core contributor with deep expertise in database internals and high-performance storage.',
  },
  {
    id: 6,
    name: 'David Lee',
    role: 'Security Engineer, GitHub',
    image: 'https://placehold.co/600x800/e5e7eb/000000?text=DL',
    expertise: ['Cybersecurity', 'DevSecOps', 'OSS Security'],
    description: 'Secures the open-source ecosystem by finding vulnerabilities and building automated security tools.',
  },
];

// --- Refactor: Moved MentorCard outside for better separation of concerns ---
// This is a standalone component and doesn't need to be redefined on every render.
const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl flex flex-col group transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:-translate-y-2 aspect-[4/5] overflow-hidden">
      {/* Image Container (65%) */}
      <div className="flex-[0_0_65%] overflow-hidden">
        <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      {/* Content Container (35%) */}
      <div className="flex-[0_0_35%] p-4 flex flex-col bg-white">
        <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-0.5 truncate">{mentor.name}</h3>
            <p className="text-amber-600 text-sm font-medium mb-2 truncate">{mentor.role}</p>
        </div>
        <p className="text-zinc-600 text-sm mb-3 flex-grow">{mentor.description}</p>
        <button className="w-full mt-auto bg-zinc-900 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2">
          View Profile <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// --- Fix: Ensure the main page is a default export ---
// This is the component Next.js will render for the '/mentors' route.
export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const expertiseFilters = useMemo(() => {
    const allExpertise = mentorsData.flatMap(mentor => mentor.expertise);
    return ['All', ...new Set(allExpertise)];
  }, []);

  const filteredMentors = useMemo(() => mentorsData.filter(mentor => {
    const matchesFilter = activeFilter === 'All' || mentor.expertise.includes(activeFilter);
    const matchesSearch = searchTerm === '' ||
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  }), [searchTerm, activeFilter]);

  return (
    <main className="bg-amber-100 min-h-screen text-zinc-900 font-sans">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl pt-12 md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-900">
            Meet Our World-Class Mentors
          </h1>
          <p className="text-lg md:text-xl text-zinc-700 max-w-3xl mx-auto">
            Connect with industry leaders from top tech companies and open-source projects.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="w-full overflow-hidden mb-8">
          <div className="flex items-center flex-nowrap gap-2 md:gap-4 overflow-x-auto pb-4 -mb-4">
            {expertiseFilters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300 ${
                  activeFilter === filter 
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg' 
                  : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-400'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or expertise (e.g., React, AI)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 bg-white border border-zinc-300 rounded-full focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white/50 rounded-2xl">
              <p className="text-zinc-600 text-xl">No mentors found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-amber-200/50 border-t border-amber-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-zinc-600">
          <p>&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
