import { Opportunity, RecipientGroup, PlatformNotification } from '../types/opportunity';

const STORAGE_KEY_OPPORTUNITIES = 'iop_opportunities_v3';
const STORAGE_KEY_RECIPIENTS = 'iop_recipients_v3';
const STORAGE_KEY_NOTIFICATIONS = 'iop_notifications_v3';

export class OpportunityRepository {
  public static getInitialSeedOpportunities(): Opportunity[] {
    const now = new Date().toISOString();
    
    return [
      {
        id: 'op-sih-2026',
        sourceId: 'src-sih',
        sourceName: 'Smart India Hackathon Govt Portal',
        externalId: 'SIH-2026-HARDWARE-01',
        title: 'Smart India Hackathon 2026 - Hardware & Software Edition',
        tagline: 'India\'s largest national open innovation hackathon solving 500+ Govt Ministry problem statements',
        organizer: 'Ministry of Education Innovation Cell (MIC) & AICTE',
        organizerLogo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://sih.gov.in',
        
        primaryCategory: 'Government',
        secondaryCategory: 'Hackathon',
        technologies: ['Artificial Intelligence', 'Internet of Things', 'Robotics', 'Clean Energy'],
        
        mode: 'Hybrid',
        venue: '35 Nodal Centers Across India',
        officialWebsite: 'https://sih.gov.in',
        registrationUrl: 'https://sih.gov.in',
        
        registrationStartDate: new Date(Date.now() - 5 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 12 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 15 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 17 * 86400000).toISOString(),
        
        prizePoolText: '₹1,50,00,000 Total Prize Pool + Direct Ministry Internships',
        prizeAmountUSD: 180000,
        prizesBreakdown: {
          first: '₹1,00,00,000 per ministry problem statement winner (₹1 Lakh/team)',
          second: '₹75,000 Runner-up per domain',
          third: '₹50,00,000 Incubation & Startup Grant',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'Electronics & Comm', 'Electrical', 'Mechanical', 'AI & Data Science'],
          minTeamSize: 6,
          maxTeamSize: 6,
          description: 'Mandatory 6 engineering students per team with at least 1 female team member.'
        },
        
        problemStatement: 'Develop real-time AI solutions for Smart Agriculture, AI-Assisted Border Surveillance, and Autonomous EV Charging Station Grids.',
        rulesAndGuidelines: '1. Code must be original and built during the 36h finale. 2. SPOC approval required from institute Principal.',
        scheduleDetails: 'Round 1 Campus Selection -> Round 2 Ministry Evaluation -> Round 3 36h Grand Finale',
        rounds: [
          {
            id: 'sih-r1',
            roundNumber: 1,
            title: 'College Internal Hackathon Screening',
            startDate: new Date(Date.now() - 5 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 3 * 86400000).toISOString(),
            description: 'Internal evaluation by college innovation council and expert panel',
            submissionRequired: true,
            type: 'Prototype Submission',
            status: 'Active'
          },
          {
            id: 'sih-r2',
            roundNumber: 2,
            title: 'Ministry PPT & Architecture Review',
            startDate: new Date(Date.now() + 4 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 10 * 86400000).toISOString(),
            description: 'Evaluation by Central Ministry Technical Committees',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Upcoming'
          },
          {
            id: 'sih-r3',
            roundNumber: 3,
            title: 'Grand Finale 36-Hour Non-stop Hackathon',
            startDate: new Date(Date.now() + 15 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 17 * 86400000).toISOString(),
            description: 'Live building at nodal centers with continuous jury evaluations',
            submissionRequired: true,
            type: 'Grand Finale Pitch',
            status: 'Upcoming'
          }
        ],
        contacts: [
          { name: 'Dr. Abhay Jere', role: 'Chief Innovation Officer', email: 'cio@mic.gov.in', designation: 'MIC AICTE' },
          { name: 'SIH Support Desk', role: 'Helpline', email: 'hackathon@sih.gov.in' }
        ],
        
        priority: {
          totalScore: 98,
          level: 'Highly Recommended',
          urgencyDays: 12,
          deptSuitability: { CSE: 98, ECE: 94, EEE: 90, MECH: 88, AIDS: 99 },
          placementValue: 10,
          innovationValue: 10,
          hiringValue: 9,
          researchValue: 8,
          reasoning: ['Highest Govt Recognition in India', 'Direct Ministry Placement & Internship Access', 'Pre-incubation Support']
        },
        
        isBookmarked: true,
        isWatched: true,
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },
      {
        id: 'op-india-ai-2026',
        sourceId: 'src-meity',
        sourceName: 'MeitY IndiaAI National Portal',
        externalId: 'MEITY-AI-CHALLENGE-2026',
        title: 'National Sovereign AI Model & HealthTech Grand Challenge',
        tagline: 'Build Sovereign LLMs and Diagnostic Healthcare AI Models for India',
        organizer: 'MeitY & Digital India Corporation',
        organizerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
        
        primaryCategory: 'Government',
        secondaryCategory: 'Innovation Challenge',
        technologies: ['Artificial Intelligence', 'Machine Learning', 'Healthcare Tech', 'Cloud Computing'],
        
        mode: 'Online',
        officialWebsite: 'https://indiaai.gov.in',
        registrationUrl: 'https://indiaai.gov.in',
        
        registrationStartDate: new Date(Date.now() - 3 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 2 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 5 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 25 * 86400000).toISOString(),
        
        prizePoolText: '₹2,50,00,000 Seed Grants + 10,000 NVIDIA H100 Compute Hours',
        prizeAmountUSD: 300000,
        prizesBreakdown: {
          first: '₹1,00,00,000 Grant + CDAC Supercomputing Cluster Access',
          second: '₹75,00,000 Incubation Support',
          third: '₹50,00,000 Research Fellowship',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG', 'PhD'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'Biomedical Engg'],
          minTeamSize: 2,
          maxTeamSize: 5,
          description: 'Open to engineering students, AI research scholars & student tech startups.'
        },
        
        problemStatement: 'Develop high-accuracy regional language LLMs and low-resource healthcare diagnostic pipelines.',
        rulesAndGuidelines: '1. Models must be released with open weights under Apache 2.0. 2. Benchmark testing performed on C-DAC clusters.',
        scheduleDetails: 'Whitepaper -> GPU Fine-Tuning -> National AI Jury Pitch',
        rounds: [
          {
            id: 'ai-r1',
            roundNumber: 1,
            title: 'Technical Whitepaper & Dataset Strategy',
            startDate: new Date(Date.now() - 3 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 2 * 86400000).toISOString(),
            description: 'Submit model architecture design, dataset tokenization plan, and evaluation metrics',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          },
          {
            id: 'ai-r2',
            roundNumber: 2,
            title: 'C-DAC Supercomputing Cluster Fine-Tuning',
            startDate: new Date(Date.now() + 5 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 18 * 86400000).toISOString(),
            description: 'Access NVIDIA H100 GPUs for multi-node training',
            submissionRequired: true,
            type: 'Prototype Submission',
            status: 'Upcoming'
          }
        ],
        contacts: [
          { name: 'Dr. Abhishek Singh', role: 'President & CEO, NeGD', email: 'indiaai-support@gov.in' }
        ],
        
        priority: {
          totalScore: 99,
          level: 'Highly Recommended',
          urgencyDays: 2,
          deptSuitability: { CSE: 99, AIDS: 100, ECE: 88, BME: 94 },
          placementValue: 10,
          innovationValue: 10,
          hiringValue: 10,
          researchValue: 10,
          reasoning: ['Highest Priority Govt AI Grant', 'Closing in 2 Days!', 'NVIDIA GPU Compute Access Included']
        },
        
        isBookmarked: true,
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },
      {
        id: 'op-google-gemini-2026',
        sourceId: 'src-devpost',
        sourceName: 'Devpost Global Industry Feed',
        externalId: 'DEVPOST-GOOGLE-AGENT-2026',
        title: 'Google Gemini AI Multi-Agent Global Challenge',
        tagline: 'Build autonomous multi-agent systems and real-time multimodal apps powered by Gemini 1.5 Pro',
        organizer: 'Google Developer Relations & Devpost',
        organizerLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
        
        primaryCategory: 'Industry',
        secondaryCategory: 'Hackathon',
        technologies: ['Artificial Intelligence', 'Cloud Computing', 'Web Development', 'Machine Learning'],
        
        mode: 'Online',
        officialWebsite: 'https://devpost.com',
        registrationUrl: 'https://devpost.com/hackathons',
        
        registrationStartDate: new Date(Date.now() - 10 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 18 * 86400000).toISOString(),
        eventStartDate: now,
        eventEndDate: new Date(Date.now() + 20 * 86400000).toISOString(),
        
        prizePoolText: '$100,000 USD Cash + Google Cloud Credits & SWE Interview Fast-Track',
        prizeAmountUSD: 100000,
        prizesBreakdown: {
          first: '$30,000 USD + Google Cloud Technical Mentorship',
          second: '$20,000 USD Runner-up',
          third: '$10,000 USD Best Student Hack',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: false
        },

        eligibility: {
          yearsAllowed: ['UG 1st Year', 'UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
          departments: ['All Computer Science, IT & Engineering Disciplines'],
          minTeamSize: 1,
          maxTeamSize: 4,
          description: 'Open to university students and developer teams globally.'
        },
        
        problemStatement: 'Create innovative agentic AI tools that automate code generation, medical diagnosis, or developer productivity using Gemini SDK.',
        rulesAndGuidelines: '1. Projects must integrate Google Gemini API. 2. Must submit GitHub repo link and a 2-minute video presentation.',
        scheduleDetails: 'Async Development -> Submission -> Google VP Panel Jury',
        rounds: [
          {
            id: 'g-r1',
            roundNumber: 1,
            title: 'Project Submission & Video Pitch',
            startDate: now,
            endDate: new Date(Date.now() + 18 * 86400000).toISOString(),
            description: 'Submit code repository, video link, and architectural writeup',
            submissionRequired: true,
            type: 'Prototype Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'Devpost Support', role: 'Support Team', email: 'support@devpost.com' }
        ],
        
        priority: {
          totalScore: 95,
          level: 'Highly Recommended',
          urgencyDays: 18,
          deptSuitability: { CSE: 98, AIDS: 98, IT: 94, ECE: 88 },
          placementValue: 9,
          innovationValue: 10,
          hiringValue: 9,
          researchValue: 7,
          reasoning: ['Global Google Exposure', 'Fast-Track Software Engineering Interviews', 'Direct USD Cash Rewards']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },
      {
        id: 'op-idex-defence-2026',
        sourceId: 'src-sih',
        sourceName: 'iDEX Defence Innovation Portal',
        externalId: 'IDEX-DEFENCE-GRANT-2026',
        title: 'iDEX DISC 12 Defense & Aerospace Innovation Grant',
        tagline: 'Grants up to ₹1.5 Crore for student startups solving Armed Forces technological challenges',
        organizer: 'Defence Innovation Organisation (DIO) & Ministry of Defence',
        organizerLogo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&auto=format&fit=crop&q=80',
        
        primaryCategory: 'Government',
        secondaryCategory: 'Grant',
        technologies: ['Robotics', 'Cyber Security', 'Internet of Things', 'Quantum Computing'],
        
        mode: 'Hybrid',
        officialWebsite: 'https://idex.gov.in',
        registrationUrl: 'https://idex.gov.in',
        
        registrationStartDate: new Date(Date.now() - 10 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 1 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 4 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 60 * 86400000).toISOString(),
        
        prizePoolText: '₹1,50,00,000 Grant Support per winning student startup',
        prizeAmountUSD: 180000,
        prizesBreakdown: {
          first: '₹1.5 Crore Prototype Grant',
          second: 'Military Testing Facilities Access',
          third: 'Direct Defence Procurement Order Pathway',
          hiringOffers: false,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG', 'PhD'],
          departments: ['Robotics', 'Mechanical', 'Aerospace', 'CSE', 'ECE'],
          minTeamSize: 2,
          maxTeamSize: 6,
          description: 'Open to student innovators, incubatees, and early-stage student startups.'
        },
        
        problemStatement: 'Autonomous Swarm Drones, Quantum Secure Satellite Encryption, and Counter-UAS Laser Defense.',
        rulesAndGuidelines: '1. IP remains with the Indian Innovator team. 2. Defense Partner Incubators will guide execution.',
        scheduleDetails: 'Proposal -> Pitch to Defense Chiefs -> Prototype Grant Release',
        rounds: [
          {
            id: 'idex-r1',
            roundNumber: 1,
            title: 'Technical Pitch & Design Proposal',
            startDate: now,
            endDate: new Date(Date.now() + 1 * 86400000).toISOString(),
            description: 'Defense jury screening of technology readiness level (TRL 3+)',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'iDEX DIO Officer', role: 'Grant Administrator', email: 'idex@ddpmod.gov.in' }
        ],
        
        priority: {
          totalScore: 97,
          level: 'Highly Recommended',
          urgencyDays: 1,
          deptSuitability: { MECH: 96, ECE: 98, CSE: 90, AIDS: 92 },
          placementValue: 8,
          innovationValue: 10,
          hiringValue: 8,
          researchValue: 10,
          reasoning: ['Highest Defense Innovation Grant in India', 'Closing Tomorrow!', 'Military Field Testing Support']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },
      {
        id: 'op-unstop-national-2026',
        sourceId: 'src-devpost',
        sourceName: 'Unstop National Innovation Challenge',
        externalId: 'UNSTOP-TECH-CHALLENGE-2026',
        title: 'National Student Engineering & AI Coding Championship',
        tagline: 'India\'s premier university hackathon and placement challenge with 100+ hiring partners',
        organizer: 'Unstop & Top Engineering Institutions',
        organizerLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80',
        
        primaryCategory: 'Academic',
        secondaryCategory: 'Coding Contest',
        technologies: ['Artificial Intelligence', 'Web Development', 'Cloud Computing', 'Cyber Security'],
        
        mode: 'Online',
        officialWebsite: 'https://unstop.com/hackathons',
        registrationUrl: 'https://unstop.com/hackathons',
        
        registrationStartDate: new Date(Date.now() - 2 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 5 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 6 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 10 * 86400000).toISOString(),
        
        prizePoolText: '₹50,00,000 Prize Pool + Direct Full-Time SDE & Internship Offers',
        prizeAmountUSD: 60000,
        prizesBreakdown: {
          first: '₹15,00,000 Cash + Direct SDE Offers at Top Tech Firms',
          second: '₹10,00,000 Runner Up',
          third: '₹5,00,000 Category Winners',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: false
        },

        eligibility: {
          yearsAllowed: ['UG 1st Year', 'UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'IT', 'ECE'],
          minTeamSize: 1,
          maxTeamSize: 3,
          description: 'Open to all engineering undergraduates & postgraduates in India.'
        },
        
        problemStatement: 'Algorithmic optimization, full-stack web architectures, and AI model evaluation challenges.',
        rulesAndGuidelines: '1. Individual and team participation allowed. 2. Automated plagiarism checking on submission portal.',
        scheduleDetails: 'Online Quiz -> Coding Round -> Grand Finale Live Hack',
        rounds: [
          {
            id: 'uns-r1',
            roundNumber: 1,
            title: 'Online Aptitude & CS Fundamentals Quiz',
            startDate: new Date(Date.now() - 2 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 5 * 86400000).toISOString(),
            description: '30-minute timed evaluation of algorithms & data structures',
            submissionRequired: true,
            type: 'Online Quiz',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'Unstop Support Team', role: 'Event Organizer', email: 'support@unstop.com' }
        ],
        
        priority: {
          totalScore: 94,
          level: 'Highly Recommended',
          urgencyDays: 5,
          deptSuitability: { CSE: 100, AIDS: 98, IT: 96, ECE: 90 },
          placementValue: 10,
          innovationValue: 8,
          hiringValue: 10,
          researchValue: 6,
          reasoning: ['Direct High-Package SDE Placement Offers', 'National Student Leaderboard Exposure']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      }
    ];
  }

  public static getInitialDefaultRecipients(): RecipientGroup[] {
    return [
      {
        id: 'group-faculty',
        name: 'All Department Faculty Mentors',
        category: 'Faculty',
        memberCount: 42,
        emails: ['hod.cse@institution.edu', 'dean.academics@institution.edu', 'faculty.ai@institution.edu'],
        description: 'Department Heads and designated faculty mentors for student innovation projects'
      },
      {
        id: 'group-iic',
        name: 'Institution Innovation Council (IIC)',
        category: 'Innovation Cell',
        memberCount: 18,
        emails: ['iic.lead@institution.edu', 'incubation@institution.edu'],
        description: 'Core committee overseeing national hackathon participation and incubation'
      },
      {
        id: 'group-placement',
        name: 'Career & Placement Cell',
        category: 'Placement Cell',
        memberCount: 12,
        emails: ['placement@institution.edu', 'tpo@institution.edu'],
        description: 'Tracks hiring hackathons and direct internship opportunities'
      },
      {
        id: 'group-final-year',
        name: 'Final Year Engineering Students (2026 Batch)',
        category: 'Final Year',
        memberCount: 450,
        emails: ['cse2026@institution.edu', 'ece2026@institution.edu', 'aids2026@institution.edu'],
        description: 'Final year undergraduate students focusing on placements and national grants'
      },
      {
        id: 'group-third-year',
        name: 'III Year Engineering Students (2027 Batch)',
        category: 'III Year',
        memberCount: 480,
        emails: ['cse2027@institution.edu', 'ece2027@institution.edu'],
        description: 'Third year students building hackathon prototypes and research projects'
      }
    ];
  }

  public static loadOpportunities(): Opportunity[] {
    const raw = localStorage.getItem(STORAGE_KEY_OPPORTUNITIES);
    if (!raw) {
      const seed = this.getInitialSeedOpportunities();
      this.saveOpportunities(seed);
      return seed;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return this.getInitialSeedOpportunities();
    }
  }

  public static saveOpportunities(ops: Opportunity[]): void {
    localStorage.setItem(STORAGE_KEY_OPPORTUNITIES, JSON.stringify(ops));
  }

  public static loadRecipients(): RecipientGroup[] {
    const raw = localStorage.getItem(STORAGE_KEY_RECIPIENTS);
    if (!raw) {
      const seed = this.getInitialDefaultRecipients();
      this.saveRecipients(seed);
      return seed;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return this.getInitialDefaultRecipients();
    }
  }

  public static saveRecipients(groups: RecipientGroup[]): void {
    localStorage.setItem(STORAGE_KEY_RECIPIENTS, JSON.stringify(groups));
  }

  public static loadNotifications(): PlatformNotification[] {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static saveNotifications(notifs: PlatformNotification[]): void {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(notifs));
  }
}
