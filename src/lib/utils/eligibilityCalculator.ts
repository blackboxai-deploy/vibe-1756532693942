import { 
  EligibilityResult, 
  EligibilityBreakdown, 
  RequirementDetail, 
  SubjectGrade, 
  UniversityStream,
  CalculatorFormData 
} from '../types/calculator';
import { indianRequirements, getCoreSubjectsForStream, getIndianEquivalent } from '../data/subjects';
import { calculateOverallPercentage, meetsMinimumGrade } from './gradeConverter';

/**
 * Calculate eligibility for Indian universities
 */
export const calculateEligibility = (
  formData: CalculatorFormData,
  gradingSystemId: string
): EligibilityResult => {
  const requirement = indianRequirements[formData.targetStream];
  const breakdown = analyzeRequirements(formData, requirement, gradingSystemId);
  const overallScore = calculateOverallPercentage(formData.subjects);

  const isEligible = 
    breakdown.coreSubjectsMet &&
    breakdown.minimumGradeMet &&
    breakdown.streamSpecificRequirements &&
    overallScore >= requirement.minimumAggregate;

  return {
    isEligible,
    overallScore,
    minimumRequired: requirement.minimumAggregate,
    stream: formData.targetStream,
    breakdown,
    recommendations: generateRecommendations(formData, breakdown, overallScore, requirement.minimumAggregate),
    nextSteps: generateNextSteps(isEligible, formData.targetStream)
  };
};

/**
 * Analyze requirements against student record
 */
const analyzeRequirements = (
  formData: CalculatorFormData,
  requirement: typeof indianRequirements[UniversityStream],
  gradingSystemId: string
): EligibilityBreakdown => {
  const details: RequirementDetail[] = [];
  
  // Check core subjects
  const coreSubjects = requirement.coreSubjects;
  const studentSubjects = formData.subjects.map(s => s.subjectName);
  const coreSubjectsMet = checkCoreSubjects(studentSubjects, coreSubjects, details);
  
  // Check minimum grades
  const minimumGradeMet = checkMinimumGrades(formData.subjects, gradingSystemId, details);
  
  // Check stream-specific requirements
  const streamSpecificRequirements = checkStreamSpecificRequirements(
    formData, 
    requirement, 
    gradingSystemId, 
    details
  );

  return {
    totalSubjects: formData.subjects.length,
    coreSubjectsMet,
    minimumGradeMet,
    streamSpecificRequirements,
    details
  };
};

/**
 * Check if core subjects are present
 */
const checkCoreSubjects = (
  studentSubjects: string[],
  requiredCoreSubjects: string[],
  details: RequirementDetail[]
): boolean => {
  const missingCoreSubjects: string[] = [];
  const presentCoreSubjects: string[] = [];

  requiredCoreSubjects.forEach(coreSubject => {
    const hasSubject = studentSubjects.some(studentSubject => {
      const equivalents = getIndianEquivalent(studentSubject);
      return equivalents.includes(coreSubject) || studentSubject === coreSubject;
    });

    if (hasSubject) {
      presentCoreSubjects.push(coreSubject);
    } else {
      missingCoreSubjects.push(coreSubject);
    }
  });

  details.push({
    requirement: 'Core Subjects',
    status: missingCoreSubjects.length === 0 ? 'met' : 'partial',
    description: `Required: ${requiredCoreSubjects.join(', ')}`,
    currentValue: `Present: ${presentCoreSubjects.join(', ')}`,
    requiredValue: missingCoreSubjects.length > 0 ? `Missing: ${missingCoreSubjects.join(', ')}` : undefined
  });

  return missingCoreSubjects.length === 0;
};

/**
 * Check if minimum grades are met
 */
const checkMinimumGrades = (
  subjects: SubjectGrade[],
  gradingSystemId: string,
  details: RequirementDetail[]
): boolean => {
  const minimumThreshold = 40; // 40% minimum
  const failingSubjects = subjects.filter(subject => 
    !meetsMinimumGrade(subject.grade, gradingSystemId, minimumThreshold)
  );

  const averageScore = subjects.length > 0 
    ? Math.round(subjects.reduce((sum, s) => sum + s.points, 0) / subjects.length)
    : 0;

  details.push({
    requirement: 'Minimum Grade Threshold',
    status: failingSubjects.length === 0 ? 'met' : 'not-met',
    description: `All subjects must have minimum ${minimumThreshold}% equivalent`,
    currentValue: `Average: ${averageScore}%, Failing subjects: ${failingSubjects.length}`,
    requiredValue: failingSubjects.length > 0 ? 
      `Improve: ${failingSubjects.map(s => s.subjectName).join(', ')}` : undefined
  });

  return failingSubjects.length === 0;
};

/**
 * Check stream-specific requirements
 */
