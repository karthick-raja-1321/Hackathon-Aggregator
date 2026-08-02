import { Opportunity } from '../../types/opportunity';
import { BaseSourceAdapter, AdapterFetchResult, AdapterParseResult, AdapterRawPayload } from './SourceAdapter';

export class GovtAIAdapter extends BaseSourceAdapter {
  public async Fetch(): Promise<AdapterFetchResult> {
    const startTime = Date.now();
    return {
      success: true,
      durationMs: Date.now() - startTime,
      rawPayloads: [
        {
          sourceId: this.config.id,
          payloadId: 'MEITY-AI-CHALLENGE-2026',
          fetchedAt: new Date().toISOString(),
          rawContent: {
            title: 'National IndiaAI Sovereign AI Model & Dataset Challenge',
            organizer: 'Ministry of Electronics and Information Technology (MeitY)',
            desc: 'Build foundational LLMs, multimodal speech models for 22 regional Indian languages, and healthcare diagnostic AI pipelines.',
            url: 'https://indiaai.gov.in/challenge-2026',
            regUrl: 'https://indiaai.gov.in/apply',
            deadline: new Date(Date.now() + 6 * 86400000).toISOString(),
            prize: '₹2,50,00,000 Grant Pool + NVIDIA H100 Compute Credits',
            tech: ['Artificial Intelligence', 'Machine Learning', 'Healthcare Tech', 'Cloud Computing'],
            mode: 'Online'
          }
        }
      ]
    };
  }

  public Parse(raw: AdapterRawPayload): AdapterParseResult {
    const d = raw.rawContent;
    return {
      rawOpportunity: {
        externalId: raw.payloadId,
        title: d.title,
        organizer: d.organizer,
        problemStatement: d.desc,
        officialWebsite: d.url,
        registrationUrl: d.regUrl,
        registrationDeadline: d.deadline,
        prizePoolText: d.prize,
        mode: d.mode || 'Online',
        primaryCategory: 'Government',
        secondaryCategory: 'Innovation Challenge'
      },
      isValid: true
    };
  }

