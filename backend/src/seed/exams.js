/**
 * ==============================================================================
 * FUTURE PATH — MASTER ENTRANCE & COMPETITIVE EXAMINATIONS DATASET
 * ==============================================================================
 * Comprehensive coverage across all streams:
 * - Engineering & Technology (JEE Main, JEE Advanced, GATE, BITSAT)
 * - Medical & Healthcare (NEET-UG, NEET-PG, INI-CET, AIIMS B.Sc Nursing)
 * - Management & Business (CAT, XAT, CMAT, MAT)
 * - Civil & Public Services (UPSC CSE - IAS/IPS, SSC CGL, SSC CHSL, State PSC)
 * - Defence & Armed Forces (UPSC NDA & NA, UPSC CDS, AFCAT)
 * - Banking, Insurance & Regulatory (IBPS PO, SBI PO, RBI Grade B, IBPS Clerk)
 * - Law & Legal Studies (CLAT-UG, CLAT-PG, AILET)
 * - University & College Admissions (CUET-UG, CUET-PG)
 * - Research & Academic Lectureship (UGC-NET, CSIR-NET)
 * - Design & Architecture (NATA, NIFT Entrance, UCEED, CEED)
 * - Professional Finance (ICAI CA Foundation/Inter, ICSI CS Executive)
 * ==============================================================================
 */

