'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TransportRecordForm from '@/components/TransportRecordForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Content component with useParams usage
function EditRecordContent() {
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          {error}
          <div className="mt-2">
            <button 
              className="text-blue-500 hover:underline"
              onClick={() => router.push('/transport-records')}
            >
              Return to Records List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Transport Record</h1>
      {record && <TransportRecordForm initialData={record} />}
    </div>
  );
}

// Main page component with Suspense boundary
export default function EditRecordPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto py-8 px-4 flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <EditRecordContent />
    </Suspense>
  );
}