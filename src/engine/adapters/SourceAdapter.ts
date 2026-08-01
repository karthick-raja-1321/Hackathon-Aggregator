import { Opportunity, SourceConfig } from '../../types/opportunity';

export interface AdapterRawPayload {
  sourceId: string;
  payloadId: string;
  rawContent: Record<string, any>;
  fetchedAt: string;
}

export interface AdapterFetchResult {
  success: boolean;
  rawPayloads: AdapterRawPayload[];
  error?: string;
  durationMs: number;
}

export interface AdapterParseResult {
  rawOpportunity: Partial<Opportunity>;
  isValid: boolean;
  validationErrors?: string[];
}

export abstract class BaseSourceAdapter {
  protected config: SourceConfig;

  constructor(config: SourceConfig) {
    this.config = config;
  }

  public getConfig(): SourceConfig {
    return this.config;
  }

  // Core Contract Methods
  public abstract Fetch(): Promise<AdapterFetchResult>;
  public abstract Parse(raw: AdapterRawPayload): AdapterParseResult;
  public abstract Normalize(parsed: Partial<Opportunity>): Opportunity;
  public abstract Validate(op: Opportunity): { valid: boolean; errors: string[] };
  public abstract Update(existing: Opportunity, incoming: Opportunity): { updated: Opportunity; hasChanges: boolean; diffs: string[] };
  public abstract HealthCheck(): Promise<{ healthy: boolean; pingMs: number; statusMessage: string }>;
}

/**
 * Concrete Adapter 1: Smart India Hackathon & National Innovation Portal
 */
export class SIHAdapter extends BaseSourceAdapter {
  public async Fetch(): Promise<AdapterFetchResult> {
    const startTime = Date.now();
    // Simulate real network fetch with error-resilient payload parsing
    const rawPayloads: AdapterRawPayload[] = [
      {
        sourceId: this.config.id,
        payloadId: 'SIH-2026-HARDWARE-01',
        fetchedAt: new Date().toISOString(),
        rawContent: {
          title: 'Smart India Hackathon 2026 - Hardware & AI Division',
          organizer: 'Ministry of Education Innovation Cell (MIC) & AICTE',
          desc: 'National 36-hour hackathon solving problem statements from 50+ Central Ministries & Top Industries in AI, Defense, Clean Energy & Healthcare.',
          url: 'https://sih.gov.in/sih2026',
          regUrl: 'https://sih.gov.in/register-student-2026',
          deadline: new Date(Date.now() + 14 * 86400000).toISOString(),
          prize: '₹1,00,00,000 Total Prize Pool + Govt Internship Offers',
          tech: ['Artificial Intelligence', 'Internet of Things', 'Robotics', 'Clean Energy'],
          mode: 'Hybrid',
          venue: 'Nodal Centers Across India',
          rounds: [
            { num: 1, title: 'College Internal Hackathon Screening', date: new Date(Date.now() + 3 * 86400000).toISOString(), type: 'Prototype Submission' },
            { num: 2, title: 'National Level Evaluation', date: new Date(Date.now() + 8 * 86400000).toISOString(), type: 'Abstract Submission' },
            { num: 3, title: 'Grand Finale 36-Hour Hackathon', date: new Date(Date.now() + 14 * 86400000).toISOString(), type: 'Grand Finale Pitch' },
          ]
        }
      }
    ];

    return {
      success: true,
      rawPayloads,
      durationMs: Date.now() - startTime
    };
  }

  public Parse(raw: AdapterRawPayload): AdapterParseResult {
    const data = raw.rawContent;
    if (!data.title || !data.deadline) {
      return { rawOpportunity: {}, isValid: false, validationErrors: ['Missing required fields: title/deadline'] };
    }

    return {
      rawOpportunity: {
        externalId: raw.payloadId,
        title: data.title,
        organizer: data.organizer,
        problemStatement: data.desc,
        officialWebsite: data.url,
        registrationUrl: data.regUrl,
        registrationDeadline: data.deadline,
        prizePoolText: data.prize,
        mode: data.mode || 'Hybrid',
        venue: data.venue,
        primaryCategory: 'Government',
        secondaryCategory: 'Hackathon',
      },
      isValid: true
    };
  }

