import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass } from 'lucide-react';
import { FuturePathLogo } from './FuturePathLogo.jsx';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-3.5">
          <Link to="/dashboard" className="inline-block">
            <FuturePathLogo size={36} showTagline={true} />
          </Link>
          <p className="text-sm text-slate-600 max-w-md leading-relaxed">
            Your Education. Your Choices. Your Future. Discover what to study next, explore career options, understand job requirements, and build a personalized path toward your goals.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Accredited qualifications & verified educational progression standards.</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Explore Future Paths
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link to="/study-next" className="hover:text-indigo-600 transition-colors">Study Next Pathways</Link></li>
            <li><Link to="/careers" className="hover:text-indigo-600 transition-colors">Eligible Career Fields</Link></li>
            <li><Link to="/job-roadmap" className="hover:text-indigo-600 transition-colors">Target Job Roadmaps</Link></li>
            <li><Link to="/my-path" className="hover:text-indigo-600 transition-colors">Personalized Future Path</Link></li>
            <li><Link to="/learn" className="hover:text-indigo-600 transition-colors">Skills to Develop</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Intelligent Guidance
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link to="/ai-assistant" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-[#4F46E5]" /> Future Path AI</Link></li>
            <li><Link to="/search" className="hover:text-indigo-600 transition-colors">Universal Search Engine</Link></li>
            <li><Link to="/profile" className="hover:text-indigo-600 transition-colors">Education & Goals Profile</Link></li>
            <li><Link to="/login" className="hover:text-indigo-600 transition-colors">Sign In</Link></li>
            <li><Link to="/register" className="hover:text-indigo-600 transition-colors">Create Free Account</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div>
          © {new Date().getFullYear()} Future Path. Your Education. Your Choices. Your Future.
        </div>
        <div className="flex items-center gap-3">
          <span>Privacy & Integrity</span>
          <span>•</span>
          <span>Educational Standards</span>
          <span>•</span>
          <span>Career Empowerment</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
