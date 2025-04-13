import React from 'react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">Transport Records</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/transport-records" className="px-3 py-2 rounded-md hover:bg-gray-700">
              View Records
            </Link>
            <Link href="/transport-records/create" className="px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
              Add New Record
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;