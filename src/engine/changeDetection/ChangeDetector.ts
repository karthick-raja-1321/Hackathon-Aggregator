import { Opportunity, ChangeRecord } from '../../types/opportunity';

export interface DiffResult {
  hasChanges: boolean;
  changes: ChangeRecord[];
  updatedOpportunity: Opportunity;
}

export class ChangeDetector {
  /**
   * Compares an existing stored opportunity against newly fetched incoming data
   */
  public static detectChanges(existing: Opportunity, incoming: Opportunity): DiffResult {
    const changes: ChangeRecord[] = [];
    const now = new Date().toISOString();

    // 1. Check Deadline Change
    if (existing.registrationDeadline !== incoming.registrationDeadline) {
      const oldD = new Date(existing.registrationDeadline).toLocaleDateString();
      const newD = new Date(incoming.registrationDeadline).toLocaleDateString();
      changes.push({
        id: `chg-${Date.now()}-1`,
        opportunityId: existing.id,
        timestamp: now,
        fieldType: 'DEADLINE',
        summary: `Registration deadline updated from ${oldD} to ${newD}`,
        oldValue: existing.registrationDeadline,
        newValue: incoming.registrationDeadline
      });
    }

    // 2. Check Prize Pool Change
    if (existing.prizePoolText !== incoming.prizePoolText) {
      changes.push({
        id: `chg-${Date.now()}-2`,
        opportunityId: existing.id,
        timestamp: now,
        fieldType: 'PRIZE',
        summary: `Prize pool updated from "${existing.prizePoolText}" to "${incoming.prizePoolText}"`,
        oldValue: existing.prizePoolText,
        newValue: incoming.prizePoolText
      });
    }

    // 3. Check Poster Change
    if (existing.posterUrl !== incoming.posterUrl) {
      changes.push({
        id: `chg-${Date.now()}-3`,
        opportunityId: existing.id,
        timestamp: now,
        fieldType: 'POSTER',
        summary: 'Official poster graphic updated',
        oldValue: existing.posterUrl || '',
        newValue: incoming.posterUrl || ''
      });
    }

    // 4. Check Registration Link Change
    if (existing.registrationUrl !== incoming.registrationUrl) {
      changes.push({
        id: `chg-${Date.now()}-4`,
        opportunityId: existing.id,
        timestamp: now,
        fieldType: 'REGISTRATION_LINK',
        summary: `Registration URL updated to ${incoming.registrationUrl}`,
        oldValue: existing.registrationUrl,
        newValue: incoming.registrationUrl
      });
    }

    // 5. Check Rules & Guidelines Change
    if (existing.rulesAndGuidelines !== incoming.rulesAndGuidelines) {
      changes.push({
        id: `chg-${Date.now()}-5`,
        opportunityId: existing.id,
        timestamp: now,
        fieldType: 'RULES',
        summary: 'Official competition rules and guidelines updated',
        oldValue: existing.rulesAndGuidelines,
        newValue: incoming.rulesAndGuidelines
      });
    }

    // 6. Check Round Count / Detail Changes
    if (existing.rounds.length !== incoming.rounds.length) {
      changes.push({
        id: `chg-${Date.now()}-6`,
        opportunityId: existing.id,
        timestamp: now,
        fieldType: 'ROUND',
        summary: `Rounds modified: count changed from ${existing.rounds.length} to ${incoming.rounds.length}`,
        oldValue: `${existing.rounds.length} rounds`,
        newValue: `${incoming.rounds.length} rounds`
      });
    }

    const hasChanges = changes.length > 0;

    const updatedOpportunity: Opportunity = {
      ...existing,
      registrationDeadline: incoming.registrationDeadline,
      prizePoolText: incoming.prizePoolText,
      posterUrl: incoming.posterUrl || existing.posterUrl,
      registrationUrl: incoming.registrationUrl,
      rulesAndGuidelines: incoming.rulesAndGuidelines,
      rounds: incoming.rounds,
      version: hasChanges ? existing.version + 1 : existing.version,
      lastUpdatedAt: hasChanges ? now : existing.lastUpdatedAt,
      changeHistory: [...changes, ...(existing.changeHistory || [])]
    };

    return {
      hasChanges,
      changes,
      updatedOpportunity
    };
  }
}
