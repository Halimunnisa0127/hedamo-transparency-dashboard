'use client';

import { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

// ✅ Define TypeScript interfaces
interface Ingredient {
  name: string;
  percentage: number;
  sourcing: string; // Changed to string to match parent
}

interface IngredientsStepProps {
  data: { ingredients?: { items: Ingredient[] } };
  onChange: (data: { ingredients: { items: Ingredient[] } }) => void;
}

export default function IngredientsStep({ data, onChange }: IngredientsStepProps) {
  // ✅ Safely initialize ingredients array
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    Array.isArray(data.ingredients?.items) ? data.ingredients.items : []
  );

  const handleAddIngredient = () => {
    const newIngredients = [...ingredients, { name: '', percentage: 0, sourcing: '' }];
    setIngredients(newIngredients);
    onChange({ ingredients: { items: newIngredients } });
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    onChange({ ingredients: { items: newIngredients } });
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(newIngredients);
    onChange({ ingredients: { items: newIngredients } });
  };

  // Function to handle percentage input (keep numeric but store as number)
  const handlePercentageInput = (index: number, value: string) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    const formattedValue = parts.length > 2 
      ? parts[0] + '.' + parts.slice(1).join('')
      : numericValue;
    
    handleIngredientChange(index, 'percentage', formattedValue === '' ? '' : Number(formattedValue));
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ingredients</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add product ingredients and sourcing information
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Ingredient {index + 1}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Ingredient Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, 'name', e.target.value)
                    }
                    placeholder="Enter ingredient name"
                  />
                </div>

                {/* Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Percentage *
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={ingredient.percentage}
                    onChange={(e) => handlePercentageInput(index, e.target.value)}
                    onBlur={(e) => {
                      const value = Number(e.target.value);
                      if (value < 0) handleIngredientChange(index, 'percentage', 0);
                      if (value > 100) handleIngredientChange(index, 'percentage', 100);
                    }}
                    placeholder="0-100"
                  />
                </div>

                {/* Sourcing as text input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sourcing *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                    value={ingredient.sourcing}
                    onChange={(e) => handleIngredientChange(index, 'sourcing', e.target.value)}
                    placeholder="e.g., Local, Imported, Organic"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Ingredient Button */}
          <Button
            variant="outline"
            onClick={handleAddIngredient}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Ingredient
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}