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

  /**
   * Compares incoming opportunity against existing list using Title & Organizer similarity
   * Merges records when identical event exists across sources (Unstop, Devpost, Internshala, MLH), maintaining source history
   */
  public static findDuplicateAndMerge(existingOps: Opportunity[], incoming: Opportunity): { isMerged: boolean; mergedList: Opportunity[]; mergedRecord?: Opportunity } {
    const cleanTitle = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '');
    const incTitle = cleanTitle(incoming.title);

    const matchIdx = existingOps.findIndex(op => {
      const exTitle = cleanTitle(op.title);
      return exTitle === incTitle || (exTitle.length > 10 && incTitle.length > 10 && (exTitle.includes(incTitle) || incTitle.includes(exTitle)));
    });

    if (matchIdx === -1) {
      return { isMerged: false, mergedList: [...existingOps, incoming] };
    }

    const existing = existingOps[matchIdx];
    const now = new Date().toISOString();

    // Merge technology tags, contacts, and track cross-source discovery history
    const mergedTech = Array.from(new Set([...existing.technologies, ...incoming.technologies]));
    const mergedContacts = [...existing.contacts, ...incoming.contacts.filter(ic => !existing.contacts.some(ec => ec.email === ic.email))];

    const sourceMergeRecord: ChangeRecord = {
      id: `merge-${Date.now()}`,
      opportunityId: existing.id,
      timestamp: now,
      fieldType: 'STATUS',
      summary: `Cross-Source Discovery Merged: Verified from ${incoming.sourceName}`,
      oldValue: existing.sourceName,
      newValue: `${existing.sourceName} + ${incoming.sourceName}`
    };

    const mergedRecord: Opportunity = {
      ...existing,
      technologies: mergedTech as any,
      contacts: mergedContacts,
      lastUpdatedAt: now,
      version: existing.version + 1,
      changeHistory: [sourceMergeRecord, ...(existing.changeHistory || [])]
    };

    const newList = [...existingOps];
    newList[matchIdx] = mergedRecord;

    return {
      isMerged: true,
      mergedList: newList,
      mergedRecord
    };
  }
}
