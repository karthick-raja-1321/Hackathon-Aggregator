import { Opportunity } from '../types/opportunity';

export class SharingService {
  /**
   * Generates a WhatsApp-formatted message string based on variant & audience
   */
  public static generateWhatsAppMessage(
    op: Opportunity, 
    audience: 'Student' | 'Faculty', 
    length: 'Short' | 'Detailed'
  ): string {
    const deadlineStr = new Date(op.registrationDeadline).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    if (audience === 'Student') {
      if (length === 'Short') {
        return `*INNOVATION OPPORTUNITY ALERT* 🚀\n\n` +
          `*${op.title}*\n` +
          `🏢 Organizer: ${op.organizer}\n` +
          `🏆 Prize: ${op.prizePoolText}\n` +
          `⏳ Deadline: *${deadlineStr}*\n` +
          `🔗 Apply Now: ${op.registrationUrl}\n\n` +
          `_Shared via Innovation Opportunity Intelligence Platform_`;
      }

      return `*IMPORTANT INNOVATION OPPORTUNITY FOR STUDENTS* 🎓\n\n` +
        `📌 *Title:* ${op.title}\n` +
        `🏢 *Organizer:* ${op.organizer}\n` +
        `🎯 *Category:* ${op.primaryCategory} (${op.secondaryCategory})\n` +
        `⚡ *Tech Focus:* ${op.technologies.join(', ')}\n\n` +
        `🎁 *Prize & Incentives:* ${op.prizePoolText}\n` +
        `👥 *Team Size:* ${op.eligibility.minTeamSize}-${op.eligibility.maxTeamSize} Members (${op.eligibility.yearsAllowed.join(', ')})\n` +
        `📅 *Registration Deadline:* *${deadlineStr}*\n` +
        `🌐 *Mode:* ${op.mode}${op.venue ? ` (${op.venue})` : ''}\n\n` +
        `📝 *Problem Summary:* ${op.problemStatement}\n\n` +
        `🔗 *Official Registration Link:* ${op.registrationUrl}\n` +
        `🌐 *Official Website:* ${op.officialWebsite}\n\n` +
        `_Do not miss this opportunity! Share with your team & apply before deadline._`;
    }

    // Faculty Version
    if (length === 'Short') {
      return `*FACULTY MENTORSHIP NOTICE* 📋\n\n` +
        `*Opportunity:* ${op.title}\n` +
        `Organizer: ${op.organizer}\n` +
        `Target Depts: ${Object.keys(op.priority.deptSuitability).join(', ')}\n` +
        `Deadline: *${deadlineStr}*\n` +
        `Link: ${op.registrationUrl}\n\n` +
        `_Please circulate among project teams._`;
    }

    return `*INNOVATION CELL CIRCULAR FOR FACULTY MENTORS* 🏛️\n\n` +
      `Respected Faculty Colleagues,\n\n` +
      `Please encourage student innovation project teams to register for:\n` +
      `*${op.title}*\n\n` +
      `🏢 *Organizer:* ${op.organizer}\n` +
      `⭐ *Recommendation:* ${op.priority.level} (Score: ${op.priority.totalScore}/100)\n` +
      `📊 *Placement Impact:* ${op.priority.placementValue}/10 | *Research Impact:* ${op.priority.researchValue}/10\n` +
      `⏳ *Deadline:* *${deadlineStr}*\n` +
      `🎯 *Eligible Departments:* ${op.eligibility.departments.join(', ')}\n\n` +
      `🎁 *Prizes & Incentives:* ${op.prizePoolText}\n` +
      `🔗 *Registration Link:* ${op.registrationUrl}\n\n` +
      `Regards,\n` +
      `*Innovation Opportunity Intelligence Platform*`;
  }

