// components/products/ActiveFilters.tsx
'use client';

interface ActiveFiltersProps {
  filters: { search: string; status: string; category: string };
  setFilters: (filters: any) => void;
}

export default function ActiveFilters({ filters, setFilters }: ActiveFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.search && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          Search: "{filters.search}"
          <button onClick={() => setFilters((prev: any) => ({ ...prev, search: '' }))} className="ml-2 w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
            ×
          </button>
        </span>
      )}
      {filters.status && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          Status: {filters.status}
          <button onClick={() => setFilters((prev: any) => ({ ...prev, status: '' }))} className="ml-2 w-4 h-4 flex items-center justify-center rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
            ×
          </button>
        </span>
      )}
      {filters.category && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
          Category: {filters.category}
          <button onClick={() => setFilters((prev: any) => ({ ...prev, category: '' }))} className="ml-2 w-4 h-4 flex items-center justify-center rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
            ×
          </button>
        </span>
      )}
    </div>
  );
}