export const structuredExams = [
  // --------------------------------------------------------------------------
  // 1. ENGINEERING & TECHNOLOGY
  // --------------------------------------------------------------------------
  {
    id: 'exam-jee-main',
    name: 'JEE Main (Joint Entrance Examination - Main)',
    shortName: 'JEE Main',
    type: 'EXAM',
    category: 'Engineering',
    aliases: ['JEE Main', 'JEE', 'Joint Entrance Examination', 'AIEEE', 'NTA JEE', 'Engineering Entrance'],
    organization: 'National Testing Agency (NTA)',
    description: 'National entrance test for admission to undergraduate engineering programs (B.Tech/B.E.) at NITs, IIITs, CFTIs, and qualifying examination for JEE Advanced.',
    qualification: '10+2 with Physics and Mathematics along with Chemistry / Biotechnology / Biology / Technical Vocational subject.',
    overview: 'Computer-based national examination conducted twice annually (Session 1 & Session 2). Tests Physics, Chemistry, and Mathematics concepts at 11th and 12th standard difficulty.',
    eligibility: {
      qualification: 'Passed 10+2 or appearing in current academic year',
      streams: ['Science (PCM)'],
      minimumRequirements: ['75% marks in Class 12 board examination (65% for SC/ST) or top 20 percentile for NIT/IIIT/CFTI admission.']
    },
    officialSource: 'National Testing Agency (NTA)',
    notificationUrl: 'https://jeemain.nta.nic.in',
    sources: [
      { title: 'NTA JEE Main Official Portal', url: 'https://jeemain.nta.nic.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-jee-advanced',
    name: 'JEE Advanced (Joint Entrance Examination - Advanced)',
    shortName: 'JEE Advanced',
    type: 'EXAM',
    category: 'Engineering',
    aliases: ['JEE Advanced', 'IIT JEE', 'IIT Entrance', 'Joint Entrance Examination Advanced'],
    organization: 'IIT Joint Admission Board (JAB)',
    description: 'Premier national entrance examination exclusively for admission to Bachelor of Technology (B.Tech), Dual Degree, and Integrated programs across all 23 Indian Institutes of Technology (IITs).',
    qualification: 'Must be within top 2,50,000 successful candidates in JEE Main (Paper-1) and pass Class 12 with PCM.',
    overview: 'Rigorous multi-paper testing format assessing in-depth analytical reasoning, physics problem-solving, abstract mathematics, and chemical intuition.',
    eligibility: {
      qualification: 'Top 2.5 Lakh qualifiers in JEE Main with PCM in 10+2',
      streams: ['Science (PCM)'],
      minimumRequirements: ['75% in 12th Board or top 20 percentile of respective board. Max 2 consecutive attempts.']
    },
    officialSource: 'IIT Joint Admission Board',
    notificationUrl: 'https://jeeadv.ac.in',
    sources: [
      { title: 'JEE Advanced Official Portal', url: 'https://jeeadv.ac.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-gate',
    name: 'GATE (Graduate Aptitude Test in Engineering)',
    shortName: 'GATE',
    type: 'EXAM',
    category: 'Engineering',
    aliases: ['GATE', 'Graduate Aptitude Test in Engineering', 'IIT GATE', 'GATE Exam', 'PSU Entrance'],
    organization: 'IISc Bangalore & 7 IITs on behalf of National Coordination Board',
    description: 'National examination that tests comprehensive understanding of undergraduate engineering, technology, architecture, science, and commerce subjects for M.Tech/Ph.D admission and PSU executive recruitment.',
    qualification: 'Completed or currently in 3rd/final year of B.Tech / B.E. / M.Sc / MCA / Integrated Master degree.',
    overview: 'High-stakes computer-based examination used by IITs/NITs for M.Tech/Ph.D admissions and Maharatna/Navratna PSUs (ONGC, IOCL, NTPC, BHEL, GAIL, BARC, ISRO) for direct recruitment of Executive Engineers.',
    eligibility: {
      qualification: 'Undergraduate degree in Engineering / Technology / Science or equivalent',
      streams: ['Engineering', 'Science', 'Technology']
    },
    officialSource: 'GATE Organizing Institute / Ministry of Education',
    notificationUrl: 'https://gate2025.iitr.ac.in',
    sources: [
      { title: 'Official GATE Committee Portal', url: 'https://gate.iitk.ac.in', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-bitsat',
    name: 'BITSAT (BITS Admission Test)',
    shortName: 'BITSAT',
    type: 'EXAM',
    category: 'Engineering',
    aliases: ['BITSAT', 'BITS Pilani Entrance', 'Birla Institute Test'],
    organization: 'Birla Institute of Technology & Science (BITS Pilani)',
    description: 'Computer-based entrance test for admission to Integrated First Degree Programmes (B.E., B.Pharm, M.Sc) across BITS Pilani, Goa, and Hyderabad campuses.',
    qualification: '10+2 with Physics, Chemistry, and Mathematics with minimum 75% aggregate in PCM and 60% in each subject.',
    overview: 'Speed and accuracy focused computer test featuring Physics, Chemistry, Math, English Proficiency, and Logical Reasoning, plus bonus questions for high scorers.',
    eligibility: {
      qualification: '10+2 pass with min 75% aggregate in PCM',
      streams: ['Science (PCM)']
    },
    officialSource: 'BITS Pilani Admissions',
    notificationUrl: 'https://bitsadmission.com',
    sources: [
      { title: 'BITS Admissions Portal', url: 'https://bitsadmission.com', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 2. MEDICAL & HEALTHCARE
  // --------------------------------------------------------------------------
  {
    id: 'exam-neet-ug',
    name: 'NEET-UG (National Eligibility cum Entrance Test - Undergrad)',
    shortName: 'NEET-UG',
    type: 'EXAM',
    category: 'Medical',
    aliases: ['NEET UG', 'NEET', 'National Eligibility Entrance Test', 'AIPMT', 'Medical Entrance', 'MBBS Entrance'],
    organization: 'National Testing Agency (NTA) / National Medical Commission (NMC)',
    description: 'The single mandatory national entrance test for admission to MBBS, BDS, BAMS, BHMS, BUMS, BSMS, and B.Sc Nursing courses across all medical colleges in India including AIIMS and JIPMER.',
    qualification: 'Passed 10+2 with Physics, Chemistry, Biology/Biotechnology and English.',
    overview: 'Pen-and-paper examination testing 720 marks across Physics (180), Chemistry (180), and Biology - Botany & Zoology (360). Mandatory for admission to 1,08,000+ MBBS seats nationwide.',
    eligibility: {
      qualification: '10+2 with PCB and English',
      streams: ['Science (PCB)'],
      minimumRequirements: ['50% aggregate in PCB (40% for SC/ST/OBC). Minimum age 17 years as on Dec 31.']
    },
    officialSource: 'National Testing Agency (NTA)',
    notificationUrl: 'https://neet.nta.nic.in',
    sources: [
      { title: 'NTA NEET-UG Official Portal', url: 'https://neet.nta.nic.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-neet-pg',
    name: 'NEET-PG (National Eligibility cum Entrance Test - Postgrad)',
    shortName: 'NEET-PG',
    type: 'EXAM',
    category: 'Medical',
    aliases: ['NEET PG', 'Postgraduate Medical Entrance', 'MD MS Entrance', 'NBE NEET PG'],
    organization: 'National Board of Examinations in Medical Sciences (NBEMS)',
    description: 'National eligibility-cum-ranking examination for admission to MD/MS/PG Diploma and Post-MBBS DNB courses across government and private medical institutions in India.',
    qualification: 'Recognized MBBS degree or provisional pass certificate with mandatory completion of one-year compulsory rotating internship.',
    overview: 'Computer-based examination testing pre-clinical, para-clinical, and clinical medical sciences for specialization in Cardiology, Neurology, Pediatrics, Orthopedics, Surgery, and Radiology.',
    eligibility: {
      qualification: 'MBBS Degree + NMC / State Medical Council Registration + 1-year Internship',
      streams: ['Medicine (MBBS)']
    },
    officialSource: 'National Board of Examinations in Medical Sciences (NBEMS)',
    notificationUrl: 'https://natboard.edu.in',
    sources: [
      { title: 'NBEMS Official Examination Portal', url: 'https://natboard.edu.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-ini-cet',
    name: 'INI-CET (Institute of National Importance Combined Entrance Test)',
    shortName: 'INI-CET',
    type: 'EXAM',
    category: 'Medical',
    aliases: ['INI CET', 'AIIMS PG Entrance', 'JIPMER PG', 'PGI Chandigarh Entrance'],
    organization: 'All India Institute of Medical Sciences (AIIMS New Delhi)',
    description: 'Unified entrance examination for admission to PG courses (MD/MS/M.Ch/DM/MDS) at Institutes of National Importance: AIIMS New Delhi, all new AIIMS, JIPMER Puducherry, PGIMER Chandigarh, and NIMHANS Bengaluru.',
    qualification: 'MBBS degree recognized by NMC with 55% marks (50% for SC/ST) and completion of 12-month internship.',
    overview: 'Biannual computer examination testing advanced clinical vignettes, critical emergency interventions, and clinical pathology.',
    eligibility: {
      qualification: 'MBBS with 55% aggregate marks and completed rotating internship',
      streams: ['Medicine (MBBS)']
    },
    officialSource: 'AIIMS Examination Section',
    notificationUrl: 'https://aiimsexams.ac.in',
    sources: [
      { title: 'AIIMS Official Examination Portal', url: 'https://aiimsexams.ac.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 3. CIVIL SERVICES & PUBLIC ADMINISTRATION
  // --------------------------------------------------------------------------
  {
    id: 'exam-upsc-cse',
    name: 'UPSC Civil Services Examination (CSE - IAS / IPS / IFS / IRS)',
    shortName: 'UPSC CSE',
    type: 'EXAM',
    category: 'Civil Services & Government',
    aliases: ['UPSC', 'Civil Services', 'IAS Exam', 'IPS Exam', 'UPSC Prelims', 'UPSC Mains', 'Indian Administrative Service'],
    organization: 'Union Public Service Commission (UPSC)',
    description: 'Premier constitutional national recruitment examination for selecting officers of the All India Services (IAS, IPS, IFS) and Central Civil Services Group A & B (IRS, IAAS, IDAS).',
    qualification: 'Bachelor’s degree from any recognized university in any discipline. Final year students can appear.',
    overview: 'Three-stage rigorous examination: 1) Prelims (GS Paper I & CSAT Paper II), 2) Mains (9 subjective descriptive papers including Essay & Optional), 3) Personality Test / Interview in New Delhi.',
    eligibility: {
      qualification: 'Graduation in any stream from recognized university',
      streams: ['Any Stream (Science, Commerce, Arts, Engineering, Medical, Law)'],
      minimumRequirements: ['Age: 21-32 years (relaxable for OBC/SC/ST/PwD). Indian citizenship for IAS/IPS.']
    },
    officialSource: 'Union Public Service Commission',
    notificationUrl: 'https://upsc.gov.in',
    sources: [
      { title: 'UPSC Official Examination Portal', url: 'https://upsc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-ssc-cgl',
    name: 'SSC CGL (Combined Graduate Level Examination)',
    shortName: 'SSC CGL',
    type: 'EXAM',
    category: 'Civil Services & Government',
    aliases: ['SSC CGL', 'Staff Selection Commission CGL', 'Income Tax Inspector Exam', 'ASO Exam', 'Sarkari CGL'],
    organization: 'Staff Selection Commission (SSC)',
    description: 'National competitive examination for recruiting Group B and Group C officers into central government ministries, departments, and constitutional bodies (Income Tax, Central Excise, CBI, MEA, ED, CAG).',
    qualification: 'Bachelor’s degree in any discipline from a recognized university. Specific qualifications for Junior Statistical Officer (JSO).',
    overview: 'Two-tier computer-based examination: Tier-I (Reasoning, General Awareness, Quantitative Aptitude, English Comprehension) and Tier-II (Mathematical Abilities, Reasoning, English, General Awareness, Computer Knowledge & Data Entry).',
    eligibility: {
      qualification: 'Graduation in any discipline',
      streams: ['Any Stream'],
      minimumRequirements: ['Age: 18-32 years depending on post. Age relaxations per central government norms.']
    },
    officialSource: 'Staff Selection Commission',
    notificationUrl: 'https://ssc.gov.in',
    sources: [
      { title: 'SSC Official Portal', url: 'https://ssc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-ssc-chsl',
    name: 'SSC CHSL (Combined Higher Secondary 10+2 Level Examination)',
    shortName: 'SSC CHSL',
    type: 'EXAM',
    category: 'Civil Services & Government',
    aliases: ['SSC CHSL', 'CHSL', '10+2 Govt Jobs', 'Data Entry Operator Exam', 'Lower Division Clerk Exam'],
    organization: 'Staff Selection Commission (SSC)',
    description: 'National recruitment test for Class 12 pass candidates for clerical, administrative, and data entry posts (LDC, JSA, DEO) across Central Government Ministries and Attached Offices.',
    qualification: 'Must have passed 12th standard or equivalent examination from a recognized Board or University.',
    overview: 'Tier-I objective computer test followed by Tier-II assessment comprising mathematical abilities, reasoning, language, and skill/typing test.',
    eligibility: {
      qualification: '10+2 Pass in any stream',
      streams: ['Science', 'Commerce', 'Arts'],
      minimumRequirements: ['Age: 18-27 years. Typing speed: 35 wpm in English or 30 wpm in Hindi.']
    },
    officialSource: 'Staff Selection Commission',
    notificationUrl: 'https://ssc.gov.in',
    sources: [
      { title: 'SSC CHSL Official Portal', url: 'https://ssc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-state-psc',
    name: 'State PSC / Provincial Civil Services (PCS)',
    shortName: 'State PSC',
    type: 'EXAM',
    category: 'Civil Services & Government',
    aliases: ['State PSC', 'PCS', 'UPPSC', 'MPSC', 'BPSC', 'APPSC', 'TNPSC', 'KPSC', 'State Civil Services', 'Deputy Collector Exam'],
    organization: 'Respective State Public Service Commissions',
    description: 'State-level premier civil service examination conducted by state public service commissions for recruitment of Deputy Collectors, Deputy SPs, Commercial Tax Officers, and Block Development Officers.',
    qualification: 'Bachelor’s degree from a recognized university. Proficiency in the respective state official language.',
    overview: 'Follows a 3-tier pattern modeled after UPSC: State Prelims, State Mains (including state geography, history, and administrative laws), followed by Interview.',
    eligibility: {
      qualification: 'Graduation in any stream + State language proficiency',
      streams: ['Any Stream'],
      minimumRequirements: ['Age: 21-40 years (varies slightly by state). Domicile benefits apply for reservations.']
    },
    officialSource: 'State Public Service Commissions',
    notificationUrl: 'https://upsc.gov.in',
    sources: [
      { title: 'State Commissions Overview', url: 'https://upsc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-rrb-ntpc',
    name: 'RRB NTPC (Railway Non-Technical Popular Categories)',
    shortName: 'RRB NTPC',
    type: 'EXAM',
    category: 'Civil Services & Government',
    aliases: ['RRB NTPC', 'Railway NTPC', 'Station Master Exam', 'Goods Guard Exam', 'Indian Railways Recruitment'],
    organization: 'Railway Recruitment Control Board (RRB / Ministry of Railways)',
    description: 'Mass national competitive examination for recruiting Non-Technical Popular Category staff: Station Master, Goods Guard, Senior Commercial cum Ticket Clerk, Traffic Assistant, and Accounts Clerk.',
    qualification: 'Graduate level for Station Master / Goods Guard; 12th pass for Junior Clerk / Train Clerk.',
    overview: 'Computer Based Test (CBT-1 & CBT-2) testing General Awareness, Mathematics, and General Intelligence & Reasoning, followed by Computer Based Aptitude Test (CBAT) for operational roles.',
    eligibility: {
      qualification: '12th Pass or Any Graduation depending on pay level',
      streams: ['Any Stream'],
      minimumRequirements: ['Age: 18-33 years for graduate posts (18-30 for 12th level). Medical fitness standards apply.']
    },
    officialSource: 'Railway Recruitment Boards',
    notificationUrl: 'https://indianrailways.gov.in',
    sources: [
      { title: 'Indian Railways Official Recruitment', url: 'https://indianrailways.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 4. DEFENCE & ARMED FORCES
  // --------------------------------------------------------------------------
  {
    id: 'exam-nda',
    name: 'UPSC NDA & NA (National Defence Academy & Naval Academy Examination)',
    shortName: 'NDA & NA',
    type: 'EXAM',
    category: 'Defence & Armed Forces',
    aliases: ['NDA', 'NDA Exam', 'National Defence Academy', 'Naval Academy', 'Defence Officer After 12th'],
    organization: 'Union Public Service Commission (UPSC) & Services Selection Board (SSB)',
    description: 'Premier national examination conducted twice a year for 12th standard students to join the Army, Navy, and Air Force wings of the NDA and 10+2 Cadet Entry Scheme of INA as Commissioned Officers.',
    qualification: 'Army Wing: 12th Class pass in any stream. Air Force and Navy Wings: 12th pass with Physics and Mathematics.',
    overview: 'Written examination (Mathematics 300 marks + General Ability Test 600 marks) followed by 5-day rigorous Services Selection Board (SSB) psychological, obstacle, and interview rounds.',
    eligibility: {
      qualification: 'Passed or appearing in 10+2',
      streams: ['Army: Any Stream; Navy & Air Force: Science (PCM)'],
      minimumRequirements: ['Age: 16.5 to 19.5 years. Unmarried male and female candidates. High physical fitness.']
    },
    officialSource: 'Union Public Service Commission',
    notificationUrl: 'https://upsc.gov.in',
    sources: [
      { title: 'UPSC NDA Official Portal', url: 'https://upsc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-cds',
    name: 'UPSC CDS (Combined Defence Services Examination)',
    shortName: 'CDS',
    type: 'EXAM',
    category: 'Defence & Armed Forces',
    aliases: ['CDS', 'UPSC CDS', 'Combined Defence Services', 'IMA', 'OTA', 'AFA', 'INA'],
    organization: 'Union Public Service Commission (UPSC) & SSB',
    description: 'National examination conducted twice a year for graduates to enter the Indian Military Academy (IMA), Indian Naval Academy (INA), Air Force Academy (AFA), and Officers Training Academy (OTA) as Officers.',
    qualification: 'Graduation in any stream for IMA/OTA; Engineering degree for INA; Degree with Physics & Math or Engineering for AFA.',
    overview: 'Written examination testing English, General Knowledge, and Elementary Mathematics (not required for OTA), followed by 5-day SSB interview testing officer-like qualities (OLQs).',
    eligibility: {
      qualification: 'Graduation in relevant discipline',
      streams: ['Any Stream for Army/OTA; Science/Engineering for Navy & Air Force'],
      minimumRequirements: ['Age: 19-24 years (up to 25 for OTA). Unmarried status for IMA/INA/AFA.']
    },
    officialSource: 'Union Public Service Commission',
    notificationUrl: 'https://upsc.gov.in',
    sources: [
      { title: 'UPSC CDS Portal', url: 'https://upsc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-afcat',
    name: 'AFCAT (Air Force Common Admission Test)',
    shortName: 'AFCAT',
    type: 'EXAM',
    category: 'Defence & Armed Forces',
    aliases: ['AFCAT', 'Air Force Officer Exam', 'Flying Branch', 'Ground Duty Officer'],
    organization: 'Indian Air Force (IAF)',
    description: 'Biannual national competitive examination for recruiting Commissioned Officers in Flying, Technical, and Non-Technical Ground Duty branches of the Indian Air Force.',
    qualification: 'Graduation with min 60% marks in any discipline with Math & Physics at 10+2, or B.Tech / B.E. with min 60% marks.',
    overview: 'Online test evaluating Verbal Ability, Numerical Ability, Reasoning & Military Aptitude, and General Awareness, followed by Air Force Selection Board (AFSB) testing.',
    eligibility: {
      qualification: 'Graduation with 60% + Math/Physics at 10+2 or B.Tech',
      streams: ['Science', 'Engineering', 'Graduate with Math/Physics'],
      minimumRequirements: ['Age: 20-24 years for Flying Branch; 20-26 years for Ground Duty.']
    },
    officialSource: 'Indian Air Force',
    notificationUrl: 'https://afcat.cdac.in',
    sources: [
      { title: 'IAF AFCAT Official Portal', url: 'https://afcat.cdac.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 5. BANKING, FINANCE & REGULATORY
  // --------------------------------------------------------------------------
  {
    id: 'exam-ibps-po',
    name: 'IBPS PO (Probationary Officer / Management Trainee)',
    shortName: 'IBPS PO',
    type: 'EXAM',
    category: 'Banking & Financial Services',
    aliases: ['IBPS PO', 'Bank PO', 'Public Sector Bank PO', 'IBPS MT', 'Bank Officer Exam'],
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    description: 'Unified national entrance examination for recruitment of Probationary Officers (Scale I) in 11 participating Public Sector Undertaking (PSU) commercial banks across India.',
    qualification: 'A degree (Graduation) in any discipline from a recognized University or equivalent recognized by Central Government.',
    overview: 'Three-phase evaluation: 1) Preliminary Exam (Speed test - English, Quant, Reasoning), 2) Main Exam (Objective + Descriptive English writing), 3) Common Interview conducted by participating banks.',
    eligibility: {
      qualification: 'Bachelor’s degree in any discipline',
      streams: ['Any Stream (Commerce, Science, Arts, Engineering)'],
      minimumRequirements: ['Age: 20-30 years. Indian citizenship. Basic operating and working knowledge in computer systems.']
    },
    officialSource: 'Institute of Banking Personnel Selection',
    notificationUrl: 'https://ibps.in',
    sources: [
      { title: 'IBPS Official Examination Portal', url: 'https://ibps.in', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-sbi-po',
    name: 'SBI PO (State Bank of India Probationary Officer)',
    shortName: 'SBI PO',
    type: 'EXAM',
    category: 'Banking & Financial Services',
    aliases: ['SBI PO', 'State Bank PO', 'SBI Officer Recruitment'],
    organization: 'State Bank of India (SBI)',
    description: 'Premier banking recruitment examination for selecting entry-level managerial Probationary Officers in India’s largest commercial bank, known for fast-track executive career trajectories.',
    qualification: 'Graduation in any discipline from a recognized University. Final year students eligible to apply provisionally.',
    overview: 'Phase-I Prelims, Phase-II Mains (Data Analysis, Reasoning, Economy/Banking Awareness, Descriptive test), and Phase-III Psychometric test, Group Discussion & Personal Interview.',
    eligibility: {
      qualification: 'Graduation in any discipline',
      streams: ['Any Stream'],
      minimumRequirements: ['Age: 21-30 years. Maximum 4 chances for General category candidates in Phase-II.']
    },
    officialSource: 'State Bank of India',
    notificationUrl: 'https://sbi.co.in/careers',
    sources: [
      { title: 'SBI Careers Official Portal', url: 'https://sbi.co.in/careers', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-rbi-grade-b',
    name: 'RBI Grade B Officer (General / DEPR / DSIM)',
    shortName: 'RBI Grade B',
    type: 'EXAM',
    category: 'Banking & Financial Services',
    aliases: ['RBI Grade B', 'Reserve Bank Officer', 'RBI Officer Exam', 'Central Bank Officer'],
    organization: 'Reserve Bank of India Services Board (RBISB)',
    description: 'India’s most prestigious financial regulatory recruitment for selecting Class A direct-entry Officers in the Reserve Bank of India, steering monetary policy, financial stability, and banking supervision.',
    qualification: 'Graduation in any discipline with minimum 60% marks (50% for SC/ST/PwBD) or Post-Graduation with min 55% marks.',
    overview: 'Phase-I Online Examination (General Awareness, Reasoning, Quant, English), Phase-II Descriptive Papers (Economic & Social Issues, English Writing, Finance & Management), and Phase-III Interview.',
    eligibility: {
      qualification: 'Graduation with min 60% marks or Post-Graduation with min 55%',
      streams: ['Any Stream (Economics, Commerce, Engineering, Finance prioritized)'],
      minimumRequirements: ['Age: 21-30 years (32 for M.Phil / 34 for Ph.D). Max 6 attempts for General category in Phase-I.']
    },
    officialSource: 'Reserve Bank of India',
    notificationUrl: 'https://opportunities.rbi.org.in',
    sources: [
      { title: 'RBI Opportunities Portal', url: 'https://opportunities.rbi.org.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 6. MANAGEMENT & BUSINESS
  // --------------------------------------------------------------------------
  {
    id: 'exam-cat',
    name: 'CAT (Common Admission Test)',
    shortName: 'CAT',
    type: 'EXAM',
    category: 'Management',
    aliases: ['CAT', 'Common Admission Test', 'IIM CAT', 'MBA Entrance', 'IIM Entrance'],
    organization: 'Indian Institutes of Management (IIMs)',
    description: 'Premier national computer-based management aptitude test for admission to Post Graduate Programmes in Management (MBA/PGDM) across all 21 IIMs, FMS Delhi, SPJIMR, and top B-schools in India.',
    qualification: 'Bachelor’s degree with at least 50% marks or equivalent CGPA (45% for SC/ST/PwD). Final year students are also eligible.',
    overview: 'Computer-based test evaluating: 1) Verbal Ability & Reading Comprehension (VARC), 2) Data Interpretation & Logical Reasoning (DILR), 3) Quantitative Ability (QA).',
    eligibility: {
      qualification: 'Bachelor Degree in any discipline with 50% marks',
      streams: ['Any Stream'],
      minimumRequirements: ['Min 50% marks in graduation from a recognized university.']
    },
    officialSource: 'IIM CAT Convener Committee',
    notificationUrl: 'https://iimcat.ac.in',
    sources: [
      { title: 'Official IIM CAT Examination Portal', url: 'https://iimcat.ac.in', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-xat',
    name: 'XAT (Xavier Aptitude Test)',
    shortName: 'XAT',
    type: 'EXAM',
    category: 'Management',
    aliases: ['XAT', 'XLRI Entrance', 'Xavier Aptitude Test', 'XAT MBA'],
    organization: 'XLRI Jamshedpur on behalf of XAMI',
    description: 'Renowned national management entrance exam for admission to XLRI Jamshedpur/Delhi-NCR and over 160 top management institutes across India, known for its rigorous Decision Making section.',
    qualification: 'Three or four-year Bachelor’s degree in any discipline from a recognized university. Final year students eligible.',
    overview: 'Online computer test testing Decision Making, Verbal & Logical Ability, Quantitative Ability & Data Interpretation, and General Knowledge with an analytical Essay writing section.',
    eligibility: {
      qualification: 'Bachelor’s degree in any discipline',
      streams: ['Any Stream']
    },
    officialSource: 'XLRI Jamshedpur',
    notificationUrl: 'https://xatonline.in',
    sources: [
      { title: 'XAT Official Portal', url: 'https://xatonline.in', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 7. LAW & LEGAL STUDIES
  // --------------------------------------------------------------------------
  {
    id: 'exam-clat',
    name: 'CLAT (Common Law Admission Test - UG & PG)',
    shortName: 'CLAT',
    type: 'EXAM',
    category: 'Law',
    aliases: ['CLAT', 'Common Law Admission Test', 'NLU Entrance', 'Law Entrance', 'CLAT UG', 'CLAT PG'],
    organization: 'Consortium of National Law Universities (NLUs)',
    description: 'National entrance test for admissions to the five-year integrated undergraduate (BA LLB, BBA LLB, B.Com LLB, B.Sc LLB) and one-year postgraduate (LL.M) law programmes at 24 National Law Universities.',
    qualification: 'UG: 10+2 with minimum 45% marks (40% for SC/ST). PG: LLB degree with minimum 50% marks (45% for SC/ST).',
    overview: 'Comprehension-based examination evaluating English Language, Current Affairs & General Knowledge, Legal Reasoning, Logical Reasoning, and Quantitative Techniques.',
    eligibility: {
      qualification: '10+2 with min 45% marks for UG; LLB for PG',
      streams: ['Arts', 'Commerce', 'Science', 'Law']
    },
    officialSource: 'Consortium of National Law Universities',
    notificationUrl: 'https://consortiumofnlus.ac.in',
    sources: [
      { title: 'Consortium of NLUs Official Website', url: 'https://consortiumofnlus.ac.in', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-ailet',
    name: 'AILET (All India Law Entrance Test)',
    shortName: 'AILET',
    type: 'EXAM',
    category: 'Law',
    aliases: ['AILET', 'NLU Delhi Entrance', 'National Law University Delhi Test'],
    organization: 'National Law University Delhi (NLU Delhi)',
    description: 'Autonomous entrance examination exclusively for admission to BA LLB (Hons), LLM, and Ph.D programmes at National Law University, Delhi.',
    qualification: 'Senior Secondary School Examination (10+2 system) with minimum 45% marks (40% for SC/ST/PwD).',
    overview: 'Pen-and-paper test comprising English Language, Current Affairs & General Knowledge, and Logical Reasoning.',
    eligibility: {
      qualification: '10+2 with min 45% marks',
      streams: ['Any Stream']
    },
    officialSource: 'National Law University Delhi',
    notificationUrl: 'https://nludelhi.ac.in',
    sources: [
      { title: 'NLU Delhi Official Portal', url: 'https://nludelhi.ac.in', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 8. UNIVERSITY & COMMON ENTRANCES
  // --------------------------------------------------------------------------
  {
    id: 'exam-cuet-ug',
    name: 'CUET-UG (Common University Entrance Test - Undergrad)',
    shortName: 'CUET-UG',
    type: 'EXAM',
    category: 'University Entrances',
    aliases: ['CUET UG', 'CUET', 'Central Universities Entrance Test', 'Delhi University Entrance', 'BHU Entrance'],
    organization: 'National Testing Agency (NTA)',
    description: 'Mandatory single-window national entrance test for admission to undergraduate programmes across all 45+ Central Universities (including DU, BHU, JNU, Jamia) and 200+ participating state and private universities.',
    qualification: 'Passed Class 12 or equivalent board examination in relevant stream/subjects.',
    overview: 'Hybrid examination testing Section IA/IB (Languages), Section II (Domain Specific Subjects like Economics, Accountancy, Physics, Political Science), and Section III (General Test).',
    eligibility: {
      qualification: 'Class 12 pass in any stream',
      streams: ['Science', 'Commerce', 'Humanities / Arts'],
      minimumRequirements: ['Board eligibility as specified by respective target universities. No age limit imposed by NTA.']
    },
    officialSource: 'National Testing Agency (NTA)',
    notificationUrl: 'https://cuetug.ntaonline.in',
    sources: [
      { title: 'CUET-UG Official Portal', url: 'https://cuetug.ntaonline.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-cuet-pg',
    name: 'CUET-PG (Common University Entrance Test - Postgrad)',
    shortName: 'CUET-PG',
    type: 'EXAM',
    category: 'University Entrances',
    aliases: ['CUET PG', 'Central Universities PG Entrance', 'M.A Entrance', 'M.Sc Entrance', 'M.Com Entrance'],
    organization: 'National Testing Agency (NTA)',
    description: 'Single-window national entrance test for admission to postgraduate courses (M.A, M.Sc, M.Com, MCA, MBA, B.Ed, M.Tech) across central, state, deemed, and private universities.',
    qualification: 'Bachelor’s degree in relevant discipline from a recognized university. Final year students eligible.',
    overview: 'Computer-based examination consisting of 75 domain-specific objective questions testing specialized undergraduate discipline mastery.',
    eligibility: {
      qualification: 'Graduation in relevant discipline',
      streams: ['Science', 'Commerce', 'Humanities', 'Technology']
    },
    officialSource: 'National Testing Agency (NTA)',
    notificationUrl: 'https://pgcuet.samarth.ac.in',
    sources: [
      { title: 'CUET-PG Official Portal', url: 'https://pgcuet.samarth.ac.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 9. TEACHING & RESEARCH FELLOWSHIPS
  // --------------------------------------------------------------------------
  {
    id: 'exam-ugc-net',
    name: 'UGC-NET (National Eligibility Test for Assistant Professor & JRF)',
    shortName: 'UGC-NET',
    type: 'EXAM',
    category: 'Teaching & Research',
    aliases: ['UGC NET', 'NTA NET', 'Junior Research Fellowship', 'Assistant Professor Eligibility', 'JRF'],
    organization: 'National Testing Agency (NTA) on behalf of UGC',
    description: 'National examination to determine the eligibility of Indian nationals for ‘Award of Junior Research Fellowship (JRF) and Assistant Professor’, ‘Assistant Professor only’, and ‘Admission to Ph.D’ in 83 subjects.',
    qualification: 'Master’s degree with at least 55% marks (50% for OBC/SC/ST/PwD) in Humanities, Social Sciences, Commerce, Management, or Computer Applications.',
    overview: 'Computer-based examination comprising Paper-I (General Teaching & Research Aptitude) and Paper-II (Domain subject specialization).',
    eligibility: {
      qualification: 'Master’s degree with 55% marks',
      streams: ['Humanities', 'Social Sciences', 'Commerce', 'Management', 'Computer Science'],
      minimumRequirements: ['Age limit for JRF: 30 years (with 5-year relaxation for reserved/women categories). No upper age limit for Assistant Professor.']
    },
    officialSource: 'National Testing Agency (NTA) / UGC',
    notificationUrl: 'https://ugcnet.nta.ac.in',
    sources: [
      { title: 'UGC-NET Official Portal', url: 'https://ugcnet.nta.ac.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-csir-net',
    name: 'CSIR-UGC NET (Joint CSIR UGC National Eligibility Test for Science)',
    shortName: 'CSIR-NET',
    type: 'EXAM',
    category: 'Teaching & Research',
    aliases: ['CSIR NET', 'CSIR JRF', 'Science NET Exam', 'Council of Scientific & Industrial Research Test'],
    organization: 'National Testing Agency (NTA) on behalf of CSIR',
    description: 'National examination for determining eligibility for JRF and Lectureship/Assistant Professorship in Pure Science faculties: Chemical, Earth/Ocean, Life, Mathematical, and Physical Sciences.',
    qualification: 'M.Sc / BS-MS / BS 4 Years / B.Tech / B.Pharma / MBBS with at least 55% marks (50% for SC/ST/PwD).',
    overview: 'Single computer-based test containing Part A (General Science Aptitude), Part B (Core Subject Knowledge), and Part C (High-order analytical scientific problem solving).',
    eligibility: {
      qualification: 'Master’s in Science or equivalent 4-year degree with 55% marks',
      streams: ['Pure Sciences (Physics, Chemistry, Life Sciences, Math, Earth Sciences)']
    },
    officialSource: 'CSIR / National Testing Agency',
    notificationUrl: 'https://csirnet.nta.ac.in',
    sources: [
      { title: 'CSIR-NET Official Portal', url: 'https://csirnet.nta.ac.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 10. DESIGN & ARCHITECTURE
  // --------------------------------------------------------------------------
  {
    id: 'exam-nata',
    name: 'NATA (National Aptitude Test in Architecture)',
    shortName: 'NATA',
    type: 'EXAM',
    category: 'Architecture & Design',
    aliases: ['NATA', 'Architecture Entrance', 'Council of Architecture Test', 'B.Arch Entrance'],
    organization: 'Council of Architecture (COA)',
    description: 'National aptitude test conducted for admission to the 5-year Bachelor of Architecture (B.Arch) degree program at all recognized architectural institutions and universities across India.',
    qualification: 'Passed 10+2 with Physics, Chemistry, and Mathematics, or passed 10+3 Diploma with Mathematics.',
    overview: 'Comprehensive test evaluating cognitive skills, visual perception, aesthetic sensitivity, architectural awareness, and drawing/design reasoning.',
    eligibility: {
      qualification: '10+2 with PCM or 10+3 Diploma with Math',
      streams: ['Science (PCM)']
    },
    officialSource: 'Council of Architecture (COA)',
    notificationUrl: 'https://nata.in',
    sources: [
      { title: 'COA NATA Official Portal', url: 'https://nata.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-nift',
    name: 'NIFT Entrance Examination (National Institute of Fashion Technology)',
    shortName: 'NIFT Entrance',
    type: 'EXAM',
    category: 'Architecture & Design',
    aliases: ['NIFT', 'Fashion Design Entrance', 'NIFT CAT GAT', 'National Institute of Fashion Technology'],
    organization: 'National Testing Agency (NTA) on behalf of NIFT',
    description: 'National entrance examination for admission to undergraduate (B.Des, B.F.Tech) and postgraduate (M.Des, M.F.M, M.F.Tech) programs across all 18 NIFT campuses.',
    qualification: '10+2 in any stream for B.Des; 10+2 with Physics and Mathematics for B.F.Tech.',
    overview: 'Stage 1: Creative Ability Test (CAT) and General Ability Test (GAT); Stage 2: Situation Test (hands-on material modeling) or Personal Interview.',
    eligibility: {
      qualification: '10+2 in any discipline for B.Des (PCM for B.F.Tech)',
      streams: ['Any Stream for Design; Science for Fashion Tech'],
      minimumRequirements: ['Age: Maximum 24 years as on August 1 of admission year (5-year relaxation for SC/ST/PwD).']
    },
    officialSource: 'National Institute of Fashion Technology',
    notificationUrl: 'https://nift.ac.in',
    sources: [
      { title: 'NIFT Official Portal', url: 'https://nift.ac.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-uceed',
    name: 'UCEED & CEED (Undergraduate / Common Entrance Exam for Design)',
    shortName: 'UCEED / CEED',
    type: 'EXAM',
    category: 'Architecture & Design',
    aliases: ['UCEED', 'CEED', 'IIT Design Entrance', 'B.Des IIT', 'M.Des IIT'],
    organization: 'IIT Bombay on behalf of Ministry of Education',
    description: 'National entrance examinations for admission to Bachelor of Design (B.Des) and Master of Design (M.Des) programmes at IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad, and IIITDM Jabalpur.',
    qualification: 'UCEED: 10+2 pass in any stream (Science, Commerce, Arts). CEED: 3/4-year degree / diploma after 10+2.',
    overview: 'Part A (Computer-based testing visualization, spatial ability, observation, design sensitivity) and Part B (Drawing and design problem solving).',
    eligibility: {
      qualification: '10+2 pass in any stream for UCEED; Graduation for CEED',
      streams: ['Any Stream']
    },
    officialSource: 'IIT Bombay Design Cell',
    notificationUrl: 'https://uceed.iitb.ac.in',
    sources: [
      { title: 'UCEED Official Portal', url: 'https://uceed.iitb.ac.in', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // --------------------------------------------------------------------------
  // 11. PROFESSIONAL ACCOUNTING & CORPORATE GOVERNANCE
  // --------------------------------------------------------------------------
  {
    id: 'exam-ca-foundation-inter',
    name: 'ICAI Chartered Accountancy (CA Foundation & Intermediate)',
    shortName: 'CA Foundation & Inter',
    type: 'EXAM',
    category: 'Professional Accounting & Finance',
    aliases: ['CA Exam', 'ICAI CA', 'Chartered Accountant Exam', 'CA Foundation', 'CA Inter', 'CPT'],
    organization: 'Institute of Chartered Accountants of India (ICAI)',
    description: 'Statutory national professional examinations governing entry and certification into the Chartered Accountancy profession in India under the Chartered Accountants Act, 1949.',
    qualification: 'Foundation: Passed Class 12 or appearing. Intermediate: Passed CA Foundation OR Direct Entry for Commerce Graduates (55%+) or Other Graduates (60%+).',
    overview: 'Multi-stage professional evaluation: 1) CA Foundation (4 papers - Accounting, Business Laws, Quantitative Aptitude, Business Economics), 2) CA Intermediate (6 papers in 2 groups), 3) Practical Articleship Training, 4) CA Final.',
    eligibility: {
      qualification: '10+2 pass for Foundation; Commerce/other Graduation for Direct Entry',
      streams: ['Commerce', 'Science', 'Arts']
    },
    officialSource: 'Institute of Chartered Accountants of India',
    notificationUrl: 'https://icai.org',
    sources: [
      { title: 'ICAI Official Portal', url: 'https://icai.org', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-cs-executive',
    name: 'ICSI Company Secretary (CSEET & CS Executive)',
    shortName: 'CS Executive',
    type: 'EXAM',
    category: 'Professional Accounting & Finance',
    aliases: ['CS Exam', 'ICSI CS', 'Company Secretary Exam', 'CSEET', 'CS Executive', 'Corporate Governance'],
    organization: 'Institute of Company Secretaries of India (ICSI)',
    description: 'Statutory professional qualifying examination for certifying Company Secretaries who act as chief corporate governance officers and legal advisors under the Companies Act, 2013.',
    qualification: 'Passed 10+2 for CSEET; Passed CSEET or Graduation for CS Executive registration.',
    overview: 'CSEET (Business Communication, Legal Aptitude, Economics, Current Affairs) followed by CS Executive (Jurisprudence, Company Law, Tax Laws, Corporate Accounting, Financial Management).',
    eligibility: {
      qualification: '10+2 pass for CSEET; Any graduation for direct entry',
      streams: ['Any Stream']
    },
    officialSource: 'Institute of Company Secretaries of India',
    notificationUrl: 'https://icsi.edu',
    sources: [
      { title: 'ICSI Official Portal', url: 'https://icsi.edu', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  }
];
