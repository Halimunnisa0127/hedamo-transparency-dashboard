// components/forms/BasicInfoStep.tsx
"use client";

import { useState, useEffect } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';

interface BasicInfoStepProps {
  data: any;
  onChange: (data: any) => void;
  errors?: any;
}

export default function BasicInfoStep({ data, onChange, errors }: BasicInfoStepProps) {
  // Local state for form data
  const [formData, setFormData] = useState(data.basicInfo || {
    name: '',
    category: '',
    description: ''
  });

  // Local state for errors
  const [localErrors, setLocalErrors] = useState({
    name: '',
    category: '',
    description: ''
  });

  // Update local errors if parent passes errors
  useEffect(() => {
    if (errors?.basicInfo) {
      setLocalErrors(errors.basicInfo);
    }
  }, [errors]);

  // Handle field changes
  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    // Clear error for this field if it exists
    if (localErrors[field as keyof typeof localErrors]) {
      setLocalErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Pass updated data to parent
    onChange({ basicInfo: newData });
  };

  // Validate single field
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Product name is required';
        if (!/^[a-zA-Z\s]+$/.test(value))
          return 'Product name can only contain letters';
        return '';
      case 'category':
        if (!value.trim()) return 'Category is required';
        return '';
      case 'description':
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount < 20) return 'Description must be at least 20 words';
        return '';
      default:
        return '';
    }
  };

  // Handle blur event to validate field
  const handleBlur = (field: string, value: string) => {
    const error = validateField(field, value);
    setLocalErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <Card>
      <CardHeader>
        {/* Section title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Basic Information
        </h2>
        {/* Section description */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Provide basic details about your product
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Product Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              required
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${localErrors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                }`}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={(e) => handleBlur('name', e.target.value)}
              placeholder="Enter product name"
            />
            {/* Show error if exists */}
            {localErrors.name && (
              <p className="mt-1 text-sm text-red-600">{localErrors.name}</p>
            )}
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category *
            </label>
            <select
              required
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${localErrors.category
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                }`}
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              onBlur={(e) => handleBlur('category', e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Beverages">Beverages</option>
              <option value="Skincare">Skincare</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Food">Food</option>
              <option value="Stationery">Stationery</option>
            </select>
            {/* Show error if exists */}
            {localErrors.category && (
              <p className="mt-1 text-sm text-red-600">{localErrors.category}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${localErrors.description
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                }`}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              onBlur={(e) => handleBlur('description', e.target.value)}
              placeholder="Describe your product (at least 20 words)..."
            />
            {/* Show error if exists */}
            {localErrors.description && (
              <p className="mt-1 text-sm text-red-600">{localErrors.description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