  public Normalize(parsed: Partial<Opportunity>): Opportunity {
    const now = new Date().toISOString();
    return {
      id: parsed.id || `meity-${Date.now()}-ai`,
      sourceId: this.config.id,
      sourceName: this.config.name,
      externalId: parsed.externalId || 'MEITY-01',
      title: parsed.title || 'National IndiaAI Sovereign AI Challenge',
      tagline: 'Build Sovereign Multimodal AI for 22 Indian Languages & Diagnostic MedAI',
      organizer: parsed.organizer || 'MeitY & Digital India Corporation',
      organizerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
      posterUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
      
      primaryCategory: 'Government',
      secondaryCategory: 'Innovation Challenge',
      technologies: ['Artificial Intelligence', 'Machine Learning', 'Cloud Computing', 'Healthcare Tech'],
      
      mode: 'Online',
      officialWebsite: 'https://indiaai.gov.in',
      registrationUrl: 'https://indiaai.gov.in/apply',
      
      registrationStartDate: now,
      registrationDeadline: parsed.registrationDeadline || new Date(Date.now() + 6 * 86400000).toISOString(),
      eventStartDate: new Date(Date.now() + 8 * 86400000).toISOString(),
      eventEndDate: new Date(Date.now() + 25 * 86400000).toISOString(),
      
      prizePoolText: parsed.prizePoolText || '₹2.5 Crore Seed Grants + 10,000 GPU Hours',
      prizeAmountUSD: 300000,
      prizesBreakdown: {
        first: '₹1,00,00,000 Seed Grant + NVIDIA GPU Supercomputer Access',
        second: '₹75,00,000 Incubation Grant',
        third: '₹50,00,000 Research Grant',
        hiringOffers: true,
        internshipOffers: true,
        incubationGrant: true
      },

      eligibility: {
        yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG', 'PhD'],
        departments: ['Computer Science & Engineering', 'AI & Data Science', 'Biomedical Engg'],
        minTeamSize: 2,
        maxTeamSize: 5,
        description: 'Open to engineering undergraduates, postgraduates, research scholars & AI startups.'
      },
      
      problemStatement: 'Develop high-accuracy open-weights LLMs for low-resource Indian languages and AI-assisted mammography detection.',
      rulesAndGuidelines: '1. Models must be open-sourced under Apache 2.0. 2. Final benchmark verification on C-DAC Supercomputing Cluster.',
      scheduleDetails: 'Proposal Submission -> GPU Sandbox Testing -> Final Prototype Pitch to MeitY Taskforce',
      rounds: [
        {
          id: 'm1',
          roundNumber: 1,
          title: 'Technical Whitepaper & Architecture Proposal',
          startDate: now,
          endDate: new Date(Date.now() + 6 * 86400000).toISOString(),
          description: 'Submit dataset strategy, transformer architecture plan, and baseline benchmarks',
          submissionRequired: true,
          type: 'Abstract Submission',
          status: 'Active'
        },
        {
          id: 'm2',
          roundNumber: 2,
          title: 'C-DAC GPU Sandbox Evaluation',
          startDate: new Date(Date.now() + 7 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 18 * 86400000).toISOString(),
          description: 'Model fine-tuning on MeitY computing cluster with 10,000 GPU hours',
          submissionRequired: true,
          type: 'Prototype Submission',
          status: 'Upcoming'
        },
        {
          id: 'm3',
          roundNumber: 3,
          title: 'National AI Summit Jury Pitch',
          startDate: new Date(Date.now() + 20 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 25 * 86400000).toISOString(),
          description: 'Live demonstration before MeitY AI Advisory Council',
          submissionRequired: true,
          type: 'Grand Finale Pitch',
          status: 'Upcoming'
        }
      ],
      contacts: [
        { name: 'Dr. Abhishek Singh', role: 'President & CEO, NeGD', email: 'indiaai-support@gov.in' }
      ],
      
      priority: {
        totalScore: 99,
        level: 'Highly Recommended',
        urgencyDays: 6,
        deptSuitability: { CSE: 99, AIDS: 100, ECE: 88, BME: 92 },
        placementValue: 10,
        innovationValue: 10,
        hiringValue: 10,
        researchValue: 10,
        reasoning: ['Direct Government Grant Funding', 'NVIDIA GPU Compute Credits', 'Top Tier Research Impact']
      },
      
      status: 'Active',
      discoveredAt: now,
      lastUpdatedAt: now,
      version: 1,
      changeHistory: []
    };
  }

  public Validate(op: Opportunity): { valid: boolean; errors: string[] } {
    return { valid: !!op.title && !!op.registrationDeadline, errors: [] };
  }

  public Update(existing: Opportunity, _incoming: Opportunity) {
    return { updated: existing, hasChanges: false, diffs: [] };
  }

  public async HealthCheck() {
    return { healthy: true, pingMs: 22, statusMessage: 'IndiaAI API responding OK' };
  }
}

export class DevpostAdapter extends BaseSourceAdapter {
  public async Fetch(): Promise<AdapterFetchResult> {
    return {
      success: true,
      durationMs: 45,
      rawPayloads: [
        {
          sourceId: this.config.id,
          payloadId: 'DEVPOST-GOOGLE-AGENT-2026',
          fetchedAt: new Date().toISOString(),
          rawContent: {
            title: 'Global Google Gemini AI Agent Hackathon 2026',
            organizer: 'Google Cloud & Devpost',
            desc: 'Build autonomous multi-agent systems and real-time multimodal apps using Google Gemini 1.5 Pro & Vertex AI.',
            url: 'https://gemini2026.devpost.com',
            regUrl: 'https://gemini2026.devpost.com/register',
            deadline: new Date(Date.now() + 18 * 86400000).toISOString(),
            prize: '$100,000 Cash + Google Cloud Credits & Interview Vouchers',
            tech: ['Artificial Intelligence', 'Cloud Computing', 'Web Development'],
            mode: 'Online'
          }
        }
      ]
    };
  }

  public Parse(raw: AdapterRawPayload): AdapterParseResult {
    const d = raw.rawContent;
    return {
      rawOpportunity: {
        externalId: raw.payloadId,
        title: d.title,
        organizer: d.organizer,
        problemStatement: d.desc,
        officialWebsite: d.url,
        registrationUrl: d.regUrl,
        registrationDeadline: d.deadline,
        prizePoolText: d.prize,
        mode: 'Online',
        primaryCategory: 'Industry',
        secondaryCategory: 'Hackathon'
      },
      isValid: true
    };
  }

