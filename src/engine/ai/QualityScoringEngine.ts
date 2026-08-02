import { Opportunity, QualityScore, VerificationStatus } from '../../types/opportunity';

export interface ComprehensiveQualityReport {
  extractionScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  urlHealthScore: number; // 0 - 100
  deadlineConfidence: number; // 0 - 100
  dataCompleteness: number; // 0 - 100
  missingFields: string[];
  manualReviewRequired: boolean;
  qualityScore: QualityScore;
}

export class QualityScoringEngine {
  /**
   * Calculates 13-point data completeness and quality report
   */
  public static generateQualityReport(
    opportunity: Partial<Opportunity>,
    sourceReliabilityMs: number = 95
  ): ComprehensiveQualityReport {
    // 13 Required Fields Verification
    const mandatoryFieldsMap: { key: keyof Opportunity; label: string }[] = [
      { key: 'title', label: 'Title' },
      { key: 'organizer', label: 'Organizer' },
      { key: 'registrationUrl', label: 'Registration URL' },
      { key: 'officialWebsite', label: 'Official Website' },
      { key: 'registrationDeadline', label: 'Registration Deadline' },
      { key: 'problemStatement', label: 'Description / Problem Statement' },
      { key: 'prizePoolText', label: 'Prize Pool' },
      { key: 'eligibility', label: 'Eligibility' },
      { key: 'technologies', label: 'Technology Tags' },
      { key: 'rounds', label: 'Rounds & Milestones' },
      { key: 'contacts', label: 'Contacts' },
      { key: 'brochureUrl', label: 'Brochure PDF' },
      { key: 'posterUrl', label: 'Poster Image' }
    ];

    const missingFields: string[] = [];
    let presentCount = 0;

    mandatoryFieldsMap.forEach(item => {
      const val = (opportunity as any)[item.key];
      if (val && (Array.isArray(val) ? val.length > 0 : true)) {
        presentCount++;
      } else {
        missingFields.push(item.label);
      }
    });

    const dataCompleteness = Math.round((presentCount / mandatoryFieldsMap.length) * 100);

    // Extraction Score & Confidence
    let extractionScore = Math.min(100, Math.round(dataCompleteness * 0.9 + 10));
    let confidenceScore = 85;
    if (opportunity.rounds && opportunity.rounds.length >= 2) confidenceScore += 10;
    if (opportunity.primaryCategory === 'Government') confidenceScore += 5;
    confidenceScore = Math.min(100, confidenceScore);

    // URL Health
    let urlHealthScore = 95;
    const regUrl = opportunity.registrationUrl || '';
    if (!regUrl || regUrl === '#') urlHealthScore = 20;

    // Deadline Confidence
    let deadlineConfidence = opportunity.registrationDeadline ? 98 : 0;

    const overallTrustScore = Math.round(
      0.25 * confidenceScore +
      0.25 * urlHealthScore +
      0.25 * dataCompleteness +
      0.25 * sourceReliabilityMs
    );

    const manualReviewRequired = dataCompleteness < 90 || missingFields.length > 2;

    let verificationStatus: VerificationStatus = 'Needs Review';
    if (overallTrustScore >= 90 && opportunity.primaryCategory === 'Government') {
      verificationStatus = 'Verified';
    } else if (overallTrustScore >= 85 && dataCompleteness >= 85) {
      verificationStatus = 'Auto Verified';
    } else if (dataCompleteness < 50 || !opportunity.registrationDeadline) {
      verificationStatus = 'Incomplete';
    } else {
      verificationStatus = 'Needs Review';
    }

    const qualityScore: QualityScore = {
      extractionConfidence: confidenceScore,
      urlHealthScore,
      dataCompleteness,
      sourceReliability: sourceReliabilityMs,
      overallTrustScore,
      verificationStatus
    };

    return {
      extractionScore,
      confidenceScore,
      urlHealthScore,
      deadlineConfidence,
      dataCompleteness,
      missingFields,
      manualReviewRequired,
      qualityScore
    };
  }

  public static computeQualityScore(
    opportunity: Partial<Opportunity>,
    sourceReliabilityMs: number = 95
  ): QualityScore {
    return this.generateQualityReport(opportunity, sourceReliabilityMs).qualityScore;
  }
}

