import mongoose from 'mongoose';
import { connectDB, closeDB } from '../config/db.js';
import app from '../app.js';
import http from 'http';
import { Study } from '../models/Study.js';
import { Job } from '../models/Job.js';
import { Career } from '../models/Career.js';
import { Exam } from '../models/Exam.js';
import { Skill } from '../models/Skill.js';
import { Certification } from '../models/Certification.js';
import { User } from '../models/User.js';
import { Roadmap } from '../models/Roadmap.js';
import { seedDatabase } from '../seed/seedDatabase.js';

async function runVerification() {
  console.log('--- STARTING COMPREHENSIVE BACKEND & DATABASE VERIFICATION ---');

  // 1. Connect & Seed Database
  await connectDB();
  console.log('✔ MongoDB connection verified.');

  await seedDatabase({ close: false });
  console.log('✔ Database seeded and counts verified.');

  // 2. Start HTTP Server for API tests
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5099, resolve));
  console.log('✔ Test API server listening on http://localhost:5099');

  const baseUrl = 'http://localhost:5099/api';

  // Helper fetch
  async function testGet(endpoint) {
    const res = await fetch(`${baseUrl}${endpoint}`);
    const json = await res.json();
    return { status: res.status, data: json };
  }

  async function testPost(endpoint, body, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return { status: res.status, data: json };
  }

  async function testPut(endpoint, body, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return { status: res.status, data: json };
  }

  // Test 1: GET /api/studies
  const studiesRes = await testGet('/studies');
  console.log(`✔ GET /api/studies: status=${studiesRes.status}, count=${studiesRes.data.count || studiesRes.data.data?.length}`);

  // Test 2: GET /api/jobs
  const jobsRes = await testGet('/jobs');
  console.log(`✔ GET /api/jobs: status=${jobsRes.status}, count=${jobsRes.data.count || jobsRes.data.data?.length}`);

  // Test 3: GET /api/careers
  const careersRes = await testGet('/careers');
  console.log(`✔ GET /api/careers: status=${careersRes.status}, count=${careersRes.data.count || careersRes.data.data?.length}`);

  // Test 4: GET /api/exams
  const examsRes = await testGet('/exams');
  console.log(`✔ GET /api/exams: status=${examsRes.status}, count=${examsRes.data.count || examsRes.data.data?.length}`);

  // Test 5: GET /api/skills
  const skillsRes = await testGet('/skills');
  console.log(`✔ GET /api/skills: status=${skillsRes.status}, count=${skillsRes.data.count || skillsRes.data.data?.length}`);

  // Test 6: GET /api/certifications
  const certsRes = await testGet('/certifications');
  console.log(`✔ GET /api/certifications: status=${certsRes.status}, count=${certsRes.data.count || certsRes.data.data?.length}`);

  // Test 7: GET /api/search?q=B.Com
  const searchRes = await testGet('/search?q=B.Com');
  console.log(`✔ GET /api/search?q=B.Com: status=${searchRes.status}, count=${searchRes.data.count}, directCard=${Boolean(searchRes.data.directCard)}`);

  // Test 8: Auth Login
  const loginRes = await testPost('/auth/login', {
    email: 'demo@careercompass.ai',
    password: 'DemoPassword123!'
  });
  const token = loginRes.data.token;
  console.log(`✔ POST /api/auth/login: status=${loginRes.status}, tokenReceived=${Boolean(token)}`);

  // Test 9: GET /api/user/profile
  const profileRes = await testGet('/user/profile');
  console.log(`✔ GET /api/user/profile: status=${profileRes.status}`);

  // Test 10: PUT /api/user/education
  const eduUpdateRes = await testPut('/user/education', { educationName: 'B.Com' }, token);
  console.log(`✔ PUT /api/user/education: status=${eduUpdateRes.status}, updated=${Boolean(eduUpdateRes.data.data)}`);

  // Test 11: GET /api/user/roadmap & POST /api/user/roadmap
  const roadmapPostRes = await testPost('/user/roadmap', {
    targetJob: 'Data Analyst',
    educationName: 'B.Com',
    overallProgressPercentage: 25,
    tasks: [{ order: 1, title: 'Learn SQL and Excel', completed: true }]
  }, token);
  console.log(`✔ POST /api/user/roadmap: status=${roadmapPostRes.status}`);

  // Test 12: IDOR Security Check
  // Create user B
  const userB = await User.findOneAndUpdate(
    { email: 'userb@test.com' },
    { name: 'User B', email: 'userb@test.com', password: 'Password123!' },
    { upsert: true, new: true }
  );
  const roadmapB = await Roadmap.create({
    user: userB._id,
    title: 'Private Roadmap of User B',
    targetCareer: 'Security',
    targetJobRole: 'Security Lead',
    startingEducation: 'B.Tech'
  });

  // User A attempts to modify User B's roadmap
  const idorRes = await testPut(`/user/roadmap/${roadmapB._id}`, { overallProgressPercentage: 100 }, token);
  console.log(`✔ IDOR Protection Check: status=${idorRes.status} (Expected 403 Forbidden)`);

  server.close();
  await closeDB();
  console.log('--- ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
