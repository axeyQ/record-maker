'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import TransportRecordsTable from '@/components/TransportRecordsTable';
import SearchFilters from '@/components/SearchFilters';
import Pagination from '@/components/Pagination';
import EnhancedExport from '@/components/EnhancedExport';
import PrintButton from '@/components/PrintButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// This component uses useSearchParams() and needs Suspense
function TransportRecordsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for records and pagination
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  });
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    idType: '',
  });

  // Extract page from URL or default to 1
  const page = parseInt(searchParams.get('page') || '1');

  // Fetch records from API
  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query string with pagination, search, and filters
      let query = `?page=${pagination.page}&limit=${pagination.limit}`;
      
      if (searchTerm) {
        query += `&search=${encodeURIComponent(searchTerm)}`;
      }
      
      if (filters.idType) {
        query += `&idType=${encodeURIComponent(filters.idType)}`;
      }
      
      const response = await fetch(`/api/transport-records${query}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch records');
      }
      
      const data = await response.json();
      setRecords(data.records);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error fetching records:', err);
      setError('Failed to load records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and when dependencies change
  useEffect(() => {
    setPagination(prev => ({ ...prev, page }));
  }, [page]);

  useEffect(() => {
    fetchRecords();
    // We're excluding fetchRecords from dependencies to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, searchTerm, filters]);

  // Handle page change
  const handlePageChange = (newPage) => {
    router.push(`/transport-records?page=${newPage}`);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Reset to first page when searching
    setPagination(prev => ({ ...prev, page: 1 }));
    router.push('/transport-records?page=1');
  };

  // Handle filter change
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    // Reset to first page when filtering
    setPagination(prev => ({ ...prev, page: 1 }));
    router.push('/transport-records?page=1');
  };

  // Handle record deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/transport-records/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
      
      // Refresh records after deletion
      fetchRecords();
    } catch (err) {
      console.error('Error deleting record:', err);
      throw err;
    }
  };

  // Handle export with enhanced options
  const handleExport = (options) => {
    // Create export URL with current filters and options
    let exportUrl = `/api/transport-records/export?format=${options.format}`;
    
    // Add search and filters
    if (searchTerm) {
      exportUrl += `&search=${encodeURIComponent(searchTerm)}`;
    }
    
    if (filters.idType) {
      exportUrl += `&idType=${encodeURIComponent(filters.idType)}`;
    }
    
    // Add system fields option
    exportUrl += `&includeSystemFields=${options.includeSystemFields}`;
    
    // Add date range if enabled
    if (options.dateRange.enabled) {
      if (options.dateRange.startDate) {
        exportUrl += `&startDate=${encodeURIComponent(options.dateRange.startDate)}`;
      }
      if (options.dateRange.endDate) {
        exportUrl += `&endDate=${encodeURIComponent(options.dateRange.endDate)}`;
      }
    }
    
    // Open in new tab or trigger download
    window.open(exportUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Transport Records</h1>
        
        <div className="flex space-x-3">
          <PrintButton records={records} title="Transport Records List" />
          <EnhancedExport onExport={handleExport} />
          <Link 
            href="/transport-records/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Record
          </Link>
        </div>
      </div>
      
      <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          {error}
        </div>
      ) : (
        <>
          <TransportRecordsTable records={records} onDelete={handleDelete} />
          <Pagination 
            currentPage={pagination.page} 
            totalPages={pagination.pages} 
            onPageChange={handlePageChange} 
          />
          
          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {records.length} of {pagination.total} records
          </div>
        </>
      )}
    </div>
  );
}

// Main page component with Suspense boundary
export default function TransportRecordsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto py-6 px-4 flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <TransportRecordsContent />
    </Suspense>
  );
}