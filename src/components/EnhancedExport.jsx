import React, { useState } from 'react';

const EnhancedExport = ({ onExport }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    format: 'csv',
    includeSystemFields: true,
    dateRange: {
      enabled: false,
      startDate: '',
      endDate: ''
    }
  });

  const handleExport = () => {
    onExport(exportOptions);
    setShowOptions(false);
  };

  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('dateRange.')) {
      // Handle nested dateRange properties
      const dateRangeProp = name.split('.')[1];
      setExportOptions(prev => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          [dateRangeProp]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      // Handle top-level properties
      setExportOptions(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Export Data
      </button>
      
      {showOptions && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-3">Export Options</h3>
            
            {/* Format Selection */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <div className="flex">
                <label className="mr-4 flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={exportOptions.format === 'csv'}
                    onChange={handleOptionChange}
                    className="mr-1"
                  />
                  <span className="text-sm">CSV</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="json"
                    checked={exportOptions.format === 'json'}
                    onChange={handleOptionChange}
                    className="mr-1"
                  />
                  <span className="text-sm">JSON</span>
                </label>
              </div>
            </div>
            
            {/* Include System Fields */}
            <div className="mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="includeSystemFields"
                  checked={exportOptions.includeSystemFields}
                  onChange={handleOptionChange}
                  className="mr-1"
                />
                <span className="text-sm">Include System Fields</span>
              </label>
            </div>
            
            {/* Date Range Filter */}
            <div className="mb-3">
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  name="dateRange.enabled"
                  checked={exportOptions.dateRange.enabled}
                  onChange={handleOptionChange}
                  className="mr-1"
                />
                <span className="text-sm">Filter by Pickup Date</span>
              </label>
              
              {exportOptions.dateRange.enabled && (
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="dateRange.startDate"
                      value={exportOptions.dateRange.startDate}
                      onChange={handleOptionChange}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="dateRange.endDate"
                      value={exportOptions.dateRange.endDate}
                      onChange={handleOptionChange}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowOptions(false)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedExport;