'use client';

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-lg max-w-lg">
            <h2 className="text-xl font-bold mb-3">Something went wrong</h2>
            <p className="mb-4">
              We're sorry, but we encountered an error while processing your request.
            </p>
            <details className="bg-white p-3 rounded border border-red-100 mb-4">
              <summary className="cursor-pointer font-medium">Technical Details</summary>
              <p className="mt-2 text-sm font-mono whitespace-pre-wrap overflow-auto max-h-60">
                {this.state.error && (this.state.error.toString())}
              </p>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;