import { Opportunity, ChangeRecord } from '../../types/opportunity';

export interface DataConflictItem {
  fieldName: string;
  sources: { sourceName: string; value: any; timestamp: string; authorityWeight: number }[];
  resolvedValue: any;
  winningSource: string;
  conflictReason: string;
  requiresManualReview: boolean;
}

export interface ConflictResolutionReport {
  hasConflicts: boolean;
  conflictsCount: number;
  unresolvedConflictsCount: number;
  conflicts: DataConflictItem[];
  resolvedOpportunity: Partial<Opportunity>;
  auditTrail: ChangeRecord[];
}

export class AIConflictResolver {
  /**
   * Resolves conflicts across Landing Page, Registration Form, PDF Brochure, Poster OCR, and Social Media
   */
  public static resolveCrossSourceData(
    landingPageData: Partial<Opportunity>,
    regFormData: Partial<Opportunity>,
    pdfBrochureData: Partial<Opportunity>,
    posterOcrData: Partial<Opportunity>
  ): ConflictResolutionReport {
    const conflicts: DataConflictItem[] = [];
    const auditTrail: ChangeRecord[] = [];
    const now = new Date().toISOString();

    // 1. Resolve Registration Deadline Conflict
    const d1 = landingPageData.registrationDeadline;
    const d2 = regFormData.registrationDeadline;
    const d3 = pdfBrochureData.registrationDeadline;
    const d4 = posterOcrData.registrationDeadline;

    let resolvedDeadline = d2 || d3 || d1 || d4 || new Date(Date.now() + 14 * 86400000).toISOString();
    let winningSource = d2 ? 'Registration Portal Form' : d3 ? 'Official Brochure PDF' : 'Landing Page DOM';

    if (d1 && d2 && d1 !== d2) {
      conflicts.push({
        fieldName: 'registrationDeadline',
        sources: [
          { sourceName: 'Landing Page DOM', value: d1, timestamp: now, authorityWeight: 0.85 },
          { sourceName: 'Registration Portal Form', value: d2, timestamp: now, authorityWeight: 1.0 }
        ],
        resolvedValue: d2,
        winningSource,
        conflictReason: 'Registration portal deadline prioritised over landing page banner text',
        requiresManualReview: false
      });

      auditTrail.push({
        id: `conflict-${Date.now()}-1`,
        opportunityId: landingPageData.id || 'resolved-op',
        timestamp: now,
        fieldType: 'DEADLINE',
        summary: `AI Conflict Resolver: Prioritised official Registration Portal deadline (${new Date(d2).toLocaleDateString()}) over Landing Page text (${new Date(d1).toLocaleDateString()})`,
        oldValue: d1,
        newValue: d2
      });
    }

    // 2. Resolve Prize Pool Conflict
    const p1 = landingPageData.prizePoolText;
    const p3 = pdfBrochureData.prizePoolText;
    let resolvedPrize = p3 || p1 || 'Prizes & Recognition';
    if (p1 && p3 && p1 !== p3) {
      conflicts.push({
        fieldName: 'prizePoolText',
        sources: [
          { sourceName: 'Landing Page DOM', value: p1, timestamp: now, authorityWeight: 0.8 },
          { sourceName: 'Official Brochure PDF', value: p3, timestamp: now, authorityWeight: 0.95 }
        ],
        resolvedValue: p3,
        winningSource: 'Official Brochure PDF',
        conflictReason: 'Brochure PDF rules breakdown prioritized over promotional landing page summary',
        requiresManualReview: false
      });
    }

    const resolvedOpportunity: Partial<Opportunity> = {
      ...landingPageData,
      registrationDeadline: resolvedDeadline,
      prizePoolText: resolvedPrize,
      brochureUrl: pdfBrochureData.brochureUrl || landingPageData.brochureUrl,
      posterUrl: posterOcrData.posterUrl || landingPageData.posterUrl
    };

    return {
      hasConflicts: conflicts.length > 0,
      conflictsCount: conflicts.length,
      unresolvedConflictsCount: conflicts.filter(c => c.requiresManualReview).length,
      conflicts,
      resolvedOpportunity,
      auditTrail
    };
  }
}