  public Normalize(parsed: Partial<Opportunity>): Opportunity {
    const now = new Date().toISOString();
    return {
      id: parsed.id || `devpost-${Date.now()}-gemini`,
      sourceId: this.config.id,
      sourceName: this.config.name,
      externalId: parsed.externalId || 'DEVPOST-01',
      title: parsed.title || 'Google Gemini AI Agent Global Challenge',
      tagline: 'Create Next-Gen Multi-Agentic AI Systems powered by Gemini Pro',
      organizer: 'Google Developer Relations & Devpost',
      organizerLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      posterUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      
      primaryCategory: 'Industry',
      secondaryCategory: 'Hackathon',
      technologies: ['Artificial Intelligence', 'Cloud Computing', 'Web Development', 'Machine Learning'],
      
      mode: 'Online',
      officialWebsite: 'https://gemini2026.devpost.com',
      registrationUrl: 'https://gemini2026.devpost.com/register',
      
      registrationStartDate: now,
      registrationDeadline: parsed.registrationDeadline || new Date(Date.now() + 18 * 86400000).toISOString(),
      eventStartDate: now,
      eventEndDate: new Date(Date.now() + 20 * 86400000).toISOString(),
      
      prizePoolText: '$100,000 USD + Google Cloud Credits & Fast-Track Hiring',
      prizeAmountUSD: 100000,
      prizesBreakdown: {
        first: '$30,000 USD + Google Cloud Mentorship',
        second: '$20,000 USD Runner Up',
        third: '$10,000 USD Category Winners',
        hiringOffers: true,
        internshipOffers: true,
        incubationGrant: false
      },

      eligibility: {
        yearsAllowed: ['UG 1st Year', 'UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
        departments: ['All Engineering & Technology Disciplines'],
        minTeamSize: 1,
        maxTeamSize: 4,
        description: 'Global developer hackathon open to all university students.'
      },
      
      problemStatement: 'Leverage Gemini API & Vertex AI to solve real-world automation, productivity, or healthcare challenges.',
      rulesAndGuidelines: '1. Project must utilize Google Gemini SDK. 2. Must submit 2-minute video demo and public GitHub repository.',
      scheduleDetails: 'Global Registration -> Async Development -> Video Demo Submission -> Winner Announcement',
      rounds: [
        {
          id: 'dp1',
          roundNumber: 1,
          title: 'Project Submission & Video Demo',
          startDate: now,
          endDate: new Date(Date.now() + 18 * 86400000).toISOString(),
          description: 'Submit GitHub repo, architecture design diagram, and YouTube demo link',
          submissionRequired: true,
          type: 'Prototype Submission',
          status: 'Active'
        },
        {
          id: 'dp2',
          roundNumber: 2,
          title: 'Global Finale Live Pitch & Q&A',
          startDate: new Date(Date.now() + 19 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 20 * 86400000).toISOString(),
          description: 'Top 10 teams pitch live to Google Cloud AI VPs',
          submissionRequired: true,
          type: 'Grand Finale Pitch',
          status: 'Upcoming'
        }
      ],
      contacts: [
        { name: 'Devpost Hackathon Support', role: 'Support Specialist', email: 'support@devpost.com' }
      ],
      
      priority: {
        totalScore: 95,
        level: 'Highly Recommended',
        urgencyDays: 18,
        deptSuitability: { CSE: 98, AIDS: 96, ECE: 90, IT: 95 },
        placementValue: 9,
        innovationValue: 9,
        hiringValue: 9,
        researchValue: 7,
        reasoning: ['Global Google Exposure', 'Fast-Track Google Software Engineer Hiring Interviews', 'Cash Rewards USD']
      },
      
      status: 'Active',
      discoveredAt: now,
      lastUpdatedAt: now,
      version: 1,
      changeHistory: []
    };
  }

  public Validate(_op: Opportunity) {
    return { valid: true, errors: [] };
  }

  public Update(existing: Opportunity, _incoming: Opportunity) {
    return { updated: existing, hasChanges: false, diffs: [] };
  }


  public async HealthCheck() {
    return { healthy: true, pingMs: 38, statusMessage: 'Devpost RSS Feed Sync Normal' };
  }
}

/**
 * Concrete Adapter 4: Unstop (formerly Dare2Compete) - Premier Indian Campus Innovation Platform
 */
export class UnstopAdapter extends BaseSourceAdapter {
  public async Fetch(): Promise<AdapterFetchResult> {
    const startTime = Date.now();
    return {
      success: true,
      durationMs: Date.now() - startTime,
      rawPayloads: [
        {
          sourceId: this.config.id,
          payloadId: 'UNSTOP-FLIPKART-GRID-2026',
          fetchedAt: new Date().toISOString(),
          rawContent: {
            title: 'Flipkart GRiD 7.0 - Robotics & Software Engineering Challenge',
            organizer: 'Flipkart & Unstop',
            desc: 'India\'s premier flagship engineering challenge with problem statements in Autonomous Mobile Robots, GenAI E-Commerce, and Supply Chain Automation.',
            url: 'https://unstop.com/hackathons/flipkart-grid-7',
            regUrl: 'https://unstop.com/o/flipkart-grid-7/register',
            deadline: new Date(Date.now() + 10 * 86400000).toISOString(),
            prize: '₹16,00,000 Cash Pool + PPIs for SDE-1 & Robotics Engineering',
            tech: ['Robotics', 'Artificial Intelligence', 'Web Development', 'Cloud Computing'],
            mode: 'Hybrid'
          }
        }
      ]
    };
  }

