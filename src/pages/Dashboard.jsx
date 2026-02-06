import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, Trophy, Calendar, Users, FileText, Upload, 
  LogOut, Menu, X, ArrowRight, Check, Github, Video, Link2, Trash2, Database, PenLine,
  Sparkles, Rocket, Target, Award, Clock, TrendingUp
} from 'lucide-react';

const Dashboard = ({ user, teamData, onLogout }) => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadedDataset, setUploadedDataset] = useState(null);
  const [githubLink, setGithubLink] = useState('');
  const [researchImpactNote, setResearchImpactNote] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingDataset, setUploadingDataset] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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
      if (file.size > 500 * 1024 * 1024) {
        setErrors({ ...errors, video: 'Video size must be less than 500MB' });
        return;
      }
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

  const handleDatasetUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setErrors({ ...errors, dataset: 'Dataset size must be less than 50MB' });
        return;
      }
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setErrors({ ...errors, dataset: 'Please upload a valid CSV file' });
        return;
      }
      setErrors({ ...errors, dataset: '' });
      setUploadingDataset(true);
      setTimeout(() => {
        setUploadedDataset(file);
        setUploadingDataset(false);
      }, 1500);
    }
  };

  const handleRemoveDataset = () => {
    setUploadedDataset(null);
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
      alert('Project submitted successfully!');
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-6 w-56 h-56 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-12 right-8 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-lg shadow-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 relative">
                <Code2 className="w-5 h-5 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-indigo-400/50 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  HackSphere
                </span>
                <p className="text-xs text-gray-500 font-medium">Innovation Hub</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="px-4 py-2 text-sm font-bold text-blue-700 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl hover:from-blue-200 hover:to-indigo-200 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 border border-blue-200/50 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Dashboard
              </div>
              
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border-2 border-red-200 hover:border-red-400 hover:shadow-md hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl animate-slideDown">
            <div className="px-4 py-4 space-y-3">
              <button className="w-full px-4 py-3 text-left text-sm font-bold text-blue-700 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl shadow-md">
                Dashboard
              </button>
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all border-2 border-red-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fadeInUp">
          {[
            { icon: Clock, label: 'Time Left', value: '48h', color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
            { icon: Users, label: 'Participants', value: '1,247', color: 'purple', gradient: 'from-purple-500 to-pink-500' },
            { icon: Award, label: 'Prize Pool', value: '$50K', color: 'yellow', gradient: 'from-yellow-500 to-orange-500' },
            { icon: Target, label: 'Projects', value: '342', color: 'green', gradient: 'from-green-500 to-emerald-500' }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-scaleIn"
              style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm font-semibold mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden animate-slideInLeft hover:shadow-3xl transition-all duration-500">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-4 text-white relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl">
                  <FileText className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-3xl font-black mb-1">Hackathon Guidelines</h2>
                  <p className="text-blue-100 font-medium">Everything you need to know</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {[
                {
                  number: '1',
                  icon: Users,
                  title: 'Registration & Team Formation',
                  description: 'Complete your registration and form teams of up to 4 members. All team members must be registered on the platform.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  number: '2',
                  icon: Rocket,
                  title: 'Project Development',
                  description: 'Build your innovative project within the hackathon timeframe. Focus on creativity, functionality, and user experience.',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  number: '3',
                  icon: Upload,
                  title: 'Submission Requirements',
                  description: 'Upload your project files, complete documentation, and a demo video. Ensure all files are properly packaged in supported formats.',
                  color: 'from-orange-500 to-red-500'
                },
                {
                  number: '4',
                  icon: Trophy,
                  title: 'Judging Criteria',
                  description: 'Projects will be evaluated on innovation (30%), technical execution (30%), design quality (20%), and presentation (20%).',
                  color: 'from-green-500 to-emerald-500'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200/50 hover:border-transparent hover:shadow-2xl transition-all duration-500 animate-slideInUp overflow-hidden"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" 
                       style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
                  <div className="flex gap-5 relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0`}>
                      {item.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <h4 className="font-black text-gray-900 text-lg">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden animate-slideInRight hover:shadow-3xl transition-all duration-500">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-3 text-white relative z-10">
                <Calendar className="w-8 h-8 animate-bounce" />
                <h2 className="text-2xl font-black">Event Info</h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {[
                { label: 'Duration', value: '48 Hours', icon: Clock },
                { label: 'Deadline', value: 'Feb 6, 11:59 PM', icon: Calendar },
                { label: 'Participants', value: '1,247', icon: Users },
                { label: 'Prize Pool', value: '$50,000', icon: Award }
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group border border-gray-200/50 hover:border-blue-300/50 hover:shadow-lg animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-bold">{stat.label}</span>
                  </div>
                  <span className="text-gray-900 font-black text-lg">{stat.value}</span>
                </div>
              ))}

              {teamData?.isGroup && (
                <div className="mt-8 pt-8 border-t-2 border-gray-200 animate-fadeIn">
                  <div className="flex items-center gap-2 text-blue-600 font-black mb-4 text-lg">
                    <Users className="w-6 h-6" />
                    <span>Your Team</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                      <span className="font-bold text-gray-700">Team Size:</span>
                      <span className="ml-2 text-blue-600 font-black">{teamData.size} members</span>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                      <span className="font-bold text-gray-700">Status:</span>
                      <span className="ml-2 text-green-600 font-black flex items-center gap-1 inline-flex">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-4 text-white relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl">
                  <Upload className="w-8 h-8 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-3xl font-black mb-1">Submit Your Project</h2>
                  <p className="text-blue-100 font-medium">Upload your project files, GitHub link, and demo video</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3 animate-fadeIn">
                <label className="flex items-center gap-2 text-sm font-black text-gray-800 uppercase tracking-wide">
                  <Github className="w-6 h-6 text-gray-700" />
                  Github / Collab/ Drive Repo link <span className="text-red-500 text-xl">*</span>
                </label>
                <div className="relative group">
                  <Link2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="url"
                    placeholder="https://github.com/username/repository"
                    value={githubLink}
                    onChange={handleGithubLinkChange}
                    className={`w-full pl-14 pr-5 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 font-medium ${
                      errors.github
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.github && (
                  <p className="text-red-500 text-sm font-bold flex items-center gap-2 animate-shake">
                    <X className="w-4 h-4" />
                    {errors.github}
                  </p>
                )}
                {githubLink && !errors.github && (
                  <p className="text-green-600 text-sm font-bold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    Valid GitHub URL
                  </p>
                )}
              </div>
              <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <label className="flex items-center gap-2 text-sm font-black text-gray-800 uppercase tracking-wide">
                  <FileText className="w-6 h-6 text-gray-700" />
                  Project Files (ZIP, TAR) <span className="text-red-500 text-xl">*</span>
                </label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  accept=".zip,.tar,.gz,.rar"
                  className="hidden"
                />
                <label htmlFor="file-upload" className="block cursor-pointer group">
                  <div className={`border-3 border-dashed rounded-3xl p-8 text-center transition-all duration-500 ${
                    errors.file
                      ? 'border-red-400 bg-red-50/50'
                      : uploadedFile
                      ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50'
                      : 'border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 group-hover:shadow-xl'
                  }`}>
                    {uploading ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
                          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-700 font-black text-lg">Uploading...</p>
                      </div>
                    ) : uploadedFile ? (
                      <div className="flex items-center justify-between animate-scaleIn">
                        <div className="flex items-center gap-5">
                          <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/50">
                            <Check className="w-8 h-8 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400/50 to-emerald-400/50 rounded-2xl blur-lg"></div>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 font-black text-lg">{uploadedFile.name}</p>
                            <p className="text-gray-600 font-semibold">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); handleRemoveFile(); }}
                          className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-300 hover:scale-110"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Upload className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-black text-lg mb-2">
                            Click to upload project files
                          </p>
                          <p className="text-gray-600 font-medium">
                            ZIP, TAR, RAR files (Max 100MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                {errors.file && (
                  <p className="text-red-500 text-sm font-bold flex items-center gap-2 animate-shake">
                    <X className="w-4 h-4" />
                    {errors.file}
                  </p>
                )}
              </div>
              <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <label className="flex items-center gap-2 text-sm font-black text-gray-800 uppercase tracking-wide">
                  <Video className="w-6 h-6 text-gray-700" />
                  Demo Video (Optional)
                </label>
                <input
                  type="file"
                  id="video-upload"
                  onChange={handleVideoUpload}
                  accept="video/*"
                  className="hidden"
                />
                <label htmlFor="video-upload" className="block cursor-pointer group">
                  <div className={`border-3 border-dashed rounded-3xl p-8 text-center transition-all duration-500 ${
                    errors.video
                      ? 'border-red-400 bg-red-50/50'
                      : uploadedVideo
                      ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50'
                      : 'border-gray-300 hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 group-hover:shadow-xl'
                  }`}>
                    {uploadingVideo ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-ping"></div>
                          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-700 font-black text-lg">Uploading video...</p>
                      </div>
                    ) : uploadedVideo ? (
                      <div className="flex items-center justify-between animate-scaleIn">
                        <div className="flex items-center gap-5">
                          <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
                            <Video className="w-8 h-8 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/50 to-pink-400/50 rounded-2xl blur-lg"></div>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 font-black text-lg">{uploadedVideo.name}</p>
                            <p className="text-gray-600 font-semibold">
                              {(uploadedVideo.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); handleRemoveVideo(); }}
                          className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-300 hover:scale-110"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Video className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-black text-lg mb-2">
                            Click to upload demo video
                          </p>
                          <p className="text-gray-600 font-medium">
                            MP4, MOV, AVI files (Max 500MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                {errors.video && (
                  <p className="text-red-500 text-sm font-bold flex items-center gap-2 animate-shake">
                    <X className="w-4 h-4" />
                    {errors.video}
                  </p>
                )}
              </div>
              <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <label className="flex items-center gap-2 text-sm font-black text-gray-800 uppercase tracking-wide">
                  <Database className="w-6 h-6 text-gray-700" />
                  Link to Dataset (Optional)
                </label>
                <input
                  type="file"
                  id="dataset-upload"
                  onChange={handleDatasetUpload}
                  accept=".csv"
                  className="hidden"
                />
                <label htmlFor="dataset-upload" className="block cursor-pointer group">
                  <div className={`border-3 border-dashed rounded-3xl p-8 text-center transition-all duration-500 ${
                    errors.dataset
                      ? 'border-red-400 bg-red-50/50'
                      : uploadedDataset
                      ? 'border-teal-400 bg-gradient-to-br from-teal-50 to-cyan-50'
                      : 'border-gray-300 hover:border-teal-500 hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 group-hover:shadow-xl'
                  }`}>
                    {uploadingDataset ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 border-4 border-teal-200 rounded-full animate-ping"></div>
                          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-700 font-black text-lg">Uploading dataset...</p>
                      </div>
                    ) : uploadedDataset ? (
                      <div className="flex items-center justify-between animate-scaleIn">
                        <div className="flex items-center gap-5">
                          <div className="relative w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/50">
                            <Database className="w-8 h-8 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/50 to-cyan-400/50 rounded-2xl blur-lg"></div>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 font-black text-lg">{uploadedDataset.name}</p>
                            <p className="text-gray-600 font-semibold">
                              {(uploadedDataset.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); handleRemoveDataset(); }}
                          className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-300 hover:scale-110"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Database className="w-8 h-8 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-black text-lg mb-2">
                            Click to upload dataset
                          </p>
                          <p className="text-gray-600 font-medium">
                            CSV files only (Max 50MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                {errors.dataset && (
                  <p className="text-red-500 text-sm font-bold flex items-center gap-2 animate-shake">
                    <X className="w-4 h-4" />
                    {errors.dataset}
                  </p>
                )}
              </div>
              <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <label className="flex items-center gap-2 text-sm font-black text-gray-800 uppercase tracking-wide">
                  <PenLine className="w-6 h-6 text-gray-700" />
                  Short Research Impact Note (Optional)
                </label>
                <textarea
                  placeholder="Briefly describe the research impact and potential applications of your project..."
                  value={researchImpactNote}
                  onChange={(e) => setResearchImpactNote(e.target.value)}
                  rows={4}
                  maxLength={500}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none font-medium hover:border-gray-300"
                />
                <p className="text-gray-500 font-semibold text-sm text-right">
                  {researchImpactNote.length}/500 characters
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/50 hover:shadow-3xl hover:shadow-blue-500/60 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden animate-fadeIn"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-3">
                  Submit Project
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200/50 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-3 text-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  Submission Checklist
                </h4>
                <ul className="space-y-3 text-sm">
                  {[
                    'Include a comprehensive README with setup instructions',
                    'Provide a valid GitHub repository URL with your source code',
                    'Upload a demo video showcasing your project\'s key features',
                    'Document all dependencies and environment setup details'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group animate-fadeIn" style={{ animationDelay: `${0.7 + idx * 0.1}s` }}>
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mt-0.5 shrink-0 group-hover:scale-110 transition-transform shadow-md">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-semibold leading-relaxed">{item}</span>
                    </li>
                  ))}
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


