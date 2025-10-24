'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductTable from './Components/productsData/ProductTable';
import Card, { CardHeader, CardContent } from './Components/ui/Card';
import { Product } from '@/src/types';
import { mockProducts } from '../data/mockData'; // Keep mockProducts

// SVG icons
const PackageIcon = () => (
  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

export default function Dashboard() {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  // Load new products from localStorage
  useEffect(() => {
    const savedProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    setNewProducts(savedProducts);
  }, []);

  // Combine mock + new products
  const products = useMemo(() => [...mockProducts, ...newProducts], [newProducts]);

  const averageScore = products.length
    ? Math.round(products.reduce((acc, p) => acc + p.score, 0) / products.length)
    : 0;

  const publishedCount = products.filter(p => p.status === 'published').length;
  const attentionCount = products.filter(p => p.status === 'needs_attention').length;

  const recentProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, 5);
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-600">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your product transparency dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center">
            <PackageIcon />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center">
            <TrendingUpIcon />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{averageScore}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center">
            <AlertTriangleIcon />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Needs Attention</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{attentionCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Products</h2>
        </CardHeader>
        <CardContent>
          <ProductTable products={recentProducts} />
        </CardContent>
      </Card>
    </div>
  );
}