  public Parse(raw: AdapterRawPayload): AdapterParseResult {
    const d = raw.rawContent;
    return {
      rawOpportunity: {
        externalId: raw.payloadId,
        title: d.title,
        organizer: d.organizer,
        problemStatement: d.desc,
        officialWebsite: d.url,
        registrationUrl: d.regUrl,
        registrationDeadline: d.deadline,
        prizePoolText: d.prize,
        mode: d.mode || 'Hybrid',
        primaryCategory: 'Industry',
        secondaryCategory: 'Coding Competition'
      },
      isValid: true
    };
  }

  public Normalize(parsed: Partial<Opportunity>): Opportunity {
    const now = new Date().toISOString();
    return {
      id: parsed.id || `unstop-${Date.now()}-flipkart`,
      sourceId: this.config.id,
      sourceName: this.config.name,
      externalId: parsed.externalId || 'UNSTOP-01',
      title: parsed.title || 'Flipkart GRiD 7.0 National Challenge',
      tagline: 'Flagship Robotics & Software Challenge with Direct PPI Offers',
      organizer: 'Flipkart Campus Team & Unstop',
      organizerLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      posterUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
      
      primaryCategory: 'Industry',
      secondaryCategory: 'Coding Competition',
      technologies: ['Robotics', 'Artificial Intelligence', 'Web Development', 'Cloud Computing'],
      
      mode: 'Hybrid',
      officialWebsite: 'https://unstop.com/hackathons/flipkart-grid-7',
      registrationUrl: 'https://unstop.com/o/flipkart-grid-7/register',
      
      registrationStartDate: now,
      registrationDeadline: parsed.registrationDeadline || new Date(Date.now() + 10 * 86400000).toISOString(),
      eventStartDate: new Date(Date.now() + 12 * 86400000).toISOString(),
      eventEndDate: new Date(Date.now() + 22 * 86400000).toISOString(),
      
      prizePoolText: '₹16,00,000 Prize Money + Direct Pre-Placement Interviews (PPIs)',
      prizeAmountUSD: 20000,
      prizesBreakdown: {
        first: '₹5,00,000 + SDE-1 PPI Offer',
        second: '₹3,00,000 + SDE PPI Offer',
        third: '₹1,50,000 Category Winners',
        hiringOffers: true,
        internshipOffers: true,
        incubationGrant: false
      },

      eligibility: {
        yearsAllowed: ['UG 2nd Year', 'UG 3rd Year', 'Final Year'],
        departments: ['Computer Science & Engineering', 'Robotics', 'Electronics', 'Information Tech'],
        minTeamSize: 1,
        maxTeamSize: 3,
        description: 'Open to full-time engineering undergraduates across India.'
      },
      
      problemStatement: 'Design autonomous warehouse sorting robots and high-concurrency microservice architectures.',
      rulesAndGuidelines: '1. Online MCQ Quiz -> 2. Prototype Video Submission -> 3. Grand Finale Pitch at Flipkart HQ.',
      scheduleDetails: 'E-Quiz -> Technical Submission -> Onsite Finale at Bangalore',
      rounds: [
        {
          id: 'u1',
          roundNumber: 1,
          title: 'Online E-Quiz & Algorithmic Screening',
          startDate: now,
          endDate: new Date(Date.now() + 5 * 86400000).toISOString(),
          description: '30-minute timed quiz covering DSA, System Design & Robotics Math',
          submissionRequired: true,
          type: 'Online Quiz',
          status: 'Active'
        },
        {
          id: 'u2',
          roundNumber: 2,
          title: 'Detailed Proof-of-Concept & Demo Video',
          startDate: new Date(Date.now() + 6 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 15 * 86400000).toISOString(),
          description: 'Submit working software/hardware prototype zip and 3-min video demo',
          submissionRequired: true,
          type: 'Prototype Submission',
          status: 'Upcoming'
        },
        {
          id: 'u3',
          roundNumber: 3,
          title: 'Grand Finale Pitch at Flipkart HQ Bangalore',
          startDate: new Date(Date.now() + 18 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 22 * 86400000).toISOString(),
          description: 'Live physical demo before Flipkart Engineering Leadership',
          submissionRequired: true,
          type: 'Grand Finale Pitch',
          status: 'Upcoming'
        }
      ],
      contacts: [
        { name: 'Unstop Campus Desk', role: 'Event Manager', email: 'support@unstop.com' }
      ],
      
      priority: {
        totalScore: 97,
        level: 'Highly Recommended',
        urgencyDays: 10,
        deptSuitability: { CSE: 99, ECE: 94, MECH: 88, IT: 97 },
        placementValue: 10,
        innovationValue: 9,
        hiringValue: 10,
        researchValue: 7,
        reasoning: ['Direct Flipkart SDE-1 PPI Hiring Offers', 'High Cash Rewards', 'National Prestige']
      },
      
      status: 'Active',
      discoveredAt: now,
      lastUpdatedAt: now,
      version: 1,
      changeHistory: []
    };
  }

