'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getEducationSystemsByCountry } from '@/lib/data/examBoards';
import { africanCountries } from '@/lib/data/countries';

interface EducationSystemSelectorProps {
  countryCode: string;
  selectedSystem: string;
  onSystemChange: (system: string) => void;
}

export function EducationSystemSelector({ 
  countryCode, 
  selectedSystem, 
  onSystemChange 
}: EducationSystemSelectorProps) {
  const country = africanCountries.find(c => c.code === countryCode);
  const educationSystems = useMemo(() => {
    return getEducationSystemsByCountry(countryCode);
  }, [countryCode]);

  const getSystemDescription = (systemId: string): string => {
    const descriptions: Record<string, string> = {
      'WAEC': 'West African Examinations Council - Used across multiple West African countries',
      'NECO': 'National Examinations Council - Nigerian examination system',
      'KCSE': 'Kenya Certificate of Secondary Education - Kenyan national exam',
      'ZIMSEC': 'Zimbabwe School Examinations Council - Zimbabwean exam system',
      'NSC': 'National Senior Certificate - South African qualification',
      'BAC': 'Baccalauréat - French-style education system used in Francophone Africa',
      'CAMBRIDGE': 'Cambridge International Examinations - International qualification',
      'SECONDARY_EDUCATION': 'National secondary education certificate',
      'THANAWIYA_AMMA': 'General Secondary Education Certificate (Egypt)',
      'SUDAN_CERTIFICATE': 'Sudan School Certificate',
      'GABECE': 'Gambia Basic Education Certificate Examination',
      'GBCE': 'Ghana Basic Certificate Examination',
      'PROBATOIRE': 'Probatoire Certificate (Cameroon)',
      'EHEECE': 'Ethiopian Higher Education Entrance Certificate Examination',
      'MSCE': 'Malawi School Certificate of Education',
      'HSC': 'Higher School Certificate',
      'NECTA': 'National Examinations Council of Tanzania',
      'UNEB': 'Uganda National Examinations Board',
      'ECZ': 'Examinations Council of Zambia',
      'BGCSE': 'Botswana General Certificate of Secondary Education',
      'SGCSE': 'Swaziland General Certificate of Secondary Education',
      'COSC': 'Cambridge Overseas School Certificate (Lesotho)',
      'NSSC': 'Namibian Senior Secondary Certificate',
      'IEB': 'Independent Examinations Board (South Africa)',
      'ERITREAN_CERTIFICATE': 'Eritrean Secondary Education Certificate',
      'GCE': 'General Certificate of Education',
      'NABTEB': 'National Business and Technical Examinations Board'
    };
    return descriptions[systemId] || 'National education system';
  };

  const getSystemComplexity = (systemId: string): 'simple' | 'moderate' | 'complex' => {
    const complexSystems = ['CAMBRIDGE', 'BAC', 'GCE'];
    const moderateSystems = ['WAEC', 'ZIMSEC', 'NSC', 'KCSE'];
    
    if (complexSystems.includes(systemId)) return 'complex';
    if (moderateSystems.includes(systemId)) return 'moderate';
    return 'simple';
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!country) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please select a country first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Select Education System
        </h3>
        <p className="text-gray-600 mb-2">
          Choose the education system you completed in <strong>{country.name}</strong>
        </p>
        <Badge variant="outline" className="mb-4">
          {educationSystems.length} system{educationSystems.length !== 1 ? 's' : ''} available
        </Badge>
      </div>

      {/* Current Selection */}
      {selectedSystem && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div>
                <h4 className="font-semibold text-green-900">{selectedSystem}</h4>
                <p className="text-sm text-green-700">
                  {getSystemDescription(selectedSystem)}
                </p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Selected
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education Systems */}
      <div className="grid gap-4">
        {educationSystems.map((system) => {
          const complexity = getSystemComplexity(system.id);
          const isSelected = selectedSystem === system.id;
          
          return (
            <Card
              key={system.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSystemChange(system.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900">
                      {system.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {getSystemDescription(system.id)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant="outline" 
                      className={getComplexityColor(complexity)}
                    >
                      {complexity} conversion
                    </Badge>
                    {isSelected && (
                      <Badge className="bg-blue-600">
                        Selected
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {system.examBoards.map((boardId) => (
                    <Badge key={boardId} variant="secondary" className="text-xs">
                      {boardId.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Information Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            Understanding Education Systems
          </h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 text-xs">Simple</Badge>
              <span>Direct grade mapping, straightforward conversion</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">Moderate</Badge>
              <span>Regional variations, standard conversion process</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800 text-xs">Complex</Badge>
              <span>Multiple levels, specialized conversion required</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}