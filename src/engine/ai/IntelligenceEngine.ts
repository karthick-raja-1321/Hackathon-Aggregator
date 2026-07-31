import { Opportunity, PrimaryCategory, SecondaryCategory, TechnologyTag, PriorityScore, PriorityLevel } from '../../types/opportunity';

export class IntelligenceEngine {
  /**
   * Normalizes text representations across technologies, organizers, categories, etc.
   */
  public static normalizeText(input: string): string {
    if (!input) return '';
    const clean = input.trim();
    
    // Normalize Tech
    if (/^ai$|^artificial\s*intelligence$/i.test(clean)) return 'Artificial Intelligence';
    if (/^ml$|^machine\s*learning$/i.test(clean)) return 'Machine Learning';
    if (/^cyber\s*security$|^cybersecurity$|^infosec$/i.test(clean)) return 'Cyber Security';
    if (/^cloud$|^aws$|^gcp$|^azure$|^cloud\s*computing$/i.test(clean)) return 'Cloud Computing';
    if (/^blockchain$|^web3$|^crypto$/i.test(clean)) return 'Blockchain';
    if (/^iot$|^internet\s*of\s*things$/i.test(clean)) return 'Internet of Things';
    if (/^quantum$|^quantum\s*computing$/i.test(clean)) return 'Quantum Computing';
    if (/^robotics$|^automation$/i.test(clean)) return 'Robotics';
    
    // Normalize Organizers
    if (/mic|aicte|ministry of education/i.test(clean)) return 'Ministry of Education Innovation Cell & AICTE';
    if (/meity|digital india/i.test(clean)) return 'MeitY & Digital India Corporation';
    if (/google|devpost/i.test(clean)) return 'Google Developer Relations & Devpost';
    if (/ieee/i.test(clean)) return 'IEEE International Society';

    return clean;
  }

  /**
   * Normalizes an array of technology strings into standardized TechnologyTag items
   */
  public static normalizeTechnologies(rawTechs: string[]): TechnologyTag[] {
    const canonicalMap: Record<string, TechnologyTag> = {
      'ai': 'Artificial Intelligence',
      'artificial intelligence': 'Artificial Intelligence',
      'artificial-intelligence': 'Artificial Intelligence',
      'ml': 'Machine Learning',
      'machine learning': 'Machine Learning',
      'cyber security': 'Cyber Security',
      'cybersecurity': 'Cyber Security',
      'cloud': 'Cloud Computing',
      'cloud computing': 'Cloud Computing',
      'blockchain': 'Blockchain',
      'iot': 'Internet of Things',
      'internet of things': 'Internet of Things',
      'quantum': 'Quantum Computing',
      'quantum computing': 'Quantum Computing',
      'robotics': 'Robotics',
      'healthcare': 'Healthcare Tech',
      'healthtech': 'Healthcare Tech',
      'edtech': 'EdTech',
      'agritech': 'AgriTech',
      'fintech': 'FinTech',
      'web': 'Web Development',
      'mobile': 'Mobile App Dev'
    };

    const set = new Set<TechnologyTag>();
    for (const raw of rawTechs) {
      const lower = raw.toLowerCase().trim();
      if (canonicalMap[lower]) {
        set.add(canonicalMap[lower]);
      } else {
        // Fallback fuzzy check
        if (lower.includes('ai') || lower.includes('intelligence')) set.add('Artificial Intelligence');
        if (lower.includes('learn')) set.add('Machine Learning');
        if (lower.includes('security')) set.add('Cyber Security');
        if (lower.includes('cloud')) set.add('Cloud Computing');
        if (lower.includes('robot')) set.add('Robotics');
      }
    }

    if (set.size === 0) set.add('Artificial Intelligence');
    return Array.from(set);
  }

