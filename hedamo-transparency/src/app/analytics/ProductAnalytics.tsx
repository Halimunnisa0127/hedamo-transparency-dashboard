'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockProducts } from '@/src/data/mockData';
import ScoreRadial from '../Components/analytics/ScoreRadial';
import SuggestionList from '../Components/analytics/SuggestionList';
import RiskFlags from '../Components/analytics/RiskFlags';
import Card, { CardHeader, CardContent } from '../Components/ui/Card';

// Inner component that uses useSearchParams
function AnalyticsContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');

  const product = useMemo(
    () => mockProducts.find(p => p.id === productId) || mockProducts[0],
    [productId]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Score Overview Card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.name} - Score Overview
          </h3>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ScoreRadial score={product.score} size={140} />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            {product.aiAnalysis.explanation}
          </p>
        </CardContent>
      </Card>

      {/* AI Suggestions Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Suggestions
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Recommendations to improve your transparency score
          </p>
        </CardHeader>
        <CardContent>
          <SuggestionList suggestions={product.aiAnalysis.suggestions} />
        </CardContent>
      </Card>

      {/* Risk Assessment Card */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Risk Assessment
          </h3>
        </CardHeader>
        <CardContent>
          <RiskFlags flags={product.aiAnalysis.flags} />
        </CardContent>
      </Card>
    </div>
  );
}

// Main component with Suspense
export default function ProductAnalytics() {
  return (
    <div className="space-y-6 p-6">
      <Suspense fallback={<div className="text-center py-8">Loading analytics...</div>}>
        <AnalyticsContent />
      </Suspense>
    </div>
  );
}