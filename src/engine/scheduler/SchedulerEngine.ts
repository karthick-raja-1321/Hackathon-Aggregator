import { SourceConfig, Opportunity, PlatformNotification } from '../../types/opportunity';
import { BaseSourceAdapter, SIHAdapter } from '../adapters/SourceAdapter';
import { GovtAIAdapter, DevpostAdapter } from '../adapters/MoreAdapters';
import { ChangeDetector } from '../changeDetection/ChangeDetector';

export interface SyncCycleReport {
  timestamp: string;
  sourceId: string;
  sourceName: string;
  durationMs: number;
  fetchedCount: number;
  newDiscovered: number;
  updatedCount: number;
  status: 'SUCCESS' | 'FAILED' | 'PARTIAL';
  error?: string;
}

type SyncEventListener = (report: SyncCycleReport, newOps: Opportunity[], notifications: PlatformNotification[]) => void;

export class SchedulerEngine {
  private sources: Map<string, SourceConfig> = new Map();
  private adapters: Map<string, BaseSourceAdapter> = new Map();
  private listeners: Set<SyncEventListener> = new Set();

  constructor() {
    this.initDefaultSources();
  }

  private initDefaultSources() {
    const defaultSources: SourceConfig[] = [
      {
        id: 'src-sih',
        name: 'Smart India Hackathon Govt Portal',
        baseUrl: 'https://sih.gov.in',
        adapterType: 'SIH',
        enabled: true,
        scheduleInterval: '30m',
        lastRunTimestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 15 * 60000).toISOString(),
        lastRunDurationMs: 340,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 142, newDiscovered: 12, updatedCount: 4, failedAttempts: 0, duplicateRemoved: 3 },
        health: { status: 'healthy', lastPingMs: 25, consecutiveFailures: 0, uptimePercentage: 99.8 }
      },
      {
        id: 'src-meity',
        name: 'MeitY IndiaAI National Portal',
        baseUrl: 'https://indiaai.gov.in',
        adapterType: 'GOVT_AI',
        enabled: true,
        scheduleInterval: '1h',
        lastRunTimestamp: new Date(Date.now() - 40 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 20 * 60000).toISOString(),
        lastRunDurationMs: 410,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 89, newDiscovered: 8, updatedCount: 2, failedAttempts: 0, duplicateRemoved: 1 },
        health: { status: 'healthy', lastPingMs: 32, consecutiveFailures: 0, uptimePercentage: 100.0 }
      },
      {
        id: 'src-devpost',
        name: 'Devpost Global Industry Feed',
        baseUrl: 'https://devpost.com',
        adapterType: 'DEVPOST',
        enabled: true,
        scheduleInterval: '3h',
        lastRunTimestamp: new Date(Date.now() - 120 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 60 * 60000).toISOString(),
        lastRunDurationMs: 520,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 320, newDiscovered: 24, updatedCount: 7, failedAttempts: 0, duplicateRemoved: 8 },
        health: { status: 'healthy', lastPingMs: 45, consecutiveFailures: 0, uptimePercentage: 99.5 }
      }
    ];

    for (const src of defaultSources) {
      this.sources.set(src.id, src);
      this.instantiateAdapter(src);
    }
  }

  private instantiateAdapter(src: SourceConfig) {
    if (src.adapterType === 'SIH') {
      this.adapters.set(src.id, new SIHAdapter(src));
    } else if (src.adapterType === 'GOVT_AI') {
      this.adapters.set(src.id, new GovtAIAdapter(src));
    } else if (src.adapterType === 'DEVPOST') {
      this.adapters.set(src.id, new DevpostAdapter(src));
    }
  }

  public getSources(): SourceConfig[] {
    return Array.from(this.sources.values());
  }

  public updateSourceConfig(updatedSrc: SourceConfig) {
    this.sources.set(updatedSrc.id, updatedSrc);
    this.instantiateAdapter(updatedSrc);
  }

  public subscribe(listener: SyncEventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Triggers an immediate execution cycle for a specific source adapter or all enabled sources
   */
  public async executeSync(sourceId?: string, existingOps: Opportunity[] = []): Promise<{ reports: SyncCycleReport[]; newOps: Opportunity[]; notifications: PlatformNotification[] }> {
    const targetSources = sourceId 
      ? [this.sources.get(sourceId)].filter(Boolean) as SourceConfig[]
      : Array.from(this.sources.values()).filter(s => s.enabled);

    const reports: SyncCycleReport[] = [];
    const newOps: Opportunity[] = [];
    const notifications: PlatformNotification[] = [];
    const existingMap = new Map(existingOps.map(o => [o.externalId || o.id, o]));

    for (const src of targetSources) {
      const adapter = this.adapters.get(src.id);
      if (!adapter) continue;

      const startTime = Date.now();
      try {
        const fetchRes = await adapter.Fetch();
        let newDiscovered = 0;
        let updatedCount = 0;

        if (fetchRes.success) {
          for (const raw of fetchRes.rawPayloads) {
            const parsed = adapter.Parse(raw);
            if (parsed.isValid && parsed.rawOpportunity) {
              const normalized = adapter.Normalize(parsed.rawOpportunity);
              const key = normalized.externalId || normalized.id;

              if (existingMap.has(key)) {
                // Change detection
                const existing = existingMap.get(key)!;
                const diff = ChangeDetector.detectChanges(existing, normalized);
                if (diff.hasChanges) {
                  updatedCount++;
                  notifications.push({
                    id: `notif-${Date.now()}-${Math.random()}`,
                    opportunityId: existing.id,
                    title: `Updated: ${existing.title}`,
                    message: diff.changes.map(c => c.summary).join('. '),
                    type: 'DEADLINE_CHANGE',
                    severity: 'warning',
                    timestamp: new Date().toISOString(),
                    read: false
                  });
                }
              } else {
                // New Discovery
                newDiscovered++;
                newOps.push(normalized);
                notifications.push({
                  id: `notif-${Date.now()}-${Math.random()}`,
                  opportunityId: normalized.id,
                  title: `New Opportunity Discovered: ${normalized.title}`,
                  message: `${normalized.primaryCategory} - ${normalized.secondaryCategory} closing ${new Date(normalized.registrationDeadline).toLocaleDateString()}`,
                  type: 'NEW_OPPORTUNITY',
                  severity: 'info',
                  timestamp: new Date().toISOString(),
                  read: false
                });
              }
            }
          }
        }

        const durationMs = Date.now() - startTime;
        const report: SyncCycleReport = {
          timestamp: new Date().toISOString(),
          sourceId: src.id,
          sourceName: src.name,
          durationMs,
          fetchedCount: fetchRes.rawPayloads.length,
          newDiscovered,
          updatedCount,
          status: 'SUCCESS'
        };

        // Update Source Stats
        src.lastRunTimestamp = report.timestamp;
        src.lastRunDurationMs = durationMs;
        src.lastRunStatus = 'SUCCESS';
        src.stats.totalFetched += report.fetchedCount;
        src.stats.newDiscovered += newDiscovered;
        src.stats.updatedCount += updatedCount;
        src.nextRunTimestamp = this.computeNextRun(src.scheduleInterval);
        this.sources.set(src.id, src);

        reports.push(report);

        // Notify Listeners
        this.listeners.forEach(fn => fn(report, newOps, notifications));
      } catch (err: any) {
        const durationMs = Date.now() - startTime;
        src.stats.failedAttempts += 1;
        src.lastRunStatus = 'FAILED';
        src.health.status = 'failing';
        this.sources.set(src.id, src);

        reports.push({
          timestamp: new Date().toISOString(),
          sourceId: src.id,
          sourceName: src.name,
          durationMs,
          fetchedCount: 0,
          newDiscovered: 0,
          updatedCount: 0,
          status: 'FAILED',
          error: err.message || 'Unknown network error'
        });
      }
    }

    return { reports, newOps, notifications };
  }

  private computeNextRun(interval: SourceConfig['scheduleInterval']): string {
    const now = Date.now();
    let addMs = 30 * 60000;
    switch (interval) {
      case '15m': addMs = 15 * 60000; break;
      case '30m': addMs = 30 * 60000; break;
      case '1h': addMs = 60 * 60000; break;
      case '3h': addMs = 3 * 3600000; break;
      case '6h': addMs = 6 * 3600000; break;
      case '12h': addMs = 12 * 3600000; break;
      case 'daily': addMs = 24 * 3600000; break;
      case 'weekly': addMs = 7 * 24 * 3600000; break;
      case 'manual': addMs = 365 * 24 * 3600000; break;
    }
    return new Date(now + addMs).toISOString();
  }
}
