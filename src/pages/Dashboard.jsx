import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, Trophy, Calendar, Users, FileText, Upload, 
  LogOut, Menu, X, ArrowRight, Check, Github, Video, Link2, Trash2
} from 'lucide-react';

const Dashboard = ({ user, teamData, onLogout }) => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [githubLink, setGithubLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setErrors({ ...errors, file: 'File size must be less than 100MB' });
        return;
      }
      setErrors({ ...errors, file: '' });
      setUploading(true);
      setTimeout(() => {
        setUploadedFile(file);
        setUploading(false);
      }, 1500);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 500MB for video)
      if (file.size > 500 * 1024 * 1024) {
        setErrors({ ...errors, video: 'Video size must be less than 500MB' });
        return;
      }
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setErrors({ ...errors, video: 'Please upload a valid video file' });
        return;
      }
      setErrors({ ...errors, video: '' });
      setUploadingVideo(true);
      setTimeout(() => {
        setUploadedVideo(file);
        setUploadingVideo(false);
      }, 2000);
    }
  };

  const validateGithubUrl = (url) => {
    const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubPattern.test(url);
  };

  const handleGithubLinkChange = (e) => {
    const url = e.target.value;
    setGithubLink(url);
    if (url && !validateGithubUrl(url)) {
      setErrors({ ...errors, github: 'Please enter a valid GitHub repository URL' });
    } else {
      setErrors({ ...errors, github: '' });
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleRemoveVideo = () => {
    setUploadedVideo(null);
  };

  const handleSubmit = () => {
    const newErrors = {};
    
    if (!uploadedFile) {
      newErrors.file = 'Please upload your project files';
    }
    if (!githubLink) {
      newErrors.github = 'GitHub repository link is required';
    } else if (!validateGithubUrl(githubLink)) {
      newErrors.github = 'Please enter a valid GitHub repository URL';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      alert('Project submitted successfully!');
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                HackSphere
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                Dashboard
              </button>
              
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border-2 border-red-200 hover:border-red-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white animate-fade-in">
            <div className="px-4 py-3 space-y-2">
              <button className="w-full px-4 py-2 text-left text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg">
                Dashboard
              </button>
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-500/30 mb-4">
            <Trophy className="w-4 h-4" />
            <span>Active Participant</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Ready to build something amazing? Let's get started.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hackathon Guidelines */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden animate-slide-up">
            <div className="bg-linear-to-r from-blue-600 to-blue-500 p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Hackathon Guidelines</h2>
                  <p className="text-blue-100">Everything you need to know</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {[
                {
                  number: '1',
                  title: 'Registration & Team Formation',
                  description: 'Complete your registration and form teams of up to 4 members. All team members must be registered on the platform.'
                },
                {
                  number: '2',
                  title: 'Project Development',
                  description: 'Build your innovative project within the hackathon timeframe. Focus on creativity, functionality, and user experience.'
                },
                {
                  number: '3',
                  title: 'Submission Requirements',
                  description: 'Upload your project files, complete documentation, and a demo video. Ensure all files are properly packaged in supported formats.'
                },
                {
                  number: '4',
                  title: 'Judging Criteria',
                  description: 'Projects will be evaluated on innovation (30%), technical execution (30%), design quality (20%), and presentation (20%).'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 bg-linear-to-r from-blue-50 to-indigo-50/50 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-200 animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30 shrink-0">
                    {item.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Information */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-linear-to-r from-indigo-600 to-blue-500 p-6">
              <div className="flex items-center gap-3 text-white">
                <Calendar className="w-6 h-6" />
                <h2 className="text-xl font-bold">Event Info</h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {[
                { label: 'Duration', value: '48 Hours' },
                { label: 'Deadline', value: 'Feb 6, 11:59 PM' },
                { label: 'Participants', value: '1,247' },
                { label: 'Prize Pool', value: '$50,000' }
              ].map((stat, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">{stat.label}</span>
                  <span className="text-gray-900 font-bold">{stat.value}</span>
                </div>
              ))}

              {teamData?.isGroup && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-blue-600 font-semibold mb-3">
                    <Users className="w-5 h-5" />
                    <span>Your Team</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Team Size:</span> {teamData.size} members
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Status:</span> <span className="text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Submission Section */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-linear-to-r from-blue-600 to-indigo-500 p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Submit Your Project</h2>
                  <p className="text-blue-100">Upload your project files, GitHub link, and demo video</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* GitHub Repository Link */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Github className="w-5 h-5 text-gray-600" />
                  GitHub Repository Link <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    placeholder="https://github.com/username/repository"
                    value={githubLink}
                    onChange={handleGithubLinkChange}
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 ${
                      errors.github
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.github && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.github}
                  </p>
                )}
                {githubLink && !errors.github && (
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Valid GitHub URL
                  </p>
                )}
              </div>

              {/* Project Files Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText className="w-5 h-5 text-gray-600" />
                  Project Files (ZIP, TAR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  accept=".zip,.tar,.gz,.rar"
                  className="hidden"
                />
                <label htmlFor="file-upload" className="block cursor-pointer">
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                    errors.file
                      ? 'border-red-300 bg-red-50/50'
                      : uploadedFile
                      ? 'border-green-300 bg-green-50/50'
                      : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50/50'
                  }`}>
                    {uploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                        <p className="text-gray-600 font-semibold">Uploading...</p>
                      </div>
                    ) : uploadedFile ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 font-bold">{uploadedFile.name}</p>
                            <p className="text-gray-600 text-sm">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); handleRemoveFile(); }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                          <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold mb-1">
                            Click to upload project files
                          </p>
                          <p className="text-gray-600 text-sm">
                            ZIP, TAR, RAR files (Max 100MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                {errors.file && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.file}
                  </p>
                )}
              </div>

              {/* Demo Video Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Video className="w-5 h-5 text-gray-600" />
                  Demo Video (Optional)
                </label>
                <input
                  type="file"
                  id="video-upload"
                  onChange={handleVideoUpload}
                  accept="video/*"
                  className="hidden"
                />
                <label htmlFor="video-upload" className="block cursor-pointer">
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                    errors.video
                      ? 'border-red-300 bg-red-50/50'
                      : uploadedVideo
                      ? 'border-purple-300 bg-purple-50/50'
                      : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50/50'
                  }`}>
                    {uploadingVideo ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                        <p className="text-gray-600 font-semibold">Uploading video...</p>
                      </div>
                    ) : uploadedVideo ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <Video className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 font-bold">{uploadedVideo.name}</p>
                            <p className="text-gray-600 text-sm">
                              {(uploadedVideo.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); handleRemoveVideo(); }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                          <Video className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold mb-1">
                            Click to upload demo video
                          </p>
                          <p className="text-gray-600 text-sm">
                            MP4, MOV, AVI files (Max 500MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                {errors.video && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.video}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Submit Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Submission Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Submission Checklist
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Include a comprehensive README with setup instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Provide a valid GitHub repository URL with your source code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Upload a demo video showcasing your project's key features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Document all dependencies and environment setup details</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;