import { Subject, SubjectCategory, IndianRequirement, UniversityStream } from '../types/calculator';

// Subject mappings between African and Indian systems
export const subjectMappings: Record<string, Subject> = {
  // Mathematics
  'Mathematics': {
    id: 'MATH_001',
    name: 'Mathematics',
    examBoard: 'multiple',
    category: 'Mathematics',
    indianEquivalents: ['Mathematics', 'Applied Mathematics'],
    isCore: true
  },
  'Further Mathematics': {
    id: 'MATH_002',
    name: 'Further Mathematics',
    examBoard: 'multiple',
    category: 'Mathematics',
    indianEquivalents: ['Mathematics', 'Applied Mathematics'],
    isCore: true
  },
  'Mathematical Literacy': {
    id: 'MATH_003',
    name: 'Mathematical Literacy',
    examBoard: 'DBE',
    category: 'Mathematics',
    indianEquivalents: ['Mathematics'],
    isCore: true
  },

  // Sciences
  'Physics': {
    id: 'SCI_001',
    name: 'Physics',
    examBoard: 'multiple',
    category: 'Sciences',
    indianEquivalents: ['Physics'],
    isCore: true
  },
  'Chemistry': {
    id: 'SCI_002',
    name: 'Chemistry',
    examBoard: 'multiple',
    category: 'Sciences',
    indianEquivalents: ['Chemistry'],
    isCore: true
  },
  'Biology': {
    id: 'SCI_003',
    name: 'Biology',
    examBoard: 'multiple',
    category: 'Sciences',
    indianEquivalents: ['Biology', 'Botany', 'Zoology'],
    isCore: true
  },
  'Life Sciences': {
    id: 'SCI_004',
    name: 'Life Sciences',
    examBoard: 'DBE',
    category: 'Sciences',
    indianEquivalents: ['Biology', 'Botany', 'Zoology'],
    isCore: true
  },
  'Physical Sciences': {
    id: 'SCI_005',
    name: 'Physical Sciences',
    examBoard: 'DBE',
    category: 'Sciences',
    indianEquivalents: ['Physics', 'Chemistry'],
    isCore: true
  },
  'Agricultural Science': {
    id: 'SCI_006',
    name: 'Agricultural Science',
    examBoard: 'multiple',
    category: 'Sciences',
    indianEquivalents: ['Agriculture', 'Biology'],
    isCore: false
  },

  // Languages
  'English Language': {
    id: 'LANG_001',
    name: 'English Language',
    examBoard: 'multiple',
    category: 'Languages',
    indianEquivalents: ['English'],
    isCore: true
  },
  'English': {
    id: 'LANG_002',
    name: 'English',
    examBoard: 'multiple',
    category: 'Languages',
    indianEquivalents: ['English'],
    isCore: true
  },
  'Literature in English': {
    id: 'LANG_003',
    name: 'Literature in English',
    examBoard: 'multiple',
    category: 'Languages',
    indianEquivalents: ['English Literature'],
    isCore: false
  },
  'French': {
    id: 'LANG_004',
    name: 'French',
    examBoard: 'multiple',
    category: 'Languages',
    indianEquivalents: ['French'],
    isCore: false
  },
  'Français': {
    id: 'LANG_005',
    name: 'Français',
    examBoard: 'FRENCH_BAC',
    category: 'Languages',
    indianEquivalents: ['French'],
    isCore: true
  },
  'Kiswahili': {
    id: 'LANG_006',
    name: 'Kiswahili',
    examBoard: 'KNEC',
    category: 'Languages',
    indianEquivalents: ['Regional Language'],
    isCore: false
  },

  // Social Studies
  'Geography': {
    id: 'SOC_001',
    name: 'Geography',
    examBoard: 'multiple',
    category: 'Social Studies',
    indianEquivalents: ['Geography'],
    isCore: false
  },
  'History': {
    id: 'SOC_002',
    name: 'History',
    examBoard: 'multiple',
    category: 'Social Studies',
    indianEquivalents: ['History'],
    isCore: false
  },
  'History & Government': {
    id: 'SOC_003',
    name: 'History & Government',
    examBoard: 'KNEC',
    category: 'Social Studies',
    indianEquivalents: ['History', 'Political Science'],
    isCore: false
  },
  'Government': {
    id: 'SOC_004',
    name: 'Government',
    examBoard: 'multiple',
    category: 'Social Studies',
    indianEquivalents: ['Political Science', 'Civics'],
    isCore: false
  },
  'Civic Education': {
    id: 'SOC_005',
    name: 'Civic Education',
    examBoard: 'NECO_SSCE',
    category: 'Social Studies',
    indianEquivalents: ['Civics', 'Political Science'],
    isCore: false
  },

  // Commerce & Economics
  'Economics': {
    id: 'COM_001',
    name: 'Economics',
    examBoard: 'multiple',
    category: 'Commerce',
    indianEquivalents: ['Economics'],
    isCore: false
  },
  'Accounting': {
    id: 'COM_002',
    name: 'Accounting',
    examBoard: 'multiple',
    category: 'Commerce',
    indianEquivalents: ['Accountancy'],
    isCore: false
  },
  'Commerce': {
    id: 'COM_003',
    name: 'Commerce',
    examBoard: 'multiple',
    category: 'Commerce',
    indianEquivalents: ['Commerce', 'Business Studies'],
    isCore: false
  },
  'Business Studies': {
    id: 'COM_004',
    name: 'Business Studies',
    examBoard: 'multiple',
    category: 'Commerce',
    indianEquivalents: ['Business Studies', 'Commerce'],
    isCore: false
  },

  // Technical & Computer
  'Computer Studies': {
    id: 'TECH_001',
    name: 'Computer Studies',
    examBoard: 'multiple',
    category: 'Technical',
    indianEquivalents: ['Computer Science', 'Informatics Practices'],
    isCore: false
  },
  'Computer Science': {
    id: 'TECH_002',
    name: 'Computer Science',
    examBoard: 'multiple',
    category: 'Technical',
    indianEquivalents: ['Computer Science'],
    isCore: false
  },
  'Information Technology': {
    id: 'TECH_003',
    name: 'Information Technology',
    examBoard: 'multiple',
    category: 'Technical',
    indianEquivalents: ['Computer Science', 'Informatics Practices'],
    isCore: false
  },
  'Technical Drawing': {
    id: 'TECH_004',
    name: 'Technical Drawing',
    examBoard: 'multiple',
    category: 'Technical',
    indianEquivalents: ['Engineering Drawing'],
    isCore: false
  },

  // Arts
  'Fine Arts': {
    id: 'ART_001',
    name: 'Fine Arts',
    examBoard: 'multiple',
    category: 'Arts',
    indianEquivalents: ['Fine Arts', 'Visual Arts'],
    isCore: false
  },
  'Philosophie': {
    id: 'ART_002',
    name: 'Philosophie',
    examBoard: 'FRENCH_BAC',
    category: 'Arts',
    indianEquivalents: ['Philosophy'],
    isCore: false
  }
};

