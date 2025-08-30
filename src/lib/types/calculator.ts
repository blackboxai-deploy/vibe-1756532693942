// Core types for the eligibility calculator

export interface Country {
  code: string;
  name: string;
  region: string;
  educationSystems: string[];
}

export interface EducationSystem {
  id: string;
  name: string;
  countryCode: string;
  examBoards: string[];
  description: string;
}

export interface ExamBoard {
  id: string;
  name: string;
  fullName: string;
  countries: string[];
  gradingSystem: GradingSystem;
  subjects: string[];
}

export interface GradingSystem {
  id: string;
  name: string;
  type: 'letter' | 'numeric' | 'percentage' | 'gpa';
  scale: GradeScale;
  passingGrade: string;
  description: string;
}

export interface GradeScale {
  min: string | number;
  max: string | number;
  grades: Grade[];
}

export interface Grade {
  value: string | number;
  points: number;
  description: string;
  indianEquivalent: string;
}

export interface Subject {
  id: string;
  name: string;
  examBoard: string;
  category: SubjectCategory;
  indianEquivalents: string[];
  isCore: boolean;
}

export type SubjectCategory = 
  | 'Mathematics'
  | 'Sciences'
  | 'Languages'
  | 'Social Studies'
  | 'Arts'
  | 'Technical'
  | 'Commerce';

export interface StudentRecord {
  id: string;
  country: string;
  educationSystem: string;
  examBoard: string;
  subjects: SubjectGrade[];
  completionYear: number;
}

export interface SubjectGrade {
  subjectId: string;
  subjectName: string;
  grade: string | number;
  points: number;
  indianEquivalent: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  overallScore: number;
  minimumRequired: number;
  stream: UniversityStream;
  breakdown: EligibilityBreakdown;
  recommendations: string[];
  nextSteps: string[];
}

export interface EligibilityBreakdown {
  totalSubjects: number;
  coreSubjectsMet: boolean;
  minimumGradeMet: boolean;
  streamSpecificRequirements: boolean;
  details: RequirementDetail[];
}

export interface RequirementDetail {
  requirement: string;
  status: 'met' | 'not-met' | 'partial';
  description: string;
  currentValue?: string;
  requiredValue?: string;
}

export type UniversityStream = 
  | 'Engineering'
  | 'Medical'
  | 'Commerce'
  | 'Arts'
  | 'Science'
  | 'General';

export interface IndianRequirement {
  stream: UniversityStream;
  minimumAggregate: number;
  coreSubjects: string[];
  additionalRequirements: string[];
  description: string;
}

// Form state types
export interface CalculatorFormData {
  country: string;
  educationSystem: string;
  examBoard: string;
  subjects: SubjectGrade[];
  targetStream: UniversityStream;
  completionYear: number;
}

export interface CalculatorStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}