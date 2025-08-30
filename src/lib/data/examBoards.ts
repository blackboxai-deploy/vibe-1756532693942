import { ExamBoard, EducationSystem, GradingSystem } from '../types/calculator';

// Grading Systems
export const gradingSystems: Record<string, GradingSystem> = {
  WAEC_9POINT: {
    id: 'WAEC_9POINT',
    name: 'WAEC 9-Point Scale',
    type: 'numeric',
    scale: {
      min: 1,
      max: 9,
      grades: [
        { value: 1, points: 90, description: 'Excellent', indianEquivalent: 'A1' },
        { value: 2, points: 80, description: 'Very Good', indianEquivalent: 'A2' },
        { value: 3, points: 70, description: 'Good', indianEquivalent: 'B1' },
        { value: 4, points: 60, description: 'Credit', indianEquivalent: 'B2' },
        { value: 5, points: 50, description: 'Credit', indianEquivalent: 'C1' },
        { value: 6, points: 45, description: 'Credit', indianEquivalent: 'C2' },
        { value: 7, points: 40, description: 'Pass', indianEquivalent: 'D1' },
        { value: 8, points: 35, description: 'Pass', indianEquivalent: 'D2' },
        { value: 9, points: 30, description: 'Fail', indianEquivalent: 'E' }
      ]
    },
    passingGrade: '6',
    description: 'West African Examinations Council 9-point grading system'
  },
  
  CAMBRIDGE_ALEVEL: {
    id: 'CAMBRIDGE_ALEVEL',
    name: 'Cambridge A-Level',
    type: 'letter',
    scale: {
      min: 'E',
      max: 'A*',
      grades: [
        { value: 'A*', points: 95, description: 'Distinction', indianEquivalent: 'A1' },
        { value: 'A', points: 85, description: 'Distinction', indianEquivalent: 'A2' },
        { value: 'B', points: 75, description: 'Merit', indianEquivalent: 'B1' },
        { value: 'C', points: 65, description: 'Merit', indianEquivalent: 'B2' },
        { value: 'D', points: 55, description: 'Pass', indianEquivalent: 'C1' },
        { value: 'E', points: 45, description: 'Pass', indianEquivalent: 'C2' }
      ]
    },
    passingGrade: 'E',
    description: 'Cambridge International A-Level grading system'
  },

  KCSE_12POINT: {
    id: 'KCSE_12POINT',
    name: 'KCSE 12-Point Scale',
    type: 'letter',
    scale: {
      min: 'E',
      max: 'A',
      grades: [
        { value: 'A', points: 90, description: 'Excellent', indianEquivalent: 'A1' },
        { value: 'A-', points: 85, description: 'Very Good', indianEquivalent: 'A2' },
        { value: 'B+', points: 80, description: 'Good', indianEquivalent: 'B1' },
        { value: 'B', points: 75, description: 'Good', indianEquivalent: 'B1' },
        { value: 'B-', points: 70, description: 'Credit', indianEquivalent: 'B2' },
        { value: 'C+', points: 65, description: 'Credit', indianEquivalent: 'C1' },
        { value: 'C', points: 60, description: 'Credit', indianEquivalent: 'C1' },
        { value: 'C-', points: 55, description: 'Pass', indianEquivalent: 'C2' },
        { value: 'D+', points: 50, description: 'Pass', indianEquivalent: 'D1' },
        { value: 'D', points: 45, description: 'Pass', indianEquivalent: 'D2' },
        { value: 'D-', points: 40, description: 'Pass', indianEquivalent: 'E' },
        { value: 'E', points: 35, description: 'Fail', indianEquivalent: 'E' }
      ]
    },
    passingGrade: 'D-',
    description: 'Kenya Certificate of Secondary Education grading system'
  },

  ZIMSEC_SYMBOL: {
    id: 'ZIMSEC_SYMBOL',
    name: 'ZIMSEC Symbol System',
    type: 'numeric',
    scale: {
      min: 1,
      max: 9,
      grades: [
        { value: 1, points: 90, description: 'Outstanding', indianEquivalent: 'A1' },
        { value: 2, points: 80, description: 'Excellent', indianEquivalent: 'A2' },
        { value: 3, points: 70, description: 'Very Good', indianEquivalent: 'B1' },
        { value: 4, points: 60, description: 'Good', indianEquivalent: 'B2' },
        { value: 5, points: 50, description: 'Credit', indianEquivalent: 'C1' },
        { value: 6, points: 45, description: 'Pass', indianEquivalent: 'C2' },
        { value: 7, points: 40, description: 'Pass', indianEquivalent: 'D1' },
        { value: 8, points: 35, description: 'Marginal Fail', indianEquivalent: 'D2' },
        { value: 9, points: 30, description: 'Fail', indianEquivalent: 'E' }
      ]
    },
    passingGrade: '6',
    description: 'Zimbabwe School Examinations Council grading system'
  },

  NSC_7LEVEL: {
    id: 'NSC_7LEVEL',
    name: 'South African NSC',
    type: 'numeric',
    scale: {
      min: 1,
      max: 7,
      grades: [
        { value: 7, points: 85, description: 'Outstanding Achievement', indianEquivalent: 'A1' },
        { value: 6, points: 75, description: 'Meritorious Achievement', indianEquivalent: 'A2' },
        { value: 5, points: 65, description: 'Substantial Achievement', indianEquivalent: 'B1' },
        { value: 4, points: 55, description: 'Adequate Achievement', indianEquivalent: 'B2' },
        { value: 3, points: 45, description: 'Moderate Achievement', indianEquivalent: 'C1' },
        { value: 2, points: 35, description: 'Elementary Achievement', indianEquivalent: 'C2' },
        { value: 1, points: 25, description: 'Not Achieved', indianEquivalent: 'E' }
      ]
    },
    passingGrade: '3',
    description: 'South African National Senior Certificate grading system'
  },

  BAC_20POINT: {
    id: 'BAC_20POINT',
    name: 'Baccalauréat',
    type: 'numeric',
    scale: {
      min: 0,
      max: 20,
      grades: [
        { value: 20, points: 100, description: 'Excellent', indianEquivalent: 'A1' },
        { value: 18, points: 95, description: 'Très Bien', indianEquivalent: 'A1' },
        { value: 16, points: 85, description: 'Bien', indianEquivalent: 'A2' },
        { value: 14, points: 75, description: 'Assez Bien', indianEquivalent: 'B1' },
        { value: 12, points: 65, description: 'Passable', indianEquivalent: 'B2' },
        { value: 10, points: 55, description: 'Passable', indianEquivalent: 'C1' },
        { value: 8, points: 45, description: 'Insufficient', indianEquivalent: 'C2' },
        { value: 6, points: 35, description: 'Poor', indianEquivalent: 'D1' },
        { value: 4, points: 25, description: 'Very Poor', indianEquivalent: 'E' }
      ]
    },
    passingGrade: '10',
    description: 'French Baccalauréat 20-point system'
  }
};

// Education Systems
export const educationSystems: Record<string, EducationSystem> = {
  WAEC: {
    id: 'WAEC',
    name: 'West African Examinations Council',
    countryCode: 'multi',
    examBoards: ['WAEC_SSCE', 'WAEC_GCE'],
    description: 'West African Senior School Certificate Examination'
  },
  NECO: {
    id: 'NECO',
    name: 'National Examinations Council',
    countryCode: 'NG',
    examBoards: ['NECO_SSCE'],
    description: 'National Examinations Council Senior School Certificate Examination'
  },
  KCSE: {
    id: 'KCSE',
    name: 'Kenya Certificate of Secondary Education',
    countryCode: 'KE',
    examBoards: ['KNEC'],
    description: 'Kenya National Examinations Council'
  },
  ZIMSEC: {
    id: 'ZIMSEC',
    name: 'Zimbabwe School Examinations Council',
    countryCode: 'ZW',
    examBoards: ['ZIMSEC_ORDINARY', 'ZIMSEC_ADVANCED'],
    description: 'Zimbabwe Ordinary and Advanced Level Examinations'
  },
  NSC: {
    id: 'NSC',
    name: 'National Senior Certificate',
    countryCode: 'ZA',
    examBoards: ['DBE', 'IEB'],
    description: 'South African National Senior Certificate'
  },
  BAC: {
    id: 'BAC',
    name: 'Baccalauréat',
    countryCode: 'multi',
    examBoards: ['FRENCH_BAC'],
    description: 'French Baccalauréat system used in Francophone Africa'
  },
  CAMBRIDGE: {
    id: 'CAMBRIDGE',
    name: 'Cambridge International',
    countryCode: 'multi',
    examBoards: ['CAMBRIDGE_IGCSE', 'CAMBRIDGE_ALEVEL'],
    description: 'Cambridge International Examinations'
  }
};

// Exam Boards
export const examBoards: Record<string, ExamBoard> = {
  WAEC_SSCE: {
    id: 'WAEC_SSCE',
    name: 'WAEC SSCE',
    fullName: 'West African Senior School Certificate Examination',
    countries: ['NG', 'GH', 'SL', 'LR', 'GM'],
    gradingSystem: gradingSystems.WAEC_9POINT,
    subjects: [
      'English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics',
      'Geography', 'History', 'Economics', 'Government', 'Literature in English',
      'French', 'Agricultural Science', 'Technical Drawing', 'Fine Arts'
    ]
  },

  NECO_SSCE: {
    id: 'NECO_SSCE',
    name: 'NECO SSCE',
    fullName: 'National Examinations Council Senior School Certificate Examination',
    countries: ['NG'],
    gradingSystem: gradingSystems.WAEC_9POINT,
    subjects: [
      'English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics',
      'Geography', 'History', 'Economics', 'Government', 'Literature in English',
      'Civic Education', 'Agricultural Science', 'Commerce', 'Accounting'
    ]
  },

  KNEC: {
    id: 'KNEC',
    name: 'KCSE',
    fullName: 'Kenya Certificate of Secondary Education',
    countries: ['KE'],
    gradingSystem: gradingSystems.KCSE_12POINT,
    subjects: [
      'English', 'Kiswahili', 'Mathematics', 'Biology', 'Chemistry', 'Physics',
      'Geography', 'History & Government', 'Business Studies', 'Computer Studies',
      'Agriculture', 'French', 'German', 'Arabic'
    ]
  },

  ZIMSEC_ORDINARY: {
    id: 'ZIMSEC_ORDINARY',
    name: 'ZIMSEC O-Level',
    fullName: 'Zimbabwe Ordinary Level',
    countries: ['ZW'],
    gradingSystem: gradingSystems.ZIMSEC_SYMBOL,
    subjects: [
      'English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics',
      'Geography', 'History', 'Economics', 'Accounting', 'Commerce',
      'Literature in English', 'Shona', 'Ndebele', 'French'
    ]
  },

  ZIMSEC_ADVANCED: {
    id: 'ZIMSEC_ADVANCED',
    name: 'ZIMSEC A-Level',
    fullName: 'Zimbabwe Advanced Level',
    countries: ['ZW'],
    gradingSystem: gradingSystems.ZIMSEC_SYMBOL,
    subjects: [
      'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics',
      'Geography', 'History', 'Literature in English', 'Divinity'
    ]
  },

  DBE: {
    id: 'DBE',
    name: 'DBE NSC',
    fullName: 'Department of Basic Education National Senior Certificate',
    countries: ['ZA'],
    gradingSystem: gradingSystems.NSC_7LEVEL,
    subjects: [
      'English', 'Mathematics', 'Mathematical Literacy', 'Physical Sciences',
      'Life Sciences', 'Geography', 'History', 'Economics', 'Accounting',
      'Business Studies', 'Information Technology', 'Life Orientation'
    ]
  },

  CAMBRIDGE_ALEVEL: {
    id: 'CAMBRIDGE_ALEVEL',
    name: 'Cambridge A-Level',
    fullName: 'Cambridge International Advanced Level',
    countries: ['MU', 'SC', 'CM'],
    gradingSystem: gradingSystems.CAMBRIDGE_ALEVEL,
    subjects: [
      'Mathematics', 'Further Mathematics', 'Physics', 'Chemistry', 'Biology',
      'Economics', 'Business Studies', 'Accounting', 'Geography', 'History',
      'English Language', 'Literature in English', 'French', 'Computer Science'
    ]
  },

  FRENCH_BAC: {
    id: 'FRENCH_BAC',
    name: 'Baccalauréat',
    fullName: 'French Baccalauréat',
    countries: ['SN', 'CI', 'CM', 'MA', 'TN', 'DZ'],
    gradingSystem: gradingSystems.BAC_20POINT,
    subjects: [
      'Mathématiques', 'Physique-Chimie', 'Sciences de la Vie et de la Terre',
      'Histoire-Géographie', 'Français', 'Philosophie', 'Langues Vivantes',
      'Économie', 'Sciences Économiques et Sociales'
    ]
  }
};

export const getExamBoardsByCountry = (countryCode: string): ExamBoard[] => {
  return Object.values(examBoards).filter(board => 
    board.countries.includes(countryCode)
  );
};

export const getEducationSystemsByCountry = (countryCode: string): EducationSystem[] => {
  return Object.values(educationSystems).filter(system => 
    system.countryCode === countryCode || system.countryCode === 'multi'
  );
};