'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { EligibilityBreakdown, RequirementDetail } from '@/lib/types/calculator';
import { useState } from 'react';

interface RequirementsBreakdownProps {
  breakdown: EligibilityBreakdown;
}

export function RequirementsBreakdown({ breakdown }: RequirementsBreakdownProps) {
  const [openSections, setOpenSections] = useState<string[]>(['core-subjects']);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getStatusIcon = (status: RequirementDetail['status']) => {
    switch (status) {
      case 'met': return '✓';
      case 'not-met': return '✗';
      case 'partial': return '⚠';
      default: return '?';
    }
  };

  const getStatusColor = (status: RequirementDetail['status']) => {
    switch (status) {
      case 'met': return 'bg-green-100 text-green-800 border-green-300';
      case 'not-met': return 'bg-red-100 text-red-800 border-red-300';
      case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getOverallStatus = () => {
    const allMet = breakdown.coreSubjectsMet && 
                   breakdown.minimumGradeMet && 
                   breakdown.streamSpecificRequirements;
    
    if (allMet) return 'met';
    
    const anyMet = breakdown.coreSubjectsMet || 
                   breakdown.minimumGradeMet || 
                   breakdown.streamSpecificRequirements;
    
    return anyMet ? 'partial' : 'not-met';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Requirements Breakdown</CardTitle>
          <Badge className={getStatusColor(getOverallStatus()).replace('bg-', 'bg-opacity-20 ')}>
            {getStatusIcon(getOverallStatus())} Overall Status
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{breakdown.totalSubjects}</div>
            <p className="text-sm text-gray-600">Total Subjects</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              breakdown.coreSubjectsMet ? 'text-green-600' : 'text-red-600'
            }`}>
              {breakdown.coreSubjectsMet ? 'Yes' : 'No'}
            </div>
            <p className="text-sm text-gray-600">Core Subjects Met</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              breakdown.minimumGradeMet ? 'text-green-600' : 'text-red-600'
            }`}>
              {breakdown.minimumGradeMet ? 'Yes' : 'No'}
            </div>
            <p className="text-sm text-gray-600">Minimum Grades</p>
          </div>
        </div>

        {/* Detailed Requirements */}
        <div className="space-y-3">
          {breakdown.details.map((detail, index) => (
            <Collapsible 
              key={index} 
              open={openSections.includes(`detail-${index}`)}
              onOpenChange={() => toggleSection(`detail-${index}`)}
            >
              <CollapsibleTrigger className="w-full">
                <div className={`p-4 rounded-lg border-2 transition-colors hover:bg-gray-50 ${getStatusColor(detail.status)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm font-bold">
                        {getStatusIcon(detail.status)}
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold">{detail.requirement}</h4>
                        <p className="text-sm opacity-80">{detail.description}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <Badge variant="outline" className="bg-white">
                        {detail.status.replace('-', ' ')}
                      </Badge>
                      <span className="text-sm">
                        {openSections.includes(`detail-${index}`) ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2">
                <div className="p-4 bg-white border-2 border-gray-200 rounded-lg ml-4">
                  <div className="space-y-3">
                    {detail.currentValue && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Current Status:</h5>
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          {detail.currentValue}
                        </p>
                      </div>
                    )}
                    
                    {detail.requiredValue && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Required:</h5>
                        <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                          {detail.requiredValue}
                        </p>
                      </div>
                    )}

                    {/* Action Items */}
                    {detail.status === 'not-met' && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <h5 className="font-medium text-red-900 mb-1">Action Required:</h5>
                        <p className="text-sm text-red-800">
                          This requirement must be fulfilled before you can be considered eligible.
                        </p>
                      </div>
                    )}
                    
                    {detail.status === 'partial' && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <h5 className="font-medium text-yellow-900 mb-1">Improvement Needed:</h5>
                        <p className="text-sm text-yellow-800">
                          You partially meet this requirement but improvement is recommended.
                        </p>
                      </div>
                    )}
                    
                    {detail.status === 'met' && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <h5 className="font-medium text-green-900 mb-1">Requirement Met:</h5>
                        <p className="text-sm text-green-800">
                          You successfully meet this requirement. Well done!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Quick Assessment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                breakdown.coreSubjectsMet ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <span className="text-blue-800">Core subject requirements</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                breakdown.minimumGradeMet ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <span className="text-blue-800">Grade standards</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                breakdown.streamSpecificRequirements ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <span className="text-blue-800">Stream-specific criteria</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                breakdown.totalSubjects >= 4 ? 'bg-green-500' : 'bg-yellow-500'
              }`}></span>
              <span className="text-blue-800">Subject count ({breakdown.totalSubjects})</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}