/**
 * CareerCompass AI - Development & Sample Seed Data
 * Notice: Clearly labeled as Development / Sample Data for testing and demonstration.
 */

export const seedCareerFields = [
  {
    name: 'Accounting, Banking & Corporate Finance',
    slug: 'accounting-finance',
    description: 'Financial reporting, investment banking, statutory auditing, taxation, and treasury operations.',
    icon: 'Landmark',
    growthOutlook: 'Steady Growth (+9% annually)',
    highDemandScore: 88,
    topIndustries: ['Banking', 'Fintech', 'Audit Firms', 'Corporate Treasuries']
  },
  {
    name: 'Computer Science, Software & AI Systems',
    slug: 'computer-science-software',
    description: 'Software development, cloud infrastructure, AI/ML engineering, and cybersecurity.',
    icon: 'Cpu',
    growthOutlook: 'Rapid Expansion (+22% annually)',
    highDemandScore: 96,
    topIndustries: ['Software as a Service', 'Cloud Infrastructure', 'Enterprise Tech', 'AI Labs']
  },
  {
    name: 'Healthcare, Clinical Medicine & Surgery',
    slug: 'healthcare-medicine',
    description: 'Diagnostic medicine, patient care, surgical intervention, hospital administration, and public health.',
    icon: 'Stethoscope',
    growthOutlook: 'Essential Demand (+15% annually)',
    highDemandScore: 98,
    topIndustries: ['Hospitals', 'Super-specialty Clinics', 'Health Research Institutes']
  },
  {
    name: 'Pharmaceutical Sciences & Drug Development',
    slug: 'pharmaceutical-sciences',
    description: 'Pharmacology, drug formulation, clinical research trials, and regulatory quality assurance.',
    icon: 'Pill',
    growthOutlook: 'High Expansion (+12% annually)',
    highDemandScore: 89,
    topIndustries: ['Pharmaceutical Giants', 'Biotech Labs', 'Clinical Research Organizations']
  },
  {
    name: 'Mechanical & Industrial Manufacturing',
    slug: 'mechanical-manufacturing',
    description: 'Thermal systems, robotics, CNC manufacturing, automotive engineering, and plant operations.',
    icon: 'Cog',
    growthOutlook: 'Moderate Growth (+8% annually)',
    highDemandScore: 82,
    topIndustries: ['Automotive', 'Aerospace', 'Heavy Machinery', 'Energy Systems']
  },
  {
    name: 'Electrical Infrastructure & Skilled Trades',
    slug: 'electrical-trades',
    description: 'Power distribution, industrial wiring, panel maintenance, renewable solar grid setup, and automation.',
    icon: 'Zap',
    growthOutlook: 'Strong Vocational Demand (+14% annually)',
    highDemandScore: 87,
    topIndustries: ['Power Utilities', 'Construction', 'Renewable Energy', 'Facility Engineering']
  },
  {
    name: 'Law, Judiciary & Corporate Compliance',
    slug: 'law-compliance',
    description: 'Litigation, corporate counsel, intellectual property, arbitration, and statutory compliance.',
    icon: 'Scale',
    growthOutlook: 'Consistent Demand (+10% annually)',
    highDemandScore: 90,
    topIndustries: ['Law Firms', 'Corporate Legal Teams', 'Judicial Courts', 'Arbitration Panels']
  },
  {
    name: 'Behavioral Psychology & Mental Health',
    slug: 'psychology-mental-health',
    description: 'Clinical therapy, organizational psychology, neuropsychology, school counseling, and rehab.',
    icon: 'Brain',
    growthOutlook: 'Very High Growth (+20% annually)',
    highDemandScore: 92,
    topIndustries: ['Mental Health Clinics', 'Corporate HR', 'Educational Institutions', 'NGOs']
  },
  {
    name: 'Education, Pedagogy & School Leadership',
    slug: 'education-teaching',
    description: 'Classroom teaching, curriculum design, educational administration, ed-tech instruction, and research.',
    icon: 'GraduationCap',
    growthOutlook: 'Continuous Requirement (+8% annually)',
    highDemandScore: 85,
    topIndustries: ['K-12 Schools', 'Higher Education', 'EdTech Companies', 'Government Boards']
  },
  {
    name: 'Pure Scientific Research & Physics',
    slug: 'physics-scientific-research',
    description: 'Quantum physics, astrophysics, materials science, semiconductor research, and computational modeling.',
    icon: 'Atom',
    growthOutlook: 'R&D Driven (+11% annually)',
    highDemandScore: 86,
    topIndustries: ['National Laboratories', 'Aerospace Agencies', 'Semiconductor Foundries', 'Universities']
  }
];

export const seedSkills = [
  // Accounting & Finance
  { name: 'Financial Modeling', slug: 'financial-modeling', category: 'Domain Knowledge', demandLevel: 'Crucial' },
  { name: 'Advanced Excel', slug: 'advanced-excel', category: 'Tool / Software', demandLevel: 'Crucial' },
  { name: 'Statutory Auditing', slug: 'statutory-auditing', category: 'Regulatory & Compliance', demandLevel: 'High' },
  { name: 'Power BI & Tableau', slug: 'power-bi-tableau', category: 'Tool / Software', demandLevel: 'High' },
  { name: 'Corporate Taxation & GST', slug: 'corporate-taxation', category: 'Domain Knowledge', demandLevel: 'High' },

  // Computer Science & IT
  { name: 'Data Structures & Algorithms', slug: 'dsa', category: 'Technical', demandLevel: 'Crucial' },
  { name: 'Full Stack Web Development', slug: 'full-stack-web', category: 'Technical', demandLevel: 'Crucial' },
  { name: 'SQL & Database Optimization', slug: 'sql-db-optimization', category: 'Technical', demandLevel: 'Crucial' },
  { name: 'Cloud Computing & DevOps', slug: 'cloud-devops', category: 'Technical', demandLevel: 'Very High' },
  { name: 'REST APIs & System Design', slug: 'rest-apis-system-design', category: 'Technical', demandLevel: 'Crucial' },

  // Healthcare & Medicine
  { name: 'Clinical Patient Diagnosis', slug: 'clinical-diagnosis', category: 'Domain Knowledge', demandLevel: 'Crucial' },
  { name: 'Emergency Triage & Trauma Care', slug: 'emergency-triage', category: 'Domain Knowledge', demandLevel: 'Crucial' },
  { name: 'Medical Pharmacology Knowledge', slug: 'medical-pharmacology', category: 'Domain Knowledge', demandLevel: 'Crucial' },
  { name: 'Patient Empathy & Bedside Manners', slug: 'patient-empathy', category: 'Soft Skill / Behavioral', demandLevel: 'Crucial' },

  // Pharmacy
  { name: 'Drug Formulation & Dosage Design', slug: 'drug-formulation', category: 'Domain Knowledge', demandLevel: 'Crucial' },
  { name: 'HPLC & Analytical Chromatography', slug: 'hplc-chromatography', category: 'Tool / Software', demandLevel: 'High' },
  { name: 'Good Manufacturing Practices (GMP)', slug: 'gmp-compliance', category: 'Regulatory & Compliance', demandLevel: 'Crucial' },

  // Electrical & ITI
  { name: 'Industrial Wiring & Single-Line Diagrams', slug: 'industrial-wiring', category: 'Technical', demandLevel: 'Crucial' },
  { name: 'PLC & SCADA Basics', slug: 'plc-scada-basics', category: 'Tool / Software', demandLevel: 'High' },
  { name: 'Electrical Safety & OSHA Standards', slug: 'electrical-safety', category: 'Regulatory & Compliance', demandLevel: 'Crucial' },

  // Mechanical
  { name: 'AutoCAD & SolidWorks 3D CAD', slug: 'autocad-solidworks', category: 'Tool / Software', demandLevel: 'Crucial' },
  { name: 'Thermodynamics & Fluid Dynamics', slug: 'thermodynamics-fluids', category: 'Domain Knowledge', demandLevel: 'High' },
  { name: 'CNC Machine Programming', slug: 'cnc-programming', category: 'Technical', demandLevel: 'High' },

  // Law
  { name: 'Legal Drafting & Case Analysis', slug: 'legal-drafting', category: 'Domain Knowledge', demandLevel: 'Crucial' },
  { name: 'Constitutional & Commercial Law', slug: 'commercial-law', category: 'Domain Knowledge', demandLevel: 'High' },
  { name: 'Courtroom Advocacy & Oral Argument', slug: 'courtroom-advocacy', category: 'Soft Skill / Behavioral', demandLevel: 'Crucial' },

  // Psychology
  { name: 'Psychological Assessment & Psychometrics', slug: 'psychological-assessment', category: 'Domain Knowledge', demandLevel: 'Crucial' },
  { name: 'Cognitive Behavioral Therapy (CBT) Frameworks', slug: 'cbt-frameworks', category: 'Domain Knowledge', demandLevel: 'High' },
  { name: 'Active Listening & Counseling Ethics', slug: 'active-listening-ethics', category: 'Soft Skill / Behavioral', demandLevel: 'Crucial' },

  // Education
  { name: 'Curriculum & Lesson Planning', slug: 'lesson-planning', category: 'Domain Knowledge', demandLevel: 'Crucial' },
  { name: 'Classroom Management & Engagement', slug: 'classroom-management', category: 'Soft Skill / Behavioral', demandLevel: 'Crucial' },
  { name: 'Educational Technology & Digital Learning', slug: 'edtech-tools', category: 'Tool / Software', demandLevel: 'High' },

  // Physics
  { name: 'Computational Physics & Python/MATLAB', slug: 'computational-physics', category: 'Technical', demandLevel: 'Crucial' },
  { name: 'Quantum Mechanics & Mathematical Modeling', slug: 'quantum-modeling', category: 'Analytical', demandLevel: 'Crucial' },
  { name: 'Scientific Paper Writing & Peer Review', slug: 'scientific-publishing', category: 'Soft Skill / Behavioral', demandLevel: 'High' }
];

