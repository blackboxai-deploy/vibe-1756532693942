'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { examBoards } from '@/lib/data/examBoards';
import { SubjectGrade } from '@/lib/types/calculator';
import { 
  convertToIndianPoints, 
  getIndianEquivalentGrade, 
  getValidGrades, 
  isValidGrade,
  getGradeStatistics 
} from '@/lib/utils/gradeConverter';

interface GradeInputProps {
  examBoard: string;
  subjects: SubjectGrade[];
  onSubjectsChange: (subjects: SubjectGrade[]) => void;
}

export function GradeInput({ examBoard, subjects, onSubjectsChange }: GradeInputProps) {
  const [currentSubject, setCurrentSubject] = useState('');
  const [currentGrade, setCurrentGrade] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const boardData = examBoards[examBoard];
  const validGrades = useMemo(() => {
    if (!boardData) return [];
    return getValidGrades(boardData.gradingSystem.id);
  }, [boardData]);

  const statistics = useMemo(() => {
    return getGradeStatistics(subjects);
  }, [subjects]);

  const addSubject = () => {
    setErrors([]);
    const newErrors: string[] = [];

    if (!currentSubject.trim()) {
      newErrors.push('Subject name is required');
    }

    if (!currentGrade) {
      newErrors.push('Grade is required');
    }

    // Check if subject already exists
    if (subjects.some(s => s.subjectName.toLowerCase() === currentSubject.toLowerCase())) {
      newErrors.push('Subject already added');
    }

    // Validate grade
    if (currentGrade && boardData && !isValidGrade(currentGrade, boardData.gradingSystem.id)) {
      newErrors.push('Invalid grade for selected exam board');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    if (boardData) {
      const newSubject: SubjectGrade = {
        subjectId: `SUBJ_${subjects.length + 1}`,
        subjectName: currentSubject.trim(),
        grade: currentGrade,
        points: convertToIndianPoints(currentGrade, boardData.gradingSystem.id),
        indianEquivalent: getIndianEquivalentGrade(currentGrade, boardData.gradingSystem.id)
      };

      onSubjectsChange([...subjects, newSubject]);
      setCurrentSubject('');
      setCurrentGrade('');
    }
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    onSubjectsChange(updatedSubjects);
  };

  const getGradeColor = (points: number) => {
    if (points >= 80) return 'bg-green-100 text-green-800 border-green-300';
    if (points >= 60) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (points >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  if (!boardData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please select an exam board first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Enter Your Grades
        </h3>
        <p className="text-gray-600 mb-4">
          Add your subject grades from <strong>{boardData.name}</strong>
        </p>
        <div className="flex justify-center gap-2 mb-4">
          <Badge variant="outline">{boardData.gradingSystem.name}</Badge>
          <Badge variant="outline">
            Scale: {boardData.gradingSystem.scale.min} - {boardData.gradingSystem.scale.max}
          </Badge>
        </div>
      </div>

      {/* Grade Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Subject & Grade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Name</Label>
              <Select value={currentSubject} onValueChange={setCurrentSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {boardData.subjects
                    .filter(subject => !subjects.some(s => s.subjectName === subject))
                    .map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={currentGrade.toString()} onValueChange={setCurrentGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {validGrades.map((grade) => (
                    <SelectItem key={grade.toString()} value={grade.toString()}>
                      {grade} - {boardData.gradingSystem.scale.grades.find(g => g.value === grade)?.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={addSubject}
                disabled={!currentSubject || !currentGrade}
                className="w-full"
              >
                Add Subject
              </Button>
            </div>
          </div>

          {/* Custom Subject Input */}
          <div className="border-t pt-4">
            <Label htmlFor="custom-subject">Or enter custom subject name</Label>
            <Input
              id="custom-subject"
              placeholder="Type subject name..."
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert>
              <AlertDescription>
                <ul className="list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Added Subjects */}
      {subjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Subjects ({subjects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjects.map((subject, index) => (
                <div
                  key={subject.subjectId}
                  className={`p-4 rounded-lg border-2 ${getGradeColor(subject.points)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{subject.subjectName}</h4>
                      <div className="flex items-center gap-3 mt-2 text-sm">
                        <Badge variant="secondary">
                          Grade: {subject.grade}
                        </Badge>
                        <Badge variant="outline">
                          Points: {subject.points}%
                        </Badge>
                        <Badge variant="outline">
                          Indian: {subject.indianEquivalent}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubject(index)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      {subjects.length > 0 && (
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h4 className="font-medium text-gray-900 mb-4">Grade Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{statistics.average}%</p>
                <p className="text-sm text-gray-600">Average</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{statistics.highest}%</p>
                <p className="text-sm text-gray-600">Highest</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{statistics.lowest}%</p>
                <p className="text-sm text-gray-600">Lowest</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {statistics.passingSubjects}/{statistics.totalSubjects}
                </p>
                <p className="text-sm text-gray-600">Passing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requirements Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">Minimum Requirements</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• At least 4-6 subjects required for most programs</li>
            <li>• Core subjects depend on your target field of study</li>
            <li>• All subjects should have passing grades (≥40% equivalent)</li>
            <li>• English is mandatory for Indian university admission</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}