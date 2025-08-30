'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NextStepsGuideProps {
  isEligible: boolean;
  recommendations: string[];
  nextSteps: string[];
}

export function NextStepsGuide({ isEligible, recommendations, nextSteps }: NextStepsGuideProps) {
  const getPriorityLevel = (step: string): 'high' | 'medium' | 'low' => {
    const highPriorityKeywords = ['congratulations', 'apply', 'register', 'examination', 'embassy'];
    const mediumPriorityKeywords = ['prepare', 'complete', 'consider', 'foundation'];
    
    const stepLower = step.toLowerCase();
    
    if (highPriorityKeywords.some(keyword => stepLower.includes(keyword))) {
      return 'high';
    }
    if (mediumPriorityKeywords.some(keyword => stepLower.includes(keyword))) {
      return 'medium';
    }
    return 'low';
  };

  const getPriorityIcon = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return '💡';
    }
  };

  const categorizedSteps = nextSteps.map((step, index) => ({
    id: index,
    content: step,
    priority: getPriorityLevel(step),
    completed: false
  }));

  const highPrioritySteps = categorizedSteps.filter(step => step.priority === 'high');
  const mediumPrioritySteps = categorizedSteps.filter(step => step.priority === 'medium');
  const lowPrioritySteps = categorizedSteps.filter(step => step.priority === 'low');

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <Alert className={isEligible ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}>
        <AlertDescription className={isEligible ? 'text-green-800' : 'text-orange-800'}>
          <strong>
            {isEligible 
              ? 'Great news! You are eligible to apply.' 
              : 'Do not give up! There are paths forward.'
            }
          </strong>
          {isEligible 
            ? ' Follow the steps below to begin your application process.'
            : ' Review the recommendations and consider alternative options.'
          }
        </AlertDescription>
      </Alert>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📋</span>
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-blue-900 text-sm leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps by Priority */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🎯</span>
            Your Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* High Priority Steps */}
          {highPrioritySteps.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-red-600">High Priority</Badge>
                <span className="text-sm text-gray-600">Take action immediately</span>
              </div>
              <div className="space-y-3">
                {highPrioritySteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg"
                  >
                    <span className="text-lg">{getPriorityIcon(step.priority)}</span>
                    <div className="flex-1">
                      <p className="text-red-900 font-medium">{step.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medium Priority Steps */}
          {mediumPrioritySteps.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-yellow-600">Medium Priority</Badge>
                <span className="text-sm text-gray-600">Plan and prepare</span>
              </div>
              <div className="space-y-3">
                {mediumPrioritySteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg"
                  >
                    <span className="text-lg">{getPriorityIcon(step.priority)}</span>
                    <div className="flex-1">
                      <p className="text-yellow-900 font-medium">{step.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Low Priority Steps */}
          {lowPrioritySteps.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-green-600">Low Priority</Badge>
                <span className="text-sm text-gray-600">Additional information</span>
              </div>
              <div className="space-y-3">
                {lowPrioritySteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-start gap-3 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg"
                  >
                    <span className="text-lg">{getPriorityIcon(step.priority)}</span>
                    <div className="flex-1">
                      <p className="text-green-900 font-medium">{step.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Suggestion */}
          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Suggested Timeline</h4>
            <div className="space-y-2 text-sm text-gray-700">
              {isEligible ? (
                <>
                  <p>• <strong>Immediate (1-2 weeks):</strong> Complete document attestation and AIU recognition</p>
                  <p>• <strong>Short-term (1-2 months):</strong> Apply to universities and register for entrance exams</p>
                  <p>• <strong>Medium-term (3-6 months):</strong> Prepare for and take entrance examinations</p>
                  <p>• <strong>Long-term (6-12 months):</strong> Finalize admission and prepare for departure</p>
                </>
              ) : (
                <>
                  <p>• <strong>Immediate (1-2 weeks):</strong> Address critical requirement gaps</p>
                  <p>• <strong>Short-term (3-6 months):</strong> Complete missing subjects or improve grades</p>
                  <p>• <strong>Medium-term (6-12 months):</strong> Re-evaluate eligibility and apply</p>
                  <p>• <strong>Alternative path:</strong> Consider foundation programs or pathway courses</p>
                </>
              )}
            </div>
          </div>

          {/* Important Resources */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">Important Resources</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• <strong>Association of Indian Universities (AIU):</strong> For degree recognition</p>
              <p>• <strong>Indian Embassy/Consulate:</strong> Document attestation services</p>
              <p>• <strong>University websites:</strong> Specific admission requirements</p>
              <p>• <strong>Educational consultants:</strong> Personalized guidance in your region</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}