import React, { useState } from 'react';

const SearchFilters = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    idType: '',
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      onSearch(''); // Clear search if the search box is emptied
    }
  };

  const idTypeOptions = [
    { value: '', label: 'All ID Types' },
    { value: 'AADHAR_CARD', label: 'Aadhar Card' },
    { value: 'DRIVING_LICENSE', label: 'Driving License' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {/* Search box */}
        <div className="flex-1">
          <form onSubmit={handleSearchSubmit}>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="flex">
              <input
                type="text"
                id="search"
                placeholder="Search by name, ID, or vehicle number"
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        
        {/* ID Type filter */}
        <div className="md:w-64">
          <label htmlFor="idType" className="block text-sm font-medium text-gray-700 mb-1">
            ID Type
          </label>
          <select
            id="idType"
            name="idType"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.idType}
            onChange={handleFilterChange}
          >
            {idTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;