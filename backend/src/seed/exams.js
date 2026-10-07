/**
 * Structured Entrance & Competitive Exams Seed Data
 */

export const structuredExams = [
  {
    id: 'exam-jee-main',
    name: 'JEE Main (Joint Entrance Examination)',
    shortName: 'JEE Main',
    type: 'EXAM',
    category: 'Engineering',
    aliases: ['JEE Main', 'JEE', 'Joint Entrance Examination', 'AIEEE', 'NTA JEE'],
    organization: 'National Testing Agency (NTA)',
    description: 'National entrance test for admission to undergraduate engineering programs (B.Tech/B.E.) at NITs, IIITs, and CFTIs, and qualifying examination for JEE Advanced.',
    qualification: '10+2 with Physics and Mathematics along with one of Chemistry/Biotechnology/Biology/Technical Vocational subject.',
    overview: 'Computer-based national examination conducted twice annually (Session 1 & Session 2). Tests Physics, Chemistry, and Mathematics concepts at 11th and 12th standard difficulty.',
    eligibility: {
      qualification: 'Passed 10+2 in 2024, 2025, or appearing in 2026',
      streams: ['Science (PCM)'],
      minimumRequirements: ['75% marks in Class 12 board examination (65% for SC/ST) or top 20 percentile for NIT/IIT admission.']
    },
    officialSource: 'National Testing Agency (NTA)',
    notificationUrl: 'https://jeemain.nta.nic.in',
    sources: [
      {
        title: 'NTA JEE Main Official Portal',
        url: 'https://jeemain.nta.nic.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-neet-ug',
    name: 'NEET-UG (National Eligibility cum Entrance Test)',
    shortName: 'NEET-UG',
    type: 'EXAM',
    category: 'Medical',
    aliases: ['NEET UG', 'NEET', 'National Eligibility Entrance Test', 'AIPMT', 'Medical Entrance'],
    organization: 'National Testing Agency (NTA) / National Medical Commission (NMC)',
    description: 'The single mandatory national entrance test for admission to MBBS, BDS, BAMS, BHMS, BUMS, BSMS, and B.Sc Nursing courses across all medical institutions in India including AIIMS and JIPMER.',
    qualification: 'Passed 10+2 with Physics, Chemistry, Biology/Biotechnology and English.',
    overview: 'Pen-and-paper examination testing 720 marks across Physics (180), Chemistry (180), and Biology - Botany & Zoology (360).',
    eligibility: {
      qualification: '10+2 with PCB and English',
      streams: ['Science (PCB)'],
      minimumRequirements: ['50% aggregate in PCB (40% for SC/ST/OBC). Minimum age 17 years as on Dec 31.']
    },
    officialSource: 'National Testing Agency (NTA)',
    notificationUrl: 'https://neet.nta.nic.in',
    sources: [
      {
        title: 'NTA NEET-UG Official Portal',
        url: 'https://neet.nta.nic.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-cat',
    name: 'CAT (Common Admission Test)',
    shortName: 'CAT',
    type: 'EXAM',
    category: 'Management',
    aliases: ['CAT', 'Common Admission Test', 'IIM CAT', 'MBA Entrance'],
    organization: 'Indian Institutes of Management (IIMs)',
    description: 'Premier national computer-based management aptitude test for admission to the Post Graduate Programmes in Management (MBA/PGDM) across all 21 IIMs and top non-IIM institutions.',
    qualification: 'Bachelor’s degree with at least 50% marks or equivalent CGPA (45% for SC/ST/PwD). Final year students are also eligible.',
    overview: 'Computer-based test evaluating: 1) Verbal Ability & Reading Comprehension (VARC), 2) Data Interpretation & Logical Reasoning (DILR), 3) Quantitative Ability (QA).',
    eligibility: {
      qualification: 'Bachelor Degree in any discipline',
      streams: ['Any Stream'],
      minimumRequirements: ['Min 50% marks in graduation from a recognized university.']
    },
    officialSource: 'IIM CAT Convener Committee',
    notificationUrl: 'https://iimcat.ac.in',
    sources: [
      {
        title: 'Official IIM CAT Examination Portal',
        url: 'https://iimcat.ac.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-gate',
    name: 'GATE (Graduate Aptitude Test in Engineering)',
    shortName: 'GATE',
    type: 'EXAM',
    category: 'Engineering',
    aliases: ['GATE', 'Graduate Aptitude Test in Engineering', 'IIT GATE', 'GATE Exam'],
    organization: 'Indian Institute of Science (IISc) & 7 IITs on behalf of National Coordination Board (NCB)',
    description: 'National examination that tests comprehensive understanding of undergraduate engineering, technology, architecture, science, and commerce subjects for M.Tech/Ph.D admission and PSU executive recruitment.',
    qualification: 'A candidate currently studying in the 3rd or higher years of any undergraduate degree or already completed any government-approved degree program in Engineering / Technology / Architecture / Science / Commerce / Arts.',
    overview: 'High-stake computer based examination used by IITs/NITs for M.Tech admissions and PSUs (ONGC, IOCL, NTPC, BHEL, GAIL, BARC, ISRO) for direct recruitment of Executive Engineers.',
    eligibility: {
      qualification: 'B.Tech / B.E. / M.Sc / MCA / Integrated Master Degree',
      streams: ['Engineering', 'Science', 'Technology']
    },
    officialSource: 'GATE Organizing Institute / Ministry of Education',
    notificationUrl: 'https://gate2025.iitr.ac.in',
    sources: [
      {
        title: 'Official GATE Committee Portal',
        url: 'https://gate.iitk.ac.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },
  {
    id: 'exam-clat',
    name: 'CLAT (Common Law Admission Test)',
    shortName: 'CLAT',
    type: 'EXAM',
    category: 'Law',
    aliases: ['CLAT', 'Common Law Admission Test', 'NLU Entrance', 'Law Entrance'],
    organization: 'Consortium of National Law Universities (NLUs)',
    description: 'National entrance test for admissions to the five-year integrated undergraduate (BA LLB, BBA LLB, B.Com LLB, B.Sc LLB) and postgraduate (LL.M) law programmes at 24 National Law Universities.',
    qualification: 'Passed 10+2 or an equivalent examination with a minimum of 45% marks (40% for SC/ST).',
    overview: 'Offline pen-paper test evaluating English, Current Affairs & GK, Legal Reasoning, Logical Reasoning, and Quantitative Techniques.',
    eligibility: {
      qualification: '10+2 with min 45% marks',
      streams: ['Arts', 'Commerce', 'Science']
    },
    officialSource: 'Consortium of National Law Universities',
    notificationUrl: 'https://consortiumofnlus.ac.in',
    sources: [
      {
        title: 'Consortium of NLUs Official Website',
        url: 'https://consortiumofnlus.ac.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  }
];
