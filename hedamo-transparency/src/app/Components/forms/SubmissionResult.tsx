// components/forms/SubmissionResult.tsx
import { AIResponse } from '@/src/types';
import ScoreRadial from '../analytics/ScoreRadial';
import SuggestionList from '../analytics/SuggestionList';
import RiskFlags from '../analytics/RiskFlags';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { CheckCircle } from 'lucide-react';

export default function SubmissionResult({ result }: { result: AIResponse }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-600 mb-2">
          Analysis Complete!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your product has been analyzed for transparency metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Transparency Score
            </h3>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ScoreRadial score={result.score} size={140} />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              {result.explanation}
            </p>
          </CardContent>
        </Card>

        {/* Suggestions */}
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
            <SuggestionList suggestions={result.suggestions} />
          </CardContent>
        </Card>

        {/* Risk Flags */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Risk Assessment
            </h3>
          </CardHeader>
          <CardContent>
            <RiskFlags flags={result.flags} />
          </CardContent>
        </Card>

        {/* Certification Verification Status */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Certification Verification
            </h3>
          </CardHeader>
          <CardContent>
            {result.certifications && result.certifications.length > 0 ? (
              <div className="space-y-2">
                {result.certifications.map((cert, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">{cert.type}</span>
                      {cert.id && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">ID: {cert.id}</span>
                      )}
                    </div>
                    {cert.issuer && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Issuer: {cert.issuer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                Not included certification verification documents.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
