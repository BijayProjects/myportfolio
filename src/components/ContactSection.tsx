import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AnimatedHeading } from './common/AnimatedHeading';
import { defaultSectionConfigs } from '../data/initialData';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Sliders,
  Clock,
  ArrowRight
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, submitContactForm, setIsCMSOpen, setCmsTab } = usePortfolio();
  const { profile } = data;
  const cfg = data.sectionConfigs?.contact || defaultSectionConfigs.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: 'Full-Stack Web Development',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cfg.enabled === false) return null;

  const serviceOptions = [
    'Full-Stack Web Development',
    'WordPress Custom Theme & Speed Tuning',
    'AI Prompt Engineering & Automation',
    'Backend API & Database Architecture',
    'Full-Time / Contract Hiring Opportunity',
    'Other Technical Consultation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        serviceInterest: formData.serviceInterest,
        subject: formData.subject || `Inquiry from ${formData.name}`,
        message: formData.message
      });

      setSubmittedSuccessfully(true);
      setFormData({
        name: '',
        email: '',
        serviceInterest: 'Full-Stack Web Development',
        subject: '',
        message: ''
      });
    } catch (err) {
      setErrorMsg('Something went wrong while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-[#090D1F] border-t border-indigo-950/70">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A3A] border border-indigo-800/50 text-xs font-mono text-[#FF7A29] mb-3">
            <Mail className="w-3.5 h-3.5 text-[#FF7A29]" />
            <span>{cfg.badge || 'Direct Communication & Inquiries'}</span>
          </div>
          <AnimatedHeading
            title={cfg.title || 'Initiate a Project or '}
            accent={cfg.titleAccent || 'Hire Full-Time'}
            suffix={cfg.titleSuffix}
            animationType={cfg.animationType || 'glow-pulse'}
            accentGradient={cfg.accentGradient || 'orange-amber'}
            align="center"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          />
          {cfg.subtitle && (
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              {cfg.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0C1129] border border-indigo-900/50 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Contact Information</h3>
                <p className="text-xs text-slate-400 mt-1">Direct channels to reach Bijaya Tamang</p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-[#080C1E] border border-indigo-950/80 hover:border-[#FF7A29]/50 transition-all group"
                  id="contact-card-email"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FF7A29]/15 text-[#FF7A29] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Email Address</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#FF7A29] transition-colors">
                      {profile.email}
                    </div>
                  </div>
                </a>

                {/* Phone & WhatsApp */}
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-[#080C1E] border border-indigo-950/80 hover:border-indigo-600/50 transition-all group"
                  id="contact-card-phone"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-900/40 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Phone & WhatsApp</div>
                    <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {profile.phone}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#080C1E] border border-indigo-950/80">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/40 text-emerald-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Current Location</div>
                    <div className="text-sm font-semibold text-white">
                      {profile.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-indigo-950">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">Connect on Social Networks:</div>
                <div className="grid grid-cols-3 gap-2.5">
                  {/* LinkedIn */}
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#080C1E] border border-indigo-950/80 hover:border-blue-500/50 hover:bg-blue-950/20 text-slate-300 hover:text-white transition-all group"
                    id="social-linkedin-btn"
                  >
                    <Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-semibold">LinkedIn</span>
                  </a>

                  {/* GitHub */}
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#080C1E] border border-indigo-950/80 hover:border-purple-500/50 hover:bg-purple-950/20 text-slate-300 hover:text-white transition-all group"
                    id="social-github-btn"
                  >
                    <Github className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-semibold">GitHub</span>
                  </a>

                  {/* WhatsApp */}
                  {profile.whatsapp && (
                    <a
                      href={profile.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#080C1E] border border-indigo-950/80 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-slate-300 hover:text-white transition-all group"
                      id="social-whatsapp-btn"
                    >
                      <Phone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-semibold">WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Fast Response Guarantee */}
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 flex items-center gap-3 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-[#FF7A29] shrink-0" />
                <span>Typical response time is within 12–24 hours on all business days.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0C1129] border border-indigo-900/50 rounded-2xl p-6 sm:p-8 shadow-xl" id="contact-form-wrapper">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
                <p className="text-xs text-slate-400 mt-0.5">Submissions will be delivered directly to Bijaya</p>
              </div>

              {submittedSuccessfully ? (
                <div className="p-8 rounded-2xl bg-[#080C1E] border border-emerald-500/40 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600/50 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out, Bijaya will review your inquiry and get back to you shortly at <span className="text-[#FF7A29] font-mono">{profile.email}</span>.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setSubmittedSuccessfully(false)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] hover:from-[#ff6912] hover:to-[#eb4f00] text-white text-xs font-bold transition-all shadow-md shadow-[#FF7A29]/20 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="portfolio-contact-form">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Your Full Name <span className="text-[#FF7A29]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080C1E] border border-indigo-950 focus:border-[#FF7A29] focus:ring-1 focus:ring-[#FF7A29] text-white text-sm outline-none transition-all placeholder:text-slate-600"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Your Email Address <span className="text-[#FF7A29]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. client@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080C1E] border border-indigo-950 focus:border-[#FF7A29] focus:ring-1 focus:ring-[#FF7A29] text-white text-sm outline-none transition-all placeholder:text-slate-600"
                        required
                      />
                    </div>
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Area of Interest / Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080C1E] border border-indigo-950 focus:border-[#FF7A29] focus:ring-1 focus:ring-[#FF7A29] text-white text-sm outline-none transition-all cursor-pointer"
                    >
                      {serviceOptions.map((opt, idx) => (
                        <option key={idx} value={opt} className="bg-[#0C1129] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="e.g. New Web App Development Project"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080C1E] border border-indigo-950 focus:border-[#FF7A29] focus:ring-1 focus:ring-[#FF7A29] text-white text-sm outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Project Details / Message <span className="text-[#FF7A29]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Briefly describe your project goals, timeline, and requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080C1E] border border-indigo-950 focus:border-[#FF7A29] focus:ring-1 focus:ring-[#FF7A29] text-white text-sm outline-none transition-all placeholder:text-slate-600 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] hover:from-[#ff6912] hover:to-[#eb4f00] text-white font-bold text-sm shadow-xl shadow-[#FF7A29]/25 hover:shadow-[#FF7A29]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
