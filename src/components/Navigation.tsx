import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, User, LogIn } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Rocket className="text-blue-600" />
              <span className="font-semibold text-xl">StartupHub</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <User size={20} />
            </Link>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-blue-700"
            >
              <LogIn size={20} />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}