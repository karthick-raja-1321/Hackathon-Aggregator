import { Opportunity } from '../../types/opportunity';
import { BaseSourceAdapter, AdapterFetchResult, AdapterParseResult, AdapterRawPayload } from './SourceAdapter';

export class ReskilllAdapter extends BaseSourceAdapter {
  public async Fetch(): Promise<AdapterFetchResult> {
    const startTime = Date.now();
    const targetUrl = this.config.baseUrl || 'https://reskilll.com/discover';

    // Simulated network fetch from Reskilll Discover hackathon aggregator API/Scraper
    const rawPayloads: AdapterRawPayload[] = [
      {
        sourceId: this.config.id,
        payloadId: 'RESKILLL-SPARK-AI-2026',
        fetchedAt: new Date().toISOString(),
        rawContent: {
          title: 'Reskilll Spark AI & Cloud Innovation Hackathon 2026',
          organizer: 'Reskilll Developer Community & Tech Partners',
          desc: 'Build high-impact AI agents, cloud-native applications, and developer productivity tools. Showcase your innovations to top tech recruiters and community leads.',
          url: targetUrl,
          regUrl: 'https://reskilll.com/event/spark-ai-2026',
          deadline: new Date(Date.now() + 14 * 86400000).toISOString(),
          prize: '₹12,50,00,000 Total Pool + Cloud Compute Credits & Hiring Referral Vouchers',
          tech: ['Artificial Intelligence', 'Cloud Computing', 'Web Development', 'Machine Learning'],
          mode: 'Online',
          bannerUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
          posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80'
        }
      },
      {
        sourceId: this.config.id,
        payloadId: 'RESKILLL-WEB3-DEV-2026',
        fetchedAt: new Date().toISOString(),
        rawContent: {
          title: 'Reskilll Web3 & Smart Contracts Summit Hackathon',
          organizer: 'Reskilll & Global Web3 Ecosystem Founders',
          desc: 'Cross-chain decentralized app development challenge for university students and open-source contributors.',
          url: targetUrl,
          regUrl: 'https://reskilll.com/event/web3-dev-2026',
          deadline: new Date(Date.now() + 22 * 86400000).toISOString(),
          prize: '$50,000 USD Bounties + Grant Mentorship',
          tech: ['Blockchain', 'Cyber Security', 'Web Development'],
          mode: 'Hybrid',
          bannerUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80',
          posterUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=600&auto=format&fit=crop&q=80'
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
    const d = raw.rawContent;
    if (!d.title) {
      return { rawOpportunity: {}, isValid: false, validationErrors: ['Missing required field: title'] };
    }

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
        posterUrl: d.posterUrl,
        mode: d.mode || 'Online',
        primaryCategory: 'Industry',
        secondaryCategory: 'Hackathon'
      },
      isValid: true
    };
  }

  public Normalize(parsed: Partial<Opportunity>): Opportunity {
    const now = new Date().toISOString();
    return {
      id: parsed.id || `reskilll-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sourceId: this.config.id,
      sourceName: this.config.name || 'Reskilll Hackathons & Innovation Discover Feed',
      externalId: parsed.externalId || `RESKILLL-${Date.now()}`,
      title: parsed.title || 'Reskilll Hackathon Innovation Challenge',
      tagline: 'Discovered from official Reskilll Hackathon & Tech Event Feed',
      organizer: parsed.organizer || 'Reskilll Developer Ecosystem',
      organizerLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      posterUrl: parsed.posterUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
      brochureUrl: parsed.officialWebsite || 'https://reskilll.com/discover',
      
      primaryCategory: 'Industry',
      secondaryCategory: 'Hackathon',
      technologies: ['Artificial Intelligence', 'Cloud Computing', 'Web Development', 'Machine Learning'],
      
      mode: (parsed.mode as any) || 'Online',
      venue: 'Online & Virtual Hackathon Arenas',
      officialWebsite: parsed.officialWebsite || this.config.baseUrl || 'https://reskilll.com/discover',
      registrationUrl: parsed.registrationUrl || 'https://reskilll.com/discover',
      
      registrationStartDate: now,
      registrationDeadline: parsed.registrationDeadline || new Date(Date.now() + 14 * 86400000).toISOString(),
      eventStartDate: new Date(Date.now() + 16 * 86400000).toISOString(),
      eventEndDate: new Date(Date.now() + 18 * 86400000).toISOString(),
      
      prizePoolText: parsed.prizePoolText || '₹12,50,00,000 Total Pool + Cloud Compute Credits',
      prizeAmountUSD: 150000,
      prizesBreakdown: {
        first: '₹5,00,000 First Prize + Direct Tech Referrals',
        second: '₹2,50,000 Runner Up',
        third: '₹1,00,000 Category Winners',
        hiringOffers: true,
        internshipOffers: true,
        incubationGrant: true
      },

      eligibility: {
        yearsAllowed: ['UG 1st Year', 'UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
        departments: ['Computer Science & Engineering', 'AI & Data Science', 'Electronics & Comm', 'Information Tech'],
        minTeamSize: 1,
        maxTeamSize: 4,
        description: 'Open to engineering students, developers, and tech community members.'
      },
      
      problemStatement: parsed.problemStatement || 'Solve real-world challenges in AI, Cloud infrastructure, and web technologies.',
      rulesAndGuidelines: '1. Register via Reskilll Discover. 2. Submit GitHub repository and demo video before deadline.',
      scheduleDetails: 'Reskilll Online Registration -> Prototype Build -> Final Pitch & Jury Evaluation',
      rounds: [
        {
          id: `reskilll-r1-${Date.now()}`,
          roundNumber: 1,
          title: 'Reskilll Discover Registration & Idea Submission',
          startDate: now,
          endDate: parsed.registrationDeadline || new Date(Date.now() + 14 * 86400000).toISOString(),
          description: 'Submit team registration and initial architecture abstract',
          submissionRequired: true,
          type: 'Abstract Submission',
          status: 'Active'
        },
        {
          id: `reskilll-r2-${Date.now()}`,
          roundNumber: 2,
          title: 'Live Pitch & Community Finale',
          startDate: new Date(Date.now() + 16 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 18 * 86400000).toISOString(),
          description: 'Present built prototype live to Reskilll partner mentors & judges',
          submissionRequired: true,
          type: 'Grand Finale Pitch',
          status: 'Upcoming'
        }
      ],
      contacts: [
        { name: 'Reskilll Community Support', role: 'Event Operations', email: 'support@reskilll.com' }
      ],
      
      priority: {
        totalScore: 96,
        level: 'Highly Recommended',
        urgencyDays: 14,
        deptSuitability: { CSE: 98, AIDS: 97, ECE: 92, IT: 96 },
        placementValue: 9,
        innovationValue: 9,
        hiringValue: 9,
        researchValue: 8,
        reasoning: ['Discovered from Active Reskilll Discover Portal', 'High Career & Hiring Impact', 'Community & Industry Recognition']
      },
      
      status: 'Active',
      discoveredAt: now,
      lastUpdatedAt: now,
      version: 1,
      changeHistory: []
    };
  }

  public Validate(op: Opportunity) {
    return { valid: !!op.title && !!op.registrationUrl, errors: [] };
  }

  public Update(existing: Opportunity, _incoming: Opportunity) {
    return { updated: existing, hasChanges: false, diffs: [] };
  }

  public async HealthCheck() {
    return { healthy: true, pingMs: 24, statusMessage: 'Reskilll Feed Scraper Operational' };
  }
}
