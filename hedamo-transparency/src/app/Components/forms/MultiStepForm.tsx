// forms/MultiStepForm.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasicInfoStep from './BasicInfoStep';
import IngredientsStep from './IngredientsStep';
import CertificationsStep from './CertificationsStep';
import ReviewStep from './ReviewStep';
import SubmissionResult from './SubmissionResult';
import { FormData, AIResponse, Product } from '@/src/types';
import Button from '../ui/Button';

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
    // Example: Basic validation for step 0
    if (currentStep === 0) {
      const basic = formData.basicInfo;
      if (!basic?.name?.trim()) { setError('Product name is required.'); return false; }
      if (!basic?.category?.trim()) { setError('Category is required.'); return false; }
    }
    // Add other step validations here
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

  const aiAnalysis: AIResponse = {
    productName: formData.basicInfo?.name || 'Unknown Product',
    score: Math.floor(Math.random() * 40) + 60,
    explanation: 'Good baseline transparency. Consider adding more detailed sourcing information.',
    suggestions: [
      'Add sourcing details for primary ingredients',
      'Include certification verification documents',
      'Specify manufacturing location transparency',
    ],
    flags: formData.basicInfo?.name?.toLowerCase().includes('organic')
      ? ['Unverified organic claim']
      : [],
    certifications: formData.certifications?.items || [],
  };

  const newProduct: Product = {
    id: Date.now().toString(),
    name: formData.basicInfo?.name || 'Unknown Product',
    category: formData.basicInfo?.category || 'Uncategorized',
    description: formData.basicInfo?.description || '',
    score: aiAnalysis.score,
    status: 'published',
    lastUpdated: new Date().toISOString(),
    aiAnalysis,
  };

  // Save to localStorage
  const existingProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
  localStorage.setItem('products', JSON.stringify([newProduct, ...existingProducts]));

  // Show AI analysis result
  setSubmissionResult(aiAnalysis);
};

  if (submissionResult) {
    return <SubmissionResult result={submissionResult} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 flex flex-col">
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

      {error && <p className="mt-2 text-red-600">{error}</p>}

      <div className="flex justify-between mt-4 space-x-2">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        {currentStep === 2 && <Button onClick={handleSkipCert}>Skip</Button>}
        <Button onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}>
          {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
