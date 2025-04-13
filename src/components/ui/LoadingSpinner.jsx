import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-t-2 border-b-2',
    xl: 'h-16 w-16 border-t-2 border-b-2'
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizeClass} animate-spin rounded-full border-blue-500`}></div>
    </div>
  );
};

export default LoadingSpinner;