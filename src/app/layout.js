import './globals.css';
import Navigation from '@/components/Navigation';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata = {
  title: 'Transport Records Digitalization',
  description: 'A system for digitalizing transport records',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navigation />
        <ErrorBoundary>
          <main>{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}