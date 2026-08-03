import { SourceConfig, Opportunity, PlatformNotification } from '../../types/opportunity';
import { BaseSourceAdapter, SIHAdapter } from '../adapters/SourceAdapter';
import { GovtAIAdapter, DevpostAdapter, UnstopAdapter, DevfolioAdapter } from '../adapters/MoreAdapters';
import { InstagramAdapter } from '../adapters/InstagramAdapter';
import { InternshalaAdapter } from '../adapters/InternshalaAdapter';
import { ReskilllAdapter } from '../adapters/ReskilllAdapter';
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
        scheduleInterval: '6h',
        lastRunTimestamp: new Date(Date.now() - 60 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 5 * 3600000).toISOString(),
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
        scheduleInterval: '6h',
        lastRunTimestamp: new Date(Date.now() - 40 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 5.3 * 3600000).toISOString(),
        lastRunDurationMs: 410,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 89, newDiscovered: 8, updatedCount: 2, failedAttempts: 0, duplicateRemoved: 1 },
        health: { status: 'healthy', lastPingMs: 32, consecutiveFailures: 0, uptimePercentage: 100.0 }
      },
      {
        id: 'src-unstop',
        name: 'Unstop Campus Hackathon & Competition Feed',
        baseUrl: 'https://unstop.com',
        adapterType: 'UNSTOP',
        enabled: true,
        scheduleInterval: '3h',
        lastRunTimestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 2.75 * 3600000).toISOString(),
        lastRunDurationMs: 390,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 410, newDiscovered: 35, updatedCount: 11, failedAttempts: 0, duplicateRemoved: 14 },
        health: { status: 'healthy', lastPingMs: 19, consecutiveFailures: 0, uptimePercentage: 100.0 }
      },
      {
        id: 'src-devfolio',
        name: 'Devfolio Web3 & AI Buildathon Feed',
        baseUrl: 'https://devfolio.co',
        adapterType: 'DEVFOLIO',
        enabled: true,
        scheduleInterval: '6h',
        lastRunTimestamp: new Date(Date.now() - 50 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 5.1 * 3600000).toISOString(),
        lastRunDurationMs: 280,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 195, newDiscovered: 16, updatedCount: 5, failedAttempts: 0, duplicateRemoved: 4 },
        health: { status: 'healthy', lastPingMs: 25, consecutiveFailures: 0, uptimePercentage: 99.7 }
      },
      {
        id: 'src-devpost',
        name: 'Devpost Global Industry Feed',
        baseUrl: 'https://devpost.com',
        adapterType: 'DEVPOST',
        enabled: true,
        scheduleInterval: '6h',
        lastRunTimestamp: new Date(Date.now() - 120 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 4 * 3600000).toISOString(),
        lastRunDurationMs: 520,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 320, newDiscovered: 24, updatedCount: 7, failedAttempts: 0, duplicateRemoved: 8 },
        health: { status: 'healthy', lastPingMs: 45, consecutiveFailures: 0, uptimePercentage: 99.5 }
      },
      {
        id: 'src-ig-hackathons',
        name: 'Instagram Innovation Channel (@hackathons_india)',
        baseUrl: 'https://instagram.com/hackathons_india',
        adapterType: 'INSTAGRAM',
        enabled: true,
        scheduleInterval: '6h',
        lastRunTimestamp: new Date(Date.now() - 25 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 5.5 * 3600000).toISOString(),
        lastRunDurationMs: 290,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 64, newDiscovered: 5, updatedCount: 1, failedAttempts: 0, duplicateRemoved: 0 },
        health: { status: 'healthy', lastPingMs: 28, consecutiveFailures: 0, uptimePercentage: 99.9 }
      },
      {
        id: 'src-internshala',
        name: 'Internshala National Innovation & Internship Feed',
        baseUrl: 'https://internshala.com',
        adapterType: 'INTERNSHALA',
        enabled: true,
        scheduleInterval: '6h',
        lastRunTimestamp: new Date(Date.now() - 10 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 5.8 * 3600000).toISOString(),
        lastRunDurationMs: 380,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 156, newDiscovered: 18, updatedCount: 6, failedAttempts: 0, duplicateRemoved: 2 },
        health: { status: 'healthy', lastPingMs: 35, consecutiveFailures: 0, uptimePercentage: 100.0 }
      },
      {
        id: 'src-reskilll',
        name: 'Reskilll Innovation & Hackathon Discover Feed',
        baseUrl: 'https://reskilll.com/discover',
        adapterType: 'RESKILLL',
        enabled: true,
        scheduleInterval: '6h',
        lastRunTimestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 5.9 * 3600000).toISOString(),
        lastRunDurationMs: 310,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 182, newDiscovered: 21, updatedCount: 5, failedAttempts: 0, duplicateRemoved: 3 },
        health: { status: 'healthy', lastPingMs: 24, consecutiveFailures: 0, uptimePercentage: 100.0 }
      },
      {
        id: 'src-ig-dyso-medias',
        name: 'Instagram Channel (@dyso_medias)',
        baseUrl: 'https://www.instagram.com/dyso_medias/',
        adapterType: 'INSTAGRAM',
        enabled: true,
        scheduleInterval: '6h',
        lastRunTimestamp: new Date(Date.now() - 2 * 60000).toISOString(),
        nextRunTimestamp: new Date(Date.now() + 5.95 * 3600000).toISOString(),
        lastRunDurationMs: 275,
        lastRunStatus: 'SUCCESS',
        stats: { totalFetched: 45, newDiscovered: 6, updatedCount: 2, failedAttempts: 0, duplicateRemoved: 1 },
        health: { status: 'healthy', lastPingMs: 22, consecutiveFailures: 0, uptimePercentage: 100.0 }
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
    } else if (src.adapterType === 'UNSTOP') {
      this.adapters.set(src.id, new UnstopAdapter(src));
    } else if (src.adapterType === 'DEVFOLIO') {
      this.adapters.set(src.id, new DevfolioAdapter(src));
    } else if (src.adapterType === 'DEVPOST') {
      this.adapters.set(src.id, new DevpostAdapter(src));
    } else if (src.adapterType === 'INSTAGRAM') {
      this.adapters.set(src.id, new InstagramAdapter(src));
    } else if (src.adapterType === 'INTERNSHALA') {
      this.adapters.set(src.id, new InternshalaAdapter(src));
    } else if (src.adapterType === 'RESKILLL') {
      this.adapters.set(src.id, new ReskilllAdapter(src));
    }
  }

  public addInstagramSource(pageUrlOrHandle: string): SourceConfig {
    const handle = pageUrlOrHandle.replace(/.*instagram\.com\//, '').replace(/\/$/, '').replace(/^@/, '');
    const cleanUrl = `https://instagram.com/${handle || 'hackathons_india'}`;
    const id = `src-ig-${Date.now()}`;
    const newSrc: SourceConfig = {
      id,
      name: `Instagram Feed (@${handle || 'hackathons'})`,
      baseUrl: cleanUrl,
      adapterType: 'INSTAGRAM' as any,
      enabled: true,
      scheduleInterval: '6h',
      lastRunTimestamp: new Date().toISOString(),
      nextRunTimestamp: new Date(Date.now() + 6 * 3600000).toISOString(),
      lastRunDurationMs: 0,
      lastRunStatus: 'SUCCESS',
      stats: { totalFetched: 0, newDiscovered: 0, updatedCount: 0, failedAttempts: 0, duplicateRemoved: 0 },
      health: { status: 'healthy', lastPingMs: 30, consecutiveFailures: 0, uptimePercentage: 100.0 }
    };

    this.sources.set(id, newSrc);
    this.instantiateAdapter(newSrc);
    return newSrc;
  }

  public addReskilllSource(url: string): SourceConfig {
    const cleanUrl = url.trim() || 'https://reskilll.com/discover';
    const id = `src-reskilll-${Date.now()}`;
    const newSrc: SourceConfig = {
      id,
      name: `Reskilll Discover Feed (${cleanUrl})`,
      baseUrl: cleanUrl,
      adapterType: 'RESKILLL',
      enabled: true,
      scheduleInterval: '6h',
      lastRunTimestamp: new Date().toISOString(),
      nextRunTimestamp: new Date(Date.now() + 6 * 3600000).toISOString(),
      lastRunDurationMs: 0,
      lastRunStatus: 'SUCCESS',
      stats: { totalFetched: 0, newDiscovered: 0, updatedCount: 0, failedAttempts: 0, duplicateRemoved: 0 },
      health: { status: 'healthy', lastPingMs: 24, consecutiveFailures: 0, uptimePercentage: 100.0 }
    };

    this.sources.set(id, newSrc);
    this.instantiateAdapter(newSrc);
    return newSrc;
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
