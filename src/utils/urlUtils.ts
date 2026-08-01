import { Opportunity } from '../types/opportunity';

/**
 * Ensures an external URL starts with http:// or https:// to prevent SPA routing issues.
 */
export const ensureAbsoluteUrl = (url?: string): string => {
  if (!url || url.trim() === '') return '#';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

/**
 * Checks if registration has already begun for an opportunity.
 */
export const hasRegistrationBegun = (op?: Partial<Opportunity>): boolean => {
  if (!op || !op.registrationStartDate) return true;
  const startMs = new Date(op.registrationStartDate).getTime();
  if (isNaN(startMs)) return true;
  return Date.now() >= startMs;
};

/**
 * Returns the effective action URL:
 * - If registration has begun, returns the direct registration URL.
 * - If registration has NOT begun yet, takes the user to the official hackathon info page.
 */
export const getEffectiveActionUrl = (op?: Partial<Opportunity>): string => {
  if (!op) return '#';
  if (!hasRegistrationBegun(op)) {
    return ensureAbsoluteUrl(op.officialWebsite || op.brochureUrl || op.registrationUrl);
  }
  return ensureAbsoluteUrl(op.registrationUrl || op.officialWebsite);
};

/**
 * Dynamically computes exact remaining urgency days from deadline timestamp
 */
export const calculateUrgencyDays = (registrationDeadlineISO?: string): number => {
  if (!registrationDeadlineISO) return 0;
  const deadlineMs = new Date(registrationDeadlineISO).getTime();
  if (isNaN(deadlineMs)) return 0;
  const diffMs = deadlineMs - Date.now();
  return Math.max(0, Math.ceil(diffMs / 86400000));
};
