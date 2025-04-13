'use client';

import React from 'react';
import TransportRecordForm from '@/components/TransportRecordForm';

export default function CreateRecordPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Transport Record</h1>
      <TransportRecordForm />
    </div>
  );
}