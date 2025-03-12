import React, { useState } from 'react';
import { StartupCard } from '../components/StartupCard';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Startup } from '../types';

const MOCK_STARTUPS: Startup[] = [
  {
    id: '1',
    title: 'AI-Powered Learning Platform',
    description: 'Personalized education platform that adapts to individual learning styles',
    painPoints: [
      'Traditional education is one-size-fits-all',
      'Students struggle to stay engaged',
      'Difficulty tracking progress effectively'
    ],
    likes: 42,
    userId: '1',
    createdAt: new Date().toISOString()
  }
];

export function HomePage() {
  const [startups, setStartups] = useState(MOCK_STARTUPS);

  const handleLike = (id: string) => {
    setStartups(prev =>
      prev.map(startup =>
        startup.id === id
          ? { ...startup, likes: startup.likes + 1 }
          : startup
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-custom-blue">Trending Startups</h1>
        <Link to="/startup/new" className="bg-gradient-to-r from-custom-green to-custom-blue text-white px-4 py-2 rounded-md flex items-center gap-2 hover:from-green-600 hover:to-blue-700 transition-colors duration-300">
          <PlusCircle size={20} />
          Add Startup
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map(startup => (
          <StartupCard key={startup.id} startup={startup} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}
