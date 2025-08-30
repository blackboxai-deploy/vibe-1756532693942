'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EligibilityResult } from '@/lib/types/calculator';

interface EligibilityCardProps {
  result: EligibilityResult;
}

export function EligibilityCard({ result }: EligibilityCardProps) {
  const getStatusColor = (isEligible: boolean) => {
    return isEligible ? 'bg-green-600' : 'bg-red-600';
  };

  const getStatusText = (isEligible: boolean) => {
    return isEligible ? 'Eligible' : 'Not Eligible';
  };

  const getScoreColor = (score: number, minimum: number) => {
    if (score >= minimum) return 'text-green-600';
    if (score >= minimum * 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMotivationalMessage = (result: EligibilityResult) => {
    if (result.isEligible) {
      return "Congratulations! You meet the eligibility criteria for Indian universities. You can proceed with your application process.";
    } else {
      const gap = result.minimumRequired - result.overallScore;
      if (gap <= 10) {
        return "You're very close to meeting the requirements! With some improvement, you can achieve eligibility.";
      } else if (gap <= 20) {
        return "You need to improve your grades to meet the requirements. Consider retaking some subjects or exploring alternative pathways.";
      } else {
        return "Significant improvement is needed to meet the requirements. Consider foundation programs or alternative study routes.";
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="overflow-hidden">
        <CardHeader className={`text-white ${getStatusColor(result.isEligible)}`}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Eligibility Assessment
              </CardTitle>
              <p className="text-lg opacity-90">
                {result.stream} Stream
              </p>
            </div>
            <div className="text-right">
              <Badge 
                className={`text-lg px-4 py-2 ${
                  result.isEligible 
                    ? 'bg-white text-green-600' 
                    : 'bg-white text-red-600'
                }`}
              >
                {getStatusText(result.isEligible)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(result.overallScore, result.minimumRequired)}`}>
                  {result.overallScore}%
                </div>
                <p className="text-gray-600 font-medium">Your Average Score</p>
                <p className="text-sm text-gray-500 mt-1">
                  Based on {result.breakdown.totalSubjects} subjects
                </p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-4xl font-bold mb-2 text-blue-600">
                  {result.minimumRequired}%
                </div>
                <p className="text-gray-600 font-medium">Required Minimum</p>
                <p className="text-sm text-gray-500 mt-1">
                  For {result.stream} programs
                </p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Score Progress
                </span>
                <span className="text-sm text-gray-500">
                  {Math.min(result.overallScore, 100)}% of 100%
                </span>
              </div>
              <Progress 
                value={Math.min(result.overallScore, 100)} 
                className="h-3"
              />
              {result.minimumRequired < 100 && (
                <div className="relative">
                  <div 
                    className="absolute top-0 w-0.5 h-3 bg-red-500 z-10"
                    style={{ left: `${result.minimumRequired}%` }}
                  />
                  <p className="text-xs text-gray-500 mt-1" style={{ marginLeft: `${Math.max(0, result.minimumRequired - 10)}%` }}>
                    Required: {result.minimumRequired}%
                  </p>
                </div>
              )}
            </div>

            {/* Requirements Checklist */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Requirements Status</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    result.breakdown.coreSubjectsMet ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {result.breakdown.coreSubjectsMet ? '✓' : '✗'}
                  </div>
                  <span className={`text-sm ${
                    result.breakdown.coreSubjectsMet ? 'text-green-700' : 'text-red-700'
                  }`}>
                    Core Subjects Requirements
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    result.breakdown.minimumGradeMet ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {result.breakdown.minimumGradeMet ? '✓' : '✗'}
                  </div>
                  <span className={`text-sm ${
                    result.breakdown.minimumGradeMet ? 'text-green-700' : 'text-red-700'
                  }`}>
                    Minimum Grade Standards
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    result.breakdown.streamSpecificRequirements ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {result.breakdown.streamSpecificRequirements ? '✓' : '✗'}
                  </div>
                  <span className={`text-sm ${
                    result.breakdown.streamSpecificRequirements ? 'text-green-700' : 'text-red-700'
                  }`}>
                    Stream-Specific Requirements
                  </span>
                </div>
              </div>
            </div>

            {/* Motivational Message */}
            <div className={`p-4 rounded-lg border-l-4 ${
              result.isEligible 
                ? 'bg-green-50 border-green-400' 
                : 'bg-yellow-50 border-yellow-400'
            }`}>
              <p className={`font-medium ${
                result.isEligible ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {getMotivationalMessage(result)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}