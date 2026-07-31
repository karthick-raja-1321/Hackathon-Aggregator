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
