import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Transport Records Digitalization',
  description: 'A system for digitalizing transport records',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}