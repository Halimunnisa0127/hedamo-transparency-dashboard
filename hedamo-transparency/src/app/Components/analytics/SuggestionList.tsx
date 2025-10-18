// components/analytics/SuggestionList.tsx
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function SuggestionList({ suggestions }: { suggestions: string[] }) {
  // Choose icon and color based on index
  const getSuggestionIcon = (index: number) => {
    const icons = [CheckCircle, AlertCircle, Info];
    const Icon = icons[index % icons.length]; // cycle through icons
    const colors = ['text-green-600', 'text-amber-600', 'text-blue-600'];
    return <Icon className={`w-5 h-5 ${colors[index % colors.length]}`} />;
  };

  return (
    <div className="space-y-3">
      {/* Show each suggestion with icon */}
      {suggestions.map((suggestion, index) => (
        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {getSuggestionIcon(index)}
          <span className="text-sm text-gray-700 dark:text-gray-200">{suggestion}</span>
        </div>
      ))}
    </div>
  );
}
