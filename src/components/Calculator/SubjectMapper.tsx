'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SubjectGrade, UniversityStream } from '@/lib/types/calculator';
import { 
  getIndianEquivalent, 
  getCoreSubjectsForStream, 
  indianRequirements 
} from '@/lib/data/subjects';

interface SubjectMapperProps {
  subjects: SubjectGrade[];
  targetStream: UniversityStream;
  onStreamChange: (stream: UniversityStream) => void;
}

export function SubjectMapper({ subjects, targetStream, onStreamChange }: SubjectMapperProps) {
  const streams: UniversityStream[] = ['Engineering', 'Medical', 'Science', 'Commerce', 'Arts', 'General'];
  
  const streamAnalysis = useMemo(() => {
    const requirement = indianRequirements[targetStream];
    const coreSubjects = getCoreSubjectsForStream(targetStream);
    
    const mappedSubjects = subjects.map(subject => ({
      ...subject,
      indianEquivalents: getIndianEquivalent(subject.subjectName)
    }));

    const availableCoreSubjects = coreSubjects.filter(coreSubject =>
      mappedSubjects.some(subject =>
        subject.indianEquivalents.includes(coreSubject) || 
        subject.subjectName === coreSubject
      )
    );

    const missingCoreSubjects = coreSubjects.filter(coreSubject =>
      !mappedSubjects.some(subject =>
        subject.indianEquivalents.includes(coreSubject) || 
        subject.subjectName === coreSubject
      )
    );

    const averageScore = subjects.length > 0 
      ? Math.round(subjects.reduce((sum, s) => sum + s.points, 0) / subjects.length)
      : 0;

    const eligibilityScore = {
      coreSubjects: (availableCoreSubjects.length / coreSubjects.length) * 100,
      gradeAverage: averageScore >= requirement.minimumAggregate ? 100 : (averageScore / requirement.minimumAggregate) * 100,
      overall: 0
    };

    eligibilityScore.overall = (eligibilityScore.coreSubjects + eligibilityScore.gradeAverage) / 2;

    return {
      requirement,
      mappedSubjects,
      availableCoreSubjects,
      missingCoreSubjects,
      averageScore,
      eligibilityScore,
      isEligible: eligibilityScore.overall >= 80 && missingCoreSubjects.length === 0
    };
  }, [subjects, targetStream]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStreamCompatibility = (stream: UniversityStream) => {
    const requirement = indianRequirements[stream];
    const coreSubjects = getCoreSubjectsForStream(stream);
    
    const availableCount = coreSubjects.filter(coreSubject =>
      subjects.some(subject => {
        const equivalents = getIndianEquivalent(subject.subjectName);
        return equivalents.includes(coreSubject) || subject.subjectName === coreSubject;
      })
    ).length;

    const compatibility = (availableCount / coreSubjects.length) * 100;
    
    return {
      score: compatibility,
      available: availableCount,
      total: coreSubjects.length,
      avgGrade: subjects.length > 0 
        ? Math.round(subjects.reduce((sum, s) => sum + s.points, 0) / subjects.length)
        : 0,
      meetsAverage: subjects.length > 0 
        ? Math.round(subjects.reduce((sum, s) => sum + s.points, 0) / subjects.length) >= requirement.minimumAggregate
        : false
    };
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Choose Your Target Stream
        </h3>
        <p className="text-gray-600 mb-4">
          Select your preferred field of study to see subject mapping and eligibility
        </p>
      </div>

      {/* Stream Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Target Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="stream">Select your preferred field of study</Label>
              <Select value={targetStream} onValueChange={(value: UniversityStream) => onStreamChange(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {streams.map((stream) => (
                    <SelectItem key={stream} value={stream}>
                      {stream}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stream Compatibility Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {streams.map((stream) => {
                const compatibility = getStreamCompatibility(stream);
                const isSelected = stream === targetStream;
                
                return (
                  <div
                    key={stream}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => onStreamChange(stream)}
                  >
                    <h4 className="font-medium text-gray-900">{stream}</h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Core Subjects:</span>
                        <span className={getScoreColor(compatibility.score)}>
                          {compatibility.available}/{compatibility.total}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg Required:</span>
                        <span>{indianRequirements[stream].minimumAggregate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Your Avg:</span>
                        <span className={compatibility.meetsAverage ? 'text-green-600' : 'text-red-600'}>
                          {compatibility.avgGrade}%
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <Badge className="mt-2 bg-blue-600">Selected</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Stream Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {targetStream} Stream Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Eligibility Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${getScoreColor(streamAnalysis.eligibilityScore.coreSubjects)}`}>
                {Math.round(streamAnalysis.eligibilityScore.coreSubjects)}%
              </div>
              <p className="text-sm text-gray-600">Core Subjects</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${getScoreColor(streamAnalysis.eligibilityScore.gradeAverage)}`}>
                {Math.round(streamAnalysis.eligibilityScore.gradeAverage)}%
              </div>
              <p className="text-sm text-gray-600">Grade Average</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${getScoreColor(streamAnalysis.eligibilityScore.overall)}`}>
                {Math.round(streamAnalysis.eligibilityScore.overall)}%
              </div>
              <p className="text-sm text-gray-600">Overall Match</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Requirements for {targetStream}</h4>
              <p className="text-sm text-gray-600 mb-3">{streamAnalysis.requirement.description}</p>
              <div className="flex flex-wrap gap-1">
                {streamAnalysis.requirement.additionalRequirements.map((req, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Core Subjects Status</h4>
              <div className="space-y-2">
                {streamAnalysis.availableCoreSubjects.map((subject) => (
                  <div key={subject} className="flex items-center gap-2">
                    <Badge className="bg-green-600 text-white">✓</Badge>
                    <span className="text-sm">{subject}</span>
                  </div>
                ))}
                {streamAnalysis.missingCoreSubjects.map((subject) => (
                  <div key={subject} className="flex items-center gap-2">
                    <Badge className="bg-red-600 text-white">✗</Badge>
                    <span className="text-sm text-gray-600">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Mapping */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Subject Equivalency Mapping</h4>
            <div className="space-y-2">
              {streamAnalysis.mappedSubjects.map((subject) => (
                <div
                  key={subject.subjectId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h5 className="font-medium text-gray-900">{subject.subjectName}</h5>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {subject.indianEquivalents.map((equivalent) => (
                        <Badge key={equivalent} variant="secondary" className="text-xs">
                          {equivalent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={subject.points >= 60 ? 'bg-green-600' : subject.points >= 40 ? 'bg-yellow-600' : 'bg-red-600'}>
                      {subject.points}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {streamAnalysis.missingCoreSubjects.length > 0 && (
        <Alert>
          <AlertDescription>
            <strong>Missing Core Subjects:</strong> You are missing {streamAnalysis.missingCoreSubjects.length} core subject(s) for {targetStream}: {streamAnalysis.missingCoreSubjects.join(', ')}. 
            Consider selecting a different stream or completing these subjects through supplementary exams.
          </AlertDescription>
        </Alert>
      )}

      {streamAnalysis.averageScore < streamAnalysis.requirement.minimumAggregate && (
        <Alert>
          <AlertDescription>
            <strong>Grade Average Warning:</strong> Your current average ({streamAnalysis.averageScore}%) is below the minimum requirement ({streamAnalysis.requirement.minimumAggregate}%) for {targetStream}. 
            Consider improving grades or selecting an alternative stream.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}