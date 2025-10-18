// app/add-product/page.tsx
import MultiStepForm from '../Components/forms/MultiStepForm';

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold  text-blue-600 dark:text-blue-600">Add Product</h1>
        <p className="text-gray-600 dark:text-gray-400">Submit a new product for transparency analysis</p>
      </div>
        {/* Multi-step form component */}
      <MultiStepForm />
    </div>
  );
}