export const seedCertifications = [
  { title: 'Chartered Accountant (CA) / CPA', slug: 'ca-cpa', issuer: 'ICAI / AICPA', costTier: 'Moderate ($100-$500)', difficulty: 'Professional' },
  { title: 'Chartered Financial Analyst (CFA Level 1)', slug: 'cfa-level-1', issuer: 'CFA Institute', costTier: 'Premium ($500+)', difficulty: 'Advanced' },
  { title: 'AWS Certified Solutions Architect', slug: 'aws-solutions-architect', issuer: 'Amazon Web Services', costTier: 'Moderate ($100-$500)', difficulty: 'Intermediate' },
  { title: 'Full Stack Open Certification', slug: 'full-stack-open', issuer: 'University of Helsinki', costTier: 'Free', difficulty: 'Intermediate' },
  { title: 'USMLE Step 1 / NEXT License Exam', slug: 'usmle-next', issuer: 'National Medical Commission', costTier: 'Premium ($500+)', difficulty: 'Professional' },
  { title: 'Certified Pharmacist Registration', slug: 'pharmacy-council-registration', issuer: 'Pharmacy Council of India', costTier: 'Low Cost (<$100)', difficulty: 'Professional' },
  { title: 'Certified Industrial Electrician (Grade A License)', slug: 'grade-a-electrician-license', issuer: 'State Electrical Inspectorate', costTier: 'Low Cost (<$100)', difficulty: 'Intermediate' },
  { title: 'Certified SolidWorks Associate (CSWA)', slug: 'cswa-solidworks', issuer: 'Dassault Systèmes', costTier: 'Low Cost (<$100)', difficulty: 'Beginner' },
  { title: 'All India Bar Examination (AIBE)', slug: 'aibe-license', issuer: 'Bar Council of India', costTier: 'Low Cost (<$100)', difficulty: 'Professional' },
  { title: 'RCI Clinical Psychologist License', slug: 'rci-psychologist-license', issuer: 'Rehabilitation Council of India', costTier: 'Moderate ($100-$500)', difficulty: 'Professional' },
  { title: 'Central Teacher Eligibility Test (CTET)', slug: 'ctet-certification', issuer: 'CBSE', costTier: 'Low Cost (<$100)', difficulty: 'Intermediate' },
  { title: 'CSIR UGC NET (Physical Sciences)', slug: 'csir-net-physics', issuer: 'National Testing Agency', costTier: 'Low Cost (<$100)', difficulty: 'Advanced' }
];

export const seedStudyPrograms = [
  // After 10th
  { name: '11th & 12th Science (PCM/PCB)', slug: '11th-12th-science', degreeLevel: 'Higher Secondary (12th)', duration: '2 Years', field: 'Science' },
  { name: '11th & 12th Commerce', slug: '11th-12th-commerce', degreeLevel: 'Higher Secondary (12th)', duration: '2 Years', field: 'Commerce' },
  { name: '11th & 12th Arts & Humanities', slug: '11th-12th-arts', degreeLevel: 'Higher Secondary (12th)', duration: '2 Years', field: 'Arts' },
  { name: 'Polytechnic Diploma in Engineering', slug: 'polytechnic-diploma', degreeLevel: 'Diploma', duration: '3 Years', field: 'Engineering' },
  { name: 'Industrial Training Institute (ITI) Trade Certification', slug: 'iti-trade-program', degreeLevel: 'Certificate', duration: '1-2 Years', field: 'Vocational' },

  // After 12th Science
  { name: 'Bachelor of Technology in Computer Science (B.Tech CSE)', slug: 'btech-cse-program', degreeLevel: 'Undergraduate', duration: '4 Years', field: 'Computer Science' },
  { name: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)', slug: 'mbbs-program', degreeLevel: 'Professional Degree', duration: '5.5 Years', field: 'Medicine' },
  { name: 'Bachelor of Pharmacy (B.Pharm)', slug: 'bpharm-program', degreeLevel: 'Undergraduate', duration: '4 Years', field: 'Pharmacy' },
  { name: 'Bachelor of Science in Physics (B.Sc Physics)', slug: 'bsc-physics-program', degreeLevel: 'Undergraduate', duration: '3-4 Years', field: 'Physics' },

  // After 12th Commerce
  { name: 'Bachelor of Commerce (B.Com)', slug: 'bcom-program', degreeLevel: 'Undergraduate', duration: '3 Years', field: 'Commerce' },
  { name: 'Bachelor of Business Administration (BBA)', slug: 'bba-program', degreeLevel: 'Undergraduate', duration: '3 Years', field: 'Business' },

  // After 12th Arts / Others
  { name: 'Bachelor of Arts in Psychology (BA Psychology)', slug: 'ba-psychology-program', degreeLevel: 'Undergraduate', duration: '3 Years', field: 'Psychology' },
  { name: 'Bachelor of Legislative Law (BA LLB / B.Com LLB)', slug: 'integrated-llb-program', degreeLevel: 'Professional Degree', duration: '5 Years', field: 'Law' },

  // Postgraduates
  { name: 'Master of Commerce (M.Com)', slug: 'mcom-program', degreeLevel: 'Postgraduate', duration: '2 Years', field: 'Commerce' },
  { name: 'Master of Business Administration (MBA Finance / Operations)', slug: 'mba-program', degreeLevel: 'Postgraduate', duration: '2 Years', field: 'Management' },
  { name: 'Master of Technology (M.Tech Computer Science)', slug: 'mtech-cse-program', degreeLevel: 'Postgraduate', duration: '2 Years', field: 'Computer Science' },
  { name: 'Doctor of Medicine (MD) / Master of Surgery (MS)', slug: 'md-ms-program', degreeLevel: 'Doctorate / PhD', duration: '3 Years', field: 'Medicine' },
  { name: 'Master of Pharmacy (M.Pharm)', slug: 'mpharm-program', degreeLevel: 'Postgraduate', duration: '2 Years', field: 'Pharmacy' },
  { name: 'Master of Arts in Clinical Psychology (MA Psychology)', slug: 'ma-psychology-program', degreeLevel: 'Postgraduate', duration: '2 Years', field: 'Psychology' },
  { name: 'Master of Laws (LLM)', slug: 'llm-program', degreeLevel: 'Postgraduate', duration: '1-2 Years', field: 'Law' },
  { name: 'Bachelor of Education (B.Ed)', slug: 'bed-program', degreeLevel: 'Undergraduate', duration: '2 Years', field: 'Education' },
  { name: 'Master of Education (M.Ed)', slug: 'med-program', degreeLevel: 'Postgraduate', duration: '2 Years', field: 'Education' },
  { name: 'Postdoctoral Fellowship in Physics', slug: 'postdoc-physics-program', degreeLevel: 'Advanced Fellowship', duration: '2-3 Years', field: 'Physics' }
];