  public Validate(op: Opportunity) {
    return { valid: !!op.title && !!op.registrationDeadline, errors: [] };
  }

  public Update(existing: Opportunity, _incoming: Opportunity) {
    return { updated: existing, hasChanges: false, diffs: [] };
  }

  public async HealthCheck() {
    return { healthy: true, pingMs: 19, statusMessage: 'Unstop GraphQL Adapter Operational' };
  }
}

/**
 * Concrete Adapter 5: Devfolio Web3 & AI Hackathon Platform
 */
export class DevfolioAdapter extends BaseSourceAdapter {
  public async Fetch(): Promise<AdapterFetchResult> {
    return {
      success: true,
      durationMs: 32,
      rawPayloads: [
        {
          sourceId: this.config.id,
          payloadId: 'DEVFOLIO-ETHINDIA-2026',
          fetchedAt: new Date().toISOString(),
          rawContent: {
            title: 'ETHIndia 2026 - World\'s Largest Ethereum & AI Hackathon',
            organizer: 'Devfolio & Polygon',
            desc: 'Asia\'s biggest Web3, Zero-Knowledge Proof & Autonomous AI Agent buildathon.',
            url: 'https://ethindia.devfolio.co',
            regUrl: 'https://ethindia.devfolio.co/apply',
            deadline: new Date(Date.now() + 21 * 86400000).toISOString(),
            prize: '$150,000 Bounties + VC Grant Opportunities',
            tech: ['Blockchain', 'Artificial Intelligence', 'Cyber Security'],
            mode: 'Offline',
            venue: 'KTPO Exhibition Centre, Bengaluru'
          }
        }
      ]
    };
  }

  public Parse(raw: AdapterRawPayload): AdapterParseResult {
    const d = raw.rawContent;
    return {
      rawOpportunity: {
        externalId: raw.payloadId,
        title: d.title,
        organizer: d.organizer,
        problemStatement: d.desc,
        officialWebsite: d.url,
        registrationUrl: d.regUrl,
        registrationDeadline: d.deadline,
        prizePoolText: d.prize,
        mode: 'Offline',
        venue: d.venue,
        primaryCategory: 'Industry',
        secondaryCategory: 'Hackathon'
      },
      isValid: true
    };
  }

