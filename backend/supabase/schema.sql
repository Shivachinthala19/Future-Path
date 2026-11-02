-- ============================================================================
-- FUTURE PATH DATABASE SCHEMA (PostgreSQL / Supabase)
-- Coexists alongside MongoDB for future database migration.
-- Application Name: Future Path
-- Tagline: Your Education. Your Choices. Your Future.
-- ============================================================================

-- Enable UUID and optional Vector extension (for future RAG semantic search)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Uncomment if pgvector is enabled on your Supabase project:
-- CREATE EXTENSION IF NOT EXISTS "vector";

-- ----------------------------------------------------------------------------
-- 1. PROFILES / USERS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE, -- References auth.users if using Supabase Auth in future
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    headline VARCHAR(255) DEFAULT 'Lifelong Learner & Career Explorer',
    avatar_url TEXT,
    current_education VARCHAR(255) DEFAULT 'B.Com',
    education_level VARCHAR(100) DEFAULT 'Undergraduate',
    education_status VARCHAR(50) DEFAULT 'completed', -- 'completed', 'pursuing', 'discontinued'
    specialization VARCHAR(255) DEFAULT '',
    target_job VARCHAR(255) DEFAULT 'Data Analyst',
    target_career VARCHAR(255) DEFAULT '',
    skills TEXT[] DEFAULT '{}',
    location JSONB DEFAULT '{"country": "India", "city": ""}'::jsonb,
    preferences JSONB DEFAULT '{"learningMode": "hybrid", "willingToRelocate": true, "availableWeeklyHours": 15}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 2. EDUCATION LEVELS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS education_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE, -- '10th', '12th Science', '12th Commerce', '12th Arts', 'Undergraduate', 'Postgraduate', 'Diploma'
    code VARCHAR(50) UNIQUE,
    tier_order INT DEFAULT 1,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 3. STUDIES (Programs / Degrees)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    aliases TEXT[] DEFAULT '{}',
    education_level VARCHAR(100),
    category VARCHAR(100) NOT NULL, -- 'Commerce', 'Engineering', 'Science', 'Management'
    field VARCHAR(100),
    duration VARCHAR(50) DEFAULT '3 Years',
    overview TEXT,
    description TEXT,
    eligibility JSONB DEFAULT '{}'::jsonb,
    admission_requirements TEXT[] DEFAULT '{}',
    entrance_exams TEXT[] DEFAULT '{}',
    career_options TEXT[] DEFAULT '{}',
    higher_studies TEXT[] DEFAULT '{}',
    syllabus_modules JSONB DEFAULT '[]'::jsonb,
    verified BOOLEAN DEFAULT true,
    last_verified VARCHAR(50) DEFAULT 'September 2026',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 4. STUDY PATHS (Progression graph between education degrees)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS study_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_study_id UUID REFERENCES studies(id) ON DELETE CASCADE,
    to_study_id UUID REFERENCES studies(id) ON DELETE CASCADE,
    from_education_name VARCHAR(255) NOT NULL,
    to_education_name VARCHAR(255) NOT NULL,
    relationship_type VARCHAR(50) DEFAULT 'DIRECT', -- 'DIRECT', 'LATERAL', 'COMPETITIVE'
    duration_years NUMERIC(3,1),
    eligibility_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 5. CAREER FIELDS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    sector VARCHAR(100),
    overview TEXT,
    description TEXT,
    demand_score INT DEFAULT 85,
    growth_outlook VARCHAR(100) DEFAULT 'High Growth (+24% YoY)',
    average_salary VARCHAR(100) DEFAULT '₹6.5 - 12.0 LPA',
    typical_roles TEXT[] DEFAULT '{}',
    required_skills TEXT[] DEFAULT '{}',
    top_hirers TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 6. JOBS (Private & Government Roles)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    job_family VARCHAR(100),
    category VARCHAR(100) DEFAULT 'Private', -- 'Private', 'Government', 'Public Sector', 'Defence'
    job_type VARCHAR(50) DEFAULT 'JOB', -- 'JOB', 'GOVERNMENT_JOB', 'INTERNSHIP'
    sector VARCHAR(100),
    salary_range JSONB DEFAULT '{"formatted": "₹6.0 - 11.5 LPA", "min": 600000, "max": 1150000}'::jsonb,
    overview TEXT,
    description TEXT,
    eligibility_note TEXT,
    minimum_education VARCHAR(255),
    accepted_degrees TEXT[] DEFAULT '{}',
    required_skills TEXT[] DEFAULT '{}',
    tools TEXT[] DEFAULT '{}',
    top_companies TEXT[] DEFAULT '{}',
    official_source TEXT,
    last_verified VARCHAR(50) DEFAULT 'September 2026',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 7. SKILLS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE,
    category VARCHAR(100) DEFAULT 'Technical', -- 'Technical', 'Analytical', 'Domain', 'Soft Skill'
    demand_level VARCHAR(50) DEFAULT 'High',
    description TEXT,
    learning_difficulty VARCHAR(50) DEFAULT 'Intermediate',
    estimated_hours INT DEFAULT 40,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 8. EXAMS (Entrance & Government Competitive)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    organization VARCHAR(255),
    category VARCHAR(100) DEFAULT 'Competitive & Entrance',
    qualification VARCHAR(255) DEFAULT 'Any Graduation',
    overview TEXT,
    description TEXT,
    exam_pattern TEXT,
    subjects TEXT[] DEFAULT '{}',
    official_source TEXT,
    notification_url TEXT,
    last_verified VARCHAR(50) DEFAULT 'September 2026',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 9. CERTIFICATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    cost_tier VARCHAR(50) DEFAULT 'Moderate',
    difficulty VARCHAR(50) DEFAULT 'Intermediate',
    description TEXT,
    skills TEXT[] DEFAULT '{}',
    official_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 10. ROADMAPS & ROADMAP STEPS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    starting_education VARCHAR(255) NOT NULL,
    target_role VARCHAR(255) NOT NULL,
    target_career VARCHAR(255),
    estimated_months INT DEFAULT 6,
    difficulty VARCHAR(50) DEFAULT 'Moderate',
    overview TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS roadmap_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'SKILL', -- 'FOUNDATION', 'SKILL', 'PROJECT', 'CERTIFICATION', 'MILESTONE'
    description TEXT,
    estimated_hours INT DEFAULT 20,
    skills TEXT[] DEFAULT '{}',
    tasks JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 11. LEARNING RESOURCES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS learning_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    skill_name VARCHAR(255),
    url TEXT NOT NULL,
    provider VARCHAR(100), -- 'Coursera', 'YouTube', 'Documentation', 'Official'
    type VARCHAR(50) DEFAULT 'COURSE', -- 'COURSE', 'DOCUMENTATION', 'VIDEO', 'PROJECT_GUIDE'
    is_free BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 12. SOURCES (Verified Statutory & Official Registry)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    url TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'OFFICIAL', -- 'OFFICIAL', 'GOVERNMENT', 'UNIVERSITY', 'RECRUITMENT', 'PROFESSIONAL_BODY'
    description TEXT,
    last_verified VARCHAR(50) DEFAULT 'September 2026',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 13. USER PROGRESS TRACKING (Roadmaps & Skills)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE SET NULL,
    target_job VARCHAR(255) NOT NULL,
    starting_education VARCHAR(255) NOT NULL,
    completed_step_ids INT[] DEFAULT '{}',
    progress_percentage INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    skill_name VARCHAR(255) NOT NULL,
    proficiency VARCHAR(50) DEFAULT 'Beginner', -- 'Beginner', 'Intermediate', 'Advanced'
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(profile_id, skill_name)
);

-- ----------------------------------------------------------------------------
-- 14. CONVERSATIONS & CHAT MESSAGES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id VARCHAR(100) UNIQUE NOT NULL,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) DEFAULT 'Guidance Session',
    user_context JSONB DEFAULT '{}'::jsonb,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS conversation_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id VARCHAR(100) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL, -- 'user', 'assistant', 'system'
    content TEXT NOT NULL,
    structured_data JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_studies_slug ON studies(slug);
CREATE INDEX IF NOT EXISTS idx_studies_category ON studies(category);
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_exams_slug ON exams(slug);
CREATE INDEX IF NOT EXISTS idx_careers_slug ON careers(slug);
CREATE INDEX IF NOT EXISTS idx_roadmap_steps_roadmap_id ON roadmap_steps(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_conversation_messages_conversation_id ON conversation_messages(conversation_id);