export const seedEducations = [
  {
    name: '10th (Secondary School Examination)',
    slug: '10th',
    aliases: ['10th Grade', 'SSC', 'Matriculation', 'Class 10', 'High School Diploma'],
    level: 'School (10th)',
    qualification: 'Secondary School Certificate',
    stream: 'General',
    description: 'Foundational secondary school level covering science, mathematics, social studies, and languages. First primary academic crossroads.',
    country: 'India',
    typicalSubjects: ['Mathematics', 'General Science', 'Social Studies', 'English', 'Second Language']
  },
  {
    name: '12th Science (PCM/PCB)',
    slug: '12th-science',
    aliases: ['12th PCM', '12th PCB', 'Higher Secondary Science', 'Intermediate Science', 'Class 12 Science'],
    level: 'Higher Secondary (12th)',
    qualification: 'Senior School Certificate',
    stream: 'Science',
    description: 'Pre-university study in Physics, Chemistry, and Mathematics/Biology. Foundation for engineering, medical, and scientific domains.',
    country: 'India',
    typicalSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English']
  },
  {
    name: '12th Commerce',
    slug: '12th-commerce',
    aliases: ['Higher Secondary Commerce', 'Intermediate Commerce', 'Class 12 Commerce', '12th Business Studies'],
    level: 'Higher Secondary (12th)',
    qualification: 'Senior School Certificate',
    stream: 'Commerce',
    description: 'Pre-university study in Accountancy, Business Studies, Economics, and Financial Mathematics.',
    country: 'India',
    typicalSubjects: ['Accountancy', 'Business Studies', 'Economics', 'Applied Mathematics', 'English']
  },
  {
    name: 'B.Com (Bachelor of Commerce)',
    slug: 'b-com',
    aliases: ['BCom', 'B.Com General', 'Bachelor of Commerce', 'B.Com Honours'],
    level: 'Undergraduate',
    qualification: 'Bachelor Degree',
    stream: 'Commerce',
    branch: 'Accounting & Finance',
    description: 'Three-year undergraduate program focusing on financial accounting, corporate law, business economics, auditing, and corporate finance.',
    country: 'India',
    typicalSubjects: ['Financial Accounting', 'Corporate Law', 'Cost Accounting', 'Income Tax', 'Auditing', 'Economics']
  },
  {
    name: 'B.Tech CSE (Computer Science & Engineering)',
    slug: 'b-tech-cse',
    aliases: ['B.Tech Computer Science', 'BE CSE', 'B.E. Computer Engineering', 'BTech CSE'],
    level: 'Undergraduate',
    qualification: 'Bachelor of Technology',
    stream: 'Engineering',
    branch: 'Computer Science',
    description: 'Four-year professional degree covering computer systems, algorithms, software engineering, databases, networking, and system design.',
    country: 'India',
    typicalSubjects: ['Data Structures', 'Operating Systems', 'DBMS', 'Computer Networks', 'Software Architecture', 'Compiler Design']
  },
  {
    name: 'MBA Finance',
    slug: 'mba-finance',
    aliases: ['Master of Business Administration in Finance', 'PGDM Finance', 'MBA in Financial Management'],
    level: 'Postgraduate',
    qualification: 'Master Degree',
    stream: 'Management',
    branch: 'Finance',
    description: 'Postgraduate program covering investment banking, financial analysis, corporate valuation, portfolio management, and strategic financial management.',
    country: 'India',
    typicalSubjects: ['Corporate Finance', 'Investment Analysis', 'Derivatives & Risk Management', 'Financial Econometrics', 'Mergers & Acquisitions']
  },
  {
    name: 'ITI Electrician',
    slug: 'iti-electrician',
    aliases: ['Industrial Training Electrician', 'ITI Electrical', 'Certified Electrician Trade'],
    level: 'Vocational / ITI',
    qualification: 'National Trade Certificate (NTC)',
    stream: 'Vocational',
    branch: 'Electrical Trade',
    description: 'Two-year technical trade course certified by NCVT providing practical expertise in wiring, motors, electrical panels, and safety protocols.',
    country: 'India',
    typicalSubjects: ['Trade Theory', 'Workshop Calculation & Science', 'Engineering Drawing', 'Practical Wiring & Installation']
  },
  {
    name: 'Diploma Mechanical Engineering',
    slug: 'diploma-mechanical',
    aliases: ['Polytechnic Mechanical', 'DME', 'Diploma in Mechanical Engineering'],
    level: 'Diploma',
    qualification: 'State Board Polytechnic Diploma',
    stream: 'Engineering',
    branch: 'Mechanical',
    description: 'Three-year polytechnic diploma covering manufacturing processes, thermodynamics, machine design, CAD, and shop-floor production management.',
    country: 'India',
    typicalSubjects: ['Applied Mechanics', 'Thermal Engineering', 'Manufacturing Technology', 'Fluid Mechanics', 'CAD/CAM']
  },
  {
    name: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
    slug: 'mbbs',
    aliases: ['Bachelor of Medicine', 'Medical Graduate', 'MBBS Doctor'],
    level: 'Professional Degree',
    qualification: 'Medical Degree',
    stream: 'Medical',
    branch: 'Medicine & Surgery',
    description: 'Five-and-a-half-year rigorous clinical degree with compulsory rotating medical internship qualifying graduates to practice allopathic medicine.',
    country: 'India',
    typicalSubjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'General Medicine', 'Surgery', 'Pediatrics']
  },
  {
    name: 'B.Pharm (Bachelor of Pharmacy)',
    slug: 'b-pharm',
    aliases: ['Bachelor of Pharmacy', 'BPharm', 'B.Pharma'],
    level: 'Undergraduate',
    qualification: 'Bachelor Degree',
    stream: 'Pharmacy',
    branch: 'Pharmaceutical Sciences',
    description: 'Four-year degree regulated by the Pharmacy Council of India, covering drug chemistry, pharmaceutical biotechnology, medicinal pharmacology, and clinical dosage.',
    country: 'India',
    typicalSubjects: ['Pharmaceutics', 'Medicinal Chemistry', 'Pharmacology', 'Pharmacognosy', 'Pharmaceutical Analysis']
  },
  {
    name: 'BA Psychology',
    slug: 'ba-psychology',
    aliases: ['Bachelor of Arts in Psychology', 'B.Sc Psychology', 'BA Applied Psychology'],
    level: 'Undergraduate',
    qualification: 'Bachelor Degree',
    stream: 'Humanities & Social Sciences',
    branch: 'Psychology',
    description: 'Three-year undergraduate program in human behavior, cognitive processes, developmental psychology, psychopathology, and research methodologies.',
    country: 'India',
    typicalSubjects: ['Introduction to Psychology', 'Developmental Psychology', 'Cognitive Psychology', 'Abnormal Psychology', 'Psychological Research & Statistics']
  },
  {
    name: 'LLB (Bachelor of Legislative Law)',
    slug: 'llb',
    aliases: ['Bachelor of Laws', 'Legum Baccalaureus', '3-Year LLB', '5-Year Integrated LLB'],
    level: 'Professional Degree',
    qualification: 'Law Degree',
    stream: 'Law',
    branch: 'Legal Studies',
    description: 'Professional legal degree recognized by the Bar Council of India preparing graduates for courtroom advocacy, corporate counsel, and legal advisory.',
    country: 'India',
    typicalSubjects: ['Constitutional Law', 'Law of Contracts', 'Criminal Law & IPC', 'Civil Procedure Code', 'Corporate Law', 'Property Law']
  },
  {
    name: 'B.Ed (Bachelor of Education)',
    slug: 'b-ed',
    aliases: ['Bachelor of Education', 'BEd', 'Teaching Degree'],
    level: 'Undergraduate',
    qualification: 'Professional Teaching Degree',
    stream: 'Education',
    branch: 'Pedagogy & Teaching',
    description: 'Two-year professional degree mandatory for teaching in secondary and higher secondary schools, covering pedagogical principles, child psychology, and classroom methodology.',
    country: 'India',
    typicalSubjects: ['Childhood and Growing Up', 'Contemporary India and Education', 'Learning and Teaching', 'Pedagogy of School Subjects', 'Assessment for Learning']
  },
  {
    name: 'PhD Physics',
    slug: 'phd-physics',
    aliases: ['Doctor of Philosophy in Physics', 'Doctorate in Physics'],
    level: 'Doctorate / PhD',
    qualification: 'Doctorate Degree',
    stream: 'Science',
    branch: 'Physics',
    description: 'Four-to-five year doctoral research dissertation in advanced experimental or theoretical physics, contributing original peer-reviewed discoveries.',
    country: 'India',
    typicalSubjects: ['Advanced Quantum Mechanics', 'Solid State Physics', 'Research Methodology & Instrumentation', 'Dissertation Research']
  },
  {
    name: 'B.Tech Mechanical Engineering',
    slug: 'b-tech-mechanical',
    aliases: ['BTech Mechanical', 'BE Mechanical', 'Mechanical Engineering', 'B.Tech Mech'],
    level: 'Undergraduate',
    qualification: 'Bachelor of Technology',
    stream: 'Engineering',
    branch: 'Mechanical Engineering',
    description: 'Four-year professional degree covering machine design, thermodynamics, fluid power, CAD/CAM modeling, and manufacturing systems.',
    country: 'India',
    typicalSubjects: ['Thermodynamics', 'Fluid Mechanics', 'Strength of Materials', 'Machine Design', 'CAD/CAM', 'Heat Transfer']
  },
  {
    name: 'BBA (Bachelor of Business Administration)',
    slug: 'bba',
    aliases: ['Bachelor of Business Administration', 'BBA General', 'BMS', 'Bachelor of Management Studies'],
    level: 'Undergraduate',
    qualification: 'Bachelor Degree',
    stream: 'Management',
    branch: 'Business Administration',
    description: 'Three-year undergraduate program in principles of management, marketing, financial planning, business communication, and human resources.',
    country: 'India',
    typicalSubjects: ['Principles of Management', 'Marketing Management', 'Business Economics', 'Financial Accounting', 'Organizational Behavior']
  },
  {
    name: 'MCA (Master of Computer Applications)',
    slug: 'mca',
    aliases: ['Master of Computer Applications', 'MCA General'],
    level: 'Postgraduate',
    qualification: 'Master Degree',
    stream: 'Computer Science',
    branch: 'Software Applications',
    description: 'Two-year professional master degree emphasizing enterprise software engineering, web application development, cloud platforms, and data structures.',
    country: 'India',
    typicalSubjects: ['Advanced Data Structures', 'Full Stack Development', 'Database Internals', 'Cloud Computing', 'Software Project Management']
  },
  {
    name: 'B.Sc (Bachelor of Science)',
    slug: 'b-sc',
    aliases: ['BSc', 'B.Sc General', 'B.Sc Computer Science', 'B.Sc Math', 'Bachelor of Science'],
    level: 'Undergraduate',
    qualification: 'Bachelor Degree',
    stream: 'Science',
    branch: 'Pure & Applied Sciences',
    description: 'Three-year undergraduate degree establishing core mastery in mathematical thinking, empirical scientific inquiry, laboratory methods, or computational algorithms.',
    country: 'India',
    typicalSubjects: ['Calculus & Linear Algebra', 'Physics / Chemistry', 'Computer Science Fundamentals', 'Statistics & Probability']
  },
  {
    name: 'B.A (Bachelor of Arts)',
    slug: 'b-a',
    aliases: ['BA', 'BA General', 'Bachelor of Arts', 'BA Humanities'],
    level: 'Undergraduate',
    qualification: 'Bachelor Degree',
    stream: 'Humanities & Social Sciences',
    branch: 'Arts & Humanities',
    description: 'Three-year undergraduate degree cultivating critical analysis, linguistic articulation, public policy comprehension, and socio-economic contextualization.',
    country: 'India',
    typicalSubjects: ['Political Science', 'History & Governance', 'Sociology & Public Administration', 'English Literature', 'Economics']
  },
  {
    name: 'Nursing (B.Sc Nursing)',
    slug: 'nursing',
    aliases: ['B.Sc Nursing', 'Registered Nurse', 'Nursing Graduate'],
    level: 'Undergraduate',
    qualification: 'Professional Nursing Degree',
    stream: 'Healthcare',
    branch: 'Clinical Nursing',
    description: 'Four-year professional medical nursing program accredited by Indian Nursing Council covering inpatient clinical care, surgical assistance, and pharmacology.',
    country: 'India',
    typicalSubjects: ['Anatomy & Physiology', 'Medical-Surgical Nursing', 'Pharmacology', 'Community Health', 'Obstetrical Nursing']
  },
  {
    name: 'Agriculture (B.Sc Agriculture)',
    slug: 'agriculture',
    aliases: ['B.Sc Agriculture', 'Agricultural Sciences', 'BSc Ag'],
    level: 'Undergraduate',
    qualification: 'Bachelor Degree',
    stream: 'Agricultural Sciences',
    branch: 'Agronomy & Soil Sciences',
    description: 'Four-year degree accredited by ICAR covering crop science, agronomy, soil chemistry, farm mechanization, and agribusiness management.',
    country: 'India',
    typicalSubjects: ['Agronomy', 'Genetics & Plant Breeding', 'Soil Science', 'Agricultural Economics', 'Entomology & Pathology']
  },
  {
    name: 'Vocational Training / ITI Trades',
    slug: 'vocational-training',
    aliases: ['Vocational Training', 'Polytechnic Trade', 'Skill Training', 'Vocational Certificate'],
    level: 'Vocational / ITI',
    qualification: 'Trade Certificate',
    stream: 'Vocational',
    branch: 'Applied Skilled Trades',
    description: 'Applied technical vocational training focused on practical workshop tooling, equipment maintenance, and workplace safety standards.',
    country: 'India',
    typicalSubjects: ['Applied Trade Theory', 'Workshop Practice', 'Technical Blueprint Reading', 'Workplace Safety Protocols']
  },
  {
    name: '12th Arts / Humanities',
    slug: '12th-arts',
    aliases: ['12th Humanities', 'Intermediate Arts', 'Class 12 Arts', 'HSC Arts'],
    level: 'Higher Secondary (12th)',
    qualification: 'Senior School Certificate',
    stream: 'Arts & Humanities',
    branch: 'Humanities',
    description: 'Pre-university study in Political Science, History, Sociology, Psychology, Literature, and Economics.',
    country: 'India',
    typicalSubjects: ['Political Science', 'History', 'Sociology', 'English', 'Economics']
  },
  {
    name: 'BCA (Bachelor of Computer Applications)',
    slug: 'bca',
    aliases: ['Bachelor of Computer Applications', 'BCA Computer Science'],
    level: 'Undergraduate',
    qualification: 'Bachelor Degree',
    stream: 'Computer Applications',
    branch: 'Software Development',
    description: 'Three-year undergraduate program focusing on programming languages, database systems, web development, and computer architecture.',
    country: 'India',
    typicalSubjects: ['C / C++ / Java', 'Database Management Systems', 'Web Technology', 'Data Structures', 'Operating Systems']
  },
  {
    name: 'B.E. (Bachelor of Engineering)',
    slug: 'be-engineering',
    aliases: ['Bachelor of Engineering', 'BE', 'B.E. General'],
    level: 'Undergraduate',
    qualification: 'Bachelor of Engineering',
    stream: 'Engineering',
    branch: 'Engineering & Technology',
    description: 'Four-year professional degree covering applied mathematics, circuit theory, thermodynamics, mechanics, and design.',
    country: 'India',
    typicalSubjects: ['Engineering Mathematics', 'Applied Physics', 'Engineering Mechanics', 'Basic Electrical', 'Computing Systems']
  },
  {
    name: 'CA (Chartered Accountant)',
    slug: 'ca',
    aliases: ['Chartered Accountancy', 'ICAI Chartered Accountant', 'FCA', 'ACA'],
    level: 'Professional Degree',
    qualification: 'Professional Statutory Qualification',
    stream: 'Commerce & Accounting',
    branch: 'Statutory Auditing & Tax',
    description: 'Premier statutory accounting and audit qualification awarded by the Institute of Chartered Accountants of India.',
    country: 'India',
    typicalSubjects: ['Advanced Auditing', 'Direct Tax Laws & International Taxation', 'Strategic Financial Management', 'Corporate Law']
  },
  {
    name: 'CMA (Cost & Management Accountant)',
    slug: 'cma',
    aliases: ['Cost and Management Accountant', 'ICMAI CMA', 'Cost Accountant'],
    level: 'Professional Degree',
    qualification: 'Professional Statutory Qualification',
    stream: 'Commerce & Management',
    branch: 'Cost & Management Accounting',
    description: 'Statutory qualification in cost audit, pricing strategies, operational performance management, and budget control.',
    country: 'India',
    typicalSubjects: ['Strategic Cost Management', 'Financial Analysis & Business Valuation', 'Corporate Financial Reporting', 'Tax Laws']
  },
  {
    name: 'M.Tech (Master of Technology)',
    slug: 'm-tech',
    aliases: ['Master of Technology', 'MTech', 'ME', 'Master of Engineering'],
    level: 'Postgraduate',
    qualification: 'Master of Technology',
    stream: 'Engineering',
    branch: 'Advanced Engineering',
    description: 'Two-year postgraduate research and technical mastery program in advanced computational, thermal, VLSI, or electrical engineering.',
    country: 'India',
    typicalSubjects: ['Advanced Algorithms', 'Research Methodology', 'VLSI / AI Systems', 'Thesis / Dissertation']
  },
  {
    name: 'M.Sc (Master of Science)',
    slug: 'm-sc',
    aliases: ['Master of Science', 'MSc', 'M.Sc General'],
    level: 'Postgraduate',
    qualification: 'Master Degree',
    stream: 'Science',
    branch: 'Pure & Applied Sciences',
    description: 'Two-year postgraduate degree providing rigorous academic research in physics, chemistry, mathematics, or data science.',
    country: 'India',
    typicalSubjects: ['Advanced Quantum Theory', 'Statistical Inference', 'Laboratory Practicum', 'Dissertation']
  },
  {
    name: 'Diploma Electrical Engineering',
    slug: 'diploma-electrical',
    aliases: ['Polytechnic Electrical', 'DEE', 'Diploma in Electrical Engineering'],
    level: 'Diploma',
    qualification: 'State Board Polytechnic Diploma',
    stream: 'Engineering',
    branch: 'Electrical',
    description: 'Three-year polytechnic diploma covering electrical machines, power transmission, substation equipment, and industrial automation.',
    country: 'India',
    typicalSubjects: ['Circuit Theory', 'Electrical Machines', 'Power Systems', 'Industrial Control', 'Measurements & Instrumentation']
  },
  {
    name: 'ITI Fitter',
    slug: 'iti-fitter',
    aliases: ['Industrial Training Fitter', 'NCVT Fitter', 'Mechanical Fitter Trade'],
    level: 'Vocational / ITI',
    qualification: 'National Trade Certificate (NTC)',
    stream: 'Vocational',
    branch: 'Mechanical Trade',
    description: 'Two-year vocational technical trade course providing hands-on precision fitting, lathe machine operation, welding, and machine assembly.',
    country: 'India',
    typicalSubjects: ['Fitter Trade Theory', 'Fitting Workshop Practice', 'Engineering Drawing', 'Precision Measuring Instruments']
  }
];

