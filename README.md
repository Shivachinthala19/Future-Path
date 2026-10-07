# Future Path 🧭
> **“Your Education. Your Choices. Your Future.”**

Future Path is a production-ready, full-stack universal education and career navigation platform. It enables students, job seekers, and career switchers to input any education level—from 10th grade and vocational ITI trades to engineering, medicine, pharmacy, law, humanities, commerce, and doctoral degrees—and immediately discover verified study options, connected career fields, real job roles, skill gap analyses, and actionable roadmaps.

---

## 🌟 Key Features

1. **AI Future Path Engine (`/education/analyze`)**:
   - Signature user flow: Enter what you studied (e.g. `B.Com`, `B.Tech CSE`, `MBBS`, `ITI Electrician`, `10th`).
   - Server identifies education record in the knowledge graph.
   - Dynamic pathway counts calculated directly from MongoDB (never hardcoded!).
   - Explicit relationship categorization: `DIRECT`, `RELATED`, `POSSIBLE_WITH_SKILLS`, `POSSIBLE_WITH_QUALIFICATION`, `LICENSE_REQUIRED`, `EXPERIENCE_REQUIRED`.
   - AI personalizes results without hallucinating accredited courses or jobs.

2. **The 4 Core Questions Framework**:
   - **Where am I now?** (Current degree level, stream, and baseline competencies)
   - **Where can I go?** (Connected higher study programs & viable job roles)
   - **What do I need?** (Regulatory eligibility, entrance exams, and skill gaps)
   - **What should I do next?** (6-month roadmap, capstone projects, daily missions)

3. **Career GPS (`/career-gps`)**:
   - Interactive clickable timeline across 3-month, 6-month, and 12-month horizons:
     *Education → Direction → Eligibility → Skill Gap → Learning → Projects → Experience → Resume → Interview → Applications → Job → Career Growth*.

4. **Skill Gap Diff Engine (`/skill-gap`)**:
   - Target any job role or career field.
   - Compares your current skills against verified recruiter criteria.
   - Partitions competencies into **Already Have** vs **Need to Develop** with live match percentage.

5. **Action Roadmap (`/roadmap`)**:
   - Month-by-month milestone tracker stored persistently in MongoDB.
   - Monthly focus, estimated hours, and curated learning documentation.

6. **Daily Mission (`/daily-mission`)**:
   - Answers: *"What should I do today?"*
   - Returns bite-sized 30-45 minute practical actions with celebratory completion triggers.

7. **Career Switch & What-If Simulator**:
   - Explore alternative tracks (e.g., *"What if I study MBA?"*, *"What if I move into IT after B.Com?"*).

8. **AI Interview Coach (`/interview`)**:
   - Practice technical, behavioral, and role-specific STAR interview questions with real-time scoring and feedback.

9. **Resume ATS Scanner (`/resume`)**:
   - Evaluates resume text against target job descriptions, scoring ATS formatting, keyword density, and missing competencies.

10. **Opportunity Radar (`/opportunity-radar`)**:
    - Real-world sourced openings (Jobs, Internships, Apprenticeships, Training Programs) linked to official company and government portals.

11. **Career Twin & Digital Career Passport (`/career-twin`, `/career-passport`)**:
    - Persistent profile maintaining your education, skills, interests, and progress.
    - Generates a shareable verified public profile link.

---

## 🏛️ System Architecture

```text
User / Browser (React 18 + Vite + Tailwind CSS + Lucide + Recharts)
                              ↓
              Axios HTTP / REST API Calls
                              ↓
Express.js Server (Helmet + CORS + Rate Limiting + Zod Validation)
                              ↓
             KnowledgeGraphService (MongoDB Knowledge Base)
                              ↓
            AIService (Server-side LLM Abstraction)
              ├─ Google Gemini 1.5 Flash (When AI_API_KEY is provided)
              └─ Intelligent Knowledge Synthesis Engine (Reliable Fallback)
                              ↓
                     Zod Schema Validation
                              ↓
   Structured JSON Response (Dynamic counts, pathways, and next steps)
```

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS (Tailored dark & light mode palettes with subtle glassmorphism)
- **Routing**: React Router v6
- **Data Visualization**: Recharts & Canvas Confetti
- **Icons**: Lucide React
- **Validation & Forms**: React Hook Form & Zod
- **HTTP Client**: Axios with global JWT interceptors

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM (includes seamless `mongodb-memory-server` fallback for zero-setup local dev)
- **Security**: Helmet, CORS, express-rate-limit, bcryptjs, JWT authentication
- **Validation**: Zod schema validators on all request bodies
- **AI Integration**: Modular `aiService.js` supporting Google Gemini / OpenAI with strict knowledge-graph grounding

---

## 📂 Project Structure

