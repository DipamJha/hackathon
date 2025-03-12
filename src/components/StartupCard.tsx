import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Startup } from '../types';

interface StartupCardProps {
  startup: Startup;
  onLike: (id: string) => void;
}

export function StartupCard({ startup, onLike }: StartupCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{startup.title}</h3>
      <p className="text-gray-600 mb-4">{startup.description}</p>
      
      <div className="space-y-2 mb-4">
        <h4 className="font-medium">Pain Points:</h4>
        <ul className="list-disc list-inside space-y-1">
          {startup.painPoints.map((point, index) => (
            <li key={index} className="text-gray-600">{point}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => onLike(startup.id)}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
        >
          <Heart size={20} />
          <span>{startup.likes}</span>
        </button>
        
        <Link
          to={`/startup/${startup.id}`}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Details
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}