// components/forms/ReviewStep.tsx
import Card, { CardHeader, CardContent } from '../ui/Card';
import { FormData } from '@/types';

export default function ReviewStep({ data }: { data: FormData }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Review & Submit</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Review your product information before submission</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Basic Info Review */}
          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Product Name</label>
                <p className="text-sm text-gray-900 dark:text-white">{data.basicInfo?.name || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</label>
                <p className="text-sm text-gray-900 dark:text-white">{data.basicInfo?.category || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
                <p className="text-sm text-gray-900 dark:text-white">{data.basicInfo?.description || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Ingredients Review */}
          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              Ingredients ({data.ingredients?.items?.length || 0})
            </h3>
            {data.ingredients?.items && data.ingredients.items.length > 0 ? (
              <div className="space-y-2">
                {data.ingredients.items.map((ingredient, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">{ingredient.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{ingredient.percentage}%</span>
                    </div>
                    {ingredient.sourcing && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Sourcing: {ingredient.sourcing}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No ingredients added</p>
            )}
          </div>

          {/* Certifications Review */}
          {data.certifications?.items && data.certifications.items.length > 0 ? (
            <div className="space-y-2">
              {data.certifications.items.map((cert, index) => (
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

        </div>
      </CardContent>
    </Card>
  );
}