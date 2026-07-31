import { Opportunity, RecipientGroup } from '../types/opportunity';

export interface DigestConfig {
  dailyTime: string; // e.g. "20:00"
  timeZone: string; // e.g. "Asia/Kolkata"
  enabled: boolean;
  selectedGroupIds: string[];
}

export class DigestService {
  /**
   * Generates a complete executive HTML email digest string ready for institutional broadcast
   */
  public static generateHtmlDigest(
    opportunities: Opportunity[], 
    _recipients: RecipientGroup[],
    digestType: 'Daily' | 'Weekly' | 'Urgent' = 'Daily'
  ): string {
    const todayStr = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const closingTomorrow = opportunities.filter(o => o.priority.urgencyDays <= 1);
    const closing3Days = opportunities.filter(o => o.priority.urgencyDays > 1 && o.priority.urgencyDays <= 3);
    const highlyRecommended = opportunities.filter(o => o.priority.level === 'Highly Recommended');

    const renderCard = (o: Opportunity) => `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px; font-family: sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="top" style="padding-right: 12px;">
              <span style="background: #0284c7; color: #ffffff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">
                ${o.primaryCategory} - ${o.secondaryCategory}
              </span>
              <h3 style="margin: 8px 0 4px 0; color: #0f172a; font-size: 16px;">${o.title}</h3>
              <div style="color: #64748b; font-size: 12px; margin-bottom: 8px;">Organized by <strong>${o.organizer}</strong></div>
              <div style="color: #334155; font-size: 13px; line-height: 1.4; margin-bottom: 12px;">${o.problemStatement}</div>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f8fafc; border-radius: 6px; padding: 8px; font-size: 12px;">
                <tr>
                  <td><strong>🎁 Prize Pool:</strong> <span style="color: #16a34a; font-weight: 700;">${o.prizePoolText}</span></td>
                  <td><strong>⏳ Deadline:</strong> <span style="color: #dc2626; font-weight: 700;">${new Date(o.registrationDeadline).toLocaleDateString()}</span></td>
                </tr>
                <tr>
                  <td style="padding-top: 4px;"><strong>⚡ Tech:</strong> ${o.technologies.join(', ')}</td>
                  <td style="padding-top: 4px;"><strong>👥 Team:</strong> ${o.eligibility.minTeamSize}-${o.eligibility.maxTeamSize} Members</td>
                </tr>
              </table>

              <div style="margin-top: 12px;">
                <a href="${o.registrationUrl}" style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 6px 14px; border-radius: 4px; font-size: 12px; font-weight: 600; display: inline-block;">
                  Apply / Register Now →
                </a>
                <a href="${o.officialWebsite}" style="color: #64748b; font-size: 12px; text-decoration: none; margin-left: 12px;">
                  Official Website
                </a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Daily Innovation Opportunity Update - ${todayStr}</title>
      </head>
      <body style="background-color: #f1f5f9; margin: 0; padding: 24px; font-family: 'Segoe UI', Arial, sans-serif;">
        <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
              <div style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px;">Enterprise Innovation Intelligence Platform</div>
              <h1 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 700;">${digestType} Innovation Opportunity Digest</h1>
              <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">${todayStr}</div>
            </td>
          </tr>

          <!-- Executive Summary -->
          <tr>
            <td style="padding: 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <h2 style="font-size: 14px; color: #0f172a; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Executive Summary</h2>
              <table width="100%" cellpadding="8" cellspacing="0" border="0" style="text-align: center; font-size: 12px;">
                <tr>
                  <td style="background: #eff6ff; border-radius: 6px;"><div style="font-size: 20px; font-weight: 800; color: #0284c7;">${opportunities.length}</div>Active Opportunities</td>
                  <td style="background: #fef2f2; border-radius: 6px;"><div style="font-size: 20px; font-weight: 800; color: #dc2626;">${closingTomorrow.length}</div>Closing Soon</td>
                  <td style="background: #f0fdf4; border-radius: 6px;"><div style="font-size: 20px; font-weight: 800; color: #16a34a;">${highlyRecommended.length}</div>Highly Recommended</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 20px;">
              ${closingTomorrow.length > 0 ? `
                <h2 style="font-size: 16px; color: #dc2626; border-bottom: 2px solid #fca5a5; padding-bottom: 4px;">🔥 URGENT: Closing Tomorrow / Critical</h2>
                ${closingTomorrow.map(renderCard).join('')}
              ` : ''}

              ${closing3Days.length > 0 ? `
                <h2 style="font-size: 16px; color: #d97706; border-bottom: 2px solid #fcd34d; padding-bottom: 4px;">⏰ Closing in 3 Days</h2>
                ${closing3Days.map(renderCard).join('')}
              ` : ''}

              <h2 style="font-size: 16px; color: #0284c7; border-bottom: 2px solid #7dd3fc; padding-bottom: 4px; margin-top: 24px;">⭐ Highly Recommended Opportunities</h2>
              ${highlyRecommended.map(renderCard).join('')}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #0f172a; padding: 16px; text-align: center; color: #94a3b8; font-size: 11px;">
              <div style="font-weight: 700; color: #38bdf8;">Created by M. Karthick Raja M.E., (Ph.D.,) AP/CSE, SECE</div>
              <div style="margin-top: 4px; color: #64748b;">Enterprise Innovation Opportunity Intelligence Platform • Mission: NO STUDENT SHOULD MISS ANY INNOVATION OPPORTUNITY.</div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }
}
