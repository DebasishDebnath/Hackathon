import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Check, ArrowRight } from 'lucide-react';

const TermsPage = ({ onAccept }) => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = () => {
    if (agreed) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onAccept();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-blue-500 rounded-2xl shadow-lg shadow-blue-500/50 mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">Please review and accept to continue</p>
        </div>

        {/* Terms Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden border border-gray-100 animate-slide-up">
          {/* Terms Content */}
          <div className="p-8">
            <div className="h-96 overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
              <section>
                <h3 className="text-lg font-bold text-blue-600 mb-3">1. Introduction</h3>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to HackSphere. By participating in this hackathon, you agree to abide by these 
                  terms and conditions. Please read them carefully before proceeding with your registration.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-blue-600 mb-3">2. Eligibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Participants must be at least 13 years old to enter. Teams can consist of 1-4 members. 
                  All team members must register individually and agree to these terms. Participants from 
                  all countries are welcome unless restricted by local laws.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-blue-600 mb-3">3. Project Guidelines</h3>
                <p className="text-gray-600 leading-relaxed">
                  All projects must be original work created during the hackathon period. Use of existing 
                  libraries, frameworks, and APIs is permitted, but the core innovation must be new. Projects 
                  must not violate any intellectual property rights or contain malicious code.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-blue-600 mb-3">4. Code of Conduct</h3>
                <p className="text-gray-600 leading-relaxed">
                  All participants must maintain a respectful and inclusive environment. Harassment, 
                  discrimination, or inappropriate behavior of any kind will result in immediate 
                  disqualification. Be kind, be collaborative, and support fellow hackers in their journey.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-blue-600 mb-3">5. Intellectual Property</h3>
                <p className="text-gray-600 leading-relaxed">
                  You retain all rights to your project and code. By submitting your project, you grant 
                  HackSphere a non-exclusive license to showcase your work in promotional materials, on 
                  our platform, and in related media coverage.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-blue-600 mb-3">6. Judging & Prizes</h3>
                <p className="text-gray-600 leading-relaxed">
                  Projects will be evaluated based on innovation (30%), technical implementation (30%), 
                  design and user experience (20%), and presentation quality (20%). Judge decisions are 
                  final. Prize distribution will occur within 30 days of the event conclusion.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-blue-600 mb-3">7. Liability</h3>
                <p className="text-gray-600 leading-relaxed">
                  HackSphere and its organizers are not responsible for any technical issues, loss of data, 
                  injuries, or damages during the event. Participants join at their own risk and should 
                  maintain regular backups of their work.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-blue-600 mb-3">8. Privacy & Data Protection</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your registration information will be used solely for hackathon purposes and will not be 
                  shared with third parties without your explicit consent. Project submissions may be made 
                  public on our platform. We comply with GDPR and other relevant data protection regulations.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-blue-600 mb-3">9. Changes to Terms</h3>
                <p className="text-gray-600 leading-relaxed">
                  HackSphere reserves the right to modify these terms at any time. Participants will be 
                  notified of significant changes via email. Continued participation constitutes acceptance 
                  of updated terms.
                </p>
              </section>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-8 border-t-2 border-blue-100 space-y-6">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-6 h-6 border-2 border-gray-300 rounded-lg peer-checked:bg-linear-to-br peer-checked:from-blue-600 peer-checked:to-blue-500 peer-checked:border-blue-500 transition-all duration-200 flex items-center justify-center">
                  {agreed && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
              <span className="text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors">
                I have read and agree to the Terms & Conditions and understand my rights and 
                responsibilities as a participant in HackSphere.
              </span>
            </label>

            <button
              onClick={handleAccept}
              disabled={!agreed || isLoading}
              className={`w-full py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                agreed && !isLoading
                  ? 'bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Accept & Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;