  /**
   * Intelligently classifies primary and secondary categories from raw text content
   */
  public static classifyOpportunity(title: string, description: string, organizer: string): { primary: PrimaryCategory; secondary: SecondaryCategory } {
    const text = `${title} ${description} ${organizer}`.toLowerCase();

    // Determine Primary
    let primary: PrimaryCategory = 'Industry';
    if (/ministry|meity|govt|government|aicte|isro|drdo|dst|birac|idex/i.test(text)) {
      primary = 'Government';
    } else if (/ieee|acm|university|iit|nit|mit|stanford|harvard|academic/i.test(text)) {
      primary = 'Academic';
    } else if (/research|grant|paper|fellowship|phd|lab/i.test(text)) {
      primary = 'Research';
    } else if (/startup|incubator|seed|venture|angel/i.test(text)) {
      primary = 'Startup';
    } else if (/global|international|world|devpost|unicef|unesco/i.test(text)) {
      primary = 'International';
    }

    // Determine Secondary
    let secondary: SecondaryCategory = 'Hackathon';
    if (/hackathon|coding contest|hack/i.test(text)) {
      secondary = 'Hackathon';
    } else if (/ideathon|idea|pitch|concept/i.test(text)) {
      secondary = 'Ideathon';
    } else if (/grant|funding|seed fund|bounty/i.test(text)) {
      secondary = 'Grant';
    } else if (/internship|hiring|job|fellowship/i.test(text)) {
      secondary = 'Internship';
    } else if (/workshop|hands-on|bootcamp|training/i.test(text)) {
      secondary = 'Workshop';
    } else if (/challenge|competition|contest/i.test(text)) {
      secondary = 'Innovation Challenge';
    }

    return { primary, secondary };
  }

  /**
   * Computes multi-dimensional Smart Priority Score & Department Suitability
   */
  public static calculatePriorityScore(op: Partial<Opportunity>): PriorityScore {
    const deadline = op.registrationDeadline ? new Date(op.registrationDeadline) : new Date(Date.now() + 10 * 86400000);
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    const urgencyDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const isClosed = diffMs < 0;

    let score = 70; // Base score
    const reasoning: string[] = [];

    if (isClosed) {
      reasoning.push('Registration Deadline Closed');
    }

    // Govt / National level boost
    if (op.primaryCategory === 'Government') {
      score += 15;
      reasoning.push('Government / National level recognition (+15)');
    }

    // Hiring / Internship boost
    if (op.prizesBreakdown?.hiringOffers || op.prizesBreakdown?.internshipOffers) {
      score += 10;
      reasoning.push('Direct hiring / internship incentives (+10)');
    }

    // High Prize Pool
    if (op.prizeAmountUSD && op.prizeAmountUSD >= 10000) {
      score += 8;
      reasoning.push('Substantial prize pool / grant funding (+8)');
    }

    // Urgency factor
    if (urgencyDays <= 3) {
      score += 7;
      reasoning.push(`High Urgency: Closing in ${urgencyDays} days (+7)`);
    }

    // Cap score
    const totalScore = Math.min(100, Math.max(0, score));

    let level: PriorityLevel = 'Optional';
    if (totalScore >= 90) level = 'Highly Recommended';
    else if (totalScore >= 75) level = 'Recommended';

    // Department suitability breakdown
    const isAI = op.technologies?.includes('Artificial Intelligence') || op.technologies?.includes('Machine Learning');
    const isIoT = op.technologies?.includes('Internet of Things') || op.technologies?.includes('Robotics');

    const deptSuitability: Record<string, number> = {
      CSE: isAI ? 98 : 90,
      AIDS: isAI ? 100 : 88,
      ECE: isIoT ? 96 : 82,
      EEE: isIoT ? 90 : 75,
      MECH: isIoT ? 88 : 70,
      IT: 92
    };

    return {
      totalScore,
      level,
      urgencyDays,
      deptSuitability,
      placementValue: op.prizesBreakdown?.hiringOffers ? 10 : 8,
      innovationValue: op.secondaryCategory === 'Hackathon' ? 10 : 8,
      hiringValue: op.prizesBreakdown?.internshipOffers ? 10 : 7,
      researchValue: op.primaryCategory === 'Research' || op.primaryCategory === 'Government' ? 9 : 6,
      reasoning
    };
  }
}
