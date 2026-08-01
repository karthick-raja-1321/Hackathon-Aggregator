import { Opportunity, RecipientGroup, PlatformNotification } from '../types/opportunity';

const STORAGE_KEY_OPPORTUNITIES = 'iop_opportunities_v8';
const STORAGE_KEY_RECIPIENTS = 'iop_recipients_v3';
const STORAGE_KEY_NOTIFICATIONS = 'iop_notifications_v3';

export class OpportunityRepository {
  public static getInitialSeedOpportunities(): Opportunity[] {
    const now = new Date().toISOString();
    
    return [
      // 1. Smart India Hackathon
      {
        id: 'op-sih-2026',
        sourceId: 'src-sih',
        sourceName: 'Smart India Hackathon Govt Portal',
        externalId: 'SIH-2026-HARDWARE-01',
        title: 'Smart India Hackathon 2026 - Hardware & Software Edition',
        tagline: 'India\'s largest national open innovation hackathon solving 500+ Govt Ministry problem statements',
        organizer: 'Ministry of Education Innovation Cell (MIC) & AICTE',
        organizerLogo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://sih.gov.in/pdf/SIH2026_Student_Guidelines.pdf',
        
        primaryCategory: 'Government',
        secondaryCategory: 'Hackathon',
        technologies: ['Artificial Intelligence', 'Internet of Things', 'Robotics', 'Clean Energy'],
        
        mode: 'Hybrid',
        venue: '35 Nodal Centers Across India',
        officialWebsite: 'https://sih.gov.in/sih2026',
        registrationUrl: 'https://sih.gov.in/register-student-2026',
        
        registrationStartDate: new Date(Date.now() - 5 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 12 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 15 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 17 * 86400000).toISOString(),
        
        prizePoolText: '₹1,50,00,000 Total Prize Pool + Direct Ministry Internships',
        prizeAmountUSD: 180000,
        prizesBreakdown: {
          first: '₹1,00,00,000 per ministry problem statement winner (₹1 Lakh/team)',
          second: '₹75,000 Runner-up per domain',
          third: '₹50,00,000 Incubation & Startup Grant',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'Electronics & Comm', 'Electrical', 'Mechanical', 'AI & Data Science'],
          minTeamSize: 6,
          maxTeamSize: 6,
          description: 'Mandatory 6 engineering students per team with at least 1 female team member.'
        },
        
        problemStatement: 'Develop real-time AI solutions for Smart Agriculture, AI-Assisted Border Surveillance, and Autonomous EV Charging Station Grids.',
        rulesAndGuidelines: '1. Code must be original and built during the 36h finale. 2. SPOC approval required from institute Principal.',
        scheduleDetails: 'Round 1 Campus Selection -> Round 2 Ministry Evaluation -> Round 3 36h Grand Finale',
        rounds: [
          {
            id: 'sih-r1',
            roundNumber: 1,
            title: 'College Internal Hackathon Screening',
            startDate: new Date(Date.now() - 5 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 3 * 86400000).toISOString(),
            description: 'Internal evaluation by college innovation council and expert panel',
            submissionRequired: true,
            type: 'Prototype Submission',
            status: 'Active'
          },
          {
            id: 'sih-r2',
            roundNumber: 2,
            title: 'Ministry PPT & Architecture Review',
            startDate: new Date(Date.now() + 4 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 10 * 86400000).toISOString(),
            description: 'Evaluation by Central Ministry Technical Committees',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Upcoming'
          },
          {
            id: 'sih-r3',
            roundNumber: 3,
            title: 'Grand Finale 36-Hour Non-stop Hackathon',
            startDate: new Date(Date.now() + 15 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 17 * 86400000).toISOString(),
            description: 'Live building at nodal centers with continuous jury evaluations',
            submissionRequired: true,
            type: 'Grand Finale Pitch',
            status: 'Upcoming'
          }
        ],
        contacts: [
          { name: 'Dr. Abhay Jere', role: 'Chief Innovation Officer', email: 'cio@mic.gov.in', designation: 'MIC AICTE' },
          { name: 'SIH Support Desk', role: 'Helpline', email: 'hackathon@sih.gov.in' }
        ],
        
        priority: {
          totalScore: 99,
          level: 'Highly Recommended',
          urgencyDays: 12,
          deptSuitability: { CSE: 100, AIDS: 100, ECE: 95, IT: 98, EEE: 90, MECH: 85 },
          placementValue: 10,
          innovationValue: 10,
          hiringValue: 10,
          researchValue: 9,
          reasoning: [
            'Official National Ministry Hackathon Flagship',
            'Direct Govt Incubation & Startup Grant Funding',
            'Prime Minister Award Recognition'
          ]
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 2. MeitY IndiaAI Challenge
      {
        id: 'op-meity-ai-2026',
        sourceId: 'src-meity',
        sourceName: 'MeitY IndiaAI National Portal',
        externalId: 'MEITY-AI-GEN-04',
        title: 'MeitY IndiaAI National Generative AI & LLM Challenge 2026',
        tagline: 'Build sovereign Indian language LLMs, healthcare diagnostic vision tools, and agri-tech intelligence models',
        organizer: 'Ministry of Electronics and Information Technology (MeitY) & Digital India',
        organizerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://indiaai.gov.in/challenge-details.pdf',
        
        primaryCategory: 'Government',
        secondaryCategory: 'Innovation Challenge',
        technologies: ['Artificial Intelligence', 'Machine Learning', 'Cloud Computing'],
        
        mode: 'Online',
        officialWebsite: 'https://indiaai.gov.in/apply',
        registrationUrl: 'https://indiaai.gov.in/apply',
        
        registrationStartDate: new Date(Date.now() - 2 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 4 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 6 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 20 * 86400000).toISOString(),
        
        prizePoolText: '₹1,00,00,000 Compute Credits + ₹25,00,000 Cash Awards',
        prizeAmountUSD: 150000,
        prizesBreakdown: {
          first: '₹15,00,00,000 Sovereign Compute Token Allocation + ₹10 Lakh Cash',
          second: '₹5,00,00,000 Compute Allocation + ₹5 Lakh Cash',
          third: '₹2,50,00,000 Compute Allocation',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'Information Technology'],
          minTeamSize: 2,
          maxTeamSize: 4,
          description: 'Open to Indian student innovators, AI researchers, and academic startups.'
        },
        
        problemStatement: 'Develop multi-modal Indian language foundation models for healthcare diagnostics and agricultural yield forecasting.',
        rulesAndGuidelines: '1. Model weights must be made open-access under Indian AI License. 2. GPU compute credits provided by C-DAC.',
        scheduleDetails: 'Abstract Submission -> GPU Sandbox Access -> Final Model Benchmark Pitch',
        rounds: [
          {
            id: 'meity-r1',
            roundNumber: 1,
            title: 'Model Architecture Proposal',
            startDate: new Date(Date.now() - 2 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 4 * 86400000).toISOString(),
            description: 'Submission of technical architecture PDF and dataset methodology',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'IndiaAI Secretariat', role: 'Program Director', email: 'support-indiaai@meity.gov.in' }
        ],
        
        priority: {
          totalScore: 97,
          level: 'Highly Recommended',
          urgencyDays: 4,
          deptSuitability: { CSE: 100, AIDS: 100, IT: 95, ECE: 88 },
          placementValue: 9,
          innovationValue: 10,
          hiringValue: 9,
          researchValue: 10,
          reasoning: ['National Sovereign AI Flagship', 'C-DAC GPU Compute Allocation', 'Direct Access to MeitY AI Fellowships']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 3. Google Cloud Hackathon (Devpost)
      {
        id: 'op-google-cloud-2026',
        sourceId: 'src-devpost',
        sourceName: 'Devpost Global Feed',
        externalId: 'DEVPOST-GC-2026',
        title: 'Google Cloud Global AI & Agentic Systems Challenge 2026',
        tagline: 'Build autonomous AI agents using Gemini 1.5 Pro, Vertex AI, and Google Cloud Infrastructure',
        organizer: 'Google Cloud & Devpost',
        organizerLogo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://googlecloud.devpost.com',
        
        primaryCategory: 'Industry',
        secondaryCategory: 'Hackathon',
        technologies: ['Artificial Intelligence', 'Cloud Computing', 'Web Development'],
        
        mode: 'Online',
        officialWebsite: 'https://googlecloud.devpost.com',
        registrationUrl: 'https://googlecloud.devpost.com/register',
        
        registrationStartDate: new Date(Date.now() - 10 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 18 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 20 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 35 * 86400000).toISOString(),
        
        prizePoolText: '$100,000 USD Total Prizes + Google Cloud Credits',
        prizeAmountUSD: 100000,
        prizesBreakdown: {
          first: '$30,000 USD First Prize + VIP Pass to Google I/O',
          second: '$20,000 USD Second Prize',
          third: '$10,000 USD Third Prize',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 1st Year', 'UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'IT'],
          minTeamSize: 1,
          maxTeamSize: 4,
          description: 'Open to global student developers and software engineers.'
        },
        
        problemStatement: 'Create multi-modal autonomous agents capable of enterprise automated reasoning using Gemini 1.5 APIs.',
        rulesAndGuidelines: '1. Must use Vertex AI or Gemini API. 2. Must submit a 3-minute video demo and public GitHub repository.',
        scheduleDetails: 'Global Registration -> Prototype Submission -> Global Live Judging',
        rounds: [
          {
            id: 'gc-r1',
            roundNumber: 1,
            title: 'Global Hackathon Submission',
            startDate: new Date(Date.now() - 10 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 18 * 86400000).toISOString(),
            description: 'Submit GitHub repo, video walkthrough, and Google Cloud deployment URL',
            submissionRequired: true,
            type: 'Prototype Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'Google Cloud Hackathon Team', role: 'Organizer', email: 'cloud-hackathons@google.com' }
        ],
        
        priority: {
          totalScore: 96,
          level: 'Highly Recommended',
          urgencyDays: 18,
          deptSuitability: { CSE: 100, AIDS: 100, IT: 98, ECE: 85 },
          placementValue: 10,
          innovationValue: 9,
          hiringValue: 9,
          researchValue: 8,
          reasoning: ['Global Industry Prestige', '$100,000 USD Prize Pool', 'Direct Interview Fast-Track at Google Cloud']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 4. National AI & Robotics Challenge (Instagram)
      {
        id: 'op-ig-robotics-2026',
        sourceId: 'src-ig-hackathons',
        sourceName: 'Instagram Innovation Channel (@hackathons_india)',
        externalId: 'IG-ROBOTICS-2026',
        title: 'National AI & Robotics Challenge 2026 (@hackathons_india)',
        tagline: 'Autonomous drones, humanoid locomotion, and industrial ROS-2 robotics competition',
        organizer: 'National Robotics Council & IndiaAI',
        organizerLogo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://indiaai.gov.in/apply',
        
        primaryCategory: 'Government',
        secondaryCategory: 'Hackathon',
        technologies: ['Robotics', 'Embedded Systems', 'Artificial Intelligence', 'Internet of Things'],
        
        mode: 'Hybrid',
        venue: 'IIT Madras Robotics Arena & Online',
        officialWebsite: 'https://indiaai.gov.in/apply',
        registrationUrl: 'https://indiaai.gov.in/apply',
        
        registrationStartDate: new Date(Date.now() - 4 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 6 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 10 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 12 * 86400000).toISOString(),
        
        prizePoolText: '₹20,00,000 Cash Prizes + Robotics Hardware Kits',
        prizeAmountUSD: 24000,
        prizesBreakdown: {
          first: '₹10,00,000 First Prize',
          second: '₹6,00,000 Second Prize',
          third: '₹4,00,000 Third Prize',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 2nd Year', 'UG 3rd Year', 'Final Year'],
          departments: ['Robotics & Automation', 'Electronics & Comm', 'Mechanical', 'Computer Science'],
          minTeamSize: 3,
          maxTeamSize: 5,
          description: 'Open to engineering students with hardware/ROS setup.'
        },
        
        problemStatement: 'Design autonomous indoor navigation drones and ROS-2 robotic arm manipulators for hazardous warehouse environments.',
        rulesAndGuidelines: '1. Simulation rounds conducted in Gazebo/Webots. 2. Hardware finale at IIT Madras.',
        scheduleDetails: 'Gazebo Simulation -> Hardware Arena Finale',
        rounds: [
          {
            id: 'ig-r1',
            roundNumber: 1,
            title: 'ROS-2 Gazebo Simulation Track',
            startDate: new Date(Date.now() - 4 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 6 * 86400000).toISOString(),
            description: 'Simulation environment obstacle clearance and autonomous navigation script evaluation',
            submissionRequired: true,
            type: 'Prototype Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'Hackathons India Lead', role: 'Community Manager', email: 'connect@hackathonsindia.in' }
        ],
        
        priority: {
          totalScore: 94,
          level: 'Highly Recommended',
          urgencyDays: 6,
          deptSuitability: { ECE: 100, MECH: 98, EEE: 95, CSE: 90, AIDS: 88 },
          placementValue: 9,
          innovationValue: 10,
          hiringValue: 9,
          researchValue: 8,
          reasoning: ['National Robotics Flagship Competition', 'ROS-2 Hardware Incubation', 'IIT Madras Robotics Lab Access']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 5. Unstop SDE Challenge
      {
        id: 'op-unstop-sde-2026',
        sourceId: 'src-devpost',
        sourceName: 'Unstop National Portal',
        externalId: 'UNSTOP-SDE-HIRE-2026',
        title: 'Unstop National SDE & AI Hiring Challenge 2026',
        tagline: 'Fast-track software engineering hiring hackathon for 40+ premier tech unicorns and product multinationals',
        organizer: 'Unstop & Tech Industry Consortium',
        organizerLogo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://unstop.com/competitions/national-sde-challenge',
        
        primaryCategory: 'Industry',
        secondaryCategory: 'Hiring Challenge',
        technologies: ['Web Development', 'Artificial Intelligence', 'Cloud Computing'],
        
        mode: 'Online',
        officialWebsite: 'https://unstop.com',
        registrationUrl: 'https://unstop.com',
        
        registrationStartDate: new Date(Date.now() - 7 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 5 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 7 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 10 * 86400000).toISOString(),
        
        prizePoolText: '400+ Direct Full-Time SDE Offers (₹12 - ₹36 LPA) + ₹10 Lakh Cash',
        prizeAmountUSD: 120000,
        prizesBreakdown: {
          first: 'Direct SDE-2 Interview + ₹5,00,000 Cash Prize',
          second: 'Direct SDE-1 Offer + ₹3,00,000 Cash Prize',
          third: 'Direct SDE-1 Offer + ₹2,00,000 Cash Prize',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: false
        },

        eligibility: {
          yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'IT'],
          minTeamSize: 1,
          maxTeamSize: 1,
          description: 'Individual competitive coding & system design contest.'
        },
        
        problemStatement: 'Solve complex data structures algorithms, low-level system design, and high-concurrency microservice challenges.',
        rulesAndGuidelines: '1. Strict anti-plagiarism webcam monitoring during coding rounds. 2. Automated test suite evaluation.',
        scheduleDetails: 'Online MCQ -> Speed Coding -> System Design Finale',
        rounds: [
          {
            id: 'uns-r1',
            roundNumber: 1,
            title: 'National Online Speed Coding Assessment',
            startDate: new Date(Date.now() - 7 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 5 * 86400000).toISOString(),
            description: '90-minute timed DSA coding assessment on Unstop IDE',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'Unstop Campus Team', role: 'Support Lead', email: 'support@unstop.com' }
        ],
        
        priority: {
          totalScore: 95,
          level: 'Highly Recommended',
          urgencyDays: 5,
          deptSuitability: { CSE: 100, AIDS: 98, IT: 96, ECE: 90 },
          placementValue: 10,
          innovationValue: 8,
          hiringValue: 10,
          researchValue: 6,
          reasoning: ['Direct SDE Hiring Offers (Up to ₹36 LPA)', 'National Student Leaderboard Exposure']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 6. NVIDIA Research Internship (Internshala)
      {
        id: 'op-internshala-nvidia-2026',
        sourceId: 'src-internshala',
        sourceName: 'Internshala National Portal',
        externalId: 'IS-NVIDIA-AI-2026',
        title: 'NVIDIA Generative AI & Autonomous Systems Research Internship',
        tagline: 'High-stipend AI research internship with 100% Pre-Placement Offer (PPO) pathway for engineering students',
        organizer: 'NVIDIA Innovation Labs India',
        organizerLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://internshala.com/internship/detail/nvidia-ai-research-2026',
        
        primaryCategory: 'Industry',
        secondaryCategory: 'Internship',
        technologies: ['Artificial Intelligence', 'Machine Learning', 'Cloud Computing', 'Robotics'],
        
        mode: 'Hybrid',
        venue: 'NVIDIA AI Campus, Bengaluru & Remote',
        officialWebsite: 'https://internshala.com/internship/detail/nvidia-ai-research-2026',
        registrationUrl: 'https://internshala.com/internship/detail/nvidia-ai-research-2026/apply',
        
        registrationStartDate: new Date(Date.now() - 3 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 14 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 16 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 196 * 86400000).toISOString(),
        
        prizePoolText: '₹60,00,000 Total Value (₹60,000/Month Stipend + ₹24 LPA PPO Offer)',
        prizeAmountUSD: 72000,
        prizesBreakdown: {
          first: 'Monthly Stipend + Direct PPO Transition',
          second: 'Certificate of Excellence & Technical Mentorship',
          third: 'Fast-Track Full Time SDE Interview Invitation',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: false
        },

        eligibility: {
          yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'Electronics & Comm'],
          minTeamSize: 1,
          maxTeamSize: 1,
          description: 'Open to engineering undergraduates & postgraduates with strong PyTorch, CUDA, or LLM orchestration skills.'
        },
        
        problemStatement: 'Develop high-performance CUDA accelerated deep learning models, LLM tokenizers, and real-time vision pipelines.',
        rulesAndGuidelines: '1. Verified Internshala hiring application. 2. Shortlisted candidates undergo online coding assessment and technical interview rounds.',
        scheduleDetails: 'Application -> Coding Assessment -> Technical Interview -> PPO Internship Offer',
        rounds: [
          {
            id: 'is-r1-nvidia',
            roundNumber: 1,
            title: 'Internshala Resume & Skill Screening',
            startDate: new Date(Date.now() - 3 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 14 * 86400000).toISOString(),
            description: 'Submit resume, PyTorch project links, and answer screening assignment questions',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'University Hiring Team', role: 'NVIDIA Talent Partner', email: 'university-hiring@nvidia.com' }
        ],
        
        priority: {
          totalScore: 98,
          level: 'Highly Recommended',
          urgencyDays: 14,
          deptSuitability: { CSE: 100, AIDS: 100, ECE: 92, IT: 96 },
          placementValue: 10,
          innovationValue: 9,
          hiringValue: 10,
          researchValue: 9,
          reasoning: ['Highest Value PPO Internship in AI Sector', '₹60,000/Month Paid Stipend', 'Direct NVIDIA Full-Time SDE Conversion']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 7. TATA Hiring Challenge & Bootcamp (Internshala)
      {
        id: 'op-internshala-tata-2026',
        sourceId: 'src-internshala',
        sourceName: 'Internshala National Portal',
        externalId: 'IS-TATA-HACK-2026',
        title: 'TATA National Engineering Hiring Challenge & AI Bootcamp 2026',
        tagline: 'Solve enterprise supply chain, cybersecurity, and autonomous IoT challenges with direct interview fast-track',
        organizer: 'TATA Digital & TCS Research',
        organizerLogo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://internshala.com/contest/tata-national-hiring-challenge-2026',
        
        primaryCategory: 'Industry',
        secondaryCategory: 'Bootcamp',
        technologies: ['Artificial Intelligence', 'Cyber Security', 'Cloud Computing', 'Web Development'],
        
        mode: 'Online',
        officialWebsite: 'https://internshala.com/contest/tata-national-hiring-challenge-2026',
        registrationUrl: 'https://internshala.com/contest/tata-national-hiring-challenge-2026/register',
        
        registrationStartDate: new Date(Date.now() - 5 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 8 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 10 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 24 * 86400000).toISOString(),
        
        prizePoolText: '₹25,00,000 Cash Pool + 50 Direct SDE Hiring Offers',
        prizeAmountUSD: 30000,
        prizesBreakdown: {
          first: '₹10,00,000 First Prize + Direct SDE Offer',
          second: '₹7,50,000 Second Prize + Direct SDE Offer',
          third: '₹5,00,000 Third Prize + Direct SDE Offer',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: false
        },

        eligibility: {
          yearsAllowed: ['UG 2nd Year', 'UG 3rd Year', 'Final Year'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'IT'],
          minTeamSize: 1,
          maxTeamSize: 3,
          description: 'Open to engineering undergraduates across India.'
        },
        
        problemStatement: 'Develop resilient cloud microservices, threat intelligence detection bots, and predictive inventory AI models.',
        rulesAndGuidelines: '1. 2-week hands-on learning bootcamp followed by hackathon finale pitch.',
        scheduleDetails: 'Bootcamp Learning -> Online Hackathon -> Jury Interview',
        rounds: [
          {
            id: 'is-r1-tata',
            roundNumber: 1,
            title: 'Bootcamp Registration & Skill Evaluation',
            startDate: new Date(Date.now() - 5 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 8 * 86400000).toISOString(),
            description: 'Register for 2-week TATA digital architecture bootcamp',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'TATA Digital Campus Support', role: 'Program Manager', email: 'careers@tatadigital.com' }
        ],
        
        priority: {
          totalScore: 93,
          level: 'Highly Recommended',
          urgencyDays: 8,
          deptSuitability: { CSE: 98, AIDS: 96, IT: 95, ECE: 88 },
          placementValue: 9,
          innovationValue: 8,
          hiringValue: 10,
          researchValue: 7,
          reasoning: ['50 Direct SDE Placement Offers', '2-Week Industry AI Bootcamp Included']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 8. ISRO Space Robotics Challenge
      {
        id: 'op-isro-space-2026',
        sourceId: 'src-meity',
        sourceName: 'ISRO Government Portal',
        externalId: 'ISRO-ROBOTICS-2026',
        title: 'ISRO National Space Robotics & Satellite AI Challenge 2026',
        tagline: 'Lunar rover path planning, satellite image computer vision, and space robotics innovation challenge',
        organizer: 'Indian Space Research Organisation (ISRO) & URSC',
        organizerLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://isro.gov.in/space-challenge-2026',
        
        primaryCategory: 'Government',
        secondaryCategory: 'Innovation Challenge',
        technologies: ['Robotics', 'Artificial Intelligence', 'Embedded Systems', 'IoT'],
        
        mode: 'Hybrid',
        venue: 'UR Rao Satellite Centre (URSC), Bengaluru',
        officialWebsite: 'https://isro.gov.in',
        registrationUrl: 'https://isro.gov.in',
        
        registrationStartDate: new Date(Date.now() - 8 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 15 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 20 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 25 * 86400000).toISOString(),
        
        prizePoolText: '₹30,00,000 Prize Pool + ISRO Scientist Mentorship & Internships',
        prizeAmountUSD: 36000,
        prizesBreakdown: {
          first: '₹15,00,000 First Prize + ISRO Research Scientist Internship',
          second: '₹10,00,000 Second Prize',
          third: '₹5,00,000 Third Prize',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'Electronics & Comm', 'Aerospace', 'Mechanical'],
          minTeamSize: 3,
          maxTeamSize: 5,
          description: 'Open to engineering undergraduate and research students.'
        },
        
        problemStatement: 'Develop real-time AI algorithms for lunar rover terrain navigation and satellite hyperspectral image segmentation.',
        rulesAndGuidelines: '1. All algorithms must be benchmarked on ISRO lunar simulator datasets. 2. Finale at URSC Bengaluru.',
        scheduleDetails: 'Algorithm Proposal -> Simulation Test -> ISRO Center Presentation',
        rounds: [
          {
            id: 'isro-r1',
            roundNumber: 1,
            title: 'ISRO Space AI Proposal Submission',
            startDate: new Date(Date.now() - 8 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 15 * 86400000).toISOString(),
            description: 'Submit technical proposal and preliminary algorithm code',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'ISRO Space Challenge Desk', role: 'Scientist / Engineer SF', email: 'space-challenge@isro.gov.in' }
        ],
        
        priority: {
          totalScore: 96,
          level: 'Highly Recommended',
          urgencyDays: 15,
          deptSuitability: { CSE: 96, AIDS: 96, ECE: 100, MECH: 90 },
          placementValue: 9,
          innovationValue: 10,
          hiringValue: 9,
          researchValue: 10,
          reasoning: ['ISRO National Space Research Prestige', 'Direct ISRO Scientist Research Internships']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 9. Microsoft Imagine Cup
      {
        id: 'op-microsoft-imagine-2026',
        sourceId: 'src-devpost',
        sourceName: 'Devpost Global Feed',
        externalId: 'MSFT-IMAGINE-2026',
        title: 'Microsoft Imagine Cup 2026 - Global Student Innovation Competition',
        tagline: 'The world\'s premier student tech competition empowering youth to build AI for Good using Azure',
        organizer: 'Microsoft Corporation',
        organizerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://imaginecup.microsoft.com',
        
        primaryCategory: 'International',
        secondaryCategory: 'Innovation Challenge',
        technologies: ['Artificial Intelligence', 'Cloud Computing', 'Web Development'],
        
        mode: 'Online',
        officialWebsite: 'https://imaginecup.microsoft.com',
        registrationUrl: 'https://imaginecup.microsoft.com',
        
        registrationStartDate: new Date(Date.now() - 12 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 25 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 30 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 90 * 86400000).toISOString(),
        
        prizePoolText: '$100,000 USD Grand Prize + Mentorship with Microsoft CEO Satya Nadella',
        prizeAmountUSD: 100000,
        prizesBreakdown: {
          first: '$100,000 USD + Mentorship with Satya Nadella',
          second: '$50,000 Azure Grant',
          third: '$25,00,000 Azure Grant',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 1st Year', 'UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'IT'],
          minTeamSize: 1,
          maxTeamSize: 4,
          description: 'Open to enrolled higher education students globally.'
        },
        
        problemStatement: 'Build innovative software applications addressing Earth, Health, Education, or Lifestyle categories using Azure AI.',
        rulesAndGuidelines: '1. Projects must utilize Microsoft Azure Cloud services. 2. Global World Finals in Seattle, USA.',
        scheduleDetails: 'Online Qualification -> Regional Semi-Finals -> World Championship Finals',
        rounds: [
          {
            id: 'ms-r1',
            roundNumber: 1,
            title: 'Online Application & Video Pitch',
            startDate: new Date(Date.now() - 12 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 25 * 86400000).toISOString(),
            description: 'Submit project pitch deck, demo video, and Azure architecture overview',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'Microsoft Imagine Cup Team', role: 'Global Lead', email: 'imaginecup@microsoft.com' }
        ],
        
        priority: {
          totalScore: 98,
          level: 'Highly Recommended',
          urgencyDays: 25,
          deptSuitability: { CSE: 100, AIDS: 100, IT: 98, ECE: 88 },
          placementValue: 10,
          innovationValue: 10,
          hiringValue: 10,
          researchValue: 9,
          reasoning: ['World\'s Largest Student Innovation Cup', '$100,000 USD Prize Pool', 'Mentorship with Satya Nadella']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 10. AWS Quantum & Cloud Innovation Fellowship
      {
        id: 'op-aws-quantum-2026',
        sourceId: 'src-devpost',
        sourceName: 'Devpost Global Feed',
        externalId: 'AWS-QUANTUM-2026',
        title: 'AWS Cloud & Quantum Computing Innovation Fellowship 2026',
        tagline: 'Pioneer next-generation quantum algorithms using Amazon Braket and AWS Braket SDK',
        organizer: 'Amazon Web Services (AWS) Quantum Solutions Lab',
        organizerLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://aws.amazon.com/braket/challenge',
        
        primaryCategory: 'Industry',
        secondaryCategory: 'Fellowship',
        technologies: ['Quantum Computing', 'Cloud Computing', 'Artificial Intelligence'],
        
        mode: 'Online',
        officialWebsite: 'https://aws.amazon.com/braket',
        registrationUrl: 'https://aws.amazon.com/braket',
        
        registrationStartDate: new Date(Date.now() - 6 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 20 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 25 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 180 * 86400000).toISOString(),
        
        prizePoolText: '$75,000 USD Cloud Grants + 6-Month AWS Quantum Fellowship',
        prizeAmountUSD: 75000,
        prizesBreakdown: {
          first: '$30,000 USD + 6-Month AWS Quantum Scientist Fellowship',
          second: '$25,000 USD Cloud Credits',
          third: '$20,000 USD Cloud Credits',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'Physics', 'ECE'],
          minTeamSize: 1,
          maxTeamSize: 2,
          description: 'Open to student researchers interested in quantum computing & cloud architecture.'
        },
        
        problemStatement: 'Develop quantum optimization algorithms (QAOA / VQE) on Amazon Braket QPU hardware for financial portfolio optimization.',
        rulesAndGuidelines: '1. Access to IonQ and Rigetti QPU QPUs provided via AWS credits.',
        scheduleDetails: 'Proposal -> QPU Code Execution -> Research Paper Pitch',
        rounds: [
          {
            id: 'aws-r1',
            roundNumber: 1,
            title: 'Quantum Algorithm Proposal',
            startDate: new Date(Date.now() - 6 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 20 * 86400000).toISOString(),
            description: 'Submit Braket SDK Python Jupyter Notebook proposal',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'AWS Quantum Lab Team', role: 'Research Lead', email: 'quantum-fellowship@amazon.com' }
        ],
        
        priority: {
          totalScore: 92,
          level: 'Highly Recommended',
          urgencyDays: 20,
          deptSuitability: { CSE: 95, AIDS: 95, ECE: 98, IT: 90 },
          placementValue: 9,
          innovationValue: 10,
          hiringValue: 9,
          researchValue: 10,
          reasoning: ['Emerging Quantum Computing Tech Frontier', '6-Month Paid AWS Fellowship']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 11. DRDO Cyber Defense Hackathon
      {
        id: 'op-drdo-cyber-2026',
        sourceId: 'src-meity',
        sourceName: 'DRDO Govt Defense Portal',
        externalId: 'DRDO-CYBER-2026',
        title: 'DRDO National Defense AI & Cyber Defense Hackathon 2026',
        tagline: 'Defend critical national infrastructure, autonomous drone swarms, and encrypted satellite communications',
        organizer: 'Defense Research and Development Organisation (DRDO) & SAG',
        organizerLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://drdo.gov.in/cyber-hackathon-2026',
        
        primaryCategory: 'Government',
        secondaryCategory: 'Hackathon',
        technologies: ['Cyber Security', 'Artificial Intelligence', 'Embedded Systems', 'IoT'],
        
        mode: 'Offline',
        venue: 'DRDO Scientific Analysis Group (SAG), Metcalfe House, Delhi',
        officialWebsite: 'https://drdo.gov.in',
        registrationUrl: 'https://drdo.gov.in',
        
        registrationStartDate: new Date(Date.now() - 3 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 10 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 15 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 17 * 86400000).toISOString(),
        
        prizePoolText: '₹25,00,000 Cash Pool + DRDO Defense Scientist Trainee Offers',
        prizeAmountUSD: 30000,
        prizesBreakdown: {
          first: '₹12,00,000 First Prize + DRDO Scientist Entry',
          second: '₹8,00,000 Second Prize',
          third: '₹5,00,000 Third Prize',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'Cyber Security', 'IT', 'ECE'],
          minTeamSize: 2,
          maxTeamSize: 4,
          description: 'Open to Indian citizens pursuing engineering degrees.'
        },
        
        problemStatement: 'Detect AI-generated zero-day malware vectors and secure post-quantum cryptographic channels for military communications.',
        rulesAndGuidelines: '1. Indian Citizenship mandatory. 2. On-site 36h Red Team vs Blue Team cyber challenge at DRDO Delhi.',
        scheduleDetails: 'Online Capture The Flag (CTF) -> On-site Cyber Finale at DRDO Delhi',
        rounds: [
          {
            id: 'drdo-r1',
            roundNumber: 1,
            title: 'National Online CTF Qualification',
            startDate: new Date(Date.now() - 3 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 10 * 86400000).toISOString(),
            description: '24-hour online Jeopardy-style CTF challenge',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'DRDO Cyber Directorate', role: 'Scientist G', email: 'cyber-hackathon@sag.drdo.in' }
        ],
        
        priority: {
          totalScore: 97,
          level: 'Highly Recommended',
          urgencyDays: 10,
          deptSuitability: { CSE: 100, IT: 98, AIDS: 92, ECE: 95 },
          placementValue: 9,
          innovationValue: 10,
          hiringValue: 9,
          researchValue: 10,
          reasoning: ['DRDO National Defense Research Prestige', 'Direct DRDO Scientist Trainee Selections']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 12. Flipkart GRiD 8.0
      {
        id: 'op-flipkart-grid-2026',
        sourceId: 'src-devpost',
        sourceName: 'Unstop / Industry Feed',
        externalId: 'FLIPKART-GRID-8',
        title: 'Flipkart GRiD 8.0 - Software Development & E-Commerce AI Challenge',
        tagline: 'Flipkart\'s flagship engineering challenge for SDE-1 hiring & supply chain innovation',
        organizer: 'Flipkart Internet Pvt Ltd',
        organizerLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://unstop.com/competitions/flipkart-grid-8',
        
        primaryCategory: 'Industry',
        secondaryCategory: 'Hiring Challenge',
        technologies: ['Web Development', 'Artificial Intelligence', 'Cloud Computing', 'Robotics'],
        
        mode: 'Online',
        officialWebsite: 'https://flipkartgrid.com',
        registrationUrl: 'https://flipkartgrid.com',
        
        registrationStartDate: new Date(Date.now() - 10 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 16 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 18 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 30 * 86400000).toISOString(),
        
        prizePoolText: '₹16,00,000 Cash Pool + Direct SDE-1 Hiring Offers (₹32 LPA)',
        prizeAmountUSD: 20000,
        prizesBreakdown: {
          first: '₹6,00,000 Cash Prize + Direct SDE-1 Job Offer',
          second: '₹4,00,000 Cash Prize + Direct SDE-1 Job Offer',
          third: '₹3,00,000 Cash Prize + Direct PPI Offer',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: false
        },

        eligibility: {
          yearsAllowed: ['UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'IT'],
          minTeamSize: 1,
          maxTeamSize: 3,
          description: 'Open to engineering students across batch 2026/2027.'
        },
        
        problemStatement: 'Build high-scale e-commerce search indexing, real-time demand forecasting, and automated warehouse sorting robotics.',
        rulesAndGuidelines: '1. Track 1: Software Development, Track 2: Robotics & Smart Logistics.',
        scheduleDetails: 'E-Commerce Quiz -> Submission Round -> Grand Finale Pitch',
        rounds: [
          {
            id: 'grid-r1',
            roundNumber: 1,
            title: 'Level 1: E-Commerce Tech Quiz',
            startDate: new Date(Date.now() - 10 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 16 * 86400000).toISOString(),
            description: 'Online tech quiz testing algorithms, DBMS, and system architecture',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'Flipkart GRiD Team', role: 'Campus Lead', email: 'grid@flipkart.com' }
        ],
        
        priority: {
          totalScore: 96,
          level: 'Highly Recommended',
          urgencyDays: 16,
          deptSuitability: { CSE: 100, AIDS: 98, IT: 96, ECE: 88 },
          placementValue: 10,
          innovationValue: 9,
          hiringValue: 10,
          researchValue: 7,
          reasoning: ['Direct Flipkart SDE-1 Offers (₹32 LPA)', 'Premier E-Commerce Industry Hackathon']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 13. IEEE Student Paper Contest
      {
        id: 'op-ieee-paper-2026',
        sourceId: 'src-sih',
        sourceName: 'IEEE Academic Portal',
        externalId: 'IEEE-STUDENT-2026',
        title: 'IEEE International Engineering Student Innovation & Paper Contest 2026',
        tagline: 'Publish research papers in IEEE Xplore Digital Library and win international research grants',
        organizer: 'IEEE India Council & IEEE Region 10',
        organizerLogo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://ieee.org/student-contest-2026',
        
        primaryCategory: 'Academic',
        secondaryCategory: 'Innovation Challenge',
        technologies: ['Artificial Intelligence', 'Robotics', 'Internet of Things', 'Embedded Systems'],
        
        mode: 'Hybrid',
        venue: 'IISc Bengaluru & Virtual IEEE Tracks',
        officialWebsite: 'https://ieee.org',
        registrationUrl: 'https://ieee.org',
        
        registrationStartDate: new Date(Date.now() - 15 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 22 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 30 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 32 * 86400000).toISOString(),
        
        prizePoolText: '$15,000 USD Research Grants + IEEE Xplore Publication',
        prizeAmountUSD: 15000,
        prizesBreakdown: {
          first: '$5,000 USD Grant + Best Paper Award IEEE Xplore',
          second: '$3,000 USD Grant',
          third: '$2,000 USD Grant',
          hiringOffers: false,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'Electronics & Comm', 'Electrical', 'AI & Data Science'],
          minTeamSize: 1,
          maxTeamSize: 4,
          description: 'Open to IEEE student members and engineering researchers.'
        },
        
        problemStatement: 'Submit high-impact research papers on 6G communication, quantum machine learning, and green IoT sensors.',
        rulesAndGuidelines: '1. Must follow standard IEEE 2-column conference manuscript format (6 pages max).',
        scheduleDetails: 'Manuscript Submission -> Peer Review -> IEEE Conference Presentation',
        rounds: [
          {
            id: 'ieee-r1',
            roundNumber: 1,
            title: 'IEEE Manuscript Submission',
            startDate: new Date(Date.now() - 15 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 22 * 86400000).toISOString(),
            description: 'Submit full PDF manuscript for peer review',
            submissionRequired: true,
            type: 'Abstract Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'IEEE R10 Student Desk', role: 'Conference Chair', email: 'r10-students@ieee.org' }
        ],
        
        priority: {
          totalScore: 91,
          level: 'Highly Recommended',
          urgencyDays: 22,
          deptSuitability: { CSE: 95, ECE: 100, AIDS: 95, EEE: 95 },
          placementValue: 8,
          innovationValue: 10,
          hiringValue: 7,
          researchValue: 10,
          reasoning: ['Indexed IEEE Xplore Journal Publication', 'International Research Grant Funding']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 14. AMD Chip Architecture Hackathon
      {
        id: 'op-amd-hardware-2026',
        sourceId: 'src-devpost',
        sourceName: 'Devpost Global Feed',
        externalId: 'AMD-CHIP-2026',
        title: 'AMD Chip Architecture & Edge AI Accelerator Hackathon 2026',
        tagline: 'Optimize RISC-V VPU designs and FPGA hardware accelerators for neural network inference',
        organizer: 'Advanced Micro Devices (AMD) Xilinx Labs',
        organizerLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://amd.devpost.com',
        
        primaryCategory: 'Industry',
        secondaryCategory: 'Hackathon',
        technologies: ['Embedded Systems', 'Robotics', 'Artificial Intelligence', 'IoT'],
        
        mode: 'Hybrid',
        venue: 'AMD Technopolis Campus, Hyderabad & Remote',
        officialWebsite: 'https://amd.devpost.com',
        registrationUrl: 'https://amd.devpost.com',
        
        registrationStartDate: new Date(Date.now() - 4 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 11 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 15 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 18 * 86400000).toISOString(),
        
        prizePoolText: '$50,000 USD Cash + AMD Kria KV260 Vision AI Development Kits',
        prizeAmountUSD: 50000,
        prizesBreakdown: {
          first: '$20,000 USD + AMD Hardware Design Team Internship',
          second: '$15,00,000 Cash Prize',
          third: '$10,00,000 Cash Prize',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: false
        },

        eligibility: {
          yearsAllowed: ['UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Electronics & Comm', 'Computer Science & Engineering', 'Electrical'],
          minTeamSize: 2,
          maxTeamSize: 4,
          description: 'Open to hardware design & VLSI engineering students.'
        },
        
        problemStatement: 'Write Verilog/VHDL neural network accelerators for low-power edge vision processing on AMD FPGAs.',
        rulesAndGuidelines: '1. Vivado HLS design suite provided for participants. 2. On-site hardware testing at AMD Hyderabad.',
        scheduleDetails: 'Verilog Simulation -> HLS Compilation -> AMD Campus Finale',
        rounds: [
          {
            id: 'amd-r1',
            roundNumber: 1,
            title: 'Verilog / SystemC Model Submission',
            startDate: new Date(Date.now() - 4 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 11 * 86400000).toISOString(),
            description: 'Submit hardware accelerator simulation code and synthesis report',
            submissionRequired: true,
            type: 'Prototype Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'AMD University Program', role: 'VLSI Architect', email: 'university-programs@amd.com' }
        ],
        
        priority: {
          totalScore: 93,
          level: 'Highly Recommended',
          urgencyDays: 11,
          deptSuitability: { ECE: 100, EEE: 95, CSE: 90, AIDS: 85 },
          placementValue: 9,
          innovationValue: 10,
          hiringValue: 9,
          researchValue: 9,
          reasoning: ['Premier Hardware VLSI & Chip Design Contest', 'AMD Kria AI Development Hardware Provided']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      },

      // 15. Meta PyTorch Open Source Challenge
      {
        id: 'op-meta-pytorch-2026',
        sourceId: 'src-devpost',
        sourceName: 'Devpost Global Feed',
        externalId: 'META-PYTORCH-2026',
        title: 'Meta Open Source AI & PyTorch Ecosystem Challenge 2026',
        tagline: 'Accelerate open-source LLM inference, TorchScript compilation, and mobile AI deployments',
        organizer: 'Meta AI & Linux Foundation',
        organizerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        brochureUrl: 'https://pytorch.devpost.com',
        
        primaryCategory: 'Industry',
        secondaryCategory: 'Innovation Challenge',
        technologies: ['Artificial Intelligence', 'Machine Learning', 'Web Development'],
        
        mode: 'Online',
        officialWebsite: 'https://pytorch.org',
        registrationUrl: 'https://pytorch.org',
        
        registrationStartDate: new Date(Date.now() - 9 * 86400000).toISOString(),
        registrationDeadline: new Date(Date.now() + 19 * 86400000).toISOString(),
        eventStartDate: new Date(Date.now() + 22 * 86400000).toISOString(),
        eventEndDate: new Date(Date.now() + 45 * 86400000).toISOString(),
        
        prizePoolText: '$60,000 USD Cash + Meta AI Open Source Grants',
        prizeAmountUSD: 60000,
        prizesBreakdown: {
          first: '$25,000 USD + Meta AI Fellow Travel Pass to PyTorch Conference',
          second: '$15,00,000 Cash Prize',
          third: '$10,00,000 Cash Prize',
          hiringOffers: true,
          internshipOffers: true,
          incubationGrant: true
        },

        eligibility: {
          yearsAllowed: ['UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
          departments: ['Computer Science & Engineering', 'AI & Data Science', 'IT'],
          minTeamSize: 1,
          maxTeamSize: 4,
          description: 'Open to AI developers and open-source contributors.'
        },
        
        problemStatement: 'Contribute open-source PyTorch operators for quantized LLM inference on mobile and edge devices.',
        rulesAndGuidelines: '1. Contributions must be merged into PyTorch ecosystem repos under BSD license.',
        scheduleDetails: 'PR Submission -> Code Benchmark -> Meta AI Keynote Showcase',
        rounds: [
          {
            id: 'meta-r1',
            roundNumber: 1,
            title: 'PyTorch Pull Request Submission',
            startDate: new Date(Date.now() - 9 * 86400000).toISOString(),
            endDate: new Date(Date.now() + 19 * 86400000).toISOString(),
            description: 'Submit GitHub PR link and performance benchmarking report',
            submissionRequired: true,
            type: 'Prototype Submission',
            status: 'Active'
          }
        ],
        contacts: [
          { name: 'Meta AI Open Source Team', role: 'Engineering Lead', email: 'pytorch-challenge@meta.com' }
        ],
        
        priority: {
          totalScore: 95,
          level: 'Highly Recommended',
          urgencyDays: 19,
          deptSuitability: { CSE: 100, AIDS: 100, IT: 96, ECE: 85 },
          placementValue: 9,
          innovationValue: 10,
          hiringValue: 9,
          researchValue: 10,
          reasoning: ['Meta AI Open Source Prestige', 'Direct PyTorch Core Team Recognition & Grants']
        },
        
        status: 'Active',
        discoveredAt: now,
        lastUpdatedAt: now,
        version: 1,
        changeHistory: []
      }
    ];
  }

  public static getInitialDefaultRecipients(): RecipientGroup[] {
    return [
      {
        id: 'grp-cse-students',
        name: 'All CSE & AI Students (WhatsApp & Email Broadcast)',
        department: 'Computer Science & Engineering',
        targetYears: ['UG 2nd Year', 'UG 3rd Year', 'Final Year', 'PG'],
        emails: [
          'cse-2026-all@sece.ac.in',
          'aids-2026-all@sece.ac.in',
          'it-2026-all@sece.ac.in',
          'hod.cse@sece.ac.in'
        ],
        phoneNumbers: ['9876543210', '9123456789'],
        autoDigestEnabled: true
      },
      {
        id: 'grp-faculty-mentors',
        name: 'Faculty Innovation & Hackathon Mentors',
        department: 'Innovation Cell',
        targetYears: ['Final Year', 'PG'],
        emails: [
          'karthickraja.m@sece.ac.in',
          'principal@sece.ac.in',
          'placement@sece.ac.in'
        ],
        phoneNumbers: ['9988776655'],
        autoDigestEnabled: true
      }
    ];
  }

  public static getInitialDefaultNotifications(): PlatformNotification[] {
    const now = new Date().toISOString();
    return [
      {
        id: 'notif-sih-1',
        opportunityId: 'op-sih-2026',
        title: 'Smart India Hackathon 2026 Verified',
        message: 'Discovered 500+ Ministry problem statements on sih.gov.in. Internal college screening active.',
        type: 'NEW_OPPORTUNITY',
        severity: 'info',
        timestamp: now,
        read: false
      },
      {
        id: 'notif-meity-1',
        opportunityId: 'op-meity-ai-2026',
        title: '⚠️ URGENT DEADLINE: MeitY IndiaAI National Challenge',
        message: 'Registration deadline closes in 4 days! C-DAC GPU Compute credits available for applicants.',
        type: 'DEADLINE_CHANGE',
        severity: 'critical',
        timestamp: now,
        read: false
      },
      {
        id: 'notif-internshala-1',
        opportunityId: 'op-internshala-nvidia-2026',
        title: 'High-Value PPO Internship Discovered: NVIDIA Generative AI',
        message: '₹60,000/Month Stipend + Direct PPO Transition. Verified on Internshala portal.',
        type: 'NEW_OPPORTUNITY',
        severity: 'info',
        timestamp: now,
        read: false
      }
    ];
  }

  public static loadOpportunities(): Opportunity[] {
    const raw = localStorage.getItem(STORAGE_KEY_OPPORTUNITIES);
    if (!raw) {
      const seed = this.getInitialSeedOpportunities();
      this.saveOpportunities(seed);
      return seed;
    }
    try {
      return JSON.parse(raw);
    } catch {
      const seed = this.getInitialSeedOpportunities();
      this.saveOpportunities(seed);
      return seed;
    }
  }

  public static saveOpportunities(ops: Opportunity[]): void {
    localStorage.setItem(STORAGE_KEY_OPPORTUNITIES, JSON.stringify(ops));
  }

  public static loadRecipients(): RecipientGroup[] {
    const raw = localStorage.getItem(STORAGE_KEY_RECIPIENTS);
    if (!raw) {
      const seed = this.getInitialDefaultRecipients();
      this.saveRecipients(seed);
      return seed;
    }
    try {
      return JSON.parse(raw);
    } catch {
      const seed = this.getInitialDefaultRecipients();
      this.saveRecipients(seed);
      return seed;
    }
  }

  public static saveRecipients(recipients: RecipientGroup[]): void {
    localStorage.setItem(STORAGE_KEY_RECIPIENTS, JSON.stringify(recipients));
  }

  public static loadNotifications(): PlatformNotification[] {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (!raw) {
      const seed = this.getInitialDefaultNotifications();
      this.saveNotifications(seed);
      return seed;
    }
    try {
      return JSON.parse(raw);
    } catch {
      const seed = this.getInitialDefaultNotifications();
      this.saveNotifications(seed);
      return seed;
    }
  }

  public static saveNotifications(notifs: PlatformNotification[]): void {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(notifs));
  }
}