```text
careercompass-ai/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/      # Navbar, Sidebar, MobileNav, Footer, RelationshipBadge, CountsBanner
│   │   │   └── ai/          # AIAssistantDrawer
│   │   ├── pages/           # LandingPage, FuturePathPage, DashboardPage, CareerGPSPage, etc.
│   │   ├── layouts/         # MainLayout
│   │   ├── routes/          # AppRoutes
│   │   ├── context/         # AuthContext, ThemeContext
│   │   ├── services/        # api.js, authService.js, careerService.js, educationService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/          # db.js, env.js
│   │   ├── controllers/     # authController, careerController, educationController, etc.
│   │   ├── middleware/      # authMiddleware, rateLimiter, errorMiddleware
│   │   ├── models/          # User, Education, StudyProgram, StudyPathway, Career, JobRole, Skill, etc.
│   │   ├── routes/          # authRoutes, careerRoutes, educationRoutes, etc.
│   │   ├── services/        # aiService.js, knowledgeGraphService.js, recommendationEngine.js
│   │   ├── prompts/         # careerPrompts.js
│   │   ├── seeds/           # seedData.js, runSeed.js
│   │   ├── validators/      # schemas.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB (Optional: The backend includes an embedded in-memory MongoDB fallback if a local MongoDB service is not running!)

### 1. Installation

From the project root:
```bash
npm run install:all
```
*Or install individually:*
```bash
cd backend && npm install
cd ../frontend && npm install
```

---

### 2. Environment Variables

#### Backend (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/careercompass
JWT_SECRET=super_secret_careercompass_jwt_token_key_987654321
JWT_EXPIRES_IN=7d
AI_API_KEY=               # Optional: Your Google Gemini API key
AI_MODEL=gemini-1.5-flash
FRONTEND_URL=http://localhost:5173
USE_MEMORY_DB_FALLBACK=true
```

#### Frontend (`frontend/.env`):
```env
VITE_API_URL=/api
```

---

### 3. Database Seeding

The database comes preloaded with development seed data for all 14 diverse education categories:
- **10th**
- **12th Science**
- **12th Commerce**
- **B.Com**
- **B.Tech CSE**
- **MBA Finance**
- **ITI Electrician**
- **Diploma Mechanical**
- **MBBS**
- **B.Pharm**
- **BA Psychology**
- **LLB**
- **B.Ed**
- **PhD Physics**

To run or reset the seed script:
```bash
npm run seed
```

---

### 4. Running Locally

Run both backend and frontend concurrently:
```bash
npm run dev
```

Or run in separate terminals:
```bash
# Terminal 1: Backend (Port 5000)
cd backend
npm run dev

# Terminal 2: Frontend (Port 5173)
cd frontend
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🔑 Demo Accounts

Use the 1-click login buttons on `/login` or enter credentials:

| Role | Email | Password |
|---|---|---|
| **Demo User (B.Com Graduate)** | `demo@careercompass.ai` | `DemoPassword123!` |
| **System Administrator** | `admin@careercompass.ai` | `AdminPassword123!` |

---

## 📡 API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create account with study background
- `POST /api/auth/login` - Authenticate and retrieve JWT
- `GET /api/auth/me` - Fetch authenticated user profile & twin

### AI Future Path & Careers (`/api/career`)
- `POST /api/career/analyze` - **Signature AI Future Path Analysis**
- `POST /api/career/recalculate` - Career What-If / Pivot simulation
- `POST /api/career/skill-gap` - Audit skills against target criteria
- `POST /api/career/roadmap/generate` - Generate personalized 3-12 month roadmap
- `GET /api/career/roadmap` - Fetch active user roadmap
- `PUT /api/career/roadmap/tasks/:taskId` - Toggle milestone completion
- `GET /api/career/daily-mission` - Fetch personalized daily missions
- `POST /api/career/daily-mission/:id/complete` - Mark mission done & earn points
- `POST /api/career/resume/analyze` - ATS resume scanner & keyword matching
- `POST /api/career/interview/start` - Launch AI mock interview session
- `POST /api/career/interview/answer` - Submit verbal/text answer for AI evaluation

### Education Registry (`/api/education`)
- `GET /api/education` - Directory of verified qualifications with filters
- `GET /api/education/search` - Autocomplete search endpoint
- `GET /api/education/:id` - Qualification details and feeder pathways

### Opportunity Radar (`/api/opportunities`)
- `GET /api/opportunities` - Real-world sourced jobs, internships, apprenticeships

### Career Twin & Passport (`/api/career-twin`)
- `GET /api/career-twin/me` - User Career Twin
- `PUT /api/career-twin/me` - Update skills, goals, and interests
- `GET /api/career-twin/passport/:slug` - Public shareable verified passport

### AI Chat Assistant (`/api/ai`)
- `POST /api/ai/chat` - Contextual career advisor grounded in database knowledge

---

## 🛡️ Security & Integrity

- **Strict Validation**: All payloads validated with Zod before processing.
- **Statutory Disclaimers**: The platform does not claim to predict the future or guarantee employment. All pathways represent verified accreditation possibilities.
- **Server-Side AI**: AI keys are never exposed in frontend bundles. AI prompts strictly instruct models not to hallucinate official requirements.
- **Rate Limiting**: Tiered rate limits for general queries, auth endpoints, and AI generations.

---

## 📄 License
MIT © CareerCompass AI
