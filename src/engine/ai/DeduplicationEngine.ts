import { Opportunity } from '../../types/opportunity';

export interface DeduplicationMatch {
  existingOpportunityId: string;
  matchType: 'EXACT_URL' | 'FINGERPRINT' | 'MINHASH_SIMILARITY' | 'VECTOR_COSINE';
  confidenceScore: number; // 0 - 100
  reasoning: string;
}

export class DeduplicationEngine {
  /**
   * Evaluates an incoming candidate opportunity against existing repository items.
   */
  public static findDuplicates(
    candidate: Partial<Opportunity>,
    existingCollection: Opportunity[]
  ): DeduplicationMatch | null {
    if (!candidate.title || !candidate.organizer) {
      return null;
    }

    const normCandTitle = this.normalizeText(candidate.title);
    const normCandOrg = this.normalizeText(candidate.organizer);
    const candUrl = candidate.registrationUrl || candidate.officialWebsite || '';

    for (const existing of existingCollection) {
      // 1. Exact URL / External ID match (Highest Confidence: 100%)
      const existUrl = existing.registrationUrl || existing.officialWebsite || '';
      if (candUrl && existUrl && candUrl.toLowerCase() === existUrl.toLowerCase()) {
        return {
          existingOpportunityId: existing.id,
          matchType: 'EXACT_URL',
          confidenceScore: 100,
          reasoning: `Identical registration URL match: ${candUrl}`
        };
      }

      if (candidate.externalId && existing.externalId && candidate.externalId === existing.externalId) {
        return {
          existingOpportunityId: existing.id,
          matchType: 'EXACT_URL',
          confidenceScore: 100,
          reasoning: `Identical external ID match: ${candidate.externalId}`
        };
      }

      // 2. Title + Organizer Fingerprint Match (Confidence: 95%)
      const normExistTitle = this.normalizeText(existing.title);
      const normExistOrg = this.normalizeText(existing.organizer);

      if (normCandTitle === normExistTitle && normCandOrg === normExistOrg) {
        return {
          existingOpportunityId: existing.id,
          matchType: 'FINGERPRINT',
          confidenceScore: 95,
          reasoning: `Exact normalized title and organizer match`
        };
      }

      // 3. Jaccard Token Overlap (Confidence: 85 - 94%)
      const jaccardScore = this.calculateJaccardSimilarity(normCandTitle, normExistTitle);
      if (jaccardScore >= 0.82) {
        return {
          existingOpportunityId: existing.id,
          matchType: 'MINHASH_SIMILARITY',
          confidenceScore: Math.round(jaccardScore * 100),
          reasoning: `High token overlap similarity (${Math.round(jaccardScore * 100)}%) between titles`
        };
      }

      // 4. Simulated Vector Embedding Cosine Similarity (Confidence: 90 - 98%)
      const vectorSim = this.simulateVectorCosineSimilarity(candidate, existing);
      if (vectorSim >= 0.88) {
        return {
          existingOpportunityId: existing.id,
          matchType: 'VECTOR_COSINE',
          confidenceScore: Math.round(vectorSim * 100),
          reasoning: `Semantic vector embedding similarity threshold exceeded (${Math.round(vectorSim * 100)}%)`
        };
      }
    }

    return null;
  }

  /**
   * Merges incoming opportunity payload into existing opportunity canonical record.
   */
  public static mergeCanonicalRecord(existing: Opportunity, incoming: Partial<Opportunity>): Opportunity {
    const now = new Date().toISOString();
    const updated = { ...existing };

    // Update fields if incoming provides richer details
    if (!updated.posterUrl && incoming.posterUrl) updated.posterUrl = incoming.posterUrl;
    if (!updated.brochureUrl && incoming.brochureUrl) updated.brochureUrl = incoming.brochureUrl;
    if (!updated.bannerImage && incoming.bannerImage) updated.bannerImage = incoming.bannerImage;
    if (!updated.problemStatement && incoming.problemStatement) updated.problemStatement = incoming.problemStatement;

    // Merge technologies without duplicates
    if (incoming.technologies && incoming.technologies.length > 0) {
      const mergedTech = Array.from(new Set([...updated.technologies, ...incoming.technologies]));
      updated.technologies = mergedTech as any;
    }

    // Version increment & provenance logging
    updated.version += 1;
    updated.lastUpdatedAt = now;
    updated.changeHistory.unshift({
      id: `merge-${Date.now()}`,
      opportunityId: existing.id,
      timestamp: now,
      fieldType: 'STATUS',
      summary: `Canonical record enriched via multi-source deduplication from ${incoming.sourceName || 'Secondary Adapter'}`,
      oldValue: `v${existing.version}`,
      newValue: `v${updated.version}`
    });

    return updated;
  }

  private static normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private static calculateJaccardSimilarity(strA: string, strB: string): number {
    const setA = new Set(strA.split(' '));
    const setB = new Set(strB.split(' '));

    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    if (union.size === 0) return 0;
    return intersection.size / union.size;
  }

  private static simulateVectorCosineSimilarity(cand: Partial<Opportunity>, exist: Opportunity): number {
    const textA = `${cand.title || ''} ${cand.organizer || ''} ${cand.problemStatement || ''}`.toLowerCase();
    const textB = `${exist.title || ''} ${exist.organizer || ''} ${exist.problemStatement || ''}`.toLowerCase();

    // Check shared key domain keywords
    const keywords = ['hackathon', 'ai', 'challenge', 'internship', 'grant', 'robotics', 'meity', 'google', 'sih', 'hardware'];
    let matches = 0;
    keywords.forEach(kw => {
      if (textA.includes(kw) && textB.includes(kw)) matches++;
    });

    if (matches >= 3 && this.calculateJaccardSimilarity(textA, textB) > 0.6) {
      return 0.91;
    }
    return 0.45;
  }
}
