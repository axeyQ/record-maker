'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { printRecords } from '@/lib/printUtils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Content component with useParams usage
function RecordDetailContent() {
  const params = useParams();
  const router = useRouter();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`/api/transport-records/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch record');
        }
        
        const data = await response.json();
        setRecord(data);
      } catch (err) {
        console.error('Error fetching record:', err);
        setError('Failed to load the record. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRecord();
    }
  }, [params.id]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Format ID type for display
  const formatIdType = (idType) => {
    return idType === 'AADHAR_CARD' ? 'Aadhar Card' : 'Driving License';
  };

  // Handle record deletion with confirmation
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/transport-records/${params.id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete record');
        }
        
        alert('Record deleted successfully');
        router.push('/transport-records');
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Failed to delete record. Please try again.');
      }
    }
  };
  
  // Handle printing a single record
  const handlePrint = () => {
    if (record) {
      printRecords([record], `Transport Record #${record.id}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          {error || 'Record not found'}
          <div className="mt-2">
            <Link 
              href="/transport-records"
              className="text-blue-500 hover:underline"
            >
              Return to Records List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Transport Record Details</h1>
          <div className="flex space-x-2">
            <Link
              href="/transport-records"
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Back to List
            </Link>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h2>
              <div className="border rounded-md overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b">
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-base text-gray-900">{record.name}</p>
                </div>
                <div className="px-4 py-3 bg-white border-b">
                  <p className="text-sm font-medium text-gray-500">Mobile Number</p>
                  <p className="text-base text-gray-900">{record.mobileNumber}</p>
                </div>
                <div className="px-4 py-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-500">ID Information</p>
                  <p className="text-base text-gray-900">{formatIdType(record.idType)}</p>
                  <p className="text-sm text-gray-600">{record.idNumber}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Trip Details</h2>
              <div className="border rounded-md overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b">
                  <p className="text-sm font-medium text-gray-500">Vehicle Number</p>
                  <p className="text-base text-gray-900">{record.vehicleNumber}</p>
                </div>
                <div className="px-4 py-3 bg-white border-b">
                  <p className="text-sm font-medium text-gray-500">Pickup Date/Time</p>
                  <p className="text-base text-gray-900">{formatDate(record.pickupDateTime)}</p>
                </div>
                <div className="px-4 py-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-500">Amount Paid</p>
                  <p className="text-base text-gray-900">₹{record.amountPaid}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">System Information</h2>
            <div className="border rounded-md overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <p className="text-sm font-medium text-gray-500">Record ID</p>
                <p className="text-base text-gray-900">{record.id}</p>
              </div>
              <div className="px-4 py-3 bg-white border-b">
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="text-base text-gray-900">{formatDate(record.createdAt)}</p>
              </div>
              <div className="px-4 py-3 bg-gray-50">
                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                <p className="text-base text-gray-900">{formatDate(record.updatedAt)}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
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
            <Link
              href={`/transport-records/${record.id}/edit`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Edit Record
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function RecordDetailPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto py-8 px-4 flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <RecordDetailContent />
    </Suspense>
  );
}