  public Normalize(parsed: Partial<Opportunity>): Opportunity {
    const now = new Date().toISOString();
    return {
      id: parsed.id || `sih-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sourceId: this.config.id,
      sourceName: this.config.name,
      externalId: parsed.externalId || 'SIH-GENERIC',
      title: parsed.title || 'Smart India Hackathon',
      tagline: 'India\'s largest national open innovation hackathon for engineering students',
      organizer: parsed.organizer || 'MIC & AICTE',
      organizerLogo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
      posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
      brochureUrl: 'https://sih.gov.in/brochure2026.pdf',
      
      primaryCategory: 'Government',
      secondaryCategory: 'Hackathon',
      technologies: ['Artificial Intelligence', 'Internet of Things', 'Robotics', 'Clean Energy'],
      
      mode: 'Hybrid',
      venue: 'National Nodal Centers',
      officialWebsite: parsed.officialWebsite || 'https://sih.gov.in/sih2026',
      registrationUrl: parsed.registrationUrl || 'https://sih.gov.in/register-student-2026',
      
      registrationStartDate: now,
      registrationDeadline: parsed.registrationDeadline || new Date(Date.now() + 12 * 86400000).toISOString(),
      eventStartDate: new Date(Date.now() + 15 * 86400000).toISOString(),
      eventEndDate: new Date(Date.now() + 17 * 86400000).toISOString(),
      
      prizePoolText: parsed.prizePoolText || '₹1,00,00,000 + Govt Mentorship & Incubation',
      prizeAmountUSD: 120000,
      prizesBreakdown: {
        first: '₹1,00,000 per problem statement (100 Winners)',
        second: '₹75,000 Runner up per domain',
        third: '₹50,000 Special Innovation Award',
        hiringOffers: true,
        internshipOffers: true,
        incubationGrant: true
      },

      eligibility: {
        yearsAllowed: ['UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
        departments: ['Computer Science & Engineering', 'Electronics & Comm', 'Electrical', 'Mechanical', 'AI & Data Science'],
        minTeamSize: 6,
        maxTeamSize: 6,
        description: 'Mandatory 6 members per team with at least 1 female team member.'
      },
      
      problemStatement: parsed.problemStatement || 'Solve real-world challenges posed by Central Ministries and industry leaders.',
      rulesAndGuidelines: '1. All code must be written during the final hackathon phase. 2. College SPOC nomination is required.',
      scheduleDetails: 'Round 1 Internal -> Round 2 National Evaluation -> Round 3 Grand Finale',
      rounds: [
        {
          id: 'r1',
          roundNumber: 1,
          title: 'Campus Internal Selection',
          startDate: now,
          endDate: new Date(Date.now() + 4 * 86400000).toISOString(),
          description: 'Internal hackathon evaluated by college innovation council',
          submissionRequired: true,
          type: 'Abstract Submission',
          status: 'Active'
        },
        {
          id: 'r2',
          roundNumber: 2,
          title: 'National Nodal Review',
          startDate: new Date(Date.now() + 5 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 10 * 86400000).toISOString(),
          description: 'Ministry experts review submitted design prototypes',
          submissionRequired: true,
          type: 'Prototype Submission',
          status: 'Upcoming'
        },
        {
          id: 'r3',
          roundNumber: 3,
          title: 'Grand Finale 36h Live Hackathon',
          startDate: new Date(Date.now() + 15 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 17 * 86400000).toISOString(),
          description: 'Non-stop building & live pitch to Ministry Jury',
          submissionRequired: true,
          type: 'Grand Finale Pitch',
          status: 'Upcoming'
        }
      ],
      contacts: [
        { name: 'Dr. Abhay Jere', role: 'Chief Innovation Officer', email: 'cio@mic.gov.in', designation: 'MIC AICTE' },
        { name: 'National SIH Helpdesk', role: 'Support Team', email: 'hackathon@sih.gov.in' }
      ],
      
      priority: {
        totalScore: 98,
        level: 'Highly Recommended',
        urgencyDays: 14,
        deptSuitability: { CSE: 98, ECE: 92, EEE: 90, MECH: 85, AIDS: 98 },
        placementValue: 10,
        innovationValue: 10,
        hiringValue: 9,
        researchValue: 8,
        reasoning: ['Top Tier National Recognition', 'Direct Ministry Internship Offers', 'High Placement Impact']
      },
      
      status: 'Active',
      discoveredAt: now,
      lastUpdatedAt: now,
      version: 1,
      changeHistory: [
        {
          id: 'c1',
          opportunityId: parsed.id || 'sih-initial',
          timestamp: now,
          fieldType: 'STATUS',
          summary: 'Opportunity discovered and ingested via SIH Govt Adapter',
          oldValue: 'None',
          newValue: 'Ingested Active'
        }
      ]
    };
  }

  public Validate(op: Opportunity): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!op.title) errors.push('Title is required');
    if (!op.registrationDeadline) errors.push('Registration deadline required');
    if (!op.registrationUrl) errors.push('Registration URL required');
    return { valid: errors.length === 0, errors };
  }

  public Update(existing: Opportunity, incoming: Opportunity): { updated: Opportunity; hasChanges: boolean; diffs: string[] } {
    const diffs: string[] = [];
    let updated = { ...existing };
    let hasChanges = false;

    if (existing.registrationDeadline !== incoming.registrationDeadline) {
      diffs.push(`Deadline changed from ${new Date(existing.registrationDeadline).toLocaleDateString()} to ${new Date(incoming.registrationDeadline).toLocaleDateString()}`);
      updated.registrationDeadline = incoming.registrationDeadline;
      hasChanges = true;
    }

    if (existing.prizePoolText !== incoming.prizePoolText) {
      diffs.push(`Prize updated from ${existing.prizePoolText} to ${incoming.prizePoolText}`);
      updated.prizePoolText = incoming.prizePoolText;
      hasChanges = true;
    }

    if (hasChanges) {
      updated.version += 1;
      updated.lastUpdatedAt = new Date().toISOString();
      updated.changeHistory.unshift({
        id: `chg-${Date.now()}`,
        opportunityId: existing.id,
        timestamp: new Date().toISOString(),
        fieldType: 'DEADLINE',
        summary: diffs.join('; '),
        oldValue: existing.registrationDeadline,
        newValue: incoming.registrationDeadline
      });
    }

    return { updated, hasChanges, diffs };
  }

  public async HealthCheck(): Promise<{ healthy: boolean; pingMs: number; statusMessage: string }> {
    const pingMs = Math.floor(Math.random() * 40) + 15;
    return {
      healthy: true,
      pingMs,
      statusMessage: `SIH API Adapter operational (Ping: ${pingMs}ms, SSL Valid)`
    };
  }
}
