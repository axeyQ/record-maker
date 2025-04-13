import React from 'react';
import { printRecords } from '@/lib/printUtils';

const PrintButton = ({ records, title = 'Transport Records' }) => {
  const handlePrint = () => {
    printRecords(records, title);
  };

  return (
    <button
      onClick={handlePrint}
      className="px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
      disabled={!records || records.length === 0}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 mr-2" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
      </svg>
      Print
    </button>
  );
};

export default PrintButton;