export const seedSampleJobs = [
  // Signature Job: Data Analyst (Key demo pairing with B.Com, B.Tech, B.Sc)
  {
    title: 'Data Analyst',
    slug: 'data-analyst',
    jobFamily: 'Data Analytics & Business Intelligence',
    jobType: 'Private',
    sector: 'Technology & Analytics',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 500000, max: 1000000, formatted: '₹5.0 - ₹10.0 LPA' },
    overview: 'Transforms complex raw transactional logs and customer database records into clean business dashboards, uncovering revenue patterns and operational insights.',
    whyFit: 'Strong synergy with commercial and quantitative reasoning. Recruiter criteria prioritize practical querying in SQL and BI reporting over raw engineering.',
    tools: ['Advanced Excel', 'SQL', 'Python (Pandas)', 'Power BI', 'Statistics'],
    responsibilities: [
      'Write SQL queries to extract, transform, and aggregate relational business data',
      'Build interactive performance dashboards in Power BI or Tableau',
      'Conduct exploratory data analysis in Python using Pandas and NumPy',
      'Present analytical findings to business stakeholders to drive revenue'
    ],
    skillsToLearn: ['SQL', 'Python (Pandas)', 'Power BI / Tableau', 'Statistics', 'Advanced Excel'],
    stepByStepRoadmap: ['Excel', 'Statistics', 'SQL', 'Python', 'Power BI', 'Build Projects', 'Resume', 'Interview Preparation', 'Apply for Jobs'],
    projects: [
      { name: 'E-Commerce Sales Performance & Churn Dashboard', tech: 'SQL, Power BI', desc: 'Extracted 100K orders with SQL, modeled star schema, and designed interactive executive KPI report.' },
      { name: 'Customer Segmentation & LTV Prediction', tech: 'Python, Pandas, Seaborn', desc: 'Grouped customers by RFM (Recency, Frequency, Monetary) to identify top revenue generators.' }
    ],
    interviewPreparation: [
      { category: 'Technical / SQL', question: 'Write a SQL query using window functions (e.g. ROW_NUMBER or DENSE_RANK) to find top sales per region.', answerGuidance: 'Explain ranking partitions over department groups.' },
      { category: 'SQL Basics', question: 'What is the difference between WHERE and HAVING in SQL?', answerGuidance: 'WHERE filters before aggregation; HAVING filters aggregated groups.' },
      { category: 'Data Analysis', question: 'How do you identify and handle missing values or outliers in a dataset?', answerGuidance: 'Discuss median/mean imputation, domain boundary checks, and visual boxplots.' }
    ],
    howToApply: 'Build a public portfolio on GitHub and NovyPro, showcase interactive Power BI reports, and apply via LinkedIn, Wellfound, and Hirist.',
    source: 'NASSCOM / Tech Analytics Industry Benchmarks',
    sourceUrl: 'https://nasscom.in',
    lastVerified: 'September 2026'
  },
  // Government Jobs
  {
    title: 'Staff Selection Commission (SSC CGL) Auditor / Inspector',
    slug: 'ssc-cgl-auditor-inspector',
    jobFamily: 'Public Administration & Civil Auditing',
    jobType: 'Government',
    sector: 'Central Government Ministries',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 650000, max: 1200000, formatted: 'Level 7 Pay Matrix (₹44,900 - ₹1,42,400 + DA/HRA)' },
    overview: 'Prestigious central government gazetted/non-gazetted post in Comptroller & Auditor General (CAG), Central Excise, Income Tax, and Ministries.',
    whyFit: 'Open to recognized bachelor degree graduates. Candidates with commerce or quantitative foundations excel in Tier 2 financial and statistical papers.',
    ageRequirements: { min: 18, max: 32 },
    entranceExam: 'SSC Combined Graduate Level (CGL) Tier 1 & Tier 2',
    source: 'Staff Selection Commission (Government of India)',
    sourceUrl: 'https://ssc.gov.in',
    lastVerified: 'September 2026',
    stepByStepRoadmap: ['Aptitude Mastery', 'General Awareness', 'English & Reasoning', 'Tier 1 Exam', 'Tier 2 Paper', 'Document Verification'],
    projects: [
      { name: 'Government Accounts & Auditing Code Review', tech: 'CAG Manual, Ind AS', desc: 'Case study analysis of statutory municipal expenditure audits.' }
    ],
    interviewPreparation: [
      { category: 'Current Affairs', question: 'Explain the role of the Comptroller and Auditor General (CAG) under Article 148.', answerGuidance: 'Discuss constitutional audit of consolidated fund of India.' },
      { category: 'Aptitude', question: 'How do you manage time during Tier 2 quantitative tests?', answerGuidance: 'Prioritize high-yield arithmetic and geometry problems.' }
    ],
    howToApply: 'Apply on ssc.gov.in during the annual notification window before the deadline.'
  },
  {
    title: 'Probationary Officer (IBPS / SBI PO)',
    slug: 'bank-probationary-officer',
    jobFamily: 'Banking & Financial Services',
    jobType: 'Public Sector',
    sector: 'Public Sector Commercial Banks',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 750000, max: 1300000, formatted: '₹55,000 - ₹75,000 / month + Leased Housing' },
    overview: 'Managerial entry role in Public Sector Banks (SBI, PNB, Bank of Baroda) managing credit appraisal, retail operations, and branch loans.',
    whyFit: 'Any recognized graduate degree is eligible. Commerce and finance studies give a significant edge in the banking awareness section.',
    ageRequirements: { min: 20, max: 30 },
    entranceExam: 'IBPS PO / SBI PO Common Recruitment Examination',
    source: 'Institute of Banking Personnel Selection',
    sourceUrl: 'https://www.ibps.in',
    lastVerified: 'September 2026',
    stepByStepRoadmap: ['Prelims Prep', 'Data Interpretation', 'Banking Awareness', 'Mains Exam', 'Interview & GD'],
    projects: [
      { name: 'Priority Sector Lending Appraisal Model', tech: 'Credit Ratios, RBI Norms', desc: 'Evaluated SME loan eligibility under current RBI interest subvention rules.' }
    ],
    interviewPreparation: [
      { category: 'Banking Law', question: 'What is the difference between Repo Rate and Reverse Repo Rate?', answerGuidance: 'Define policy rates set by the Monetary Policy Committee.' },
      { category: 'HR', question: 'Why do you want to join a public sector bank?', answerGuidance: 'Focus on financial inclusion, nation-building, and job stability.' }
    ],
    howToApply: 'Register at ibps.in or sbi.co.in/careers upon official annual notification release.'
  },
  {
    title: 'Railway Assistant Loco Pilot & Technician (RRB)',
    slug: 'railway-alp-technician',
    jobFamily: 'Indian Railways & Transport',
    jobType: 'Government',
    sector: 'Railway Infrastructure',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 380000, max: 680000, formatted: 'Level 2 Pay Matrix (₹19,900 + Running Allowances)' },
    overview: 'Safety-critical technical role assisting locomotive train operations, monitoring gauges, and maintaining high-voltage electrical circuits.',
    whyFit: 'Directly open to ITI Electrician, Wireman, Mechanical Diploma, and related technical trades.',
    ageRequirements: { min: 18, max: 30 },
    entranceExam: 'RRB ALP CBT-1, CBT-2, and Computer Based Aptitude Test',
    source: 'Railway Recruitment Control Board',
    sourceUrl: 'https://indianrailways.gov.in',
    lastVerified: 'September 2026',
    stepByStepRoadmap: ['Trade Theory Revision', 'Basic Science & Engineering Drawing', 'CBT 1 Exam', 'CBT 2 Trade Test', 'Medical Fitness Test'],
    projects: [
      { name: 'Locomotive Electrical Brake Relay Schematics', tech: 'Trade Blueprints', desc: 'Simulated electrical circuit testing for pneumatic brake actuation.' }
    ],
    interviewPreparation: [
      { category: 'Trade Knowledge', question: 'Explain how a Three-Phase Traction Motor operates in locomotives.', answerGuidance: 'Discuss AC induction motors and variable frequency drives.' }
    ],
    howToApply: 'Apply through the regional RRB portal (e.g. rrbcdg.gov.in) with NCVT/SCVT trade certificates.'
  },
  {
    title: 'Mechanical Design & Maintenance Engineer',
    slug: 'mechanical-design-maintenance-engineer',
    jobFamily: 'Mechanical & Manufacturing Systems',
    jobType: 'Private',
    sector: 'Engineering & Manufacturing',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 450000, max: 850000, formatted: '₹4.5 - ₹8.5 LPA' },
    overview: 'Designs machine assemblies in 3D CAD, conducts finite element stress analysis, and manages shop-floor preventive maintenance.',
    whyFit: 'Directly aligned with B.Tech Mechanical and Polytechnic Mechanical coursework in thermodynamics, machine design, and CAD.',
    tools: ['SolidWorks', 'AutoCAD', 'ANSYS FEA', 'GD&T'],
    stepByStepRoadmap: ['CAD Modeling', 'GD&T Tolerancing', 'FEA Analysis', 'Manufacturing Processes', 'Build Capstone Projects', 'Resume', 'Apply'],
    projects: [
      { name: 'Gearbox Reducer Assembly & Stress Simulation', tech: 'SolidWorks, ANSYS', desc: 'Designed 2-stage helical gear reducer with FEA fatigue analysis under cyclic torque.' }
    ],
    interviewPreparation: [
      { category: 'Design Theory', question: 'What is the difference between clearance, transition, and interference fit?', answerGuidance: 'Explain shaft/hole tolerance limits and thermal assembly.' }
    ],
    howToApply: 'Showcase portfolio models on GrabCAD / LinkedIn and apply to automotive OEM and heavy equipment engineering teams.'
  },
  // B.Com Jobs
  {
    title: 'Accountant & Tax Associate',
    slug: 'accountant-tax-associate',
    jobFamily: 'Accounting & Audit',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 350000, max: 650000, formatted: '₹3.5 - ₹6.5 LPA' },
    tools: ['TallyPrime', 'Advanced Excel', 'QuickBooks', 'GST Portal'],
    responsibilities: [
      'Maintain general ledger and book-keeping entries',
      'Reconcile bank accounts, accounts payable and accounts receivable',
      'Prepare monthly GST filings and TDS reconciliation'
    ],
    interviewTopics: ['Debit/Credit Golden Rules', 'Bank Reconciliation Statement', 'GST Reverse Charge Mechanism', 'Depreciation Methods']
  },
  {
    title: 'Junior Financial Analyst',
    slug: 'junior-financial-analyst',
    jobFamily: 'Corporate Finance & Analytics',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 500000, max: 900000, formatted: '₹5.0 - ₹9.0 LPA' },
    tools: ['Excel Financial Models', 'Power BI', 'SQL', 'FactSet'],
    responsibilities: [
      'Analyze quarterly company balance sheets and revenue trends',
      'Build 3-statement forecast financial models',
      'Synthesize management commentary and variance analysis'
    ],
    interviewTopics: ['Discounted Cash Flow (DCF)', 'Working Capital Cycle', 'WACC Calculation', 'Financial Ratios Interpretation']
  },

  // B.Tech CSE Jobs
  {
    title: 'Full Stack Software Engineer',
    slug: 'full-stack-engineer',
    jobFamily: 'Software Engineering',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 700000, max: 1400000, formatted: '₹7.0 - ₹14.0 LPA' },
    tools: ['React.js', 'Node.js', 'Express', 'MongoDB / PostgreSQL', 'Git', 'Docker'],
    responsibilities: [
      'Design, implement, and maintain responsive frontends and resilient REST APIs',
      'Write unit tests, automated integration suites, and CI/CD pipelines',
      'Collaborate on system architecture and database query tuning'
    ],
    interviewTopics: ['Event Loop & Async JavaScript', 'Database Indexing & Normalization', 'RESTful API Best Practices', 'Data Structures & Algorithms']
  },
  {
    title: 'Backend Developer (Node / Python)',
    slug: 'backend-developer',
    jobFamily: 'Software Engineering',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 650000, max: 1300000, formatted: '₹6.5 - ₹13.0 LPA' },
    tools: ['Node.js', 'Python / Django', 'Redis', 'PostgreSQL', 'AWS'],
    responsibilities: [
      'Develop scalable server microservices and background job processors',
      'Optimize database queries and implement caching layers',
      'Enforce security best practices, JWT authentication, and rate limiting'
    ],
    interviewTopics: ['Microservices Communication', 'Cache Invalidation Strategies', 'ACID Properties', 'Authentication vs Authorization']
  },

  // MBBS Jobs
  {
    title: 'Resident Medical Officer (RMO)',
    slug: 'resident-medical-officer',
    jobFamily: 'Clinical Medicine',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 800000, max: 1500000, formatted: '₹8.0 - ₹15.0 LPA' },
    tools: ['ECG Monitor', 'Electronic Health Records (EHR)', 'Emergency Resuscitation Equipment'],
    responsibilities: [
      'Manage inpatient admissions, continuous rounds, and emergency clinical evaluations',
      'Administer emergency resuscitation and medication orders',
      'Coordinate with consultant surgeons and super-specialists'
    ],
    interviewTopics: ['Advanced Trauma Life Support (ATLS)', 'Differential Diagnosis of Chest Pain', 'Sepsis Management Guidelines', 'Medical Ethics & Informed Consent']
  },

  // ITI Electrician Jobs
  {
    title: 'Industrial Electrical Technician',
    slug: 'industrial-electrical-technician',
    jobFamily: 'Skilled Trades & Infrastructure',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 280000, max: 480000, formatted: '₹2.8 - ₹4.8 LPA' },
    tools: ['Digital Multimeter', 'Insulation Megger Tester', 'Crimping Tools', 'Conduit Benders'],
    responsibilities: [
      'Install, test, and maintain heavy electrical control panels and circuit breakers',
      'Diagnose industrial motor malfunctions and single-line diagram circuits',
      'Ensure strict zero-incident electrical safety compliance (LOTO)'
    ],
    interviewTopics: ['Lockout/Tagout (LOTO) Procedures', 'Three-phase Motor Starter Circuits', 'Earth Resistance Measurement', 'Ohm\'s Law Application']
  },

  // Diploma Mechanical Jobs
  {
    title: 'Mechanical Maintenance Engineer / Supervisor',
    slug: 'mechanical-maintenance-supervisor',
    jobFamily: 'Plant Operations & Manufacturing',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 320000, max: 550000, formatted: '₹3.2 - ₹5.5 LPA' },
    tools: ['AutoCAD', 'Vernier Calipers & Micrometers', 'Pneumatic/Hydraulic Test Rigs'],
    responsibilities: [
      'Supervise daily assembly lines, CNC machining, and preventive maintenance',
      'Troubleshoot pneumatic pumps, compressors, and mechanical drives',
      'Read engineering drawings and coordinate quality tolerances'
    ],
    interviewTopics: ['Preventive vs Breakdown Maintenance', 'Types of Fits and Tolerances', 'Hydraulic Circuit Components', 'Bearing Failure Causes']
  },

  // B.Pharm Jobs
  {
    title: 'Quality Control / QA Chemist',
    slug: 'qc-qa-chemist',
    jobFamily: 'Pharmaceutical Formulation',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 350000, max: 600000, formatted: '₹3.5 - ₹6.0 LPA' },
    tools: ['HPLC', 'UV-Vis Spectrophotometer', 'Dissolution Apparatus', 'LIMS'],
    responsibilities: [
      'Perform chemical assays and dissolution testing on finished pharmaceutical formulations',
      'Document deviations in compliance with 21 CFR Part 11 and cGMP',
      'Prepare Certificates of Analysis (CoA) for drug release'
    ],
    interviewTopics: ['Principles of HPLC Chromatography', 'cGMP Guidelines', 'Validation of Analytical Methods', 'Tablet Dissolution Testing']
  },

  // BA Psychology Jobs
  {
    title: 'Counseling & Mental Wellness Associate',
    slug: 'counseling-wellness-associate',
    jobFamily: 'Behavioral Healthcare',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 350000, max: 650000, formatted: '₹3.5 - ₹6.5 LPA' },
    tools: ['Psychological Screening Tests', 'Case Management Software', 'Telehealth Platforms'],
    responsibilities: [
      'Conduct initial psychometric screenings and client intake assessments',
      'Facilitate psychoeducation and stress-management group workshops',
      'Provide structured support under supervising licensed clinical psychologists'
    ],
    interviewTopics: ['Active Listening & Non-judgmental Regard', 'Crisis Intervention Protocols', 'Ethical Confidentiality Boundaries', 'Basic CBT Principles']
  },

  // LLB Jobs
  {
    title: 'Junior Legal Associate / Litigation Counsel',
    slug: 'junior-legal-associate',
    jobFamily: 'Legal Practice & Compliance',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 450000, max: 850000, formatted: '₹4.5 - ₹8.5 LPA' },
    tools: ['SCC Online', 'Manupatra', 'Legal Drafting Software'],
    responsibilities: [
      'Conduct legal case law research and draft petitions, affidavits, and legal notices',
      'Assist senior advocates during court hearings and arbitration sessions',
      'Review commercial contracts for regulatory exposure and indemnities'
    ],
    interviewTopics: ['Doctrine of Basic Structure', 'Essential Elements of a Valid Contract', 'Bail Provisions in CrPC', 'Drafting of Written Statements']
  },

  // B.Ed Jobs
  {
    title: 'Secondary School Subject Educator (TGT)',
    slug: 'secondary-school-educator',
    jobFamily: 'K-12 Education',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 360000, max: 650000, formatted: '₹3.6 - ₹6.5 LPA' },
    tools: ['Smartboard / Google Classroom', 'Learning Management Systems', 'Rubric Evaluation Tools'],
    responsibilities: [
      'Deliver interactive subject instruction aligned with curriculum guidelines',
      'Design formative assessments, unit tests, and student feedback mechanisms',
      'Foster inclusive learning environments for diverse learner abilities'
    ],
    interviewTopics: ['Bloom\'s Taxonomy in Lesson Planning', 'Differentiated Instruction Strategies', 'Classroom Behavior Intervention', 'Formative vs Summative Assessment']
  },

  // PhD Physics Jobs
  {
    title: 'Research Scientist / Physicist',
    slug: 'research-scientist-physicist',
    jobFamily: 'Scientific R&D',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 1000000, max: 2000000, formatted: '₹10.0 - ₹20.0 LPA' },
    tools: ['Python Scientific Stack (NumPy/SciPy)', 'MATLAB', 'Cryogenic Vacuum Rigs', 'LaTeX'],
    responsibilities: [
      'Conduct experimental investigations or numerical simulations in quantum/materials physics',
      'Author and present original research in peer-reviewed scientific journals and conferences',
      'Write competitive research grant proposals to national funding agencies'
    ],
    interviewTopics: ['Experimental Error Propagation', 'Quantum Hall Effect & Condensed Matter', 'Numerical PDE Solvers', 'Grant Proposal Defense']
  },

  // 10th & 12th Entry/Vocational Jobs
  {
    title: 'Customer Operations & Business Support Associate',
    slug: 'customer-operations-associate',
    jobFamily: 'Operations & Business Support',
    experienceLevel: 'Entry Level (0-2 yrs)',
    salaryRange: { min: 240000, max: 400000, formatted: '₹2.4 - ₹4.0 LPA' },
    tools: ['MS Office Suite', 'CRM Systems', 'Email Communication'],
    responsibilities: [
      'Assist customers with service inquiries and account documentation',
      'Maintain CRM records and update daily status logs',
      'Coordinate with logistics and billing teams'
    ],
    interviewTopics: ['Customer Conflict Resolution', 'Basic Computer Literacy', 'Clear Professional Communication']
  }
];

