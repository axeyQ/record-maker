import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TransportRecordsTable = ({ records, onDelete }) => {
  const router = useRouter();
  
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
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Failed to delete record. Please try again.');
      }
    }
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No records found</p>
        <Link href="/transport-records/create" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add New Record
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Desktop and tablet view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Info
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{record.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.mobileNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatIdType(record.idType)}</div>
                  <div className="text-xs text-gray-500">{record.idNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.vehicleNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(record.pickupDateTime)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{record.amountPaid}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link 
                      href={`/transport-records/${record.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                    <Link 
                      href={`/transport-records/${record.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile view - Card layout */}
      <div className="md:hidden">
        {records.map((record) => (
          <div key={record.id} className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{record.name}</h3>
                <p className="text-sm text-gray-500">{record.mobileNumber}</p>
              </div>
              <div className="text-sm font-medium text-gray-900">₹{record.amountPaid}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase">ID Info</div>
                <div className="text-sm">{formatIdType(record.idType)}</div>
                <div className="text-xs text-gray-500">{record.idNumber}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase">Vehicle</div>
                <div className="text-sm">{record.vehicleNumber}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs font-medium text-gray-500 uppercase">Pickup Time</div>
                <div className="text-sm">{formatDate(record.pickupDateTime)}</div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-2">
              <Link 
                href={`/transport-records/${record.id}`}
                className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600"
              >
                View
              </Link>
              <Link 
                href={`/transport-records/${record.id}/edit`}
                className="px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(record.id)}
                className="px-2 py-1 text-xs rounded bg-red-100 text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportRecordsTable;