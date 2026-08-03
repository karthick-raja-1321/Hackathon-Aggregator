export type PrimaryCategory = 
  | 'Government' 
  | 'Industry' 
  | 'Startup' 
  | 'Academic' 
  | 'Research' 
  | 'International';

export type SecondaryCategory = 
  | 'Hackathon' 
  | 'Ideathon' 
  | 'Coding Competition'
  | 'Programming Contest'
  | 'Innovation Challenge' 
  | 'Startup Competition'
  | 'Research Competition'
  | 'Open Innovation Program'
  | 'Workshop' 
  | 'Bootcamp'
  | 'Webinar'
  | 'Fellowship'
  | 'Grant' 
  | 'Scholarship'
  | 'Incubation Program'
  | 'Internship' 
  | 'Hiring Challenge'
  | 'Campus Challenge';

export type TechnologyTag = 
  | 'Artificial Intelligence' 
  | 'Machine Learning' 
  | 'Deep Learning'
  | 'Data Science'
  | 'Cyber Security' 
  | 'Cloud Computing' 
  | 'Blockchain' 
  | 'Internet of Things' 
  | 'IoT'
  | 'Quantum Computing' 
  | 'Robotics' 
  | 'Embedded Systems'
  | 'Healthcare Tech' 
  | 'EdTech' 
  | 'AgriTech' 
  | 'Clean Energy' 
  | 'FinTech' 
  | 'Web Development' 
  | 'Mobile Development'
  | 'Mobile App Dev';

export type EventMode = 'Online' | 'Offline' | 'Hybrid';

export type PriorityLevel = 'Highly Recommended' | 'Recommended' | 'Optional';

export type VerificationStatus = 
  | 'Verified' 
  | 'Auto Verified' 
  | 'Needs Review' 
  | 'Incomplete' 
  | 'Archived';

export interface PriorityScore {
  totalScore: number; // 0 - 100
  level: PriorityLevel;
  urgencyDays: number;
  deptSuitability: Record<string, number>; // e.g. CSE: 95, ECE: 88
  placementValue: number; // 0-10
  innovationValue: number; // 0-10
  hiringValue: number; // 0-10
  researchValue: number; // 0-10
  reasoning: string[];
}

export interface QualityScore {
  extractionConfidence: number; // 0 - 100
  urlHealthScore: number; // 0 - 100
  dataCompleteness: number; // 0 - 100
  sourceReliability: number; // 0 - 100
  overallTrustScore: number; // 0 - 100
  verificationStatus: VerificationStatus;
}

export interface OpportunityRound {
  id: string;
  roundNumber: number;
  title: string;
  startDate: string; // ISO String
  endDate: string;
  timeZone?: string;
  description: string;
  submissionRequired: boolean;
  type: 'Online Quiz' | 'Abstract Submission' | 'Proposal Submission' | 'Prototype Submission' | 'Mentoring Session' | 'Grand Finale Pitch' | 'Orientation' | 'Workshop';
  status: 'Upcoming' | 'Active' | 'Completed' | 'Extended';
  sourceUrl?: string;
  verificationStatus?: 'Extracted' | 'Verified' | 'Inferred';
}

export interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone?: string;
  designation?: string;
}

export interface ChangeRecord {
  id: string;
  opportunityId: string;
  timestamp: string;
  fieldType: 'DEADLINE' | 'PRIZE' | 'POSTER' | 'RULES' | 'ROUND' | 'ELIGIBILITY' | 'STATUS' | 'REGISTRATION_LINK';
  summary: string;
  oldValue: string;
  newValue: string;
}

export interface Opportunity {
  id: string;
  sourceId: string;
  sourceName: string;
  externalId?: string;
  title: string;
  tagline: string;
  organizer: string;
  organizerLogo?: string;
  bannerImage?: string;
  posterUrl?: string;
  brochureUrl?: string;
  
