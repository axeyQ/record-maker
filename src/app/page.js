import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 bg-gray-50">
      <div className="max-w-4xl w-full px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Transport Records Digitalization
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Digitize and manage your transport records efficiently
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/transport-records/create" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Record
            </Link>
            <Link 
              href="/transport-records" 
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              View All Records
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Easy Data Entry</h2>
            <p className="text-gray-600">
              Our intuitive form makes it simple to digitize your old transport records quickly and accurately.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Search & Filter</h2>
            <p className="text-gray-600">
              Find records easily with powerful search and filtering capabilities.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Export Options</h2>
            <p className="text-gray-600">
              Export your data in CSV or JSON format for use in other applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}