'use client';
import { useState, useEffect } from 'react';
import ProductAnalytics from './ProductAnalytics';

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-600">
          Product Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed transparency analysis and insights
        </p>
      </div>
      <ProductAnalytics />
    </div>
  );
}