const checkStreamSpecificRequirements = (
  formData: CalculatorFormData,
  requirement: typeof indianRequirements[UniversityStream],
  _gradingSystemId: string,
  details: RequirementDetail[]
): boolean => {
  const streamRequirements = requirement.additionalRequirements;
  let allMet = true;

  // Check for English language requirement
  const hasEnglish = formData.subjects.some(subject => 
    subject.subjectName.toLowerCase().includes('english')
  );

  if (!hasEnglish) {
    allMet = false;
    details.push({
      requirement: 'English Language',
      status: 'not-met',
      description: 'English is mandatory for Indian universities',
      currentValue: 'Not found in subjects',
      requiredValue: 'English Language or Literature required'
    });
  }

  // Age requirement for Medical stream
  if (formData.targetStream === 'Medical') {
    const currentYear = new Date().getFullYear();
    const age = currentYear - formData.completionYear + 18; // Approximate age
    const isAgeEligible = age >= 17 && age <= 25;
    
    if (!isAgeEligible) {
      allMet = false;
      details.push({
        requirement: 'Age Limit',
        status: 'not-met',
        description: 'Medical courses have age restrictions (17-25 years)',
        currentValue: `Estimated age: ${age}`,
        requiredValue: '17-25 years at time of admission'
      });
    }
  }

  // Subject-specific minimum scores for Engineering and Medical
  if (formData.targetStream === 'Engineering' || formData.targetStream === 'Medical') {
    const coreSubjectMinimum = formData.targetStream === 'Engineering' ? 60 : 70;
    const coreSubjects = getCoreSubjectsForStream(formData.targetStream);
    
    const failingCoreSubjects = formData.subjects.filter(subject => {
      const equivalents = getIndianEquivalent(subject.subjectName);
      const isCoreSubject = coreSubjects.some(core => equivalents.includes(core));
      return isCoreSubject && subject.points < coreSubjectMinimum;
    });

    if (failingCoreSubjects.length > 0) {
      allMet = false;
      details.push({
        requirement: 'Core Subject Minimum',
        status: 'not-met',
        description: `${formData.targetStream} requires ${coreSubjectMinimum}% in each core subject`,
        currentValue: `Failing subjects: ${failingCoreSubjects.map(s => `${s.subjectName} (${s.points}%)`).join(', ')}`,
        requiredValue: `Minimum ${coreSubjectMinimum}% in each core subject`
      });
    }
  }

  details.push({
    requirement: 'Stream-Specific Requirements',
    status: allMet ? 'met' : 'partial',
    description: streamRequirements.join('; '),
    currentValue: allMet ? 'All requirements satisfied' : 'Some requirements not met',
    requiredValue: undefined
  });

  return allMet;
};

/**
 * Generate personalized recommendations
 */
const generateRecommendations = (
  formData: CalculatorFormData,
  breakdown: EligibilityBreakdown,
  overallScore: number,
  minimumRequired: number
): string[] => {
  const recommendations: string[] = [];

  if (overallScore < minimumRequired) {
    recommendations.push(
      `Improve overall average to ${minimumRequired}%. Current: ${overallScore}%`
    );
  }

  if (!breakdown.coreSubjectsMet) {
    recommendations.push(
      'Complete missing core subjects through supplementary exams or equivalent courses'
    );
  }

  if (!breakdown.minimumGradeMet) {
    recommendations.push(
      'Retake subjects with grades below 40% equivalent'
    );
  }

  // Stream-specific recommendations
  if (formData.targetStream === 'Engineering') {
    recommendations.push(
      'Prepare for JEE Main examination',
      'Consider coaching for entrance exams',
      'Focus on Mathematics and Physics concepts'
    );
  } else if (formData.targetStream === 'Medical') {
    recommendations.push(
      'Prepare for NEET examination',
      'Strengthen Biology, Physics, and Chemistry knowledge',
      'Consider medical entrance coaching'
    );
  }

  if (overallScore >= minimumRequired * 0.8 && overallScore < minimumRequired) {
    recommendations.push(
      'You are close to eligibility. Consider improving 1-2 subject grades',
      'Apply to private universities with slightly lower requirements'
    );
  }

  return recommendations;
};

/**
 * Generate next steps based on eligibility
 */
const generateNextSteps = (isEligible: boolean, stream: UniversityStream): string[] => {
  const nextSteps: string[] = [];

  if (isEligible) {
    nextSteps.push(
      'Congratulations! You meet the basic eligibility criteria',
      'Apply for AIU (Association of Indian Universities) recognition',
      'Get your documents attested by Indian Embassy/Consulate',
      'Apply directly to universities of your choice',
      'Prepare for required entrance examinations'
    );

    if (stream === 'Engineering') {
      nextSteps.push(
        'Register for JEE Main examination',
        'Consider JEE Advanced for IITs (if JEE Main qualified)'
      );
    } else if (stream === 'Medical') {
      nextSteps.push(
        'Register for NEET examination',
        'Complete NEET eligibility certificate process'
      );
    }
  } else {
    nextSteps.push(
      'Complete missing requirements before applying',
      'Consider foundation courses to bridge gaps',
      'Explore alternative pathways like diploma programs',
      'Consult with Indian education consultants in your region'
    );
  }

  nextSteps.push(
    'Visit official university websites for specific requirements',
    'Contact admission offices for personalized guidance'
  );

  return nextSteps;
};