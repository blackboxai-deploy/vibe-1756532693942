'use client';

import { CalculatorStep } from '@/lib/types/calculator';

interface ProgressTrackerProps {
  steps: CalculatorStep[];
  currentStep: number;
}

export function ProgressTracker({ steps, currentStep }: ProgressTrackerProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Progress</h2>
        <span className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </span>
      </div>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = step.isCompleted;
            const isActive = step.id === currentStep;
            const isUpcoming = step.id > currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`
                    relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-300
                    ${isCompleted
                      ? 'bg-green-600 border-green-600 text-white'
                      : isActive
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                        : isUpcoming
                          ? 'bg-white border-gray-300 text-gray-400'
                          : 'bg-white border-gray-300 text-gray-600'
                    }
                  `}
                >
                  {isCompleted ? (
                    <span>✓</span>
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                {/* Step Info */}
                <div className="mt-3 text-center max-w-20">
                  <h3
                    className={`
                      text-sm font-medium transition-colors duration-200
                      ${isActive
                        ? 'text-blue-600'
                        : isCompleted
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }
                    `}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`
                      text-xs mt-1 transition-colors duration-200
                      ${isActive || isCompleted
                        ? 'text-gray-600'
                        : 'text-gray-400'
                      }
                    `}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Active Step Indicator */}
                {isActive && (
                  <div className="absolute -top-1 -left-1 w-12 h-12 bg-blue-200 rounded-full animate-pulse opacity-75" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>Started</span>
          <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
        </div>
      </div>
    </div>
  );
}