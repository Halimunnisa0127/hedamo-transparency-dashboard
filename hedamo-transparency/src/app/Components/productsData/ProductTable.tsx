// components/products/ProductTable.tsx
'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/src/types';
import SearchFilter from './SearchFilter';
import ActiveFilters from './ActiveFilters';
import ProductRow from './ProductRow';

export default function ProductTable({ products }: { products: Product[] }) {
  const [sortField, setSortField] = useState<keyof Product>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState({ status: '', search: '', category: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Unique categories
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))).sort(), [products]);

  // Filter & sort products
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(filters.search.toLowerCase()) ||
        p.category.toLowerCase().includes(filters.search.toLowerCase())
      )

      .filter(p => (filters.status ? p.status === filters.status : true))
      .filter(p => (filters.category ? p.category === filters.category : true))
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      });
  }, [products, sortField, sortDirection, filters]);

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const clearFilters = () => setFilters({ status: '', search: '', category: '' });
  const hasActiveFilters = filters.search || filters.status || filters.category;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4">
        <SearchFilter
          search={filters.search}
          setSearch={(value: string) => setFilters(prev => ({ ...prev, search: value }))}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasActiveFilters={!!(filters.search || filters.status || filters.category)}
          clearFilters={clearFilters}
        />

        {(showFilters || hasActiveFilters) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.status}
                onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="needs_attention">Needs Attention</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.category}
                onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {hasActiveFilters && <ActiveFilters filters={filters} setFilters={setFilters} />}
      </div>

      {/* Results Count */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredAndSortedProducts.length} of {products.length} products
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {['name', 'category', 'score', 'status', 'lastUpdated'].map(field => (
                <th
                  key={field}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${field !== 'status' ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group' : ''}`}
                  onClick={field !== 'status' ? () => handleSort(field as keyof Product) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {field === 'name' && 'Product'}
                    {field === 'category' && 'Category'}
                    {field === 'score' && 'Score'}
                    {field === 'status' && 'Status'}
                    {field === 'lastUpdated' && 'Last Updated'}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map(product => (
                <ProductRow key={product.id} product={product} searchQuery={filters.search} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 dark:text-gray-500">
                  <p className="text-lg font-medium mb-2">No products found</p>
                  <p className="text-sm mb-4">Try adjusting your search or filters</p>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
                      Clear all filters
                    </button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
