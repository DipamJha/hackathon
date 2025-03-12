import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, User, LogIn } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-custom-blue to-custom-purple shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-white">
              <Rocket className="text-white" />
              <span className="font-semibold text-xl">StartupHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link to="/profile" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
              <User size={20} />
            </Link>
            <Link to="/login" className="bg-custom-green text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-green-700">
              <LogIn size={20} />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
