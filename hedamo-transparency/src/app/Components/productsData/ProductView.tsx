// components/products/ProductView.tsx
'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/src/types';
import ProductTable from './ProductTable';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

interface ProductViewProps {
  products: Product[];
  viewMode?: 'table' | 'grid' | 'list';
}

export default function ProductView({ products, viewMode = 'table' }: ProductViewProps) {
  const [activeView, setActiveView] = useState<'table' | 'grid' | 'list'>(viewMode);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    scoreRange: [0, 100] as [number, number]
  });

  // Get unique categories for filter
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category))).sort();
  }, [products]);

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.status ? product.status === filters.status : true) &&
      (filters.category ? product.category === filters.category : true) &&
      (product.score >= filters.scoreRange[0] && product.score <= filters.scoreRange[1])
    );
  }, [products, filters]);

  const hasActiveFilters = filters.search || filters.status || filters.category || 
                          filters.scoreRange[0] > 0 || filters.scoreRange[1] < 100;

  const clearAllFilters = () => {
    setFilters({
      search: '',
      status: '',
      category: '',
      scoreRange: [0, 100]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with View Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold  text-blue-600 dark:text-blue-600">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product catalog and transparency scores
          </p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {hasActiveFilters && ' (filtered)'}
          </div>
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg p-1 bg-white dark:bg-gray-800">
            {(['table', 'grid', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveView(mode)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeView === mode
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="hidden sm:inline">
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </span>
                <span className="sm:hidden">
                  {mode === 'table' ? '📊' : mode === 'grid' ? '🟦' : '📃'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters 
        filters={filters} 
        onFiltersChange={setFilters}
        categories={categories}
      />

      {/* Products Display */}
      {activeView === 'table' ? (
        <ProductTable products={filteredProducts} />
      ) : (
        <div className={activeView === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              layout={activeView === 'list' ? 'list' : 'grid'}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500">
            <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-lg font-medium mb-2">No products found</p>
            <p className="text-sm mb-4">
              {hasActiveFilters 
                ? "Try adjusting your search or filters" 
                : "Get started by adding your first product"
              }
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                Clear all filters
              </button>
            )}
            {!hasActiveFilters && products.length === 0 && (
              <button
                onClick={() => window.location.href = '/add-product'}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Add Your First Product
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}