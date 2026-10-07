/**
 * Search and navigation utilities for Future Path
 */

export function googleSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function openExternalUrl(url) {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export const EDUCATION_CATEGORIES = [
  'School',
  '10th / SSC',
  '11th / 12th',
  'Diploma',
  'Polytechnic',
  'ITI',
  'Undergraduate',
  'Postgraduate',
  'Professional Qualification',
  'Medical',
  'Paramedical',
  'Engineering',
  'Computer Science',
  'Information Technology',
  'Science',
  'Commerce',
  'Arts & Humanities',
  'Management',
  'Law',
  'Agriculture',
  'Architecture',
  'Design',
  'Media & Journalism',
  'Education & Teaching',
  'Nursing',
  'Pharmacy',
  'Veterinary',
  'Hospitality & Tourism',
  'Aviation',
  'Maritime',
  'Defence',
  'Sports',
  'Vocational',
  'Certification',
  'Research & Doctoral',
  'Online & Continuing Education'
];
