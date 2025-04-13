import React from 'react';

const ExportButtons = ({ onExport }) => {
  const handleExport = (format) => {
    onExport(format);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleExport('csv')}
        className="px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Export CSV
      </button>
      <button
        onClick={() => handleExport('json')}
        className="px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Export JSON
      </button>
    </div>
  );
};

export default ExportButtons;