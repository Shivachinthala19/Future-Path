/**
 * Structured Studies Seed Data
 * Covers: After 10th, After 12th (Medical, Engineering, Commerce, Arts, Law, Design, Agriculture),
 * Postgraduate Studies, and Professional Qualifications.
 */

export const structuredStudies = [
  // ==========================================
  // 1. COMMERCE & MANAGEMENT UNDERGRADUATE
  // ==========================================
  {
    id: 'b-com',
    name: 'Bachelor of Commerce',
    shortName: 'B.Com',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Commerce',
    aliases: ['BCom', 'Bachelor of Commerce', 'B.Com General', 'B.Com Regular', 'B.Com (General)'],
    description: 'An undergraduate degree focused on core commerce disciplines including accounting, financial management, business economics, taxation, and mercantile law.',
    overview: 'B.Com is one of the most versatile bachelor degrees in India and globally, providing foundational training in accounting, corporate governance, auditing, banking, and data analytics.',
    duration: '3 to 4 Years (as per NEP 2020 framework)',
    eligibility: {
      qualification: '12th / Intermediate / Higher Secondary',
      streams: ['Commerce', 'Science', 'Arts with Mathematics/Economics'],
      minimumRequirements: ['Pass in 10+2 with minimum 45% - 50% aggregate from a recognized board.'],
      aggregatePercentage: 50
    },
    admissionRequirements: [
      'CUET-UG merit score for Central and premier State Universities',
      'Merit-based admission on 10+2 aggregate percentage for constituent/affiliated colleges'
    ],
    entranceExams: ['CUET-UG', 'IPU CET', 'Christ University Entrance', 'Symbiosis SET'],
    subjects: [
      'Financial Accounting',
      'Corporate Accounting',
      'Business Economics',
      'Business Law & Mercantile Law',
      'Direct and Indirect Taxation (GST)',
      'Cost and Management Accounting',
      'Auditing Principles',
      'Financial Management',
      'Banking & Financial Institutions'
    ],
    specializations: [
      'Accounting & Finance',
      'Banking & Insurance',
      'Taxation & GST',
      'Financial Analytics',
      'Corporate Law & Governance',
      'E-Commerce & Digital Business'
    ],
    educationRoutes: [
      {
        routeName: 'Route 1: 12th Commerce → B.Com',
        title: 'Direct Commerce Stream Route',
        type: 'Direct Route',
        degrees: ['12th Commerce', 'B.Com'],
        skills: ['Accounting', 'Excel', 'Tally Prime', 'Business Math'],
        timeline: '3 - 4 Years',
        description: 'Standard progression from high school commerce into undergraduate commerce.',
        steps: ['Pass 12th Commerce with Accountancy', 'Enroll in B.Com via CUET/Merit', 'Complete internships in accounting/finance']
      },
      {
        routeName: 'Route 2: 12th Science → B.Com',
        title: 'Science to Commerce Transition Route',
        type: 'Transition Route',
        degrees: ['12th Science (PCM/PCB)', 'B.Com'],
        skills: ['Basic Accounting', 'Financial Modeling', 'Economics'],
        timeline: '3 - 4 Years',
        description: 'Science graduates entering commerce leverage strong analytical and quantitative logic.',
        steps: ['Pass 12th Science', 'Qualify CUET / University entrance', 'Take bridging courses in Accountancy']
      }
    ],
    skills: [
      'Financial Accounting',
      'Advanced MS Excel',
      'Tally Prime & ERP',
      'Financial Analysis',
      'Tax Computation (ITR & GST)',
      'Data Interpretation',
      'Commercial Communication'
    ],
    careerFields: [
      'Corporate Accounting & Audit',
      'Banking & Financial Services',
      'Taxation Advisory',
      'Investment Banking & Equity Research',
      'Business & Financial Analytics',
      'Public Sector & Civil Services'
    ],
    relatedJobs: [
      'Accountant',
      'Financial Analyst',
      'Data Analyst',
      'Banking Associate',
      'Tax Consultant',
      'Audit Associate',
      'Credit Risk Analyst'
    ],
    jobRoles: [
      'Junior Accountant (₹3.5 - ₹5.5 LPA)',
      'Financial Analyst (₹4.5 - ₹8.5 LPA)',
      'Tax Consultant (₹4.0 - ₹7.0 LPA)',
      'Banking Operations Officer (₹4.0 - ₹6.5 LPA)',
      'Internal Audit Associate (₹4.5 - ₹7.5 LPA)'
    ],
    seniorRoles: [
      'Chief Financial Officer (CFO)',
      'Finance Controller',
      'Head of Taxation',
      'Investment Banking Director',
      'Partner in Audit Firm'
    ],
    relatedStudies: [
      'MBA',
      'M.Com',
      'CA (Chartered Accountancy)',
      'CMA (Cost & Management Accountancy)',
      'CS (Company Secretary)',
      'CFA (Chartered Financial Analyst)',
      'ACCA'
    ],
    higherStudies: [
      {
        program: 'Master of Commerce (M.Com)',
        duration: '2 Years',
        eligibility: 'B.Com with min 50% marks',
        entranceExam: 'CUET-PG',
        careerOutcomes: ['Senior Accountant', 'Lecturer/Professor (with UGC-NET)', 'Financial Consultant'],
        source: 'University Grants Commission (UGC)',
        lastVerified: 'September 2026'
      },
      {
        program: 'Master of Business Administration (MBA - Finance / Strategy)',
        duration: '2 Years',
        eligibility: 'Bachelor degree with min 50% aggregate',
        entranceExam: 'CAT, XAT, GMAT, CMAT',
        careerOutcomes: ['Investment Banker', 'Corporate Finance Manager', 'Management Consultant'],
        source: 'AICTE / Association of Indian Management Schools',
        lastVerified: 'September 2026'
      },
      {
        program: 'Chartered Accountancy (CA Intermediate Direct Entry)',
        duration: '3 - 4 Years',
        eligibility: 'Commerce graduates with minimum 55% marks',
        entranceExam: 'ICAI Intermediate & Final',
        careerOutcomes: ['Practicing CA', 'Statutory Auditor', 'CFO', 'Partner in Big 4'],
        source: 'Institute of Chartered Accountants of India (ICAI)',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'University Grants Commission (UGC) Model Curriculum',
        url: 'https://ugc.gov.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      },
      {
        title: 'Ministry of Education (MoE) India Higher Education Portal',
        url: 'https://education.gov.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  {
    id: 'b-tech-cse',
    name: 'B.Tech in Computer Science & Engineering',
    shortName: 'B.Tech CSE',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Computer Science',
    aliases: ['B.Tech CSE', 'B.Tech Computer Science', 'BE Computer Science', 'BTech CS', 'Computer Engineering'],
    description: 'A flagship four-year engineering program teaching computer systems architecture, algorithmic problem solving, software engineering, databases, networking, and artificial intelligence.',
    overview: 'B.Tech CSE equips graduates with core engineering fundamentals, high-level software development skills, cloud architectures, and machine learning models for modern technology careers.',
    duration: '4 Years (8 Semesters)',
    eligibility: {
      qualification: '12th / Intermediate / 10+2 with Physics, Mathematics, Chemistry/CS',
      streams: ['Science (PCM / PCMB)'],
      minimumRequirements: ['Minimum 60% aggregate in 10+2 with Physics and Mathematics as mandatory subjects.'],
      aggregatePercentage: 60
    },
    admissionRequirements: [
      'National rank in JEE Main / JEE Advanced for IITs, NITs, and IIITs',
      'State Engineering Entrance Examinations (e.g. MHT-CET, WBJEE, KCET, TS EAMCET, AP EAPCET)',
      'Deemed University entrance exams (BITSAT, VITEEE, SRMJEEE, MET)'
    ],
    entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'KCET', 'MHT-CET', 'WBJEE', 'TS EAMCET'],
    subjects: [
      'Data Structures & Algorithms (DSA)',
      'Object Oriented Programming (C++, Java, Python)',
      'Computer Organization & Architecture',
      'Operating Systems & Kernel Concepts',
      'Database Management Systems (DBMS & SQL)',
      'Computer Networks & Protocols',
      'Theory of Computation & Compiler Design',
      'Software Engineering & DevOps',
      'Artificial Intelligence & Machine Learning'
    ],
    specializations: [
      'Artificial Intelligence & Machine Learning',
      'Data Science & Big Data Engineering',
      'Cybersecurity & Cryptography',
      'Cloud Computing & Distributed Systems',
      'Internet of Things (IoT) & Embedded Systems',
      'Full Stack Web & Mobile Development'
    ],
    educationRoutes: [
      {
        routeName: 'Route 1: 12th PCM → JEE Main → B.Tech CSE',
        title: 'Standard High School Science Route',
        type: 'Direct Route',
        degrees: ['12th Science PCM', 'B.Tech CSE'],
        skills: ['Mathematics', 'Physics', 'Problem Solving'],
        timeline: '4 Years',
        description: 'Direct national entrance path to top accredited engineering institutions.',
        steps: ['12th PCM with min 75% for JEE eligibility', 'Crack JEE Main/Adv or State CET', '4-year B.Tech CSE coursework & internships']
      },
      {
        routeName: 'Route 2: 10th → Polytechnic Diploma in CS → Lateral Entry B.Tech',
        title: 'Polytechnic Diploma Lateral Entry Route',
        type: 'Lateral Entry Route',
        degrees: ['10th Standard', '3-Yr Polytechnic Diploma in CS', 'B.Tech CSE (2nd Year)'],
        skills: ['Practical Coding', 'Operating Systems', 'Networking'],
        timeline: '5 Years total',
        description: 'Allows polytechnic diploma holders to enter directly into the 2nd year (3rd semester) of B.Tech CSE.',
        steps: ['Complete 3-year Diploma in Computer Engineering', 'Clear State Lateral Entry CET (ECET/JELET)', 'Complete 3 years of B.Tech']
      }
    ],
    skills: [
      'Data Structures & Algorithms',
      'Python, Java, C++, JavaScript',
      'SQL & NoSQL Database Design',
      'Git & GitHub Version Control',
      'REST APIs & Microservices',
      'Linux Command Line & Shell Scripting',
      'Cloud Platforms (AWS, Azure, GCP)'
    ],
    careerFields: [
      'Software Engineering & Product Development',
      'Data Science & Artificial Intelligence',
      'Cloud Architecture & DevOps',
      'Cybersecurity & Ethical Hacking',
      'Research & Systems Architecture'
    ],
    relatedJobs: [
      'Software Developer',
      'Full Stack Engineer',
      'Data Scientist',
      'Cloud Engineer',
      'DevOps Engineer',
      'Cybersecurity Analyst',
      'AI/ML Engineer'
    ],
    jobRoles: [
      'Associate Software Engineer (₹6.0 - ₹12.0 LPA)',
      'Full Stack Developer (₹7.0 - ₹14.0 LPA)',
      'Data Analyst / Junior Scientist (₹6.5 - ₹13.0 LPA)',
      'Cloud Operations Engineer (₹6.0 - ₹11.0 LPA)',
      'Systems Software Engineer (₹7.5 - ₹16.0 LPA)'
    ],
    seniorRoles: [
      'Principal Software Engineer',
      'Chief Technology Officer (CTO)',
      'VP of Engineering',
      'Chief Information Security Officer (CISO)',
      'Distinguished Systems Architect'
    ],
    relatedStudies: [
      'M.Tech CSE',
      'MS in Computer Science',
      'MBA in Tech Management',
      'Ph.D in Computer Science'
    ],
    higherStudies: [
      {
        program: 'M.Tech in Computer Science & Engineering / AI',
        duration: '2 Years',
        eligibility: 'B.Tech in CSE/IT or allied branches with valid GATE score',
        entranceExam: 'GATE (Graduate Aptitude Test in Engineering)',
        careerOutcomes: ['AI Research Scientist', 'Principal Systems Architect', 'Assistant Professor'],
        source: 'IIT Council / AICTE',
        lastVerified: 'September 2026'
      },
      {
        program: 'MS in Computer Science (International Track)',
        duration: '1.5 - 2 Years',
        eligibility: '4-year engineering degree with strong academic GPA and GRE/TOEFL scores',
        entranceExam: 'GRE, TOEFL / IELTS',
        careerOutcomes: ['Global Tech Lead', 'Applied ML Scientist', 'Cloud Architect'],
        source: 'Global Accredited Universities',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'All India Council for Technical Education (AICTE) Norms',
        url: 'https://aicte-india.org',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      },
      {
        title: 'Joint Entrance Examination (JEE Main) Official Portal',
        url: 'https://jeemain.nta.nic.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 2. MEDICAL & ALLIED HEALTH SCIENCES
  // ==========================================
  {
    id: 'mbbs',
    name: 'Bachelor of Medicine and Bachelor of Surgery',
    shortName: 'MBBS',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Medical',
    aliases: ['MBBS', 'Bachelor of Medicine', 'Medical Degree', 'Doctor Course'],
    description: 'The primary medical qualification in India and the Commonwealth, certifying candidates to practice medicine, diagnose ailments, prescribe medications, and perform clinical surgeries.',
    overview: 'MBBS is a 5.5-year intensive professional medical degree consisting of 4.5 years of academic and clinical training across pre-clinical, para-clinical, and clinical phases, followed by 1 year of compulsory rotating medical internship (CRMI).',
    duration: '5.5 Years (4.5 Years Academics + 1 Year Compulsory Rotating Internship)',
    eligibility: {
      qualification: '12th / 10+2 with Physics, Chemistry, Biology/Biotechnology & English',
      streams: ['Science (PCB / PCMB)'],
      minimumRequirements: ['Minimum 50% aggregate in PCB (40% for reserved categories) and minimum age 17 years as on December 31 of admission year.'],
      aggregatePercentage: 50,
      ageLimit: 'Minimum 17 years'
    },
    admissionRequirements: [
      'Mandatory qualification and national all-India rank in NEET-UG (National Eligibility cum Entrance Test)',
      'Centralized counseling by Medical Counselling Committee (MCC) for All India Quota (AIQ) and State DMER for State Quota'
    ],
    entranceExams: ['NEET-UG (National Eligibility cum Entrance Test)'],
    subjects: [
      'Human Anatomy, Histology & Embryology',
      'Human Physiology & Biophysics',
      'Medical Biochemistry',
      'Pathology & Microbiology',
      'Pharmacology & Therapeutics',
      'Forensic Medicine & Toxicology',
      'Community Medicine & Preventive Healthcare',
      'Ophthalmology & Otorhinolaryngology (ENT)',
      'General Medicine & Pediatrics',
      'General Surgery & Orthopedics',
      'Obstetrics & Gynecology'
    ],
    specializations: [
      'General Medicine',
      'General Surgery',
      'Pediatrics',
      'Obstetrics & Gynecology',
      'Orthopedics',
      'Dermatology',
      'Anesthesiology',
      'Radiodiagnosis',
      'Psychiatry'
    ],
    skills: [
      'Clinical Diagnosis & Patient Examination',
      'Emergency Resuscitation & BLS/ACLS',
      'Pharmacological Prescription Knowledge',
      'Surgical Suturing & Basic Minor Procedures',
      'Medical Record Documentation & Ethics',
      'Patient Communication & Bedside Manner'
    ],
    careerFields: [
      'Clinical Healthcare & Hospital Practice',
      'Public Health & Government Medical Services',
      'Medical Research & Clinical Trials',
      'Hospital Administration & Health Informatics',
      'Telemedicine & HealthTech Consultation'
    ],
    relatedJobs: [
      'General Duty Medical Officer',
      'Resident Doctor',
      'Civil Assistant Surgeon',
      'Medical Officer (UPSC CMS)',
      'Clinical Research Associate'
    ],
    jobRoles: [
      'Junior Resident / Duty Doctor (₹8.0 - ₹14.0 LPA)',
      'Government Medical Officer / CAS (Level 10: ₹56,100 - ₹1,77,500/mo)',
      'Emergency Care Physician (₹9.0 - ₹16.0 LPA)',
      'Clinical Tutor / Lecturer (₹7.5 - ₹12.0 LPA)'
    ],
    seniorRoles: [
      'Consultant Physician / Surgeon',
      'Chief Medical Officer (CMO)',
      'Medical Superintendent',
      'Director of Health Services',
      'Head of Clinical Department (HOD)'
    ],
    relatedStudies: [
      'MD (Doctor of Medicine)',
      'MS (Master of Surgery)',
      'DNB (Diplomate of National Board)',
      'MPH (Master of Public Health)',
      'MBA in Hospital Administration'
    ],
    higherStudies: [
      {
        program: 'MD / MS Postgraduate Medical Specialization (via NEET-PG)',
        duration: '3 Years',
        eligibility: 'MBBS degree with completed 1-year internship and NMC registration',
        entranceExam: 'NEET-PG / NExT (National Exit Test) / INI-CET',
        careerOutcomes: ['Specialist Doctor', 'Assistant Professor in Medical College', 'Super-Specialist (DM/MCh)'],
        source: 'National Medical Commission (NMC)',
        lastVerified: 'September 2026'
      },
      {
        program: 'Master of Public Health (MPH)',
        duration: '2 Years',
        eligibility: 'MBBS or allied healthcare bachelor degree',
        entranceExam: 'CUET-PG / Institutional Entrance (AIIMS / JIPMER / TISS)',
        careerOutcomes: ['Epidemiologist', 'WHO / UN Health Officer', 'Public Health Director'],
        source: 'Public Health Foundation of India / Ministry of Health',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'National Medical Commission (NMC) Regulations',
        url: 'https://nmc.org.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      },
      {
        title: 'National Testing Agency (NTA) NEET-UG Portal',
        url: 'https://neet.nta.nic.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  {
    id: 'b-sc-nursing',
    name: 'B.Sc Nursing',
    shortName: 'B.Sc Nursing',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Nursing',
    aliases: ['BSc Nursing', 'Bachelor of Science in Nursing', 'Nursing Degree'],
    description: 'A four-year professional degree recognized by the Indian Nursing Council (INC) focused on comprehensive patient care, clinical nursing, community health, and critical care management.',
    duration: '4 Years',
    eligibility: {
      qualification: '12th / 10+2 with Physics, Chemistry, Biology (PCB) & English',
      streams: ['Science (PCB)'],
      minimumRequirements: ['Minimum 45% aggregate marks in PCB and English. Minimum age 17 years.'],
      aggregatePercentage: 45
    },
    admissionRequirements: ['NEET-UG rank or State-level Nursing Common Entrance Examination (e.g. AIIMS B.Sc Nursing, PPMET, MH B.Sc Nursing CET)'],
    entranceExams: ['NEET-UG', 'AIIMS Nursing Entrance', 'State Nursing CETs', 'Military Nursing Service (MNS)'],
    subjects: [
      'Anatomy & Physiology',
      'Nursing Foundations & First Aid',
      'Medical-Surgical Nursing',
      'Pharmacology & Pathology',
      'Community Health Nursing',
      'Obstetric & Gynecological Nursing',
      'Child Health (Pediatric) Nursing',
      'Mental Health (Psychiatric) Nursing',
      'Nursing Research & Statistics'
    ],
    specializations: ['Critical Care Nursing', 'Cardiovascular Thoracic Nursing', 'Neonatal & Pediatric Nursing', 'Oncology Nursing', 'Emergency & Disaster Nursing'],
    skills: ['Patient Monitoring & Vitals Assessment', 'IV Cannulation & Medication Administration', 'Wound Care & Sterile Procedures', 'Ventilator & ICU Equipment Operation', 'Patient Care Coordination'],
    careerFields: ['Hospital & Intensive Care Units', 'Military Nursing Services (Armed Forces)', 'Community Health & Primary Healthcare Centers', 'International Healthcare (UK, US, Gulf, Canada)', 'Nursing Academics & Clinical Instruction'],
    relatedJobs: ['Staff Nurse', 'Critical Care Nurse', 'Nursing Officer (NORCET / AIIMS)', 'Military Nursing Officer', 'Community Health Officer (CHO)'],
    jobRoles: [
      'Staff Nurse (Private Hospital: ₹3.5 - ₹6.5 LPA)',
      'AIIMS / Central Govt Nursing Officer (NORCET: Level 7 - ₹44,900 - ₹1,42,400)',
      'Military Nursing Service Lieutenant (Pay Level 10)',
      'Community Health Officer (₹4.0 - ₹6.5 LPA + Performance Incentives)'
    ],
    seniorRoles: ['Nursing Superintendent', 'Chief Nursing Officer (CNO)', 'Clinical Nurse Specialist', 'Principal of Nursing College'],
    relatedStudies: ['M.Sc Nursing', 'Post Basic B.Sc Nursing', 'Nurse Practitioner in Critical Care (NPCC)', 'Ph.D in Nursing'],
    higherStudies: [
      {
        program: 'M.Sc Nursing (Master of Science in Nursing)',
        duration: '2 Years',
        eligibility: 'B.Sc Nursing with min 55% marks and 1 year clinical experience',
        entranceExam: 'AIIMS M.Sc Nursing / State PG Nursing CET',
        careerOutcomes: ['Lecturer / Assistant Professor in Nursing', 'Clinical Nurse Specialist', 'Nursing Director'],
        source: 'Indian Nursing Council (INC)',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'Indian Nursing Council (INC) Statutory Standards',
        url: 'https://indiannursingcouncil.org',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  {
    id: 'b-pharm',
    name: 'Bachelor of Pharmacy',
    shortName: 'B.Pharm',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Pharmacy',
    aliases: ['BPharm', 'Bachelor of Pharmacy', 'B.Pharma'],
    description: 'A four-year undergraduate program regulated by the Pharmacy Council of India (PCI) covering drug formulation, pharmacology, clinical trials, medicinal chemistry, and pharmaceutical manufacturing.',
    duration: '4 Years',
    eligibility: {
      qualification: '10+2 with Physics, Chemistry, and Mathematics/Biology',
      streams: ['Science (PCM / PCB / PCMB)'],
      minimumRequirements: ['Minimum 50% aggregate in PCM/PCB (45% for reserved category candidates).'],
      aggregatePercentage: 50
    },
    admissionRequirements: ['State Pharmacy Entrance Exam rank or Deemed University Common Entrance'],
    entranceExams: ['MHT-CET', 'WBJEE Pharmacy', 'TS EAMCET', 'KCET', 'CUET-UG', 'BITS Pharmacy Entrance'],
    subjects: [
      'Pharmaceutics & Drug Delivery Systems',
      'Pharmaceutical Chemistry & Medicinal Chemistry',
      'Pharmacology & Toxicology',
      'Pharmacognosy & Phytochemistry',
      'Biopharmaceutics & Pharmacokinetics',
      'Pharmaceutical Analysis & Quality Assurance',
      'Industrial Pharmacy & Regulatory Affairs'
    ],
    specializations: ['Industrial Pharmacy', 'Pharmaceutical Quality Assurance', 'Pharmacology & Drug Discovery', 'Regulatory Affairs & Pharmacovigilance'],
    skills: ['HPLC & Analytical Chemistry Instrumentation', 'Drug Formulation & Compounding', 'Pharmacovigilance Adverse Event Reporting', 'Good Manufacturing Practices (GMP)', 'Clinical Trial Protocol Knowledge'],
    careerFields: ['Pharmaceutical Manufacturing & R&D', 'Quality Control (QC) & Quality Assurance (QA)', 'Pharmacovigilance & Clinical Research (CRO)', 'Drug Regulatory Affairs', 'Hospital & Community Retail Pharmacy'],
    relatedJobs: ['Quality Control Chemist', 'Formulation Research Scientist', 'Drug Safety Associate (Pharmacovigilance)', 'Medical Representative / Product Specialist', 'Government Drug Inspector'],
    jobRoles: [
      'QC / QA Executive (₹3.5 - ₹6.0 LPA)',
      'Drug Safety Associate / Pharmacovigilance (₹4.0 - ₹7.0 LPA)',
      'R&D Formulation Chemist (₹4.5 - ₹8.0 LPA)',
      'Government Drug Inspector (State PSC / UPSC: Level 8 - 10)'
    ],
    seniorRoles: ['VP of Quality & Regulatory Affairs', 'Head of Formulation R&D', 'Chief Pharmacist', 'Plant Operations Director'],
    relatedStudies: ['M.Pharm', 'Pharm.D (Post-Baccalaureate)', 'MBA in Pharmaceutical Management', 'MS in Pharmacology'],
    higherStudies: [
      {
        program: 'Master of Pharmacy (M.Pharm - via GPAT)',
        duration: '2 Years',
        eligibility: 'B.Pharm with minimum 55% marks and valid GPAT score',
        entranceExam: 'GPAT (Graduate Pharmacy Aptitude Test) / NIPER JEE',
        careerOutcomes: ['Senior Drug Scientist', 'NIPER Fellow', 'Assistant Professor in Pharmacy'],
        source: 'Pharmacy Council of India (PCI) / NIPER',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'Pharmacy Council of India (PCI) Portal',
        url: 'https://pci.nic.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 3. AFTER 10TH: POLYTECHNIC, ITI, DIPLOMA
  // ==========================================
  {
    id: 'polytechnic-mechanical',
    name: 'Polytechnic Diploma in Mechanical Engineering',
    shortName: 'Diploma Mechanical',
    type: 'STUDY',
    educationLevel: 'Diploma',
    category: 'Polytechnic',
    aliases: ['Diploma in Mechanical Engineering', 'DME', 'Polytechnic Mechanical', 'Polytechnic Mech'],
    description: 'A 3-year technical diploma after 10th standard teaching practical thermodynamics, machine design, CAD/CAM drafting, manufacturing processes, and automotive systems.',
    duration: '3 Years (6 Semesters)',
    eligibility: {
      qualification: '10th Standard / SSC / Matriculation',
      streams: ['School (10th)'],
      minimumRequirements: ['Pass in 10th Standard with Mathematics and Science with minimum 35% - 50% marks.'],
      aggregatePercentage: 35
    },
    admissionRequirements: ['State Polytechnic Common Entrance Test (POLYCET / JEECUP / JEXPO / DET) rank and web counseling.'],
    entranceExams: ['POLYCET', 'JEECUP', 'JEXPO', 'Delhi CET', 'AP POLYCET', 'TS POLYCET'],
    subjects: [
      'Engineering Mechanics & Strength of Materials',
      'Thermal Engineering & Thermodynamics',
      'Manufacturing Technology & Workshop Processes',
      'Machine Drawing & 2D/3D CAD Modeling (AutoCAD/SolidWorks)',
      'Fluid Mechanics & Hydraulic Machinery',
      'Theory of Machines & Metrology',
      'Industrial Management & Safety'
    ],
    specializations: ['Automobile Engineering', 'Production & Manufacturing', 'Refrigeration & Air Conditioning (RAC)', 'CNC Programming & Robotics', 'Tool Design'],
    skills: ['AutoCAD & SolidWorks Modeling', 'CNC Machine Setup & G-Code Programming', 'Lathe, Milling & Welding Operations', 'Hydraulic & Pneumatic Circuit Diagnostics', 'Plant Safety Protocols'],
    careerFields: ['Automobile & Heavy Machinery Manufacturing', 'Indian Railways (RRB Junior Engineer / Loco Pilot)', 'Thermal Power & Defense Plants (PSUs like BHEL, DRDO, SAIL, NTPC)', 'Site Maintenance & Quality Inspection'],
    relatedJobs: ['Junior Engineer (Mechanical)', 'CNC Machinist & Programmer', 'Automobile Maintenance Technician', 'RRB Assistant Loco Pilot (ALP)', 'Quality Inspector'],
    jobRoles: [
      'Junior Engineer / Site Supervisor (₹3.0 - ₹5.5 LPA)',
      'Railway Junior Engineer / RRB JE (Level 6: ₹35,400 - ₹1,12,400)',
      'CNC Programmer & Operator (₹2.8 - ₹4.8 LPA)',
      'PSU Technician / Assistant (₹4.0 - ₹7.5 LPA)'
    ],
    seniorRoles: ['Plant Maintenance Superintendent', 'Senior Production Engineer', 'Chief Technical Officer (Workshops)'],
    relatedStudies: ['B.Tech Mechanical Engineering (Lateral Entry to 2nd Year)', 'Advanced Diploma in Tool Design', 'Post Diploma in Industrial Safety (PDIS)'],
    higherStudies: [
      {
        program: 'B.Tech in Mechanical Engineering (Lateral Entry to 2nd Year)',
        duration: '3 Years',
        eligibility: 'Polytechnic Diploma in Engineering with min 50% marks',
        entranceExam: 'State Lateral Entry Engineering Entrance (ECET / JELET / LEET)',
        careerOutcomes: ['Design Engineer', 'Graduate Engineer Trainee (GET)', 'R&D Engineer'],
        source: 'AICTE Lateral Entry Guidelines',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'State Board of Technical Education and Training (SBTET)',
        url: 'https://aicte-india.org',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  {
    id: 'iti-electrician',
    name: 'ITI Electrician Trade',
    shortName: 'ITI Electrician',
    type: 'STUDY',
    educationLevel: 'ITI',
    category: 'ITI',
    aliases: ['ITI Electrician', 'Industrial Training Electrician', 'National Trade Certificate Electrician', 'NCVT Electrician'],
    description: 'A two-year national vocational training course affiliated with NCVT/DGT providing practical mastery of electrical installations, AC/DC motors, transformer maintenance, domestic and industrial wiring, and panel circuitry.',
    duration: '2 Years (4 Semesters)',
    eligibility: {
      qualification: '10th Standard / SSC with Mathematics and Science',
      streams: ['School (10th)'],
      minimumRequirements: ['Pass in 10th Standard from any recognized examination board.'],
      aggregatePercentage: 35
    },
    admissionRequirements: ['Merit-based admission through State Directorate of Technical Education / NCVT MIS portal based on 10th GPA.'],
    entranceExams: ['State ITI Merit Counseling', 'All India Trade Test (AITT) for National Trade Certificate (NTC)'],
    subjects: [
      'Trade Theory: Electrical Fundamentals & Magnetism',
      'Trade Practical: Wiring, Soldering, Cable Jointing & Earthing',
      'AC & DC Machines (Motors, Generators, Alternators)',
      'Transformers & Substation Switchgear',
      'Engineering Drawing & Circuit Schematics',
      'Workshop Calculation & Science',
      'Employability Skills & Industrial Safety'
    ],
    specializations: ['Domestic & Commercial Electrical Wiring', 'Industrial Panel Board Wiring & Switchgear', 'Substation & Transmission Maintenance', 'Solar PV Rooftop Installation'],
    skills: ['Single & Three-Phase Wiring', 'Motor Rewinding & Testing', 'Multimeter & Insulation Megger Testing', 'Earthing & Lightning Arrester Setup', 'Electrical Safety & Lockout/Tagout (LOTO)'],
    careerFields: ['Indian Railways (Loco Pilot & Technician)', 'State Electricity Boards / DISCOMs (Lineman / Substation Operator)', 'Heavy Industries & Manufacturing Plants', 'Building Construction & Facility Management', 'Self-Employment Electrical Contractor'],
    relatedJobs: ['Industrial Electrician', 'Railway Technician Grade-III', 'DISCOM Lineman / Substation Operator', 'Maintenance Electrician', 'Licensed Electrical Contractor'],
    jobRoles: [
      'Industrial Plant Electrician (₹2.4 - ₹4.2 LPA)',
      'RRB Assistant Loco Pilot / Technician (Level 2: ₹19,900 - ₹63,200)',
      'State Electricity Board Lineman (₹3.0 - ₹5.5 LPA)',
      'Self-Employed Licensed Contractor (₹3.5 - ₹8.0+ LPA)'
    ],
    seniorRoles: ['Electrical Supervisor (with Competency Certificate)', 'Master Technician', 'Shop-Floor Electrical Foreman'],
    relatedStudies: ['Polytechnic Diploma in Electrical Engineering (Lateral Entry to 2nd Year)', 'National Apprenticeship Certificate (NAC)', 'Craft Instructor Training Scheme (CITS)'],
    higherStudies: [
      {
        program: 'National Apprenticeship Certificate (NAC - 1 Year Paid Apprenticeship)',
        duration: '1 Year',
        eligibility: 'Pass in ITI Electrician Trade (NCVT/SCVT)',
        entranceExam: 'All India Trade Test (AITT) for Apprentices',
        careerOutcomes: ['Certified Industrial Technician', 'Railway Maintenance Specialist'],
        source: 'Ministry of Skill Development & Entrepreneurship (MSDE) / NAPS',
        lastVerified: 'September 2026'
      },
      {
        program: 'Craft Instructor Training Scheme (CITS - for ITI Instructor Post)',
        duration: '1 Year',
        eligibility: 'National Trade Certificate (NTC) or Diploma in Electrical Engineering',
        entranceExam: 'All India Common Entrance Test (AICET)',
        careerOutcomes: ['Government / Private ITI Craft Instructor', 'Vocational Training Officer'],
        source: 'Directorate General of Training (DGT)',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'Directorate General of Training (DGT) / NCVT MIS',
        url: 'https://dgt.gov.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      },
      {
        title: 'National Apprenticeship Promotion Scheme (NAPS)',
        url: 'https://apprenticeshipindia.gov.in',
        sourceType: 'GOVERNMENT',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 4. LAW & LEGAL STUDIES
  // ==========================================
  {
    id: 'ba-llb',
    name: 'Integrated BA LLB (Bachelor of Arts & Bachelor of Laws)',
    shortName: 'BA LLB',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Law',
    aliases: ['BA LLB', 'BALLB', 'Bachelor of Laws', '5-Year Integrated Law', 'Integrated Law'],
    description: 'A comprehensive five-year integrated undergraduate law degree recognized by the Bar Council of India (BCI) combining arts/humanities subjects with constitutional, civil, criminal, and corporate jurisprudence.',
    duration: '5 Years (10 Semesters)',
    eligibility: {
      qualification: '10+2 / Intermediate in any stream (Commerce, Arts, Science)',
      streams: ['Arts', 'Commerce', 'Science'],
      minimumRequirements: ['Minimum 45% aggregate in 10+2 (40% for SC/ST category candidates).'],
      aggregatePercentage: 45
    },
    admissionRequirements: ['Rank in Common Law Admission Test (CLAT) for National Law Universities (NLUs), AILET for NLU Delhi, or State Law CETs.'],
    entranceExams: ['CLAT (Common Law Admission Test)', 'AILET', 'LSAT-India', 'MH CET Law', 'SLAT', 'CUET-UG Law'],
    subjects: [
      'Constitutional Law of India',
      'Law of Torts & Consumer Protection',
      'Law of Contracts & Specific Relief',
      'Indian Penal Code (IPC / Bharatiya Nyaya Sanhita)',
      'Code of Civil Procedure (CPC)',
      'Code of Criminal Procedure (CrPC / BNSS)',
      'Corporate & Commercial Laws',
      'Intellectual Property Rights (IPR)',
      'Environmental Law & Human Rights',
      'Moot Court & Drafting, Pleading & Conveyancing'
    ],
    specializations: ['Corporate & Commercial Law', 'Criminal Jurisprudence', 'Intellectual Property Law', 'Constitutional & Administrative Law', 'International Trade & Cyber Law'],
    skills: ['Legal Research (SCC Online, Manupatra)', 'Contract Drafting & Vetting', 'Oral Advocacy & Courtroom Argumentation', 'Statutory Interpretation', 'Due Diligence & Compliance Analysis'],
    careerFields: ['Litigation & Court Practice (High Court / Supreme Court)', 'Corporate Law Firms & Legal Advisory', 'In-House Corporate Counsel', 'Judicial Services (Civil Judge / Magistrate)', 'Public Prosecution & Government Law Officers'],
    relatedJobs: ['Corporate Legal Associate', 'Litigation Advocate', 'Judicial Magistrate / Civil Judge', 'Legal Risk Analyst', 'In-House Counsel'],
    jobRoles: [
      'Corporate Legal Associate (₹7.0 - ₹16.0 LPA in Tier-1 firms)',
      'In-House Legal Counsel (₹6.0 - ₹12.0 LPA)',
      'Judicial Magistrate (State Judiciary: Level 10 / ₹77,840 - ₹1,36,520)',
      'Junior Litigation Advocate (₹3.0 - ₹6.0 LPA + Independent fees)'
    ],
    seniorRoles: ['Partner in Law Firm', 'Senior Advocate (Designated by High Court/SC)', 'General Counsel / Head of Legal', 'District & Sessions Judge / High Court Judge'],
    relatedStudies: ['LLM (Master of Laws)', 'Company Secretary (CS)', 'Post Graduate Diploma in Cyber Law / IPR', 'Ph.D in Law'],
    higherStudies: [
      {
        program: 'Master of Laws (LL.M via CLAT-PG)',
        duration: '1 - 2 Years',
        eligibility: 'LLB or integrated 5-year law degree with min 50% aggregate',
        entranceExam: 'CLAT-PG / AILET-PG',
        careerOutcomes: ['Law Professor / Academician', 'Specialized Arbitrator', 'Supreme Court Researcher'],
        source: 'Bar Council of India (BCI) / Consortium of NLUs',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'Bar Council of India (BCI) Statutory Standards',
        url: 'https://barcouncilofindia.org',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      },
      {
        title: 'Consortium of National Law Universities (CLAT)',
        url: 'https://consortiumofnlus.ac.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 5. POSTGRADUATE STUDIES (MBA, MCA, M.TECH)
  // ==========================================
  {
    id: 'mba',
    name: 'Master of Business Administration',
    shortName: 'MBA',
    type: 'STUDY',
    educationLevel: 'Postgraduate',
    category: 'Management',
    aliases: ['MBA', 'Master of Business Administration', 'PGDM', 'Post Graduate Diploma in Management'],
    description: 'A premier two-year postgraduate business program preparing graduates for strategic leadership, financial modeling, marketing innovation, operations management, and corporate leadership.',
    duration: '2 Years (4 Semesters / 6 Trimesters)',
    eligibility: {
      qualification: 'Bachelor degree in any discipline (B.Com, B.Tech, B.Sc, BA, BBA, etc.)',
      streams: ['Commerce', 'Engineering', 'Science', 'Arts', 'Management', 'Law'],
      minimumRequirements: ['Graduation with minimum 50% aggregate marks (45% for SC/ST category) from a recognized university.'],
      aggregatePercentage: 50
    },
    admissionRequirements: ['Percentile in CAT (Common Admission Test) for IIMs, XAT, GMAT, MAT, CMAT, SNAP, NMAT, followed by Written Ability Test (WAT) and Personal Interview (PI).'],
    entranceExams: ['CAT', 'XAT', 'GMAT', 'CMAT', 'MAT', 'SNAP', 'NMAT', 'State MBA CETs (e.g. MAH-MBA CET, TS ICET, AP ICET)'],
    subjects: [
      'Managerial Economics & Macroeconomic Policy',
      'Financial Reporting, Accounting & Corporate Valuation',
      'Marketing Management & Consumer Analytics',
      'Organizational Behavior & Human Resources',
      'Quantitative Techniques & Business Statistics',
      'Operations Research & Supply Chain Optimization',
      'Strategic Management & Business Policy',
      'Corporate Governance, Ethics & Leadership'
    ],
    specializations: [
      'Finance & Investment Banking',
      'Marketing & Digital Strategy',
      'Human Resource Management (HR)',
      'Operations, Logistics & Supply Chain',
      'Business Analytics & Data Intelligence',
      'Information Technology & Product Management',
      'International Business & Trade'
    ],
    educationRoutes: [
      {
        routeName: 'Route 1: Any Bachelor Degree → CAT/XAT → MBA',
        title: 'Standard Direct Graduation Route',
        type: 'Direct Route',
        degrees: ['B.Com / B.Tech / B.Sc / BA / BBA', 'MBA'],
        skills: ['Quantitative Aptitude', 'Data Interpretation', 'Verbal Ability'],
        timeline: '2 Years',
        description: 'Standard competitive entrance route into top business schools.',
        steps: ['Complete Graduation with min 50%', 'Prepare and crack CAT / XAT with 90+ percentile', 'Clear GD/WAT/PI at target business school']
      },
      {
        routeName: 'Route 2: Professional Qualification (CA / CMA / CS) → Executive MBA',
        title: 'Professional Credential Route',
        type: 'Professional Equivalent Route',
        degrees: ['Chartered Accountancy / CMA / CS', 'Executive MBA'],
        skills: ['Financial Controls', 'Statutory Compliance', 'Leadership'],
        timeline: '1 - 2 Years',
        description: 'Recognized statutory credentials allow lateral entry or executive MBA access.',
        steps: ['Complete CA/CMA/CS', 'Accumulate 2-3 years corporate tenure', 'Join 1-year Executive MBA via GMAT/CAT']
      }
    ],
    skills: [
      'Strategic Decision Making & Business Modeling',
      'Financial Statement Analysis & DCF Valuation',
      'Market Sizing & Go-to-Market Strategy',
      'Negotiation & Stakeholder Management',
      'Team Leadership & Change Management',
      'Advanced Power BI, Excel & Tableau'
    ],
    careerFields: [
      'Management Consulting & Strategy Advisory',
      'Investment Banking, Private Equity & Venture Capital',
      'Product Management & Technology Strategy',
      'Brand & Growth Marketing Leadership',
      'Corporate Finance & Treasury Operations',
      'Global Supply Chain & Operations Management'
    ],
    relatedJobs: [
      'Management Consultant',
      'Investment Banking Associate',
      'Product Manager',
      'Marketing Manager',
      'Financial Analyst',
      'Operations Lead',
      'Chief of Staff'
    ],
    jobRoles: [
      'Management Consultant (₹14.0 - ₹28.0 LPA)',
      'Investment Banking Analyst / Associate (₹16.0 - ₹34.0 LPA)',
      'Product Manager (₹15.0 - ₹26.0 LPA)',
      'Marketing / Brand Manager (₹10.0 - ₹18.0 LPA)',
      'Corporate Strategy Associate (₹12.0 - ₹22.0 LPA)'
    ],
    seniorRoles: [
      'Vice President (VP)',
      'Chief Executive Officer (CEO)',
      'Chief Financial Officer (CFO)',
      'Chief Operating Officer (COO)',
      'Managing Director & Partner'
    ],
    relatedStudies: [
      'Doctor of Business Administration (DBA)',
      'Ph.D in Management',
      'Executive Global Leadership Fellowships (CFA, PMP)'
    ],
    higherStudies: [
      {
        program: 'Ph.D in Management / Fellow Programme in Management (FPM - IIMs)',
        duration: '4 - 5 Years',
        eligibility: 'Master’s degree or professional qualification (CA/CMA/CS) with min 60% marks',
        entranceExam: 'CAT / GMAT / GRE / UGC-NET (JRF)',
        careerOutcomes: ['Tenured B-School Professor', 'Chief Economist', 'Head of Corporate Think Tank'],
        source: 'AICTE / IIM Council',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'All India Council for Technical Education (AICTE) Management Norms',
        url: 'https://aicte-india.org',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      },
      {
        title: 'Common Admission Test (CAT) Official Convener Portal',
        url: 'https://iimcat.ac.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  {
    id: 'mca',
    name: 'Master of Computer Applications',
    shortName: 'MCA',
    type: 'STUDY',
    educationLevel: 'Postgraduate',
    category: 'Computer Science',
    aliases: ['MCA', 'Master of Computer Applications', 'Master in Computer Applications'],
    description: 'A two-year postgraduate computer science degree emphasizing enterprise software architectures, cloud computing, advanced database management, AI integration, and full-stack software development.',
    duration: '2 Years (4 Semesters)',
    eligibility: {
      qualification: 'BCA / B.Sc Computer Science / B.Sc IT / B.Com / BA with Mathematics at 10+2 level or graduation',
      streams: ['Computer Applications', 'Science', 'Commerce with Math', 'Arts with Math'],
      minimumRequirements: ['Passed BCA/Bachelor Degree in Computer Science Engineering or equivalent with at least 50% marks (45% for reserved category).'],
      aggregatePercentage: 50
    },
    admissionRequirements: ['NIMCET (NIT MCA Common Entrance Test) or State MCA Common Entrance Examination rank.'],
    entranceExams: ['NIMCET', 'MAH MCA CET', 'TS ICET / AP ICET (MCA stream)', 'CUET-PG', 'TANCET', 'WB JECA'],
    subjects: [
      'Advanced Data Structures & Analysis of Algorithms',
      'Full Stack Web Architecture (React, Node.js, Spring Boot)',
      'Advanced Database Management & Distributed Databases',
      'Operating Systems & Cloud Architecture',
      'Artificial Intelligence & Deep Learning',
      'Mobile Application Development (Flutter/Android)',
      'Software Engineering & Agile Project Management',
      'Enterprise Capstone Project'
    ],
    specializations: ['Full Stack Development', 'Cloud & DevOps Engineering', 'Data Science & Machine Learning', 'Cybersecurity & Information Defense'],
    skills: ['Java, Python, JavaScript, TypeScript', 'Spring Boot & Microservices', 'React, Angular & TailwindCSS', 'Docker, Kubernetes & AWS Deployment', 'SQL Tuning & MongoDB'],
    careerFields: ['Enterprise Software Engineering', 'Cloud Solutions & Systems Architecture', 'Mobile App Development', 'Data Engineering & Analytics'],
    relatedJobs: ['Software Engineer', 'Full Stack Developer', 'Cloud Infrastructure Engineer', 'Database Administrator', 'Technical Team Lead'],
    jobRoles: [
      'Software Development Engineer (SDE-1: ₹5.5 - ₹11.0 LPA)',
      'Full Stack Developer (₹6.0 - ₹12.5 LPA)',
      'Cloud DevOps Engineer (₹6.5 - ₹13.0 LPA)',
      'Technical Team Lead (₹12.0 - ₹22.0 LPA)'
    ],
    seniorRoles: ['Principal Software Architect', 'Engineering Manager', 'Director of Engineering', 'CTO'],
    relatedStudies: ['M.Tech in CS / IT (for eligible candidates)', 'Ph.D in Computer Applications / Computer Science'],
    higherStudies: [
      {
        program: 'Ph.D in Computer Science / Applications',
        duration: '3 - 5 Years',
        eligibility: 'MCA with minimum 55% marks',
        entranceExam: 'UGC-NET / University Research Entrance Test',
        careerOutcomes: ['University Professor', 'Principal AI Researcher', 'R&D Director'],
        source: 'University Grants Commission (UGC)',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'NIMCET Official Portal for National Institutes of Technology (NITs)',
        url: 'https://nimcet.admissions.nic.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 6. AGRICULTURE & ALLIED SCIENCES
  // ==========================================
  {
    id: 'b-sc-agriculture',
    name: 'B.Sc (Hons) Agriculture',
    shortName: 'B.Sc Agriculture',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Agriculture',
    aliases: ['BSc Agriculture', 'B.Sc Agri', 'Bachelor of Science in Agriculture', 'B.Sc (Hons) Agri'],
    description: 'A 4-year professional degree recognized by the Indian Council of Agricultural Research (ICAR) covering agronomy, soil science, plant genetics, agricultural economics, entomology, and rural agricultural work experience (RAWE).',
    duration: '4 Years (8 Semesters)',
    eligibility: {
      qualification: '10+2 with Physics, Chemistry, and Biology / Mathematics / Agriculture',
      streams: ['Science (PCB / PCM / PCMB / Agriculture)'],
      minimumRequirements: ['Minimum 50% aggregate in science subjects.'],
      aggregatePercentage: 50
    },
    admissionRequirements: ['ICAR AIEEA-UG rank (via CUET-UG) or State Agricultural University Common Entrance Tests.'],
    entranceExams: ['CUET-UG (ICAR AIEEA)', 'KCET Agri', 'MHT-CET Agri', 'TS EAMCET Agri', 'AP EAPCET Agri', 'OUAT Entrance'],
    subjects: [
      'Fundamentals of Agronomy & Crop Production',
      'Soil Science & Agricultural Chemistry',
      'Genetics & Plant Breeding',
      'Agricultural Entomology & Pest Management',
      'Plant Pathology & Microbiology',
      'Agricultural Economics & Farm Management',
      'Horticultural Science & Post-Harvest Technology',
      'Rural Agricultural Work Experience (RAWE) & Agro-Industrial Attachment'
    ],
    specializations: ['Agronomy', 'Genetics & Plant Breeding', 'Soil Science & Water Management', 'Agricultural Entomology', 'Horticulture & Floriculture'],
    skills: ['Crop Yield Optimization & Soil Health Analysis', 'Organic Farming & Bio-Fertilizer Application', 'Drip Irrigation & Smart Farming Technologies', 'Agricultural Credit & Crop Insurance Assessment', 'Seed Quality Testing'],
    careerFields: ['Agri-Business & FMCG Corporations', 'Banking & Rural Credit (IBPS Agricultural Field Officer - AFO)', 'Government Agricultural Departments (ADO / AO)', 'Seed, Fertilizer & Pesticide R&D', 'Farm Management & Commercial Organic Agriculture'],
    relatedJobs: ['Agricultural Field Officer (IBPS AFO)', 'Agriculture Development Officer (ADO)', 'Farm Manager', 'Agronomist / Seed Scientist', 'Agri-Business Executive'],
    jobRoles: [
      'IBPS Agricultural Field Officer / Scale 1 Bank Officer (₹6.5 - ₹10.5 LPA)',
      'Government Agriculture Officer (State PSC: Level 8 - 10)',
      'Agronomist / Field Scientist (₹4.5 - ₹8.0 LPA)',
      'Agri-Input Sales & Marketing Executive (₹4.0 - ₹7.0 LPA)'
    ],
    seniorRoles: ['Director of Agriculture (State Government)', 'Chief Agronomist', 'Head of Agri-Banking', 'Managing Director in Agri-Commodity Trading'],
    relatedStudies: ['M.Sc Agriculture (via ICAR AIEEA-PG)', 'MBA in Agri-Business Management (ABM - IIM Ahmedabad/Lucknow/MANAGE)', 'Ph.D in Agricultural Sciences'],
    higherStudies: [
      {
        program: 'MBA in Food & Agri-Business Management (FABM / ABM)',
        duration: '2 Years',
        eligibility: 'B.Sc Agriculture or allied bachelor degree with min 50% marks',
        entranceExam: 'CAT / CMAT',
        careerOutcomes: ['Agri-Business Manager', 'Commodity Risk Manager', 'Rural Supply Chain Head'],
        source: 'MANAGE / IIM Ahmedabad / AICTE',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'Indian Council of Agricultural Research (ICAR)',
        url: 'https://icar.org.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 7. DESIGN, ARCHITECTURE & CREATIVE ARTS
  // ==========================================
  {
    id: 'b-arch',
    name: 'Bachelor of Architecture',
    shortName: 'B.Arch',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Architecture',
    aliases: ['B.Arch', 'BArch', 'Bachelor of Architecture', 'Architecture Degree'],
    description: 'A 5-year professional degree recognized by the Council of Architecture (CoA) combining building aesthetics, structural engineering, architectural design, urban planning, sustainability, and landscape design.',
    duration: '5 Years (10 Semesters)',
    eligibility: {
      qualification: '10+2 with Physics, Chemistry, and Mathematics (or 10+3 Diploma with Mathematics)',
      streams: ['Science (PCM)'],
      minimumRequirements: ['Minimum 50% aggregate in Physics, Chemistry, and Mathematics and 50% overall.'],
      aggregatePercentage: 50
    },
    admissionRequirements: ['Mandatory qualification in NATA (National Aptitude Test in Architecture) or JEE Main Paper 2 (B.Arch/B.Planning).'],
    entranceExams: ['NATA (Council of Architecture)', 'JEE Main Paper 2 (for NITs and SPA)'],
    subjects: [
      'Architectural Design Studio',
      'Building Construction & Materials',
      'Structural Mechanics & RCC Design',
      'History of Architecture & Visual Arts',
      'Climatology & Sustainable Green Architecture',
      'Building Services (Plumbing, HVAC, Electrical, Fire Safety)',
      'Urban Planning & Landscape Architecture',
      'Professional Practice, Building Byelaws & Estimating'
    ],
    specializations: ['Sustainable Green Building Design', 'Urban Design & City Planning', 'Interior Architecture', 'Landscape Architecture', 'Heritage Conservation'],
    skills: ['AutoCAD, Revit & BIM Modeling', '3D SketchUp, Rhino & Lumion Rendering', 'Structural Coordination & Site Supervision', 'Building Code & FSI Compliance', 'Client Concept Presentation'],
    careerFields: ['Architectural Design Firms & Studios', 'Urban Development Authorities & Smart Cities', 'Real Estate & Infrastructure Developers', 'Interior & Landscape Consultation', 'Historic Conservation & Monument Restoration'],
    relatedJobs: ['Architect', 'BIM Architect', 'Urban Planner', 'Interior Architect', 'Government Architect (CPWD / MES)'],
    jobRoles: [
      'Junior Architect / BIM Modeler (₹4.0 - ₹7.0 LPA)',
      'Architect / Project Designer (₹6.0 - ₹11.0 LPA)',
      'CPWD Assistant Architect (UPSC: Level 10: ₹56,100 - ₹1,77,500)',
      'Senior Project Architect (₹10.0 - ₹18.0 LPA)'
    ],
    seniorRoles: ['Principal Architect (Studio Owner)', 'Chief Architect (Government/Infrastructure)', 'Director of Urban Planning'],
    relatedStudies: ['M.Arch (Master of Architecture)', 'Master of Urban Planning (M.Plan)', 'M.Des (Industrial Design)'],
    higherStudies: [
      {
        program: 'Master of Architecture (M.Arch) / Urban Design (via CEED / GATE)',
        duration: '2 Years',
        eligibility: 'B.Arch with minimum 50-55% aggregate and CoA registration',
        entranceExam: 'GATE (Architecture) / CEED',
        careerOutcomes: ['Chief Urban Designer', 'Professor in Architecture', 'Sustainable Infrastructure Consultant'],
        source: 'Council of Architecture (CoA)',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      {
        title: 'Council of Architecture (CoA) Statutory Standards',
        url: 'https://coa.gov.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      },
      {
        title: 'National Aptitude Test in Architecture (NATA)',
        url: 'https://nata.in',
        sourceType: 'OFFICIAL',
        lastVerified: 'September 2026'
      }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 13. ARTIFICIAL INTELLIGENCE & DATA SCIENCE
  // ==========================================
  {
    id: 'b-tech-ai-ds',
    name: 'B.Tech in Artificial Intelligence & Data Science',
    shortName: 'B.Tech AI & DS',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Engineering & Technology',
    aliases: ['B.Tech AI', 'B.Tech Data Science', 'Artificial Intelligence Degree', 'B.Tech AI & ML'],
    description: 'A 4-year specialized engineering degree focused on deep learning, neural networks, machine learning algorithms, big data infrastructure, and mathematical modeling.',
    duration: '4 Years (8 Semesters)',
    eligibility: {
      qualification: '10+2 with Physics, Mathematics, and Chemistry',
      streams: ['Science (PCM)'],
      minimumRequirements: ['Pass 10+2 with minimum 60% aggregate in PCM.']
    },
    admissionRequirements: ['JEE Main / State CET rank merit score.'],
    entranceExams: ['JEE Main', 'MHT CET', 'KCET', 'COMEDK', 'BITSAT'],
    subjects: [
      'Linear Algebra & Multivariable Calculus',
      'Data Structures & Algorithms in Python/C++',
      'Machine Learning Foundations & Scikit-Learn',
      'Deep Learning & Neural Networks (PyTorch)',
      'Natural Language Processing (NLP) & LLMs',
      'Big Data Engineering (Hadoop / Spark)',
      'Computer Vision & Image Processing',
      'Cloud AI Deployment & MLOps'
    ],
    specializations: ['Generative AI & LLMs', 'Computer Vision & Autonomous Systems', 'Healthcare Analytics', 'Financial AI & Algorithmic Trading'],
    skills: ['Python, PyTorch & TensorFlow', 'SQL & Vector Databases', 'Data Preprocessing & Feature Engineering', 'MLOps & Docker Deployment', 'Algorithmic Problem Solving'],
    careerFields: ['Artificial Intelligence Labs', 'Autonomous Vehicles & Robotics', 'E-Commerce & Recommendation Systems', 'FinTech & Algorithmic Trading', 'Healthcare Diagnostics'],
    relatedJobs: ['AI & Machine Learning Engineer', 'Data Analyst & Business Intelligence Specialist', 'Software Development Engineer (SDE)'],
    jobRoles: [
      'Junior AI/ML Engineer (₹7.0 - ₹12.0 LPA)',
      'Data Scientist (₹8.0 - ₹16.0 LPA)',
      'Prompt & LLM Systems Engineer (₹9.0 - ₹18.0 LPA)',
      'Senior Machine Learning Scientist (₹16.0 - ₹32.0 LPA)'
    ],
    seniorRoles: ['Lead AI Architect', 'VP of Artificial Intelligence', 'Chief AI Officer (CAIO)'],
    relatedStudies: ['M.Tech in Artificial Intelligence', 'M.Sc Data Science', 'MS in Computer Science (Global)'],
    higherStudies: [
      {
        program: 'M.Tech / MS in Artificial Intelligence (via GATE / GRE)',
        duration: '2 Years',
        eligibility: 'B.Tech with min 60% aggregate',
        entranceExam: 'GATE (DA / CS) or GRE',
        careerOutcomes: ['Principal AI Researcher', 'Autonomous Driving Architect', 'University Professor'],
        source: 'AICTE / IIT Coordination Board',
        lastVerified: 'September 2026'
      }
    ],
    sources: [
      { title: 'AICTE Model Curriculum for AI & Data Science', url: 'https://aicte-india.org', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }
    ],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 14. MECHANICAL ENGINEERING
  // ==========================================
  {
    id: 'b-tech-mechanical',
    name: 'B.Tech in Mechanical Engineering',
    shortName: 'B.Tech Mechanical',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Core Engineering',
    aliases: ['Mechanical Engineering', 'B.Tech ME', 'BE Mechanical', 'Automotive Engineering'],
    description: 'A 4-year foundational engineering program focusing on machine design, thermodynamics, fluid mechanics, robotics, CAD modeling, and industrial manufacturing systems.',
    duration: '4 Years (8 Semesters)',
    eligibility: {
      qualification: '10+2 with Physics, Mathematics, and Chemistry',
      streams: ['Science (PCM)'],
      minimumRequirements: ['Pass 10+2 with minimum 50% in PCM.']
    },
    admissionRequirements: ['JEE Main / JEE Advanced / State CET rank.'],
    entranceExams: ['JEE Main', 'JEE Advanced', 'GATE (for PSUs/PG)', 'State CETs'],
    subjects: [
      'Engineering Mechanics & Strength of Materials',
      'Thermodynamics & Heat Transfer',
      'Fluid Mechanics & Hydraulic Machinery',
      'Theory of Machines & Machine Design',
      'Manufacturing Technology & CNC Machining',
      'CAD/CAM & Finite Element Analysis (FEA)',
      'Robotics & Industrial Automation',
      'Automotive Systems & EV Technology'
    ],
    specializations: ['Electric Vehicles (EV) & Battery Packs', 'Robotics & Mechatronics', 'Aerospace Propulsion', 'Thermal Engineering', 'Computational Fluid Dynamics (CFD)'],
    skills: ['SolidWorks, CATIA & AutoCAD', 'ANSYS Finite Element Analysis (FEA)', 'Geometric Dimensioning & Tolerancing (GD&T)', 'Manufacturing Process Optimization', 'Robotics & PLC Programming'],
    careerFields: ['Automotive & EV Manufacturers', 'Aerospace & Defence (ISRO, DRDO, HAL)', 'Power Plants & Renewable Energy', 'Heavy Engineering & Robotics Automation', 'Public Sector Undertakings (IOCL, NTPC, BHEL)'],
    relatedJobs: ['Mechanical Design & Robotics Engineer', 'Research Scientist / Physicist'],
    jobRoles: [
      'Graduate Engineer Trainee (GET) (₹4.5 - ₹7.0 LPA)',
      'Mechanical Design Engineer (₹6.0 - ₹11.0 LPA)',
      'PSU Executive Engineer (via GATE: ₹12.0 - ₹18.0 LPA)',
      'Senior Robotics / CAE Engineer (₹12.0 - ₹20.0 LPA)'
    ],
    seniorRoles: ['Plant General Manager', 'Chief Technology Officer (Manufacturing)', 'VP of Automotive Engineering'],
    relatedStudies: ['M.Tech Machine Design / Thermal', 'MBA in Operations Management', 'MS in Robotics (Global)'],
    higherStudies: [
      {
        program: 'M.Tech / PSU Recruitment via GATE',
        duration: '2 Years',
        eligibility: 'B.Tech Mechanical with valid GATE score',
        entranceExam: 'GATE (ME)',
        careerOutcomes: ['Scientist / Executive Engineer at ISRO / ONGC', 'Lead Machine Design Specialist'],
        source: 'IIT GATE Committee',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'AICTE Mechanical Engineering Standards', url: 'https://aicte-india.org', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 15. CIVIL ENGINEERING
  // ==========================================
  {
    id: 'b-tech-civil',
    name: 'B.Tech in Civil Engineering',
    shortName: 'B.Tech Civil',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Core Engineering',
    aliases: ['Civil Engineering', 'B.Tech CE', 'BE Civil', 'Structural Engineering Degree'],
    description: 'A 4-year engineering program teaching the planning, structural analysis, design, and construction management of national infrastructure including expressways, bridges, high-rises, and smart cities.',
    duration: '4 Years (8 Semesters)',
    eligibility: {
      qualification: '10+2 with Physics, Mathematics, and Chemistry',
      streams: ['Science (PCM)'],
      minimumRequirements: ['Pass 10+2 with 50% marks in PCM.']
    },
    admissionRequirements: ['JEE Main / State CETs.'],
    entranceExams: ['JEE Main', 'JEE Advanced', 'GATE (Civil)'],
    subjects: [
      'Structural Analysis & Mechanics of Solids',
      'Building Materials & Concrete Technology',
      'Reinforced Concrete (RCC) & Steel Design',
      'Geotechnical & Foundation Engineering',
      'Transportation & Highway Engineering',
      'Environmental Engineering & Water Supply',
      'Surveying & GPS / GIS Remote Sensing',
      'Construction Project Management & Estimation'
    ],
    specializations: ['Structural Engineering', 'Geotechnical & Earthquake Engineering', 'Transportation & Highway Infrastructure', 'Environmental & Water Resources', 'Construction Project Management'],
    skills: ['STAAD.Pro & ETABS Structural Modeling', 'AutoCAD & Revit BIM', 'Quantity Surveying & Estimation', 'Quality Assurance & Concrete Testing', 'Total Station Surveying'],
    careerFields: ['Infrastructure & Construction Firms (L&T, Tata Projects)', 'Public Works Departments (CPWD / PWD)', 'Highway & Rail Authorities (NHAI, DMRC)', 'Consulting Structural Engineering Firms', 'Real Estate Development'],
    relatedJobs: ['Civil & Structural Infrastructure Engineer', 'Architectural Designer & Urban Planner'],
    jobRoles: [
      'Site Engineer (₹4.2 - ₹6.5 LPA)',
      'Structural Design Engineer (₹5.5 - ₹10.0 LPA)',
      'CPWD Assistant Executive Engineer (UPSC ESE: ₹11.0 - ₹16.0 LPA)',
      'Project Infrastructure Manager (₹12.0 - ₹22.0 LPA)'
    ],
    seniorRoles: ['Chief Project Director', 'Chief Engineer (Government PWD)', 'VP of Infrastructure Construction'],
    relatedStudies: ['M.Tech in Structural Engineering', 'Master of Construction Management (NICMAR)', 'UPSC Engineering Services (ESE)'],
    higherStudies: [
      {
        program: 'M.Tech Structural Engineering / UPSC ESE Examination',
        duration: '2 Years',
        eligibility: 'B.Tech Civil with GATE score or UPSC ESE selection',
        entranceExam: 'GATE (CE) / UPSC ESE',
        careerOutcomes: ['Class 1 Gazetted Civil Engineer in CPWD / Indian Railways', 'Lead Structural Consultant'],
        source: 'UPSC / AICTE',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'AICTE Civil Engineering Guidelines', url: 'https://aicte-india.org', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 16. ELECTRICAL & ELECTRONICS ENGINEERING
  // ==========================================
  {
    id: 'b-tech-electrical',
    name: 'B.Tech in Electrical & Electronics Engineering',
    shortName: 'B.Tech EEE',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Core Engineering',
    aliases: ['Electrical Engineering', 'B.Tech EEE', 'BE Electrical', 'Power Systems Engineering'],
    description: 'A 4-year engineering program covering electrical power systems, power electronics, renewable solar/wind grids, electric drives, microcontrollers, and industrial automation.',
    duration: '4 Years (8 Semesters)',
    eligibility: {
      qualification: '10+2 with Physics, Mathematics, and Chemistry',
      streams: ['Science (PCM)'],
      minimumRequirements: ['Pass 10+2 with min 50% in PCM.']
    },
    admissionRequirements: ['JEE Main / State CETs.'],
    entranceExams: ['JEE Main', 'JEE Advanced', 'GATE (EE)'],
    subjects: [
      'Circuit Theory & Network Analysis',
      'Electrical Machines (Transformers, Motors, Alternators)',
      'Power Systems Generation & Transmission',
      'Power Electronics & Motor Drives',
      'Control Systems & PLC Automation',
      'Microprocessors & Embedded C',
      'Renewable Energy & Smart Grid Systems',
      'Electric Vehicle Powertrain Engineering'
    ],
    specializations: ['Smart Grids & Renewable Energy', 'EV Powertrain & Battery Systems', 'Industrial Automation & PLC/SCADA', 'Power Electronics', 'High Voltage Engineering'],
    skills: ['MATLAB & Simulink', 'Power System Simulation (ETAP)', 'PCB Design & Microcontroller Programming', 'Substation & Grid Protection', 'Industrial Automation (PLC/SCADA)'],
    careerFields: ['Power Utilities & Grid Corporations (PowerGrid, NTPC)', 'EV & Automotive Power Systems', 'Renewable Energy (Solar & Wind)', 'Heavy Electrical Manufacturing (Siemens, ABB, BHEL)', 'Semiconductor & Embedded Systems'],
    relatedJobs: ['Industrial Electrical & Automation Engineer', 'Research Scientist / Physicist'],
    jobRoles: [
      'Electrical Engineer Trainee (₹4.5 - ₹7.0 LPA)',
      'Power Systems & Grid Engineer (₹6.0 - ₹11.0 LPA)',
      'PSU Executive Engineer (via GATE: ₹12.0 - ₹18.0 LPA)',
      'EV Powertrain Specialist (₹10.0 - ₹18.0 LPA)'
    ],
    seniorRoles: ['Chief Electrical Engineer', 'Director of Grid Operations', 'VP of Energy Systems'],
    relatedStudies: ['M.Tech Power Systems', 'M.Tech Power Electronics', 'MBA in Energy Management'],
    higherStudies: [
      {
        program: 'M.Tech in Power Electronics & Drives (via GATE)',
        duration: '2 Years',
        eligibility: 'B.Tech EEE with valid GATE score',
        entranceExam: 'GATE (EE)',
        careerOutcomes: ['Senior Renewable Power Architect', 'Scientist at ISRO / PowerGrid'],
        source: 'IIT GATE Committee',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'AICTE Electrical Engineering Guidelines', url: 'https://aicte-india.org', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 17. BACHELOR OF BUSINESS ADMINISTRATION
  // ==========================================
  {
    id: 'bba',
    name: 'Bachelor of Business Administration',
    shortName: 'BBA',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Management & Business',
    aliases: ['BBA', 'BBA Honours', 'Bachelor of Business Administration', 'BMS', 'Bachelor of Management Studies'],
    description: 'A 3 to 4-year undergraduate management program imparting fundamental principles of business administration, corporate finance, marketing, human resources, and entrepreneurship.',
    duration: '3 to 4 Years (as per NEP 2020)',
    eligibility: {
      qualification: '10+2 in any stream (Commerce, Science, Arts)',
      streams: ['Any Stream'],
      minimumRequirements: ['Pass in 10+2 with minimum 50% aggregate marks.']
    },
    admissionRequirements: ['CUET-UG merit or university-level entrance tests (IPMAT, SET, NPAT).'],
    entranceExams: ['IPMAT (IIM Indore/Rohtak)', 'CUET-UG', 'SET (Symbiosis)', 'NPAT (NMIMS)'],
    subjects: [
      'Principles of Management & Organizational Behavior',
      'Business Economics & Financial Accounting',
      'Marketing Management & Consumer Behavior',
      'Corporate Finance & Working Capital Management',
      'Human Resource Management (HRM)',
      'Business Law & Corporate Governance',
      'Operations & Supply Chain Management',
      'Digital Marketing & Business Analytics'
    ],
    specializations: ['Finance & Banking', 'Marketing & Sales', 'Human Resources', 'International Business', 'Digital Business & E-Commerce', 'Entrepreneurship & Family Business'],
    skills: ['Business Communication & Negotiation', 'Financial Statement Interpretation', 'Digital Marketing & Social Media Strategy', 'Data Analytics with Excel', 'Project Leadership & Team Management'],
    careerFields: ['Corporate Management & Consulting', 'Banking & Financial Institutions', 'Marketing & Brand Management', 'Human Resources & Talent Acquisition', 'Venture Building & Startups'],
    relatedJobs: ['Product Manager (Tech & Growth)', 'Data Analyst & Business Intelligence Specialist', 'Corporate Financial Analyst (FP&A)'],
    jobRoles: [
      'Business Development Associate (₹4.0 - ₹7.0 LPA)',
      'Marketing Coordinator (₹4.2 - ₹6.8 LPA)',
      'Junior Financial / Operations Analyst (₹4.5 - ₹8.0 LPA)',
      'Assistant Product / Brand Manager (₹6.0 - ₹11.0 LPA)'
    ],
    seniorRoles: ['Marketing Director', 'General Manager', 'Chief Executive Officer (CEO)'],
    relatedStudies: ['Master of Business Administration (MBA)', 'Master of International Business', 'CFA / Digital Marketing Specializations'],
    higherStudies: [
      {
        program: 'Master of Business Administration (MBA via CAT / XAT / GMAT)',
        duration: '2 Years',
        eligibility: 'Graduation with min 50% marks',
        entranceExam: 'CAT / XAT / GMAT',
        careerOutcomes: ['Management Consultant at McKinsey/BCG', 'Investment Banker', 'Product Director'],
        source: 'IIM CAT Committee',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'UGC BBA Framework', url: 'https://ugc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 18. BACHELOR OF COMPUTER APPLICATIONS
  // ==========================================
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications',
    shortName: 'BCA',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Computer Applications & IT',
    aliases: ['BCA', 'Bachelor of Computer Applications', 'BCA Honours', 'Computer Applications Degree'],
    description: 'A 3-year undergraduate degree program providing comprehensive practical training in software application development, database management, web systems, and programming languages.',
    duration: '3 Years (6 Semesters)',
    eligibility: {
      qualification: '10+2 in any stream (Mathematics/Computer Science at 10+2 preferred by some universities)',
      streams: ['Science', 'Commerce with Math', 'Arts with Math'],
      minimumRequirements: ['Pass in 10+2 with minimum 45% - 50% aggregate.']
    },
    admissionRequirements: ['CUET-UG or merit-based university admission.'],
    entranceExams: ['CUET-UG', 'IPU CET', 'Symbiosis SET'],
    subjects: [
      'Programming in C / C++ / Java',
      'Data Structures & Algorithms',
      'Relational Database Management Systems (RDBMS & SQL)',
      'Web Technologies (HTML, CSS, JavaScript, React)',
      'Operating Systems & Linux Administration',
      'Computer Networks & Cyber Security Basics',
      'Python Programming & Data Analytics',
      'Software Engineering & Cloud Computing'
    ],
    specializations: ['Cloud Computing & DevOps', 'Data Analytics & AI', 'Full Stack Web Development', 'Mobile Application Development (Android/iOS)', 'Cybersecurity'],
    skills: ['JavaScript, Python & Java Programming', 'SQL & Database Architecture', 'Web Frontend & Backend Development', 'Git Version Control', 'Software Testing & Deployment'],
    careerFields: ['IT Services & Software Consulting (TCS, Wipro, Infosys)', 'Software Product Companies & Startups', 'E-Commerce & Digital Platforms', 'Web Design & Development Studios', 'Public Sector IT Departments'],
    relatedJobs: ['Full Stack Web Developer', 'Software Development Engineer (SDE)', 'Data Analyst & Business Intelligence Specialist'],
    jobRoles: [
      'Junior Software Developer (₹3.8 - ₹6.5 LPA)',
      'Web Application Developer (₹4.2 - ₹7.5 LPA)',
      'Database Administrator Trainee (₹4.0 - ₹6.8 LPA)',
      'Full Stack Software Engineer (₹6.0 - ₹12.0 LPA)'
    ],
    seniorRoles: ['Lead Software Architect', 'IT Engineering Manager', 'Chief Technology Officer (CTO)'],
    relatedStudies: ['Master of Computer Applications (MCA)', 'M.Sc Computer Science / Data Science', 'MBA in Information Technology'],
    higherStudies: [
      {
        program: 'Master of Computer Applications (MCA via NIMCET / CUET-PG)',
        duration: '2 Years',
        eligibility: 'BCA or B.Sc with Mathematics',
        entranceExam: 'NIMCET (for NITs) / CUET-PG',
        careerOutcomes: ['Senior Software Development Engineer (SDE)', 'Cloud Infrastructure Architect'],
        source: 'NIMCET Committee / UGC',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'UGC Computer Applications Guidelines', url: 'https://ugc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 19. BACHELOR OF PHYSIOTHERAPY
  // ==========================================
  {
    id: 'bpt',
    name: 'Bachelor of Physiotherapy',
    shortName: 'BPT',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Healthcare & Allied Health Sciences',
    aliases: ['BPT', 'Bachelor of Physiotherapy', 'Physiotherapy Degree', 'Physical Therapy'],
    description: 'A 4.5-year professional clinical healthcare degree (4 years academic + 6 months mandatory internship) training students in physical rehabilitation, biomechanics, kinesiology, and exercise therapy.',
    duration: '4.5 Years (including 6-month internship)',
    eligibility: {
      qualification: '10+2 with Physics, Chemistry, and Biology (PCB)',
      streams: ['Science (PCB)'],
      minimumRequirements: ['Pass in 10+2 with minimum 50% aggregate in PCB (45% for reserved categories).']
    },
    admissionRequirements: ['NEET-UG or state/university-level paramedical entrance examination.'],
    entranceExams: ['NEET-UG (in select states)', 'State Paramedical CETs', 'IPU CET Paramedical'],
    subjects: [
      'Human Anatomy & Physiology',
      'Biomechanics & Kinesiology',
      'Pathology & Microbiology',
      'Pharmacology for Physiotherapy',
      'Exercise Therapy & Therapeutic Modalities',
      'Electrotherapy (Ultrasound, TENS, IFT)',
      'Orthopedic & Musculoskeletal Rehabilitation',
      'Neurological & Sports Physical Therapy',
      'Cardiopulmonary & ICU Physiotherapy'
    ],
    specializations: ['Sports Physiotherapy', 'Neurological Rehabilitation (Stroke/Spinal)', 'Orthopedic Physical Therapy', 'Cardiorespiratory Physiotherapy', 'Pediatric & Geriatric Care'],
    skills: ['Manual Therapy & Joint Mobilization', 'Therapeutic Exercise Prescription', 'Electrotherapy Equipment Handling', 'Post-Surgical Patient Rehabilitation', 'Postural & Gait Analysis'],
    careerFields: ['Multi-Specialty & Orthopedic Hospitals', 'Sports Teams, Stadiums & Fitness Centers', 'Specialized Rehabilitation Clinics', 'Community Health Centers', 'Independent Private Physiotherapy Practice'],
    relatedJobs: ['Physiotherapist & Rehabilitation Specialist', 'Resident Medical Officer (RMO)'],
    jobRoles: [
      'Clinical Physiotherapist (₹3.8 - ₹6.5 LPA)',
      'Hospital ICU Physical Therapist (₹4.5 - ₹8.0 LPA)',
      'Sports Team Physiotherapist (₹6.0 - ₹12.0 LPA)',
      'Private Clinic Consultant (₹8.0 - ₹16.0 LPA)'
    ],
    seniorRoles: ['Head of Department (Physiotherapy)', 'Chief Sports Medical Officer', 'Rehabilitation Center Director'],
    relatedStudies: ['Master of Physiotherapy (MPT - 2 Years)', 'Fellowship in Sports Rehabilitation', 'Hospital Administration (MHA)'],
    higherStudies: [
      {
        program: 'Master of Physiotherapy (MPT)',
        duration: '2 Years',
        eligibility: 'BPT with 50% marks and completed internship',
        entranceExam: 'University PG Entrance',
        careerOutcomes: ['Consultant Specialist Physiotherapist', 'Associate Professor in Paramedical Sciences'],
        source: 'Indian Association of Physiotherapists (IAP)',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'National Commission for Allied and Healthcare Professions', url: 'https://ncahp.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 20. BACHELOR OF DESIGN
  // ==========================================
  {
    id: 'b-des',
    name: 'Bachelor of Design',
    shortName: 'B.Des',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Architecture & Design',
    aliases: ['B.Des', 'BDes', 'Bachelor of Design', 'UI/UX Design Degree', 'Product Design Degree'],
    description: 'A 4-year premier professional degree focusing on digital product design, user experience (UI/UX), interaction design, industrial product aesthetics, and creative visual communication.',
    duration: '4 Years (8 Semesters)',
    eligibility: {
      qualification: '10+2 in any discipline (Science, Commerce, Arts)',
      streams: ['Any Stream'],
      minimumRequirements: ['Pass in 10+2 from a recognized board.']
    },
    admissionRequirements: ['Performance in national design entrance tests (UCEED, NID DAT, NIFT).'],
    entranceExams: ['UCEED (IIT Bombay)', 'NID DAT (National Institute of Design)', 'NIFT Entrance', 'SEAT'],
    subjects: [
      'Design Fundamentals, Color Theory & Form Studies',
      'User Research, Human-Centered Design & Empathy Mapping',
      'Information Architecture & Wireframing',
      'UI/UX Design & Scalable Design Systems (Figma)',
      'Interactive Prototyping & Micro-interactions',
      'Typography, Graphic Design & Visual Branding',
      'Design Psychology & Cognitive Usability',
      'Design Thinking & Business Strategy'
    ],
    specializations: ['User Experience (UX) & Interaction Design', 'Industrial & Product Design', 'Visual Communication & Graphic Design', 'Animation & Game Design', 'Fashion & Textile Design'],
    skills: ['Figma Mastery & Interactive Prototyping', 'User Research & Usability Testing', 'Design Systems & Component Libraries', 'Adobe Creative Cloud (Illustrator, Photoshop)', 'Micro-interactions & Motion (Lottie)'],
    careerFields: ['Product Tech Companies & Unicorns (CRED, Swiggy, Zomato)', 'Global Design Agencies & Studios', 'Consumer Electronics & Hardware Brands', 'Mobile App & SaaS Development', 'Automotive Interior Design'],
    relatedJobs: ['UI/UX Product Designer', 'Architectural Designer & Urban Planner'],
    jobRoles: [
      'Associate Product Designer (₹6.0 - ₹10.0 LPA)',
      'UI/UX Designer (₹7.5 - ₹14.0 LPA)',
      'Design Systems Specialist (₹9.0 - ₹16.0 LPA)',
      'Senior UX / Product Designer (₹15.0 - ₹28.0 LPA)'
    ],
    seniorRoles: ['Lead Product Designer', 'Head of Design', 'VP of User Experience'],
    relatedStudies: ['Master of Design (M.Des via CEED)', 'Human-Computer Interaction (HCI)', 'MBA in Design Management'],
    higherStudies: [
      {
        program: 'Master of Design (M.Des at IITs / NID via CEED)',
        duration: '2 Years',
        eligibility: 'Degree in Design / Engineering / Architecture',
        entranceExam: 'CEED (Common Entrance Examination for Design)',
        careerOutcomes: ['Design Director', 'Chief Experience Officer (CXO)'],
        source: 'IIT Bombay CEED Committee',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'National Institute of Design (NID) Curricula', url: 'https://nid.edu', sourceType: 'OFFICIAL', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 21. B.SC IN DATA SCIENCE & AI
  // ==========================================
  {
    id: 'b-sc-data-science',
    name: 'B.Sc in Data Science & Artificial Intelligence',
    shortName: 'B.Sc Data Science',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Pure & Applied Sciences',
    aliases: ['B.Sc Data Science', 'BSc Data Science & AI', 'Bachelor of Science in Data Science'],
    description: 'A 3 to 4-year modern scientific undergraduate degree blending mathematical statistics, computational algorithms, predictive modeling, machine learning, and data visualization.',
    duration: '3 to 4 Years (as per NEP 2020)',
    eligibility: {
      qualification: '10+2 with Mathematics or Statistics as a core subject',
      streams: ['Science (PCM / PCMB)', 'Commerce with Mathematics'],
      minimumRequirements: ['Pass in 10+2 with minimum 55% aggregate.']
    },
    admissionRequirements: ['CUET-UG merit or premier institute direct entrance (e.g. IIT Madras BS Data Science).'],
    entranceExams: ['CUET-UG', 'IIT Madras BS Qualifier', 'CMI / ISI Entrance'],
    subjects: [
      'Calculus, Linear Algebra & Discrete Mathematics',
      'Probability Distributions & Inferential Statistics',
      'Python Programming & Data Wrangling (Pandas, NumPy)',
      'Database Systems & Advanced SQL',
      'Supervised & Unsupervised Machine Learning',
      'Big Data Processing & Cloud Analytics',
      'Data Storytelling & Visualization (Power BI / Tableau)',
      'Deep Learning & Natural Language Processing'
    ],
    specializations: ['Machine Learning & Deep Learning', 'Financial & Risk Analytics', 'Healthcare Data Science', 'Business Intelligence'],
    skills: ['Python, Pandas, NumPy & Scikit-Learn', 'Relational Databases & SQL', 'Exploratory Data Analysis (EDA)', 'Statistical Hypothesis Testing', 'Data Dashboarding in Power BI'],
    careerFields: ['Data Science Consultancies (Mu Sigma, Fractal, Tiger Analytics)', 'E-Commerce & Digital Marketplaces', 'Banking & Financial Risk Departments', 'Healthcare Analytics & Biotech Research', 'Tech Startups & SaaS'],
    relatedJobs: ['Data Analyst & Business Intelligence Specialist', 'AI & Machine Learning Engineer', 'Quantitative Analyst (Quant)'],
    jobRoles: [
      'Junior Data Analyst (₹4.5 - ₹7.5 LPA)',
      'Associate Data Scientist (₹6.0 - ₹11.0 LPA)',
      'Business Intelligence Developer (₹5.5 - ₹9.5 LPA)',
      'Data Engineer (₹7.0 - ₹13.0 LPA)'
    ],
    seniorRoles: ['Principal Data Scientist', 'Head of Business Analytics', 'Chief Data Officer (CDO)'],
    relatedStudies: ['M.Sc in Data Science & Machine Learning', 'MCA', 'MBA in Business Analytics'],
    higherStudies: [
      {
        program: 'M.Sc in Data Science / MS in Analytics (via GATE / CUET-PG)',
        duration: '2 Years',
        eligibility: 'B.Sc in Math / Stats / CS / Data Science with 55%',
        entranceExam: 'GATE (DA) / CUET-PG',
        careerOutcomes: ['Senior Quantitative Researcher', 'Lead Data Scientist'],
        source: 'UGC / IIT Madras',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'UGC Emerging Technologies Data Science Curricula', url: 'https://ugc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 22. BA IN ECONOMICS (HONOURS)
  // ==========================================
  {
    id: 'ba-economics',
    name: 'BA in Economics (Honours)',
    shortName: 'BA Economics (Hons)',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Humanities & Social Sciences',
    aliases: ['BA Economics', 'BA Eco Hons', 'Bachelor of Arts in Economics', 'Economics Honours'],
    description: 'A prestigious 3 to 4-year degree focusing on microeconomics, macroeconomics, econometrics, public finance, monetary policy, and quantitative policy modeling.',
    duration: '3 to 4 Years (as per NEP 2020)',
    eligibility: {
      qualification: '10+2 in any stream (Mathematics at 10+2 compulsory for Honours in top universities like DU, St. Stephen’s, Ashoka)',
      streams: ['Commerce', 'Science', 'Arts with Mathematics'],
      minimumRequirements: ['Pass in 10+2 with minimum 55% aggregate and pass in Mathematics.']
    },
    admissionRequirements: ['CUET-UG merit score for central universities (DU, JNU, BHU).'],
    entranceExams: ['CUET-UG'],
    subjects: [
      'Microeconomic Theory & Applications',
      'Macroeconomic Policy & Open Economy',
      'Mathematical Methods for Economics',
      'Introductory & Advanced Econometrics',
      'Development Economics & Growth Models',
      'Public Economics & Fiscal Policy',
      'Money, Banking & Financial Markets',
      'International Trade & Balance of Payments'
    ],
    specializations: ['Econometrics & Quantitative Modeling', 'Financial Economics & Banking', 'Public Policy & Development', 'Environmental Economics', 'Behavioral Economics'],
    skills: ['Econometric Analysis (Stata / R)', 'Macroeconomic Forecasting', 'Financial Modeling in Excel', 'Policy Impact Evaluation', 'Quantitative Reasoning & Analytical Writing'],
    careerFields: ['Economic Consulting & Research Think Tanks', 'Investment Banking & Capital Markets (Equity Research)', 'Reserve Bank of India (RBI Grade B)', 'Public Policy & Government Administration (IES / UPSC)', 'Multilateral Bodies (World Bank, IMF, UN)'],
    relatedJobs: ['RBI Grade B Officer (Central Banking & Policy)', 'Quantitative Analyst (Quant)', 'IAS Officer (Indian Administrative Service)'],
    jobRoles: [
      'Economic Research Analyst (₹5.0 - ₹9.0 LPA)',
      'Equity / Financial Analyst (₹6.0 - ₹12.0 LPA)',
      'Policy Analyst (Think Tanks / NITI Aayog) (₹5.5 - ₹10.0 LPA)',
      'RBI Grade B Officer (via exam: ₹14.0 - ₹22.0 LPA)'
    ],
    seniorRoles: ['Chief Economist', 'Economic Advisor to Government', 'Partner at Global Strategy Firm'],
    relatedStudies: ['M.A in Economics (DSE / JNU / ISI)', 'Indian Economic Service (IES via UPSC)', 'MBA Finance'],
    higherStudies: [
      {
        program: 'M.A Economics at Delhi School of Economics (DSE) / ISI / JNU (via CUET-PG)',
        duration: '2 Years',
        eligibility: 'Graduation in Economics / Math / Engineering with 55%',
        entranceExam: 'CUET-PG / ISI Admission Test',
        careerOutcomes: ['Indian Economic Service (IES) Officer', 'Global Investment Bank Chief Economist'],
        source: 'Delhi School of Economics / UGC',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'UGC Economics Honours Model Curriculum', url: 'https://ugc.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 23. BA IN PSYCHOLOGY
  // ==========================================
  {
    id: 'ba-psychology',
    name: 'BA in Psychology & Behavioral Sciences',
    shortName: 'BA Psychology',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Humanities & Social Sciences',
    aliases: ['BA Psychology', 'BSc Psychology', 'Bachelor of Arts in Psychology', 'Psychology Degree'],
    description: 'A 3 to 4-year undergraduate degree examining human cognition, perception, emotional behavior, personality theories, abnormal psychology, and counseling interventions.',
    duration: '3 to 4 Years (as per NEP 2020)',
    eligibility: {
      qualification: '10+2 in any stream (Arts, Science, Commerce)',
      streams: ['Any Stream'],
      minimumRequirements: ['Pass in 10+2 with minimum 50% aggregate marks.']
    },
    admissionRequirements: ['CUET-UG merit or university-specific entrance examination.'],
    entranceExams: ['CUET-UG'],
    subjects: [
      'Introduction to Psychology & Cognitive Processes',
      'Biopsychology & Neuroanatomy',
      'Psychological Research Methods & Statistics (SPSS)',
      'Developmental Psychology Across Lifespan',
      'Social Psychology & Group Dynamics',
      'Abnormal Psychology & Psychopathology',
      'Counseling Psychology & Therapeutic Techniques',
      'Organizational Behavior & Industrial Psychology'
    ],
    specializations: ['Clinical Psychology', 'Counseling & Mental Wellness', 'Industrial & Organizational (HR) Psychology', 'Child & Neuropsychology', 'Forensic Psychology'],
    skills: ['Active Listening & Clinical Empathy', 'Psychometric Assessment Administration', 'Statistical Data Analysis (SPSS)', 'Behavioral Interviewing', 'Counseling Session Facilitation'],
    careerFields: ['Hospitals & Mental Health Clinics', 'Corporate HR & Talent Management', 'Schools & Universities (Student Counselors)', 'Non-Profit Organizations & Rehabilitation Centers', 'User Experience (UX) Research'],
    relatedJobs: ['Clinical Psychologist & Mental Health Counselor', 'University Assistant Professor / Lecturer (UGC NET)'],
    jobRoles: [
      'Counseling Associate (₹3.5 - ₹5.5 LPA)',
      'Human Resources & Talent Associate (₹4.0 - ₹6.5 LPA)',
      'Mental Health Support Specialist (₹4.2 - ₹7.0 LPA)',
      'UX Researcher (Digital Product UX) (₹6.0 - ₹11.0 LPA)'
    ],
    seniorRoles: ['Licensed Clinical Psychologist (RCI)', 'Chief Human Resources Officer (CHRO)', 'Director of Mental Health Services'],
    relatedStudies: ['M.A / M.Sc Psychology', 'M.Phil / Professional Diploma in Clinical Psychology (RCI)', 'MBA in Human Resource Management'],
    higherStudies: [
      {
        program: 'M.A / M.Sc Clinical Psychology + RCI Certification',
        duration: '2 Years M.A + 2 Years M.Phil',
        eligibility: 'BA/B.Sc Psychology with 55% marks',
        entranceExam: 'CUET-PG / NIMHANS Entrance',
        careerOutcomes: ['RCI-Registered Clinical Psychologist in Tertiary Hospitals', 'Private Mental Health Consultant'],
        source: 'Rehabilitation Council of India (RCI)',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'Rehabilitation Council of India (RCI) Standards', url: 'https://rehabcouncil.nic.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  },

  // ==========================================
  // 24. BACHELOR OF HOTEL MANAGEMENT
  // ==========================================
  {
    id: 'bhm-hotel-management',
    name: 'Bachelor of Hotel Management & Catering Technology',
    shortName: 'BHM',
    type: 'STUDY',
    educationLevel: 'Undergraduate',
    category: 'Hospitality, Aviation & Tourism',
    aliases: ['BHM', 'BHMCT', 'Hotel Management', 'Bachelor of Hospitality Management'],
    description: 'A 3 to 4-year professional hospitality program providing intensive operational training in food & beverage production, front office management, accommodation operations, and hotel revenue strategy.',
    duration: '3 to 4 Years',
    eligibility: {
      qualification: '10+2 in any stream with English as a compulsory subject',
      streams: ['Any Stream'],
      minimumRequirements: ['Pass in 10+2 with minimum 45% - 50% aggregate.']
    },
    admissionRequirements: ['NCHMCT JEE national entrance examination for Institute of Hotel Management (IHM) campuses.'],
    entranceExams: ['NCHMCT JEE (NTA)', 'State Hotel Management CETs'],
    subjects: [
      'Culinary Arts & Food Production Principles',
      'Food & Beverage Service Operations',
      'Front Office Management & Reservations Systems',
      'Housekeeping Operations & Interior Aesthetics',
      'Hospitality Accounting & Cost Control',
      'Hotel Law & Food Safety Standards (FSSAI)',
      'Hospitality Marketing & Revenue Management',
      'Event & Banquet Management'
    ],
    specializations: ['Culinary Arts & Chef Apprenticeship', 'Food & Beverage Management', 'Front Office & Guest Relations', 'Hotel Revenue & Yield Management', 'Luxury Cruise Line & Airline Hospitality'],
    skills: ['Guest Relationship Management & Etiquette', 'Property Management Systems (Opera PMS)', 'Food & Beverage Costing', 'Banquet & Event Planning', 'Culinary Cooking Techniques'],
    careerFields: ['5-Star Luxury Hotels & Resorts (Taj, Oberoi, Marriott, ITC)', 'Luxury Cruise Lines (Royal Caribbean, Carnival)', 'Aviation Cabin Crew & Airline Catering', 'High-End Restaurant Chains & Cloud Kitchens', 'Corporate Facility & Event Management'],
    relatedJobs: ['Customer Operations & Business Support Associate', 'Product Manager (Tech & Growth)'],
    jobRoles: [
      'Hotel Management Trainee (MT) (₹3.8 - ₹6.0 LPA)',
      'Front Office Executive (₹3.6 - ₹5.5 LPA)',
      'Food & Beverage Supervisor / Sous Chef (₹4.5 - ₹8.0 LPA)',
      'Hotel Assistant General Manager (₹8.0 - ₹15.0 LPA)'
    ],
    seniorRoles: ['General Manager (5-Star Luxury Property)', 'Corporate Director of Hospitality Operations', 'Celebrity Executive Chef'],
    relatedStudies: ['Master in Hospitality Administration (MHA)', 'MBA in Hospitality & Tourism', 'Sommelier & Advanced Culinary Diplomas (Switzerland/France)'],
    higherStudies: [
      {
        program: 'Master in Hospitality Administration (MHA at NCHMCT)',
        duration: '2 Years',
        eligibility: 'BHM with 50% marks',
        entranceExam: 'NCHMCT PG Entrance',
        careerOutcomes: ['Hotel General Manager', 'Hospitality Business Consultant'],
        source: 'National Council for Hotel Management and Catering Technology',
        lastVerified: 'September 2026'
      }
    ],
    sources: [{ title: 'NCHMCT Statutory Standards', url: 'https://nchm.gov.in', sourceType: 'GOVERNMENT', lastVerified: 'September 2026' }],
    lastVerified: 'September 2026'
  }
];