  primaryCategory: PrimaryCategory;
  secondaryCategory: SecondaryCategory;
  technologies: TechnologyTag[];
  
  mode: EventMode;
  venue?: string;
  officialWebsite: string;
  registrationUrl: string;
  
  registrationStartDate: string;
  registrationDeadline: string;
  eventStartDate: string;
  eventEndDate: string;
  
  prizePoolText: string;
  prizeAmountUSD?: number;
  prizesBreakdown: {
    first?: string;
    second?: string;
    third?: string;
    special?: string;
    hiringOffers?: boolean;
    internshipOffers?: boolean;
    incubationGrant?: boolean;
  };

  eligibility: {
    yearsAllowed: string[]; // ['UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG', 'PhD']
    departments: string[];
    minTeamSize: number;
    maxTeamSize: number;
    description: string;
  };
  
  problemStatement: string;
  rulesAndGuidelines: string;
  scheduleDetails: string;
  rounds: OpportunityRound[];
  contacts: ContactPerson[];
  
  priority: PriorityScore;
  qualityScore?: QualityScore;
  
  // Dynamic User & System State
  isBookmarked?: boolean;
  isWatched?: boolean;
  reminderEnabled?: boolean;
  status: 'Active' | 'Draft' | 'Extended' | 'Cancelled' | 'Closed';
  
  discoveredAt: string;
  lastUpdatedAt: string;
  version: number;
  changeHistory: ChangeRecord[];
}

export type ScheduleInterval = 
  | '15m' 
  | '30m' 
  | '1h' 
  | '3h' 
  | '6h' 
  | '12h' 
  | 'daily' 
  | 'weekly' 
  | 'manual';

export interface SourceHealth {
  status: 'healthy' | 'degraded' | 'failing';
  lastPingMs: number;
  consecutiveFailures: number;
  uptimePercentage: number;
}

export interface SourceConfig {
  id: string;
  name: string;
  baseUrl: string;
  adapterType: 'SIH' | 'GOVT_AI' | 'DEVPOST' | 'IEEE' | 'STARTUP_CELL' | 'CUSTOM_RSS' | 'INSTAGRAM' | 'INTERNSHALA' | 'UNSTOP' | 'DEVFOLIO' | 'HACKEREARTH' | 'MICROSOFT' | 'NVIDIA' | 'RESKILLL';
  enabled: boolean;
  scheduleInterval: ScheduleInterval;
  lastRunTimestamp?: string;
  nextRunTimestamp?: string;
  lastRunDurationMs?: number;
  lastRunStatus?: 'SUCCESS' | 'FAILED' | 'PARTIAL';
  stats: {
    totalFetched: number;
    newDiscovered: number;
    updatedCount: number;
    failedAttempts: number;
    duplicateRemoved: number;
  };
  health: SourceHealth;
}

export interface RecipientContact {
  id: string;
  name?: string;
  email?: string;
  whatsappNumber?: string;
}

export interface RecipientGroup {
  id: string;
  name: string;
  category?: 'Faculty' | 'Innovation Cell' | 'Placement Cell' | 'II Year' | 'III Year' | 'Final Year' | 'Startup Cell' | 'Research Cell' | 'Custom';
  memberCount?: number;
  department?: string;
  targetYears?: string[];
  emails?: string[];
  phoneNumbers?: string[];
  whatsappNumbers?: string[];
  contacts?: RecipientContact[];
  description?: string;
  autoDigestEnabled?: boolean;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  department?: string;
  provider: 'google' | 'email';
  avatarUrl?: string;
  isCalendarSynced?: boolean;
}

export interface PlatformNotification {
  id: string;
  opportunityId?: string;
  title: string;
  message: string;
  type: 'NEW_OPPORTUNITY' | 'DEADLINE_CHANGE' | 'ROUND_UPDATE' | 'PRIZE_UPDATE' | 'SCHEDULE_ALERT';
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