// Indian University Requirements by Stream
export const indianRequirements: Record<UniversityStream, IndianRequirement> = {
  'Engineering': {
    stream: 'Engineering',
    minimumAggregate: 75,
    coreSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    additionalRequirements: [
      'Minimum 60% in each core subject',
      'English as mandatory subject',
      'JEE Main qualification required'
    ],
    description: 'Requirements for Engineering colleges and NITs'
  },

  'Medical': {
    stream: 'Medical',
    minimumAggregate: 85,
    coreSubjects: ['Physics', 'Chemistry', 'Biology'],
    additionalRequirements: [
      'Minimum 70% in each core subject',
      'English as mandatory subject',
      'NEET qualification required',
      'Age limit: 17-25 years'
    ],
    description: 'Requirements for Medical colleges (MBBS, BDS, etc.)'
  },

  'Science': {
    stream: 'Science',
    minimumAggregate: 60,
    coreSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    additionalRequirements: [
      'Minimum 50% in each core subject',
      'English as mandatory subject',
      'Biology required for Life Sciences'
    ],
    description: 'Requirements for BSc programs'
  },

  'Commerce': {
    stream: 'Commerce',
    minimumAggregate: 55,
    coreSubjects: ['Mathematics', 'Economics', 'Accountancy'],
    additionalRequirements: [
      'Minimum 45% in each core subject',
      'English as mandatory subject',
      'Business Studies preferred'
    ],
    description: 'Requirements for BCom programs'
  },

  'Arts': {
    stream: 'Arts',
    minimumAggregate: 50,
    coreSubjects: ['English', 'History', 'Geography'],
    additionalRequirements: [
      'Minimum 40% in each subject',
      'Any combination of Arts subjects',
      'Regional language preferred'
    ],
    description: 'Requirements for BA programs'
  },

  'General': {
    stream: 'General',
    minimumAggregate: 50,
    coreSubjects: ['English', 'Mathematics'],
    additionalRequirements: [
      'Minimum 40% in core subjects',
      'Any four additional subjects',
      '10+2 pattern completion'
    ],
    description: 'General requirements for most undergraduate programs'
  }
};

// Get subjects by category
export const getSubjectsByCategory = (category: SubjectCategory): Subject[] => {
  return Object.values(subjectMappings).filter(subject => subject.category === category);
};

// Get core subjects for a stream
export const getCoreSubjectsForStream = (stream: UniversityStream): string[] => {
  return indianRequirements[stream].coreSubjects;
};

// Get Indian equivalent subjects
export const getIndianEquivalent = (africanSubject: string): string[] => {
  const subject = subjectMappings[africanSubject];
  return subject ? subject.indianEquivalents : [africanSubject];
};

// Check if subject is core for any stream
export const isCoreSubject = (subjectName: string): boolean => {
  const subject = Object.values(subjectMappings).find(s => s.name === subjectName);
  return subject ? subject.isCore : false;
};