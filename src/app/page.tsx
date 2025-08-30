'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CountrySelector } from '@/components/Calculator/CountrySelector';
import { EducationSystemSelector } from '@/components/Calculator/EducationSystemSelector';
import { ExamBoardSelector } from '@/components/Calculator/ExamBoardSelector';
import { GradeInput } from '@/components/Calculator/GradeInput';
import { SubjectMapper } from '@/components/Calculator/SubjectMapper';
import { ProgressTracker } from '@/components/Calculator/ProgressTracker';
import { EligibilityCard } from '@/components/Results/EligibilityCard';
import { RequirementsBreakdown } from '@/components/Results/RequirementsBreakdown';
import { NextStepsGuide } from '@/components/Results/NextStepsGuide';
import { CalculatorFormData, CalculatorStep, UniversityStream, EligibilityResult } from '@/lib/types/calculator';
import { calculateEligibility } from '@/lib/utils/eligibilityCalculator';
import { examBoards } from '@/lib/data/examBoards';

const steps: CalculatorStep[] = [
  { id: 1, title: 'Country', description: 'Select your country', isCompleted: false, isActive: true },
  { id: 2, title: 'Education System', description: 'Choose education system', isCompleted: false, isActive: false },
  { id: 3, title: 'Exam Board', description: 'Select exam board', isCompleted: false, isActive: false },
  { id: 4, title: 'Grades', description: 'Enter your grades', isCompleted: false, isActive: false },
  { id: 5, title: 'Stream', description: 'Choose target stream', isCompleted: false, isActive: false },
  { id: 6, title: 'Results', description: 'View eligibility', isCompleted: false, isActive: false }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CalculatorFormData>({
    country: '',
    educationSystem: '',
    examBoard: '',
    subjects: [],
    targetStream: 'General',
    completionYear: new Date().getFullYear()
  });
  const [calculatorSteps, setCalculatorSteps] = useState<CalculatorStep[]>(steps);
  const [results, setResults] = useState<EligibilityResult | null>(null);

  const updateStep = (stepId: number, completed: boolean, active: boolean = false) => {
    setCalculatorSteps(prev => prev.map(step => ({
      ...step,
      isCompleted: step.id < stepId ? true : step.id === stepId ? completed : false,
      isActive: step.id === stepId && active
    })));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      updateStep(currentStep, true);
      setCurrentStep(currentStep + 1);
      updateStep(currentStep + 1, false, true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      updateStep(currentStep - 1, false, true);
    }
  };

  const handleCalculate = () => {
    if (formData.examBoard && formData.subjects.length > 0) {
      const examBoard = examBoards[formData.examBoard];
      const gradingSystemId = examBoard?.gradingSystem.id || '';
      const eligibilityResults = calculateEligibility(formData, gradingSystemId);
      setResults(eligibilityResults);
      handleNext();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.country !== '';
      case 2: return formData.educationSystem !== '';
      case 3: return formData.examBoard !== '';
      case 4: return formData.subjects.length >= 4; // Minimum 4 subjects
      case 5: return formData.targetStream !== 'General' || formData.subjects.length > 0;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CountrySelector
            selectedCountry={formData.country}
            onCountryChange={(country) => setFormData(prev => ({ ...prev, country }))}
          />
        );
      case 2:
        return (
          <EducationSystemSelector
            countryCode={formData.country}
            selectedSystem={formData.educationSystem}
            onSystemChange={(system) => setFormData(prev => ({ ...prev, educationSystem: system }))}
          />
        );
      case 3:
        return (
          <ExamBoardSelector
            countryCode={formData.country}
            educationSystem={formData.educationSystem}
            selectedBoard={formData.examBoard}
            onBoardChange={(board) => setFormData(prev => ({ ...prev, examBoard: board }))}
          />
        );
      case 4:
        return (
          <GradeInput
            examBoard={formData.examBoard}
            subjects={formData.subjects}
            onSubjectsChange={(subjects) => setFormData(prev => ({ ...prev, subjects }))}
          />
        );
      case 5:
        return (
          <SubjectMapper
            subjects={formData.subjects}
            targetStream={formData.targetStream}
            onStreamChange={(stream: UniversityStream) => setFormData(prev => ({ ...prev, targetStream: stream }))}
          />
        );
      case 6:
        return results ? (
          <div className="space-y-6">
            <EligibilityCard result={results} />
            <RequirementsBreakdown breakdown={results.breakdown} />
            <NextStepsGuide 
              isEligible={results.isEligible}
              recommendations={results.recommendations}
              nextSteps={results.nextSteps}
            />
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              African Students' Eligibility Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Determine your eligibility for Indian university bachelor degree programs. 
              Supporting all 54 African countries and major exam boards.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Tracker */}
        <div className="mb-8">
          <ProgressTracker 
            steps={calculatorSteps} 
            currentStep={currentStep}
          />
        </div>

        {/* Calculator Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-semibold">
              {currentStep < 6 ? `Step ${currentStep}: ${calculatorSteps[currentStep - 1]?.title}` : 'Your Results'}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {currentStep < 6 ? calculatorSteps[currentStep - 1]?.description : 'Eligibility assessment complete'}
            </CardDescription>
            {currentStep < 6 && (
              <div className="mt-4">
                <Progress value={(currentStep / 6) * 100} className="bg-blue-500" />
                <p className="text-sm text-blue-100 mt-2">
                  {currentStep} of 6 steps completed
                </p>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-8">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-8"
              >
                Previous
              </Button>
              
              {currentStep < 5 && (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-8 bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </Button>
              )}
              
              {currentStep === 5 && (
                <Button
                  onClick={handleCalculate}
                  disabled={!canProceed()}
                  className="px-8 bg-green-600 hover:bg-green-700"
                >
                  Calculate Eligibility
                </Button>
              )}
              
              {currentStep === 6 && (
                <Button
                  onClick={() => {
                    setCurrentStep(1);
                    setFormData({
                      country: '',
                      educationSystem: '',
                      examBoard: '',
                      subjects: [],
                      targetStream: 'General',
                      completionYear: new Date().getFullYear()
                    });
                    setCalculatorSteps(steps);
                    setResults(null);
                  }}
                  className="px-8 bg-blue-600 hover:bg-blue-700"
                >
                  Start New Calculation
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            This calculator provides guidance based on general requirements. 
            Always verify specific requirements with your target universities.
          </p>
        </div>
      </main>
    </div>
  );
}