  /**
   * Generates a printable HTML summary page for physical notice boards or PDF printing
   */
  public static generatePrintableSummary(op: Opportunity): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Printable Summary - ${op.title}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: auto; }
          h1 { color: #0284c7; font-size: 24px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; }
          .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 12px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0; }
          .box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; }
          .label { font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; }
          .val { font-size: 14px; font-weight: 600; margin-top: 4px; }
          .section-title { font-size: 16px; font-weight: 700; margin-top: 24px; color: #0f172a; border-left: 4px solid #0284c7; padding-left: 8px; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div><span class="badge">${op.primaryCategory} - ${op.secondaryCategory}</span></div>
        <h1>${op.title}</h1>
        <p><strong>Organizer:</strong> ${op.organizer}</p>
        
        <div class="grid">
          <div class="box"><div class="label">Registration Deadline</div><div class="val" style="color:#d97706;">${new Date(op.registrationDeadline).toLocaleDateString()}</div></div>
          <div class="box"><div class="label">Prize Pool / Funding</div><div class="val" style="color:#16a34a;">${op.prizePoolText}</div></div>
          <div class="box"><div class="label">Technologies</div><div class="val">${op.technologies.join(', ')}</div></div>
          <div class="box"><div class="label">Mode & Venue</div><div class="val">${op.mode} ${op.venue ? `(${op.venue})` : ''}</div></div>
        </div>

        <div class="section-title">Problem Statement</div>
        <p>${op.problemStatement}</p>

        <div class="section-title">Eligibility Criteria</div>
        <p>${op.eligibility.description}</p>
        <p><strong>Allowed Years:</strong> ${op.eligibility.yearsAllowed.join(', ')}</p>

        <div class="section-title">Registration Link</div>
        <p><a href="${op.registrationUrl}">${op.registrationUrl}</a></p>

        <div class="footer">
          Enterprise Innovation Opportunity Intelligence Platform • Created by M. Karthick Raja M.E., (Ph.D.,) AP/CSE, SECE
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `;
  }

  /**
   * Generates direct Google Calendar web event creation URL
   */
  public static generateGoogleCalendarUrl(op: Opportunity): string {
    const formatDate = (isoStr: string) => {
      return new Date(isoStr).toISOString().replace(/-|:|\.\d\d\d/g, '');
    };
    const title = encodeURIComponent(`[Deadline] ${op.title}`);
    const details = encodeURIComponent(`${op.tagline}\n\nOrganizer: ${op.organizer}\nRegistration: ${op.registrationUrl}\nPrize Pool: ${op.prizePoolText}`);
    const location = encodeURIComponent(op.venue || op.mode);
    const start = formatDate(op.registrationDeadline);
    const end = formatDate(new Date(new Date(op.registrationDeadline).getTime() + 3600000).toISOString());

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  }

  /**
   * Generates standard iCal (.ics) formatted content for single opportunity
   */
  public static generateICalendarFile(op: Opportunity): string {
    const formatDate = (isoStr: string) => {
      return new Date(isoStr).toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const start = formatDate(op.eventStartDate || op.registrationDeadline);
    const end = formatDate(op.eventEndDate || op.registrationDeadline);

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Hackathon Aggregator Intelligence Platform//EN',
      'BEGIN:VEVENT',
      `UID:${op.id}@innovation-platform.edu`,
      `DTSTAMP:${formatDate(new Date().toISOString())}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${op.title} (${op.secondaryCategory})`,
      `DESCRIPTION:${op.tagline}\\n\\nOrganizer: ${op.organizer}\\nRegistration URL: ${op.registrationUrl}`,
      `URL:${op.registrationUrl}`,
      `LOCATION:${op.venue || op.mode}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }

  /**
   * Generates bulk iCal (.ics) feed file for ALL upcoming opportunities
   */
  public static generateBulkICalendarFile(opportunities: Opportunity[]): string {
    const formatDate = (isoStr: string) => {
      return new Date(isoStr).toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const events = opportunities.map(op => {
      const start = formatDate(op.registrationDeadline);
      const end = formatDate(new Date(new Date(op.registrationDeadline).getTime() + 3600000).toISOString());
      return [
        'BEGIN:VEVENT',
        `UID:${op.id}@hackathon-aggregator.edu`,
        `DTSTAMP:${formatDate(new Date().toISOString())}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:[Deadline] ${op.title}`,
        `DESCRIPTION:${op.tagline}\\n\\nOrganizer: ${op.organizer}\\nPortal: ${op.registrationUrl}\\nPrize: ${op.prizePoolText}`,
        `URL:${op.registrationUrl}`,
        `LOCATION:${op.venue || op.mode}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      ].join('\r\n');
    });

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Hackathon Aggregator Intelligence Platform//EN',
      'X-WR-CALNAME:Hackathon & Innovation Deadlines',
      ...events,
      'END:VCALENDAR'
    ].join('\r\n');
  }
}
