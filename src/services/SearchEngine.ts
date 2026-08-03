import { Opportunity, PrimaryCategory, SecondaryCategory, TechnologyTag } from '../types/opportunity';

export interface SearchFilterState {
  query: string;
  primaryCategory?: PrimaryCategory | 'ALL';
  secondaryCategory?: SecondaryCategory | 'ALL';
  technology?: TechnologyTag | 'ALL';
  deadlineRange?: 'ALL' | 'TODAY' | 'TOMORROW' | 'THIS_WEEK' | 'THIS_MONTH';
  priorityLevel?: 'ALL' | 'Highly Recommended' | 'Recommended' | 'Optional';
  mode?: 'ALL' | 'Online' | 'Offline' | 'Hybrid';
  includeClosed?: boolean;
  viewTab?: 'ACTIVE' | 'PAST_EVENTS' | 'ALL';
}

export class SearchEngine {
  /**
   * Parses natural language queries into structured search filter states
   */
  public static parseNaturalLanguageQuery(input: string): SearchFilterState {
    const text = input.toLowerCase().trim();
    const filter: SearchFilterState = { query: input, includeClosed: false };

    // Detect Category
    if (text.includes('govt') || text.includes('government')) filter.primaryCategory = 'Government';
    else if (text.includes('industry')) filter.primaryCategory = 'Industry';
    else if (text.includes('academic') || text.includes('university') || text.includes('iit')) filter.primaryCategory = 'Academic';
    else if (text.includes('startup')) filter.primaryCategory = 'Startup';
    else if (text.includes('research')) filter.primaryCategory = 'Research';
    else if (text.includes('international') || text.includes('global')) filter.primaryCategory = 'International';

    // Detect Secondary Type
    if (text.includes('hackathon')) filter.secondaryCategory = 'Hackathon';
    else if (text.includes('ideathon')) filter.secondaryCategory = 'Ideathon';
    else if (text.includes('grant')) filter.secondaryCategory = 'Grant';
    else if (text.includes('internship')) filter.secondaryCategory = 'Internship';
    else if (text.includes('workshop') || text.includes('bootcamp')) filter.secondaryCategory = 'Workshop';
    else if (text.includes('challenge')) filter.secondaryCategory = 'Innovation Challenge';

    // Detect Tech
    if (text.includes('ai') || text.includes('artificial intelligence')) filter.technology = 'Artificial Intelligence';
    else if (text.includes('ml') || text.includes('machine learning')) filter.technology = 'Machine Learning';
    else if (text.includes('cyber') || text.includes('security')) filter.technology = 'Cyber Security';
    else if (text.includes('cloud')) filter.technology = 'Cloud Computing';
    else if (text.includes('iot')) filter.technology = 'Internet of Things';
    else if (text.includes('quantum')) filter.technology = 'Quantum Computing';
    else if (text.includes('robot')) filter.technology = 'Robotics';

    // Detect Deadline Range
    if (text.includes('today')) filter.deadlineRange = 'TODAY';
    else if (text.includes('tomorrow')) filter.deadlineRange = 'TOMORROW';
    else if (text.includes('this week') || text.includes('closing soon')) filter.deadlineRange = 'THIS_WEEK';

    return filter;
  }

  /**
   * Filters opportunities based on current filter state
   */
  public static filterOpportunities(opportunities: Opportunity[], filter: SearchFilterState): Opportunity[] {
    const nowMs = Date.now();

    return opportunities.filter(op => {
      const deadlineMs = new Date(op.registrationDeadline).getTime();
      const isExpired = deadlineMs < nowMs || op.priority.urgencyDays < 0 || op.status === 'Closed';

      // 0. ACTIVE vs PAST EVENTS TAB FILTERING
      if (filter.viewTab === 'PAST_EVENTS') {
        if (!isExpired) return false;
      } else if (filter.viewTab === 'ACTIVE') {
        if (isExpired && !filter.includeClosed) return false;
      } else if (!filter.includeClosed && isExpired) {
        return false;
      }

      // 1. Text Query
      if (filter.query && filter.query.trim().length > 0) {
        const q = filter.query.toLowerCase().trim();
        const matchesTitle = op.title.toLowerCase().includes(q);
        const matchesOrganizer = op.organizer.toLowerCase().includes(q);
        const matchesProblem = op.problemStatement.toLowerCase().includes(q);
        const matchesTech = op.technologies.some(t => t.toLowerCase().includes(q));
        const matchesCat = op.primaryCategory.toLowerCase().includes(q) || op.secondaryCategory.toLowerCase().includes(q);

        if (!matchesTitle && !matchesOrganizer && !matchesProblem && !matchesTech && !matchesCat) {
          return false;
        }
      }

      // 2. Primary Category
      if (filter.primaryCategory && filter.primaryCategory !== 'ALL' && op.primaryCategory !== filter.primaryCategory) {
        return false;
      }

      // 3. Secondary Category
      if (filter.secondaryCategory && filter.secondaryCategory !== 'ALL' && op.secondaryCategory !== filter.secondaryCategory) {
        return false;
      }

      // 4. Technology
      if (filter.technology && filter.technology !== 'ALL' && !op.technologies.includes(filter.technology)) {
        return false;
      }

      // 5. Priority Level
      if (filter.priorityLevel && filter.priorityLevel !== 'ALL' && op.priority.level !== filter.priorityLevel) {
        return false;
      }

      // 6. Mode
      if (filter.mode && filter.mode !== 'ALL' && op.mode !== filter.mode) {
        return false;
      }

      // 7. Deadline Range Filter
      if (filter.deadlineRange && filter.deadlineRange !== 'ALL') {
        const days = op.priority.urgencyDays;
        if (filter.deadlineRange === 'TODAY' && (days < 0 || days > 0)) return false;
        if (filter.deadlineRange === 'TOMORROW' && days !== 1) return false;
        if (filter.deadlineRange === 'THIS_WEEK' && (days < 0 || days > 7)) return false;
        if (filter.deadlineRange === 'THIS_MONTH' && (days < 0 || days > 30)) return false;
      }

      return true;
    });
  }
}
