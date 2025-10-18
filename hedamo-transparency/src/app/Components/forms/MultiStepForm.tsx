'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasicInfoStep from './BasicInfoStep';
import IngredientsStep from './IngredientsStep';
import CertificationsStep from './CertificationsStep';
import ReviewStep from './ReviewStep';
import SubmissionResult from './SubmissionResult';
import { FormData, AIResponse } from '@/src/types';
import Button from '../ui/Button';

interface Ingredient {
  name: string;
  percentage: number;
  sourcing: string;
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [submissionResult, setSubmissionResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const certRef = useRef<{ validate: () => boolean }>(null);

  const steps = [
    { component: BasicInfoStep, title: 'Basic Info' },
    { component: IngredientsStep, title: 'Ingredients' },
    { component: CertificationsStep, title: 'Certifications' },
    { component: ReviewStep, title: 'Review' },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const validateStep = (): boolean => {
    setError(null);

    if (currentStep === 0) {
      const basic = formData.basicInfo;
      if (!basic?.name?.trim()) {
        setError('Product name is required.');
        return false;
      }
      if (!basic?.category?.trim()) {
        setError('Category is required.');
        return false;
      }
    }

    if (currentStep === 1) {
      const ingredients: Ingredient[] = formData.ingredients?.items || [];
      if (ingredients.length === 0) {
        setError('Please add at least one ingredient.');
        return false;
      }
      for (let i = 0; i < ingredients.length; i++) {
        const item = ingredients[i];
        if (!String(item.name || '').trim()) {
          setError(`Ingredient ${i + 1}: Name is required.`);
          return false;
        }
        if (item.percentage === undefined || item.percentage < 0) {
          setError(`Ingredient ${i + 1}: Percentage must be a positive number.`);
          return false;
        }
        if (!String(item.sourcing || '').trim()) {
          setError(`Ingredient ${i + 1}: Sourcing is required.`);
          return false;
        }
      }
    }

    if (currentStep === 2) {
      const isValid = certRef.current?.validate();
      if (!isValid) {
        setError('Please add certification or click Skip.');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setError(null);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSkipCert = () => {
    setError(null);
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const mockAIResponse: AIResponse = {
      productName: formData.basicInfo?.name || 'Unknown Product',
      score: Math.floor(Math.random() * 40) + 60,
      explanation:
        'Good baseline transparency. Consider adding more detailed sourcing information.',
      suggestions: [
        'Add sourcing details for primary ingredients',
        'Include certification verification documents',
        'Specify manufacturing location transparency',
      ],
      flags: formData.basicInfo?.name?.toLowerCase().includes('organic')
        ? ['Unverified organic claim']
        : [],
    };

    setSubmissionResult(mockAIResponse);
  };

  if (submissionResult) {
    return <SubmissionResult result={submissionResult} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 flex flex-col">
      {/* Step Progress */}
      <div className="flex justify-between mb-6 sm:mb-8 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1 relative">
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2 transition-colors duration-300 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                style={{ zIndex: 0 }}
              />
            )}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  index <= currentStep
                    ? 'bg-blue-600 text-white border-2 border-blue-600'
                    : 'bg-white text-gray-600 border-2 border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-xs text-center transition-colors duration-300 ${
                  index <= currentStep ? 'text-blue-600 font-semibold' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 2 ? (
              <CertificationsStep
                ref={certRef}
                data={formData}
                onChange={updateFormData}
                onSkip={handleSkipCert}
              />
            ) : (
              <CurrentStepComponent data={formData} onChange={updateFormData} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          {currentStep === 2 && (
            <Button variant="secondary" onClick={handleSkipCert} className="w-full sm:w-auto">
              Skip
            </Button>
          )}
          <Button
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            className="w-full sm:w-auto"
          >
            {currentStep === steps.length - 1 ? 'Submit for Analysis' : 'Next'}
          </Button>
        </div>
      </div>

      {/* Mobile Step Indicator */}
      <div className="sm:hidden mt-2 text-center">
        <span className="text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>
    </div>
  );
}
