/**
 * Job Application URLs Generator
 * Generates accurate, targeted live application and recruitment links
 * specifically tailored for the exact job type and domain requested by the user.
 */

export function getApplicationLinksForJob(jobTitle = '', category = '', jobType = '') {
  const title = (jobTitle || '').trim();
  const lower = title.toLowerCase();
  const catLower = (category || '').toLowerCase();
  const typeLower = (jobType || '').toLowerCase();
  const encodedTitle = encodeURIComponent(title || 'Job');

  // =========================================================================
  // 1. POLICE / DEFENCE / LAW ENFORCEMENT JOBS
  // =========================================================================
  if (
    lower.includes('police') ||
    lower.includes('sub inspector') ||
    lower.includes('sub-inspector') ||
    lower.includes('constable') ||
    lower.includes('si ') ||
    lower.includes(' cpo') ||
    lower.includes('cpo ') ||
    lower.includes('cpo') ||
    lower.includes('defence') ||
    lower.includes('defense') ||
    lower.includes('army') ||
    lower.includes('navy') ||
    lower.includes('air force') ||
    lower.includes('airforce') ||
    lower.includes('capf') ||
    lower.includes('bsf') ||
    lower.includes('crpf') ||
    lower.includes('cisf') ||
    lower.includes('commandant')
  ) {
    return {
      category: 'Police & Defence Recruitment',
      badge: 'Official Government Recruitment',
      description: `Official Central and State Police Recruitment Boards, CAPF (BSF/CRPF/CISF/ITBP/SSB), and Police Sub-Inspector application portals specifically for ${title}.`,
      links: [
        {
          name: 'SSC CPO (Sub-Inspector in Delhi Police & CAPF)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Central Govt Post',
          url: 'https://ssc.gov.in',
          description: 'Official Staff Selection Commission portal for SI in Delhi Police, BSF, CISF, CRPF, ITBP, and SSB recruitment notifications.'
        },
        {
          name: 'UPSC CAPF (Assistant Commandant Recruitment)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Gazetted Group A',
          url: 'https://upsc.gov.in',
          description: 'Union Public Service Commission portal for Assistant Commandant officer entry into Central Armed Police Forces.'
        },
        {
          name: 'State Police Recruitment Boards (State Police SI & Constable)',
          type: 'STATE_PORTAL',
          badge: 'State Police',
          url: `https://www.google.com/search?q=${encodeURIComponent(title + ' state police recruitment board official notification application form apply online')}`,
          description: 'Direct search for active State Police Recruitment notifications (UPPRPB, TSLPRB, APPRPB, Maharashtra Police, Karnataka Police, etc.).'
        },
        {
          name: 'Join Indian Army Official Career Portal',
          type: 'DEFENCE_PORTAL',
          badge: 'Armed Forces Entry',
          url: 'https://joinindianarmy.nic.in',
          description: 'Official Indian Army officer entry (NDA, CDS, TGC, SSC) and Agniveer recruitment portal.'
        },
        {
          name: 'Join Indian Air Force (AFCAT & Agniveer)',
          type: 'DEFENCE_PORTAL',
          badge: 'Air Force Official',
          url: 'https://afcat.cdac.in',
          description: 'Air Force Common Admission Test (AFCAT) for Flying, Technical, and Ground Duty branch officers.'
        },
        {
          name: 'Sarkari Result / FreeJobAlert Police Recruitment Notification Feed',
          type: 'NOTIFICATION_FEED',
          badge: 'Live Vacancy Feed',
          url: `https://www.google.com/search?q=${encodeURIComponent(title + ' recruitment notification apply online latest vacancy')}`,
          description: 'Live verified search for current vacancy alerts, physical standards, age limits, and online application forms.'
        }
      ]
    };
  }

  // =========================================================================
  // 2. BANKING, INSURANCE & FINANCIAL INSTITUTIONS
  // =========================================================================
  if (
    lower.includes('bank') ||
    lower.includes('po ') ||
    lower.includes('probationary officer') ||
    lower.includes('clerk') ||
    lower.includes('ibps') ||
    lower.includes('sbi') ||
    lower.includes('rbi') ||
    lower.includes('nabard') ||
    lower.includes('sebi') ||
    lower.includes('lic ') ||
    lower.includes('insurance officer') ||
    lower.includes('credit officer')
  ) {
    return {
      category: 'Banking & Financial Sector Hiring',
      badge: 'Banking & Financial Portals',
      description: `Official recruitment examination portals and direct commercial banking application channels for ${title}.`,
      links: [
        {
          name: 'Institute of Banking Personnel Selection (IBPS)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Public Sector Banks',
          url: 'https://ibps.in',
          description: 'Official examination body conducting Common Recruitment Process (CRP) for Bank PO, Clerk, SO, and RRB Officers across 11 Public Sector Banks.'
        },
        {
          name: 'State Bank of India (SBI Careers Portal)',
          type: 'OFFICIAL_PORTAL',
          badge: 'SBI Official',
          url: 'https://sbi.co.in/careers',
          description: 'Direct official portal for SBI Probationary Officer (PO), Junior Associate (Clerk), and Specialist Cadre Officer vacancies.'
        },
        {
          name: 'Reserve Bank of India (RBI Opportunities)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Central Bank',
          url: 'https://opportunities.rbi.org.in',
          description: 'Official recruitment portal for RBI Grade B Officers, Assistant Manager, and specialized economics/statistics roles.'
        },
        {
          name: 'Apply on LinkedIn Jobs (Private & Multinational Banks)',
          type: 'JOB_BOARD',
          badge: 'Private Banking',
          url: `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=India`,
          description: `Direct job listings for HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra, and Citi for ${title}.`
        },
        {
          name: 'Naukri.com Banking & Finance Hiring',
          type: 'JOB_BOARD',
          badge: 'Direct Hiring',
          url: `https://www.naukri.com/${encodedTitle.toLowerCase().replace(/%20/g, '-')}-jobs`,
          description: `Active corporate finance, credit underwriting, investment analysis, and retail banking job openings across India.`
        }
      ]
    };
  }

  // =========================================================================
  // 3. HEALTHCARE, NURSING, PHARMACY & MEDICAL JOBS
  // =========================================================================
  if (
    lower.includes('nurse') ||
    lower.includes('nursing') ||
    lower.includes('doctor') ||
    lower.includes('mbbs') ||
    lower.includes('medical') ||
    lower.includes('pharmacist') ||
    lower.includes('pharmacy') ||
    lower.includes('physiotherapy') ||
    lower.includes('radiology') ||
    lower.includes('lab technician') ||
    lower.includes('clinical') ||
    lower.includes('hospital')
  ) {
    return {
      category: 'Healthcare & Clinical Recruitment',
      badge: 'Medical & Hospital Hiring',
      description: `Government hospital examination portals (AIIMS NORCET), state health commissions, and leading hospital career links for ${title}.`,
      links: [
        {
          name: 'AIIMS Exams & Recruitment Portal (NORCET)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Central AIIMS',
          url: 'https://aiimsexams.ac.in',
          description: 'Official Nursing Officer Recruitment Common Eligibility Test (NORCET) and medical faculty recruitment across all AIIMS institutes.'
        },
        {
          name: 'UPSC Combined Medical Services (UPSC CMS Examination)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Central Medical',
          url: 'https://upsc.gov.in',
          description: 'Central recruitment for Medical Officers in Central Health Service, Railways, and New Delhi Municipal Council.'
        },
        {
          name: 'Leading Hospital Careers (Apollo, Fortis, Max, Manipal)',
          type: 'HOSPITAL_PORTAL',
          badge: 'Top Private Hospitals',
          url: `https://www.google.com/search?q=${encodeURIComponent(title + ' hospital jobs Apollo Fortis Max Manipal apply online')}`,
          description: `Search active clinical vacancies, staff nurse openings, and medical officer positions in leading hospital chains.`
        },
        {
          name: 'Apply on LinkedIn Jobs (Healthcare & Pharma)',
          type: 'JOB_BOARD',
          badge: 'Healthcare Sector',
          url: `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=India`,
          description: `Clinical research organizations (CRO), pharmaceutical companies, and health tech hiring for ${title}.`
        },
        {
          name: 'Naukri.com Medical & Healthcare Openings',
          type: 'JOB_BOARD',
          badge: 'Direct Applications',
          url: `https://www.naukri.com/${encodedTitle.toLowerCase().replace(/%20/g, '-')}-jobs`,
          description: `Hospital staff, clinical specialists, quality assurance, and pharmacy positions across India.`
        }
      ]
    };
  }

  // =========================================================================
  // 4. TEACHING, ACADEMIA, PROFESSOR & RESEARCH
  // =========================================================================
  if (
    lower.includes('teach') ||
    lower.includes('professor') ||
    lower.includes('lecturer') ||
    lower.includes('faculty') ||
    lower.includes('educator') ||
    lower.includes('b.ed') ||
    lower.includes('ctet') ||
    lower.includes('net ') ||
    lower.includes('prt') ||
    lower.includes('tgt') ||
    lower.includes('pgt') ||
    lower.includes('kvs') ||
    lower.includes('nvs')
  ) {
    return {
      category: 'Education & Academic Recruitment',
      badge: 'Teaching & Faculty Portals',
      description: `Official teacher eligibility portals (CTET/UGC NET), central school recruitments (KVS/NVS), and university faculty openings for ${title}.`,
      links: [
        {
          name: 'UGC NET Official Portal (National Testing Agency)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Assistant Professor & JRF',
          url: 'https://ugcnet.nta.nic.in',
          description: 'Official examination for Assistant Professor eligibility and Junior Research Fellowship awards in Indian Universities.'
        },
        {
          name: 'Kendriya Vidyalaya Sangathan (KVS Recruitment)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Central Schools',
          url: 'https://kvsangathan.nic.in',
          description: 'Recruitment portal for PRT (Primary), TGT (Trained Graduate), and PGT (Post Graduate) school teachers.'
        },
        {
          name: 'Central Teacher Eligibility Test (CTET - CBSE)',
          type: 'OFFICIAL_PORTAL',
          badge: 'CBSE Eligibility',
          url: 'https://ctet.nic.in',
          description: 'National certification required for central government school appointments (KVS, NVS, Army Schools, etc.).'
        },
        {
          name: 'Search University & College Faculty Positions',
          type: 'ACADEMIC_PORTAL',
          badge: 'University Openings',
          url: `https://www.google.com/search?q=${encodeURIComponent(title + ' assistant professor lecturer vacancy university recruitment apply')}`,
          description: 'Direct search for active assistant professor and lecturer notifications across central, state, and private universities.'
        },
        {
          name: 'Apply on LinkedIn for Education & EdTech Roles',
          type: 'JOB_BOARD',
          badge: 'EdTech & Institutes',
          url: `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=India`,
          description: 'Faculty, curriculum designer, and academic specialist openings across coaching institutes and EdTech platforms.'
        }
      ]
    };
  }

  // =========================================================================
  // 5. VOCATIONAL, ITI, APPRENTICESHIP & SKILLED TRADES
  // =========================================================================
  if (
    lower.includes('iti') ||
    lower.includes('electrician') ||
    lower.includes('fitter') ||
    lower.includes('welder') ||
    lower.includes('technician') ||
    lower.includes('apprentice') ||
    lower.includes('machinist') ||
    lower.includes('turner') ||
    lower.includes('diesel mechanic') ||
    lower.includes('wireman') ||
    lower.includes('draughtsman')
  ) {
    return {
      category: 'Industrial & Apprenticeship Recruitment',
      badge: 'Skilled Trade Hiring',
      description: `National Apprenticeship Promotion Scheme (NAPS), Indian Railway Loco & Technician portals, and industrial PSU recruitments for ${title}.`,
      links: [
        {
          name: 'National Apprenticeship Promotion Scheme (NAPS Portal)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Govt Apprenticeship',
          url: 'https://apprenticeshipindia.gov.in',
          description: 'Official Government of India portal for 1-year paid industrial apprenticeships in top public and private enterprises.'
        },
        {
          name: 'Railway Recruitment Board (RRB ALP & Technician)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Railway Technical',
          url: 'https://indianrailways.gov.in',
          description: 'Official notifications for Assistant Loco Pilot, Signal & Telecom Technician, and Workshop Staff Grade-III.'
        },
        {
          name: 'Public Sector Undertaking (PSU) Technical Recruitment (BHEL, IOCL, ONGC, SAIL)',
          type: 'PSU_PORTAL',
          badge: 'Central PSUs',
          url: `https://www.google.com/search?q=${encodeURIComponent(title + ' PSU apprentice technician recruitment BHEL IOCL ONGC SAIL apply online')}`,
          description: 'Trade Apprentice, Junior Technician, and Plant Operator recruitment across premier Navratna/Maharatna PSUs.'
        },
        {
          name: 'Apply on Indeed.co.in (Industrial & Plant Hiring)',
          type: 'JOB_BOARD',
          badge: 'Plant & Site Jobs',
          url: `https://in.indeed.com/jobs?q=${encodedTitle}&l=India`,
          description: `Factory maintenance, panel wiring, mechanical maintenance, and technical supervisor vacancies.`
        },
        {
          name: 'Naukri.com Industrial & Engineering Technician Hiring',
          type: 'JOB_BOARD',
          badge: 'Direct Applications',
          url: `https://www.naukri.com/${encodedTitle.toLowerCase().replace(/%20/g, '-')}-jobs`,
          description: `Direct manufacturing plant and field technician job applications.`
        }
      ]
    };
  }

  // =========================================================================
  // 6. LAW, JUDICIARY & LEGAL SERVICES
  // =========================================================================
  if (
    lower.includes('lawyer') ||
    lower.includes('advocate') ||
    lower.includes('judge') ||
    lower.includes('judicial') ||
    lower.includes('legal') ||
    lower.includes('prosecutor') ||
    lower.includes('solicitor')
  ) {
    return {
      category: 'Legal & Judicial Career Opportunities',
      badge: 'Judiciary & Law Portals',
      description: `Official Judicial Services examinations, Bar Council guidelines, PSU law officer entries, and leading law firm listings for ${title}.`,
      links: [
        {
          name: 'State Judicial Services Examination (PCS-J)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Civil Judge Entry',
          url: `https://www.google.com/search?q=${encodeURIComponent(title + ' State Judicial Service Examination Civil Judge notification apply online')}`,
          description: 'Direct recruitment for Civil Judge (Junior Division) and Judicial Magistrate across High Courts and State PSCs.'
        },
        {
          name: 'Bar Council of India / All India Bar Examination (AIBE)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Advocate License',
          url: 'http://www.barcouncilofindia.org',
          description: 'Mandatory Certificate of Practice (COP) required to practice law in Indian courts.'
        },
        {
          name: 'PSU Law Officer Recruitment (IBPS SO / SEBI / ONGC / NTPC)',
          type: 'PSU_PORTAL',
          badge: 'Corporate Law in PSUs',
          url: `https://www.google.com/search?q=${encodeURIComponent(title + ' Law Officer legal manager PSU recruitment apply online')}`,
          description: 'Legal manager and in-house counsel recruitment across central PSUs and financial regulators.'
        },
        {
          name: 'Apply on LinkedIn Jobs (Law Firms & Corporate Legal)',
          type: 'JOB_BOARD',
          badge: 'Corporate Counsel',
          url: `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=India`,
          description: 'Direct job openings in premier law firms (Shardul Amarchand, AZB, Trilegal, Cyril Amarchand) and corporate in-house counsel teams.'
        }
      ]
    };
  }

  // =========================================================================
  // 7. CIVIL SERVICES & OTHER GOVERNMENT COMMISSIONS (SSC, RRB, UPSC, PSC)
  // =========================================================================
  if (
    lower.includes('ssc') ||
    lower.includes('rrb') ||
    lower.includes('upsc') ||
    lower.includes('ias') ||
    lower.includes('ips') ||
    lower.includes('civil service') ||
    lower.includes('cgl') ||
    lower.includes('chsl') ||
    lower.includes('ntpc') ||
    lower.includes('inspector') ||
    lower.includes('officer') ||
    typeLower.includes('govt') ||
    typeLower.includes('government') ||
    catLower.includes('govt') ||
    catLower.includes('government')
  ) {
    return {
      category: 'Government & Public Sector Recruitment',
      badge: 'Official Commission Portals',
      description: `Authoritative government recruitment portals, examination commissions, and vacancy notifications for ${title}.`,
      links: [
        {
          name: 'Staff Selection Commission (SSC) Application Portal',
          type: 'OFFICIAL_PORTAL',
          badge: 'Central Commission',
          url: 'https://ssc.gov.in',
          description: 'Official portal for SSC CGL, CHSL, MTS, CPO, JE, GD, and Stenographer online applications and exam schedules.'
        },
        {
          name: 'Railway Recruitment Control Board (RRB / Indian Railways)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Indian Railways',
          url: 'https://indianrailways.gov.in',
          description: 'Official Indian Railways portal for RRB NTPC, RRB JE, Assistant Loco Pilot (ALP), and Group D recruitment.'
        },
        {
          name: 'Union Public Service Commission (UPSC Online Portal)',
          type: 'OFFICIAL_PORTAL',
          badge: 'Constitutional Body',
          url: 'https://upsconline.nic.in',
          description: 'Online application portal for Civil Services (IAS/IPS), NDA, CDS, CMS, and specialized Engineering/Defense posts.'
        },
        {
          name: 'National Career Service (NCS - Ministry of Labour & Employment)',
          type: 'GOVERNMENT_EXCHANGE',
          badge: 'Govt Job Exchange',
          url: 'https://www.ncs.gov.in',
          description: 'Government of India central portal connecting jobseekers with verified Public Sector Undertakings (PSUs) and government departments.'
        },
        {
          name: 'Search Latest Official Notifications on Google',
          type: 'SEARCH_FEED',
          badge: 'Notification Search',
          url: `https://www.google.com/search?q=${encodeURIComponent(title + ' official recruitment notification apply online form')}`,
          description: `Direct search for current active official advertisements, eligibility criteria, and syllabus for ${title}.`
        }
      ]
    };
  }

  // =========================================================================
  // 8. PRIVATE SECTOR / TECHNOLOGY / DATA / SOFTWARE / COMMERCE / MANAGEMENT
  // =========================================================================
  return {
    category: 'Corporate & Technology Hiring Platforms',
    badge: 'Direct Job Applications',
    description: `Targeted live hiring pipelines on LinkedIn, Naukri, Instahyre, Indeed, and Google Jobs specifically for ${title}.`,
    links: [
      {
        name: `Apply on LinkedIn Jobs for "${title}"`,
        type: 'JOB_BOARD',
        badge: 'Top Professional Network',
        url: `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=India&f_TPR=r2592000`,
        description: `Directly apply to verified company postings with "Easy Apply", connect with recruiters, and view applicant metrics for ${title}.`
      },
      {
        name: `Apply on Naukri.com for "${title}"`,
        type: 'JOB_BOARD',
        badge: "India's #1 Job Portal",
        url: `https://www.naukri.com/${encodedTitle.toLowerCase().replace(/%20/g, '-')}-jobs`,
        description: `Filtered live openings across product companies, MNCs, and growing startups matching ${title} skill requirements.`
      },
      {
        name: `Apply on Indeed for "${title}"`,
        type: 'JOB_BOARD',
        badge: 'Global Job Aggregator',
        url: `https://in.indeed.com/jobs?q=${encodedTitle}&l=India`,
        description: `Search verified salary transparent job listings and corporate openings across all major Indian tech hubs.`
      },
      {
        name: `Apply on Instahyre (Curated Tech & Corporate Hiring)`,
        type: 'TECH_PLATFORM',
        badge: 'Fast-Track Tech Hiring',
        url: `https://www.instahyre.com/search-jobs/?search=${encodedTitle}`,
        description: `AI-driven matching for product companies (Uber, Amazon, Flipkart, Swiggy, Razorpay) directly inviting qualified candidates.`
      },
      {
        name: `Apply on Wellfound / AngelList (Startup & Tech Jobs)`,
        type: 'STARTUP_PLATFORM',
        badge: 'High-Growth Startups',
        url: `https://wellfound.com/jobs`,
        description: `Direct access to startup founders, remote global opportunities, and venture-backed technology companies.`
      },
      {
        name: `Google Jobs Live Aggregation for "${title}"`,
        type: 'AGGREGATOR',
        badge: 'Live Google Feed',
        url: `https://www.google.com/search?ibp=htl;jobs&q=${encodedTitle}+jobs+in+India`,
        description: `Comprehensive Google Jobs search crawling company career portals, direct recruiter posts, and ATS portals.`
      }
    ]
  };
}
