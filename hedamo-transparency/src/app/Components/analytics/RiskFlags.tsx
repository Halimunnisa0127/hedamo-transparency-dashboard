// components/analytics/RiskFlags.tsx
import { AlertTriangle } from 'lucide-react';

export default function RiskFlags({ flags }: { flags: string[] }) {
  // If no risk flags, show success message
  if (flags.length === 0) {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">No risk flags detected</span>
      </div>
    );
  }

  // If there are risk flags, show each flag in a red box
  return (
    <div className="space-y-2">
      {flags.map((flag, index) => (
        <div key={index} className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-700 dark:text-red-300">{flag}</span>
        </div>
      ))}
    </div>
  );
}

// Custom check icon for "no risk"
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
