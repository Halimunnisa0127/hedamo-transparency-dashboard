// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductView from '../Components/productsData/ProductView';
import { Product } from '@/src/types';
import { mockProducts } from '@/src/data/mockData';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get new products from localStorage
    const savedProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');

    // Merge mockProducts with savedProducts
    const mergedProducts = [...mockProducts, ...savedProducts];

    setProducts(mergedProducts);
  }, []);

  return (
    <div className="space-y-6">
      <ProductView products={products} viewMode="table" />
    </div>
  );
}
