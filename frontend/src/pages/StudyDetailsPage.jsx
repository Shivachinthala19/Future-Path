import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Layers,
  Briefcase,
  ExternalLink,
  Target,
  RotateCw,
  Compass,
  Building,
  Check
} from 'lucide-react';
import { useEducation } from '../context/EducationContext.jsx';
import api from '../services/api.js';
import { ExternalSearchButton } from '../components/common/ExternalSearchButton.jsx';
import { OfficialSourceButton } from '../components/common/OfficialSourceButton.jsx';
import { SourceLinks } from '../components/SourceLinks.jsx';

export const StudyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentEducation, changeEducation, changeTargetJob, setToastMessage } = useEducation();

  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchStudy = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/study/${encodeURIComponent(id)}`);
        if (isMounted) {
          if (res && res.data) {
            setStudy(res.data);
          } else if (res) {
            setStudy(res);
          }
        }
      } catch (err) {
        console.error('[StudyDetailsPage] Error fetching study:', err);
        if (isMounted) {
          setError('Unable to load study program details.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStudy();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSetCurrentEducation = () => {
    if (!study) return;
    changeEducation(study.name, 'completed');
    if (setToastMessage) {
      setToastMessage(`🎓 Set "${study.name}" as your active study.`);
    }
    navigate('/dashboard');
  };

  const handleSelectTarget = (jobTitle) => {
    changeTargetJob(jobTitle);
    if (setToastMessage) {
      setToastMessage(`🎯 Set "${jobTitle}" as your active target job.`);
    }
    navigate(`/job/${encodeURIComponent(jobTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`);
  };

  if (loading) {
    return (
      <div className="card-clean p-16 text-center bg-white border border-slate-200 space-y-3 max-w-5xl mx-auto my-8 rounded-3xl">
        <RotateCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-semibold">
          Loading accredited study curriculum & pathway data...
        </p>
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="card-clean p-12 text-center bg-white border border-slate-200 space-y-4 max-w-5xl mx-auto my-8 rounded-3xl">
        <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Study Program Not Found</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          The requested study program could not be located in our registry.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-2xs"
        >
          <span>Search Studies & Careers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const duration = study.duration || '3-4 Years';
  const studyType = study.educationLevel || study.degreeLevel || study.level || 'Undergraduate';
  const category = study.category || study.field || 'General';
  const eligibility = study.eligibility || 'Pass in qualifying examination from a recognized board or university';
  const admissionReqs = study.admissionRequirements || 'Entrance examination merit or qualifying board marks';
  const entranceExams = study.entranceExams || study.popularEntranceExams || [];
  const subjects = study.subjects || [];
  const specializations = study.specializations || [];
  const skills = study.skills || [];
  const whoCanEnter = study.whoCanEnter || study.educationRoutes || [
    {
      routeNumber: 1,
      title: "Direct High School / 12th Route",
      description: "Pass in 10+2 / Intermediate in relevant discipline with required aggregate percentage.",
      prerequisites: ["10+2 Pass Certificate", "Entrance / Merit Score"]
    }
  ];

  const whatCanIDoAfter = study.whatCanIDoAfter || {};
  const careerFields = whatCanIDoAfter.careerFields || study.careerFields || [];
  const jobRoles = whatCanIDoAfter.jobRoles || study.jobRoles || study.relatedJobs || [];
  const seniorRoles = whatCanIDoAfter.seniorRoles || study.seniorRoles || [];
  const higherStudies = study.higherStudies || study.higherStudyOptions || [];
  const sources = study.sources || study.officialSources || [];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto py-2 sm:py-6">
      {/* SECTION 14: STUDY HERO OVERVIEW */}
      <section className="card-clean p-6 sm:p-8 bg-white border border-slate-200/90 space-y-6 shadow-2xs rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {studyType}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                {category}
              </span>
              <span className="text-xs text-slate-500 font-semibold inline-flex items-center gap-1 ml-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{duration}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {study.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl pt-1">
              {study.overview || study.description || `Comprehensive accredited study curriculum designed for academic and professional advancement.`}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 self-start flex-shrink-0">
            <button
              onClick={handleSetCurrentEducation}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Set as My Study</span>
            </button>
            <Link
              to="/my-path"
              className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <Target className="w-4 h-4" />
              <span>Add to Future Path</span>
            </Link>
          </div>
        </div>

        {/* Action Buttons: Search Web & Official Source (Section 15 & 16) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <ExternalSearchButton
              query={`${study.name} course eligibility admission syllabus`}
              label="🔎 Search Web on Google"
            />
            {sources.length > 0 && sources[0]?.url && (
              <OfficialSourceButton
                url={sources[0].url}
                label="🌐 Official Website"
              />
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-medium">
            Last Verified: <strong className="text-slate-600">{study.lastVerified || 'September 2026'}</strong>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Duration
            </div>
            <div className="text-sm font-extrabold text-slate-800">
              {duration}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Eligibility
            </div>
            <div className="text-xs font-semibold text-slate-800 line-clamp-2">
              {eligibility}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Entrance / Admission
            </div>
            <div className="text-xs font-semibold text-slate-800 line-clamp-2">
              {entranceExams.length > 0 ? entranceExams.join(', ') : admissionReqs}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: WHO CAN ENTER THIS STUDY? (MULTIPLE ADMISSION ROUTES) */}
      <section className="card-clean p-6 sm:p-8 bg-white border border-slate-200 space-y-5 rounded-3xl shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Who can enter this study?
            </h2>
            <p className="text-xs text-slate-500">
              Supported admission routes and feeder qualifying streams
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whoCanEnter.map((route, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                    ROUTE {route.routeNumber || idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {route.title || route.routeName}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center font-bold text-xs text-slate-800 space-y-1">
                  <div>{route.title || route.degrees?.[0] || 'Qualifying Stream'}</div>
                  <div className="text-indigo-600 font-extrabold">↓</div>
                  <div className="text-indigo-700">{study.name}</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {route.description}
                </p>
              </div>

              {(route.prerequisites || route.skills) && (
                <div className="pt-2 border-t border-slate-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Requirements:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(route.prerequisites || route.skills).map((req, rIdx) => (
                      <span
                        key={rIdx}
                        className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold"
                      >
                        ✓ {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SUBJECTS & SKILLS ACQUIRED */}
      {(subjects.length > 0 || skills.length > 0) && (
        <section className="card-clean p-6 sm:p-8 bg-white border border-slate-200 space-y-5 rounded-3xl shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Curriculum & Skills Acquired
              </h2>
              <p className="text-xs text-slate-500">
                Core syllabus modules, laboratory training, and professional competencies
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.length > 0 && (
              <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Key Subjects & Modules</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {subjects.map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-xl bg-white border border-blue-200 text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      📖 {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.length > 0 && (
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Practical Competencies & Skills</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((sk, kIdx) => (
                    <span
                      key={kIdx}
                      className="px-3 py-1 rounded-xl bg-white border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs"
                    >
                      ⚡ {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 14 & 19: WHAT CAN I DO AFTER THIS STUDY? (CAREER FIELDS, JOBS, HIGHER STUDIES) */}
      <section className="card-clean p-6 sm:p-8 bg-white border border-slate-200 space-y-6 rounded-3xl shadow-2xs">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Career & Academic Continuum
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
            What can I do after {study.name}?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Specializations, connected career fields, immediate job opportunities, and subsequent higher studies.
          </p>
        </div>

        {/* Specializations */}
        {specializations.length > 0 && (
          <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Available Specialization Tracks</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs font-semibold text-purple-700 shadow-2xs"
                >
                  ⭐ {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Career Fields */}
        {careerFields.length > 0 && (
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Primary Career Domains</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {careerFields.map((field, idx) => {
                const fName = typeof field === 'string' ? field : field.name;
                return (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-xs font-semibold text-indigo-700 shadow-2xs"
                  >
                    🚀 {fName}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Immediate Target Job Roles */}
        {jobRoles.length > 0 && (
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Connected Target Job Roles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {jobRoles.map((role, idx) => {
                const roleTitle = typeof role === 'string' ? role : role.title;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-between shadow-2xs hover:border-emerald-400 transition-colors"
                  >
                    <span className="text-xs font-extrabold text-slate-800 truncate">
                      {roleTitle}
                    </span>
                    <button
                      onClick={() => handleSelectTarget(roleTitle)}
                      title="Set as target job & view roadmap"
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 ml-2 flex-shrink-0 cursor-pointer"
                    >
                      <span>Target</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Senior Leadership Roles */}
        {seniorRoles.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-slate-600" />
              <span>Senior Leadership Career Ladder (5-10+ Years)</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              {seniorRoles.map((sRole, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-white border border-slate-300 shadow-2xs"
                >
                  🏆 {sRole}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* HIGHER STUDIES (Section 14 & 19) */}
      {higherStudies.length > 0 && (
        <section className="card-clean p-6 sm:p-8 bg-white border border-slate-200 space-y-5 rounded-3xl shadow-2xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Academic Continuum
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Higher Studies & Postgraduate Qualifications
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Subsequent master degrees, professional charters, and doctoral research options.
            </p>
          </div>

          <div className="space-y-3">
            {higherStudies.map((hs, idx) => {
              const hsName = hs.program || hs.name || hs;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-indigo-300 transition-colors space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {hsName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      {hs.duration && <span>⏱️ {hs.duration}</span>}
                      {hs.entranceExam && (
                        <span className="text-indigo-600 font-bold">
                          Exam: {hs.entranceExam}
                        </span>
                      )}
                    </div>
                  </div>

                  {hs.eligibility && (
                    <div className="text-xs text-slate-600">
                      <strong className="text-slate-800">Eligibility: </strong>
                      <span>{hs.eligibility}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <ExternalSearchButton query={`${hsName} course eligibility entrance exam`} label="Search Web" />

                    <Link
                      to={`/study/${encodeURIComponent(hsName.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`}
                      className="px-3.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs"
                    >
                      <span>Explore Program</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* VERIFIED SOURCES SECTION (Section 17 & 18) */}
      <SourceLinks
        sources={sources}
        officialSource={study.source || 'Statutory Education Standards (UGC / AICTE)'}
        lastVerified={study.lastVerified || 'September 2026'}
        disclaimer="Information can change. Please verify the latest admission criteria, eligibility, and fee structure with the official university or regulatory source."
      />
    </div>
  );
};

export default StudyDetailsPage;