export const seedSampleOpportunities = [
  {
    company: 'Tata Consultancy Services (TCS)',
    role: 'Associate Software Engineer / Systems Trainee',
    location: 'Bengaluru / Hyderabad (Hybrid)',
    category: 'Job',
    experience: '0-1 year (B.Tech / MCA eligible)',
    skills: ['Data Structures', 'SQL', 'Java / JavaScript', 'Problem Solving'],
    salaryOrStipend: '₹4.5 - ₹7.0 LPA',
    source: 'National Career Service / TCS Careers Portal',
    applicationUrl: 'https://www.tcs.com/careers'
  },
  {
    company: 'Deloitte India',
    role: 'Analyst - Financial Advisory & Audit',
    location: 'Mumbai / Gurugram',
    category: 'Job',
    experience: '0-2 years (B.Com / M.Com / MBA eligible)',
    skills: ['Financial Analysis', 'Advanced Excel', 'Accounting', 'Communication'],
    salaryOrStipend: '₹5.5 - ₹8.5 LPA',
    source: 'Deloitte Campus & Early Careers',
    applicationUrl: 'https://www2.deloitte.com/in/en/careers.html'
  },
  {
    company: 'Apollo Hospitals Enterprise',
    role: 'Junior Resident Doctor',
    location: 'Chennai / New Delhi',
    category: 'Job',
    experience: 'MBBS with Internship completion',
    skills: ['Clinical Diagnosis', 'Emergency Triage', 'Patient Care'],
    salaryOrStipend: '₹9.0 - ₹14.0 LPA',
    source: 'Hospital Clinical Recruitment Board',
    applicationUrl: 'https://www.apollohospitals.com/careers'
  },
  {
    company: 'Schneider Electric',
    role: 'Apprentice Industrial Electrician',
    location: 'Vadodara / Chennai',
    category: 'Apprenticeship',
    experience: 'ITI Electrician pass-out',
    skills: ['Industrial Wiring', 'Electrical Safety', 'Panel Assembly'],
    salaryOrStipend: '₹22,000 / month Stipend + PPO opportunity',
    source: 'Apprenticeship India Portal',
    applicationUrl: 'https://www.apprenticeshipindia.gov.in'
  },
  {
    company: 'National Law Firm Consortium',
    role: 'Legal Intern / Trainee Associate',
    location: 'New Delhi / Bengaluru',
    category: 'Internship',
    experience: 'Final Year LLB / Fresh Graduate',
    skills: ['Legal Drafting', 'Case Research', 'Contract Review'],
    salaryOrStipend: '₹25,000 / month Stipend',
    source: 'Bar Council Legal Placement Cell',
    applicationUrl: 'https://www.barcouncilofindia.org'
  },
  {
    company: 'Sun Pharma Industries',
    role: 'Quality Assurance Trainee Chemist',
    location: 'Ahmedabad, Gujarat',
    category: 'Job',
    experience: '0-1 year (B.Pharm / M.Pharm)',
    skills: ['HPLC', 'GMP Compliance', 'Analytical Chemistry'],
    salaryOrStipend: '₹3.8 - ₹5.0 LPA',
    source: 'Pharmaceutical Talent Network',
    applicationUrl: 'https://www.sunpharma.com/careers'
  }
];
