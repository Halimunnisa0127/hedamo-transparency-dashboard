// app/products/page.tsx
import ProductView from '../Components/products/ProductView';
import { mockProducts } from '@/src/data/mockData';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <ProductView products={mockProducts} viewMode="table" />
    </div>
  );
}