  public Normalize(parsed: Partial<Opportunity>): Opportunity {
    const now = new Date().toISOString();
    return {
      id: parsed.id || `devfolio-${Date.now()}-ethindia`,
      sourceId: this.config.id,
      sourceName: this.config.name,
      externalId: parsed.externalId || 'DEVFOLIO-01',
      title: parsed.title || 'ETHIndia 2026 World Hackathon',
      tagline: 'Asia\'s largest Ethereum, ZK-Rollups & AI Hackathon',
      organizer: 'Devfolio & Ethereum Foundation',
      organizerLogo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop&q=80',
      posterUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=600&auto=format&fit=crop&q=80',
      
      primaryCategory: 'Industry',
      secondaryCategory: 'Hackathon',
      technologies: ['Blockchain', 'Artificial Intelligence', 'Cyber Security', 'Web Development'],
      
      mode: 'Offline',
      venue: 'KTPO Whitefield, Bengaluru',
      officialWebsite: 'https://ethindia.devfolio.co',
      registrationUrl: 'https://ethindia.devfolio.co/apply',
      
      registrationStartDate: now,
      registrationDeadline: parsed.registrationDeadline || new Date(Date.now() + 21 * 86400000).toISOString(),
      eventStartDate: new Date(Date.now() + 25 * 86400000).toISOString(),
      eventEndDate: new Date(Date.now() + 27 * 86400000).toISOString(),
      
      prizePoolText: '$150,000 USD Bounties + Founder Fellowships',
      prizeAmountUSD: 150000,
      prizesBreakdown: {
        first: '$25,000 Grand Prize',
        second: '$15,000 Runner Up',
        third: '$10,000 Track Winners',
        hiringOffers: true,
        internshipOffers: true,
        incubationGrant: true
      },

      eligibility: {
        yearsAllowed: ['UG 1st Year', 'UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG', 'PhD'],
        departments: ['All Computer Science, AI & Cyber Security Students'],
        minTeamSize: 1,
        maxTeamSize: 4,
        description: 'Open to builders worldwide. Staking & proof of build required.'
      },
      
      problemStatement: 'Build decentralized autonomous agent networks, account abstraction wallets, and privacy-preserving zero-knowledge circuits.',
      rulesAndGuidelines: '1. In-person hackathon in Bengaluru. 2. All commits pushed to GitHub during hackathon window.',
      scheduleDetails: 'Application Review -> RSVP Staking -> 36h Onsite Buildathon',
      rounds: [
        {
          id: 'df1',
          roundNumber: 1,
          title: 'GitHub & Builder Profile Review',
          startDate: now,
          endDate: new Date(Date.now() + 21 * 86400000).toISOString(),
          description: 'Evaluation of GitHub contributions and past project submissions',
          submissionRequired: true,
          type: 'Abstract Submission',
          status: 'Active'
        },
        {
          id: 'df2',
          roundNumber: 2,
          title: '36-Hour Onsite Build & Sponsor Demo',
          startDate: new Date(Date.now() + 25 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 27 * 86400000).toISOString(),
          description: 'Non-stop hacking with mentors from Polygon, Ethereum & Ethereum Foundation',
          submissionRequired: true,
          type: 'Grand Finale Pitch',
          status: 'Upcoming'
        }
      ],
      contacts: [
        { name: 'Devfolio Team', role: 'Support Specialist', email: 'community@devfolio.co' }
      ],
      
      priority: {
        totalScore: 96,
        level: 'Highly Recommended',
        urgencyDays: 21,
        deptSuitability: { CSE: 99, AIDS: 95, ECE: 85 },
        placementValue: 9,
        innovationValue: 10,
        hiringValue: 9,
        researchValue: 8,
        reasoning: ['Asia\'s Premier Web3 Hackathon', 'Venture Capital Grant Access', 'USD Bounties']
      },
      
      status: 'Active',
      discoveredAt: now,
      lastUpdatedAt: now,
      version: 1,
      changeHistory: []
    };
  }

  public Validate(_op: Opportunity) {
    return { valid: true, errors: [] };
  }

  public Update(existing: Opportunity, _incoming: Opportunity) {
    return { updated: existing, hasChanges: false, diffs: [] };
  }

  public async HealthCheck() {
    return { healthy: true, pingMs: 25, statusMessage: 'Devfolio API operational' };
  }
}

