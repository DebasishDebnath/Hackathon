import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Users,
  Code2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { API_ENDPOINTS } from "../api/Apiconfig";

const RegisterPage = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: "",
    name: "",
    email: "",
    password: "",
    topicId: "", // You'll need to pass this from props or a topic selector
    isGroup: false,
    groupSize: 2,
    groupMembers: [],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.teamName.trim()) newErrors.teamName = "Team name is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.isGroup) {
      formData.groupMembers.forEach((member, idx) => {
        if (!member.name?.trim()) {
          newErrors[`member${idx}name`] = "Member name is required";
        }
        if (!member.email) {
          newErrors[`member${idx}email`] = "Member email is required";
        } else if (!/\S+@\S+\.\S+/.test(member.email)) {
          newErrors[`member${idx}email`] = "Invalid email";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGroupToggle = () => {
    const newIsGroup = !formData.isGroup;
    setFormData({
      ...formData,
      isGroup: newIsGroup,
      groupMembers: newIsGroup
        ? Array(formData.groupSize - 1).fill({ name: "", email: "" })
        : [],
    });
  };

  const handleGroupSizeChange = (size) => {
    const newSize = parseInt(size);
    const membersCount = newSize - 1;
    setFormData({
      ...formData,
      groupSize: newSize,
      groupMembers: Array(membersCount)
        .fill(null)
        .map((_, idx) => formData.groupMembers[idx] || { name: "", email: "" }),
    });
  };

  const handleMemberChange = (idx, field, value) => {
    const newMembers = [...formData.groupMembers];
    newMembers[idx] = { ...newMembers[idx], [field]: value };
    setFormData({ ...formData, groupMembers: newMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare API payload
      const payload = {
        teamName: formData.teamName,
        topicId: formData.topicId || "698329b0910b412de07db77f", // Use provided or default
        teamLeaderName: formData.name,
        teamLeaderEmail: formData.email,
        teamPassword: formData.password,
      };

      // Add team members if group registration
      if (formData.isGroup && formData.groupMembers.length > 0) {
        formData.groupMembers.forEach((member, idx) => {
          payload[`teamMember${idx + 1}Name`] = member.name;
          payload[`teamMember${idx + 1}Email`] = member.email;
        });
      }

      // Make API call
      const response = await fetch(API_ENDPOINTS.TEAM_CREATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Success - call the onRegister callback
      const teamData = formData.isGroup
        ? {
            isGroup: true,
            size: formData.groupSize,
            members: formData.groupMembers,
          }
        : { isGroup: false };

      onRegister({ name: formData.name, email: formData.email }, teamData);

      // Navigate to success page or dashboard
      // navigate('/dashboard');
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(
        error.message ||
          "An error occurred during registration. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 -right-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl shadow-lg shadow-blue-500/50 mb-4">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
            Join HackSphere
          </h1>
          <p className="text-gray-600">Start your innovation journey today</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-500/10 p-8 border border-gray-100 animate-slide-up">
          {/* API Error Message */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 font-semibold text-sm">
                  Registration Failed
                </p>
                <p className="text-red-600 text-sm mt-1">{apiError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Team Name
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your team name"
                  value={formData.teamName}
                  onChange={(e) =>
                    setFormData({ ...formData, teamName: e.target.value })
                  }
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 ${
                    errors.teamName
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.teamName && (
                <div className="flex items-center gap-1 text-red-500 text-sm animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.teamName}</span>
                </div>
              )}
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name (Team Leader)
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 ${
                    errors.name
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1 text-red-500 text-sm animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-red-500 text-sm animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 text-red-500 text-sm animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Group Registration Toggle */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-100">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.isGroup}
                    onChange={handleGroupToggle}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-blue-500 transition-all duration-300 shadow-inner"></div>
                  <div className="absolute left-1 top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-7"></div>
                </div>
                <span className="ml-4 text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  Add team members?
                </span>
              </label>
            </div>

            {/* Group Members Section */}
            {formData.isGroup && (
              <div className="space-y-4 animate-fade-in">
                {/* Group Size Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Number of Additional Members
                  </label>
                  <select
                    value={formData.groupSize}
                    onChange={(e) => handleGroupSizeChange(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="2">1 Additional Member</option>
                    <option value="3">2 Additional Members</option>
                    <option value="4">3 Additional Members</option>
                  </select>
                </div>

                {/* Group Members Cards */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                    <Users className="w-5 h-5" />
                    <span>Team Members</span>
                  </div>

                  {formData.groupMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-5 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 animate-slide-up"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {idx + 2}
                        </div>
                        <span className="font-semibold text-gray-700">
                          Member {idx + 2}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <input
                            type="text"
                            placeholder="Member name"
                            value={member.name}
                            onChange={(e) =>
                              handleMemberChange(idx, "name", e.target.value)
                            }
                            className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 ${
                              errors[`member${idx}name`]
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 focus:border-blue-500"
                            }`}
                          />
                          {errors[`member${idx}name`] && (
                            <div className="flex items-center gap-1 text-red-500 text-sm mt-1 animate-shake">
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors[`member${idx}name`]}</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <input
                            type="email"
                            placeholder="member@example.com"
                            value={member.email}
                            onChange={(e) =>
                              handleMemberChange(idx, "email", e.target.value)
                            }
                            className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 ${
                              errors[`member${idx}email`]
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 focus:border-blue-500"
                            }`}
                          />
                          {errors[`member${idx}email`] && (
                            <div className="flex items-center gap-1 text-red-500 text-sm mt-1 animate-shake">
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors[`member${idx}email`]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
