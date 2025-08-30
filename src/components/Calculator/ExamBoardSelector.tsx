'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { examBoards, getExamBoardsByCountry } from '@/lib/data/examBoards';
import { africanCountries } from '@/lib/data/countries';

interface ExamBoardSelectorProps {
  countryCode: string;
  educationSystem: string;
  selectedBoard: string;
  onBoardChange: (boardId: string) => void;
}

export function ExamBoardSelector({
  countryCode,
  educationSystem,
  selectedBoard,
  onBoardChange
}: ExamBoardSelectorProps) {
  const country = africanCountries.find(c => c.code === countryCode);
  
  const availableBoards = useMemo(() => {
    const countryBoards = getExamBoardsByCountry(countryCode);
    
    // Filter boards based on education system if applicable
    if (educationSystem) {
      return countryBoards.filter(board => 
        board.id.toLowerCase().includes(educationSystem.toLowerCase()) ||
        educationSystem === 'WAEC' && board.id.includes('WAEC') ||
        educationSystem === 'CAMBRIDGE' && board.id.includes('CAMBRIDGE') ||
        educationSystem === 'BAC' && board.id.includes('FRENCH_BAC')
      );
    }
    
    return countryBoards;
  }, [countryCode, educationSystem]);

  const selectedBoardData = examBoards[selectedBoard];

  const getGradingSystemInfo = (boardId: string) => {
    const board = examBoards[boardId];
    if (!board) return null;
    
    return {
      name: board.gradingSystem.name,
      type: board.gradingSystem.type,
      scale: `${board.gradingSystem.scale.min} - ${board.gradingSystem.scale.max}`,
      description: board.gradingSystem.description
    };
  };

  const getBoardDifficulty = (boardId: string): 'standard' | 'advanced' | 'international' => {
    if (boardId.includes('CAMBRIDGE') || boardId.includes('ADVANCED')) return 'international';
    if (boardId.includes('ADVANCED') || boardId.includes('ALEVEL')) return 'advanced';
    return 'standard';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'international': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!country || !educationSystem) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Please select a country and education system first.
        </p>
      </div>
    );
  }

  if (availableBoards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No exam boards available for the selected education system in {country.name}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Select Exam Board
        </h3>
        <p className="text-gray-600 mb-2">
          Choose the exam board that issued your secondary school certificate
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline">{country.name}</Badge>
          <Badge variant="outline">{educationSystem}</Badge>
        </div>
      </div>

      {/* Current Selection */}
      {selectedBoardData && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-green-900">{selectedBoardData.name}</h4>
                <p className="text-sm text-green-700 mb-2">{selectedBoardData.fullName}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600 text-white text-xs">
                    {selectedBoardData.gradingSystem.name}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {selectedBoardData.gradingSystem.type} scale
                  </Badge>
                </div>
              </div>
              <Badge variant="secondary">Selected</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exam Boards */}
      <div className="grid gap-4">
        {availableBoards.map((board) => {
          const gradingInfo = getGradingSystemInfo(board.id);
          const difficulty = getBoardDifficulty(board.id);
          const isSelected = selectedBoard === board.id;

          return (
            <Card
              key={board.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onBoardChange(board.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 mb-1">
                      {board.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-3">
                      {board.fullName}
                    </p>
                    
                    {gradingInfo && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={getDifficultyColor(difficulty)}
                          >
                            {difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {gradingInfo.type} grading
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Scale: {gradingInfo.scale}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <Badge className="bg-blue-600">
                      Selected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Available Subjects ({board.subjects.length})
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {board.subjects.slice(0, 6).map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {board.subjects.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{board.subjects.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Countries Recognized
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {board.countries.map((countryCode) => {
                        const countryName = africanCountries.find(c => c.code === countryCode)?.name || countryCode;
                        return (
                          <Badge key={countryCode} variant="secondary" className="text-xs">
                            {countryName}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            Understanding Exam Board Levels
          </h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 text-xs">Standard</Badge>
              <span>National secondary education certificates</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-800 text-xs">Advanced</Badge>
              <span>Advanced level qualifications (A-Levels, etc.)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-100 text-indigo-800 text-xs">International</Badge>
              <span>Internationally recognized qualifications</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}