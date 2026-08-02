import { OpportunityRound, ContactPerson } from '../../types/opportunity';

export interface PdfExtractionResult {
  success: boolean;
  documentUrl: string;
  extractedText: string;
  deadlines: { title: string; dateStr: string; description: string }[];
  rules: string[];
  eligibilityDescription?: string;
  prizePoolText?: string;
  rounds: Partial<OpportunityRound>[];
  evaluationCriteria: string[];
  contacts: ContactPerson[];
  extractedAt: string;
}

export class PdfDocumentExtractor {
  /**
   * Simulates deep PDF parsing for event brochures, rulebooks, and problem statement documents
   */
  public static async parseBrochurePdf(pdfUrl: string): Promise<PdfExtractionResult> {
    const extractedAt = new Date().toISOString();

    // Simulated robust PDF text extraction logic
    if (!pdfUrl || pdfUrl === '#') {
      return {
        success: false,
        documentUrl: pdfUrl || '',
        extractedText: '',
        deadlines: [],
        rules: [],
        rounds: [],
        evaluationCriteria: [],
        contacts: [],
        extractedAt
      };
    }

    return {
      success: true,
      documentUrl: pdfUrl,
      extractedText: `Official Rulebook PDF Extracted. Contains detailed round breakdowns, eligibility guidelines, and evaluation rubrics.`,
      deadlines: [
        {
          title: 'Abstract Submission Deadline',
          dateStr: new Date(Date.now() + 10 * 86400000).toISOString(),
          description: 'PDF Page 4: Submit 5-page PDF whitepaper detailing problem approach'
        },
        {
          title: 'Final Prototype Submission',
          dateStr: new Date(Date.now() + 18 * 86400000).toISOString(),
          description: 'PDF Page 8: Upload working repository and demo video'
        }
      ],
      rules: [
        'All code must be committed to public GitHub repository during event timeline.',
        'Maximum 6 members per team with mandatory interdisciplinary representation.',
        'Use of open-source frameworks permitted under Apache 2.0 or MIT licensing.'
      ],
      eligibilityDescription: 'Open to full-time B.E / B.Tech / M.Tech / M.Sc / PhD students across registered academic institutions.',
      prizePoolText: '₹15,00,000 Total Prize Pool + Fast-Track Incubation',
      rounds: [
        {
          roundNumber: 1,
          title: 'Whitepaper & Architecture Review',
          description: 'Extracted from PDF Section 3.1: Technical feasibility evaluation',
          submissionRequired: true,
          type: 'Abstract Submission'
        },
        {
          roundNumber: 2,
          title: 'Working Prototype & Code Audit',
          description: 'Extracted from PDF Section 3.2: Automated test suite execution',
          submissionRequired: true,
          type: 'Prototype Submission'
        }
      ],
      evaluationCriteria: [
        'Innovation & Originality (30%)',
        'Technical Feasibility & Code Quality (35%)',
        'UI/UX & User Experience (15%)',
        'Impact & Sustainability (20%)'
      ],
      contacts: [
        {
          name: 'Convenor & Chief SPOC',
          role: 'Event Director',
          email: 'spoc@officialportal.org',
          phone: '+91 98765 43210',
          designation: 'Head of Innovation Cell'
        }
      ],
      extractedAt
    };
  }
}
