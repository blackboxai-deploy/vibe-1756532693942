import { SubjectGrade } from '../types/calculator';
import { gradingSystems } from '../data/examBoards';

/**
 * Convert a grade from one system to Indian equivalent points
 */
export const convertToIndianPoints = (
  grade: string | number,
  gradingSystemId: string
): number => {
  const gradingSystem = gradingSystems[gradingSystemId];
  if (!gradingSystem) {
    console.warn(`Grading system ${gradingSystemId} not found`);
    return 0;
  }

  const gradeEntry = gradingSystem.scale.grades.find(g => 
    g.value.toString() === grade.toString()
  );

  return gradeEntry ? gradeEntry.points : 0;
};

/**
 * Get Indian equivalent grade letter
 */
export const getIndianEquivalentGrade = (
  grade: string | number,
  gradingSystemId: string
): string => {
  const gradingSystem = gradingSystems[gradingSystemId];
  if (!gradingSystem) {
    return 'E';
  }

  const gradeEntry = gradingSystem.scale.grades.find(g => 
    g.value.toString() === grade.toString()
  );

  return gradeEntry ? gradeEntry.indianEquivalent : 'E';
};

/**
 * Calculate overall percentage from subject grades
 */
export const calculateOverallPercentage = (
  subjectGrades: SubjectGrade[]
): number => {
  if (subjectGrades.length === 0) return 0;

  const totalPoints = subjectGrades.reduce((sum, subject) => sum + subject.points, 0);
  return Math.round(totalPoints / subjectGrades.length);
};

/**
 * Check if grade meets minimum requirement
 */
export const meetsMinimumGrade = (
  grade: string | number,
  gradingSystemId: string,
  minimumPoints: number = 40
): boolean => {
  const points = convertToIndianPoints(grade, gradingSystemId);
  return points >= minimumPoints;
};

/**
 * Convert subject grades to standardized format
 */
export const standardizeSubjectGrades = (
  subjects: Array<{ name: string; grade: string | number }>,
  gradingSystemId: string
): SubjectGrade[] => {
  return subjects.map((subject, index) => ({
    subjectId: `SUBJ_${index + 1}`,
    subjectName: subject.name,
    grade: subject.grade,
    points: convertToIndianPoints(subject.grade, gradingSystemId),
    indianEquivalent: getIndianEquivalentGrade(subject.grade, gradingSystemId)
  }));
};

/**
 * Get grade description from grading system
 */
export const getGradeDescription = (
  grade: string | number,
  gradingSystemId: string
): string => {
  const gradingSystem = gradingSystems[gradingSystemId];
  if (!gradingSystem) {
    return 'Unknown';
  }

  const gradeEntry = gradingSystem.scale.grades.find(g => 
    g.value.toString() === grade.toString()
  );

  return gradeEntry ? gradeEntry.description : 'Unknown';
};

/**
 * Validate grade against grading system
 */
export const isValidGrade = (
  grade: string | number,
  gradingSystemId: string
): boolean => {
  const gradingSystem = gradingSystems[gradingSystemId];
  if (!gradingSystem) {
    return false;
  }

  return gradingSystem.scale.grades.some(g => 
    g.value.toString() === grade.toString()
  );
};

/**
 * Get all valid grades for a grading system
 */
export const getValidGrades = (gradingSystemId: string): (string | number)[] => {
  const gradingSystem = gradingSystems[gradingSystemId];
  if (!gradingSystem) {
    return [];
  }

  return gradingSystem.scale.grades.map(g => g.value);
};

/**
 * Compare two grades within the same grading system
 */
export const compareGrades = (
  grade1: string | number,
  grade2: string | number,
  gradingSystemId: string
): number => {
  const points1 = convertToIndianPoints(grade1, gradingSystemId);
  const points2 = convertToIndianPoints(grade2, gradingSystemId);
  
  return points1 - points2; // Higher points = better grade
};

/**
 * Get grade statistics for a set of subjects
 */
export const getGradeStatistics = (
  subjectGrades: SubjectGrade[]
) => {
  if (subjectGrades.length === 0) {
    return {
      average: 0,
      highest: 0,
      lowest: 0,
      passingSubjects: 0,
      totalSubjects: 0
    };
  }

  const points = subjectGrades.map(s => s.points);
  const passingThreshold = 40;

  return {
    average: Math.round(points.reduce((sum, p) => sum + p, 0) / points.length),
    highest: Math.max(...points),
    lowest: Math.min(...points),
    passingSubjects: points.filter(p => p >= passingThreshold).length,
    totalSubjects: points.length
  };
};