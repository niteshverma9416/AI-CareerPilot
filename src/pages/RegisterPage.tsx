import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Compass, Check, AlertCircle, BarChart, CheckCircle, Trophy, Map, ShieldAlert, Zap } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { paths } from "@/constants";
import { useRegisterMutation } from "@/hooks";

// Zod Validation Schema
const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must not exceed 50 characters")
      .trim(),
    email: z.string().email("Please enter a valid email address").trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .refine((val) => /[A-Z]/.test(val), "Must contain at least one uppercase letter")
      .refine((val) => /[a-z]/.test(val), "Must contain at least one lowercase letter")
      .refine((val) => /[0-9]/.test(val), "Must contain at least one numeric digit"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: undefined,
    },
  });

  const isPending = registerMutation.isPending;

  // Watch password field for strength meter
  const passwordValue = watch("password") || "";

  // Password strength validation checks
  const criteria = [
    { label: "At least 8 characters", met: passwordValue.length >= 8 },
    { label: "At least 1 uppercase letter", met: /[A-Z]/.test(passwordValue) },
    { label: "At least 1 lowercase letter", met: /[a-z]/.test(passwordValue) },
    { label: "At least 1 number", met: /[0-9]/.test(passwordValue) },
  ];

  const metCount = criteria.filter((c) => c.met).length;

  // Determine strength label & color
  let strengthLabel = "Very Weak";
  let strengthColor = "bg-red-500";
  if (metCount === 2) {
    strengthLabel = "Weak";
    strengthColor = "bg-orange-500";
  } else if (metCount === 3) {
    strengthLabel = "Medium";
    strengthColor = "bg-yellow-500";
  } else if (metCount === 4) {
    strengthLabel = "Strong";
    strengthColor = "bg-emerald-500";
  }

  const onSubmit = (data: RegisterFormData) => {
    const { fullName, email, password } = data;

    registerMutation.mutate(
      { fullName, email, password },
      {
        onSuccess: () => {
          toast.success("Registration Successful");
          setTimeout(() => {
            navigate(paths.login);
          }, 1000);
        },
        onError: (error: unknown) => {
          let errorMsg = "Registration failed. Please try again.";
          if (axios.isAxiosError(error)) {
            errorMsg = error.response?.data?.message || error.message || errorMsg;
          } else if (error instanceof Error) {
            errorMsg = error.message;
          }
          toast.error(errorMsg);
        },
      }
    );
  };

  // Generate random particles for backdrop
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 8 + 8,
  }));

  return (
    <div className="min-h-screen min-w-full flex bg-[#0B1120] relative overflow-hidden">
      
      {/* Background Animated Blobs for entire screen */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] rounded-full bg-indigo-600/5 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full bg-cyan-600/5 blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "-4s" }} />

      {/* LEFT SIDE (Illustration & branding, 60% width - hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[60%] flex-col justify-between p-12 relative border-r border-slate-800/40 bg-gradient-to-br from-[#0B1120] via-[#070D19] to-[#0B1120] bg-grid-pattern z-10">
        
        {/* Top Branding Logo */}
        <div>
          <Link
            to={isPending ? "#" : paths.home}
            className={`inline-flex items-center gap-2.5 group ${isPending ? "pointer-events-none" : ""}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:rotate-12 transition-transform duration-300">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
              AI CareerPilot
            </span>
          </Link>
        </div>

        {/* Center illustration & copy */}
        <div className="my-auto max-w-xl space-y-12">
          {/* Header copy */}
          <div className="space-y-4">
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                AI Career Coach
              </span>
            </h2>
            <p className="text-slate-400 text-sm xl:text-base leading-relaxed">
              Analyze your resume, prepare for interviews, discover skill gaps and land your dream job.
            </p>
          </div>

          {/* AI Mock Illustration Container with Floating Cards */}
          <div className="relative w-full h-[320px] flex items-center justify-center">
            
            {/* Cybernetic Illustration Centerpiece */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-48 h-48 rounded-full border-2 border-dashed border-indigo-500/20 flex items-center justify-center relative"
            >
              <div className="w-36 h-36 rounded-full border border-indigo-500/10 flex items-center justify-center bg-indigo-500/5 backdrop-blur-sm">
                <Compass className="h-16 w-16 text-indigo-400/50 animate-pulse" />
              </div>
            </motion.div>

            {/* Floating Glass Cards */}
            {/* 1. ATS Score */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 left-6 p-3 glass-card rounded-2xl shadow-lg border border-slate-700/30 flex items-center gap-2.5"
            >
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <BarChart className="h-4 w-4" />
              </span>
              <div>
                <span className="text-[10px] block text-slate-500 uppercase font-semibold">ATS score</span>
                <span className="text-xs font-bold text-white">98% Perfect</span>
              </div>
            </motion.div>

            {/* 2. Resume Analyzer */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-2 right-12 p-3 glass-card rounded-2xl shadow-lg border border-slate-700/30 flex items-center gap-2.5"
            >
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <CheckCircle className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-slate-200">Resume Analyzer</span>
              </div>
            </motion.div>

            {/* 3. Job Match */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 left-2 p-3 glass-card rounded-2xl shadow-lg border border-slate-700/30 flex items-center gap-2.5"
            >
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Zap className="h-4 w-4" />
              </span>
              <div>
                <span className="text-[10px] block text-slate-500 uppercase font-semibold">Job Match</span>
                <span className="text-xs font-bold text-white">94% Matching</span>
              </div>
            </motion.div>

            {/* 4. Interview Ready */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-4 right-6 p-3 glass-card rounded-2xl shadow-lg border border-slate-700/30 flex items-center gap-2.5"
            >
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Trophy className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-slate-200">Interview Ready</span>
              </div>
            </motion.div>

            {/* 5. Skill Gap */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 -left-12 p-3 glass-card rounded-2xl shadow-lg border border-slate-700/30 flex items-center gap-2.5"
            >
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400">
                <ShieldAlert className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-slate-200">Skill Gaps Checked</span>
              </div>
            </motion.div>

            {/* 6. Learning Roadmap */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute top-1/2 -right-12 p-3 glass-card rounded-2xl shadow-lg border border-slate-700/30 flex items-center gap-2.5"
            >
              <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                <Map className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-slate-200">Learning Roadmap</span>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Bottom stats row */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/40">
          <div>
            <div className="text-xl font-bold text-white">10K+</div>
            <div className="text-xs text-slate-500">Users Registered</div>
          </div>
          <div className="border-l border-slate-850 pl-6">
            <div className="text-xl font-bold text-white">25K+</div>
            <div className="text-xs text-slate-500">Resumes Audited</div>
          </div>
          <div className="border-l border-slate-850 pl-6">
            <div className="text-xl font-bold text-white">95%</div>
            <div className="text-xs text-slate-500">ATS Match Accuracy</div>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE (Register Form Card, 40% width / 100% Mobile) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-6 sm:px-12 py-16 relative z-10 overflow-y-auto max-h-screen">
        
        {/* Mobile Header Branding (Visible on mobile/tablet) */}
        <div className="absolute top-8 left-8 lg:hidden">
          <Link
            to={isPending ? "#" : paths.home}
            className={`flex items-center gap-2.5 ${isPending ? "pointer-events-none" : ""}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-md">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-base font-bold text-white">AI CareerPilot</span>
          </Link>
        </div>

        {/* Floating Particles for login bg */}
        <div className="absolute inset-0 pointer-events-none lg:hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-slate-500/10"
              style={{
                width: p.size,
                height: p.size,
                left: `${50 + p.x}%`,
                top: `${50 + p.y}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Centered Glass Register Card */}
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-[24px] border border-slate-800 bg-[#0F172A]/80 backdrop-blur-md shadow-2xl relative"
          >
            {/* Header */}
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Create Your Account</h1>
              <p className="text-xs text-slate-400 leading-normal">
                Join AI CareerPilot and optimize your career journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Jane Doe"
                  disabled={isPending}
                  {...register("fullName")}
                  className={`w-full h-11 px-4 rounded-xl border bg-slate-950/40 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                  } ${
                    errors.fullName
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-slate-800 focus:border-indigo-500/50 focus:ring-indigo-500/25"
                  }`}
                />
                {errors.fullName && (
                  <p className="flex items-center gap-1 text-[11px] font-medium text-red-400 mt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email address */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane.doe@example.com"
                  disabled={isPending}
                  {...register("email")}
                  className={`w-full h-11 px-4 rounded-xl border bg-slate-950/40 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                  } ${
                    errors.email
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-slate-800 focus:border-indigo-500/50 focus:ring-indigo-500/25"
                  }`}
                />
                {errors.email && (
                  <p className="flex items-center gap-1 text-[11px] font-medium text-red-400 mt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isPending}
                    {...register("password")}
                    className={`w-full h-11 pl-4 pr-11 rounded-xl border bg-slate-950/40 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                      isPending ? "opacity-50 cursor-not-allowed" : ""
                    } ${
                      errors.password
                        ? "border-red-500/50 focus:ring-red-500/20"
                        : "border-slate-800 focus:border-indigo-500/50 focus:ring-indigo-500/25"
                    }`}
                  />
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1 text-[11px] font-medium text-red-400 mt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.password.message}
                  </p>
                )}

                {/* Password Strength Meter */}
                {passwordValue.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-850/60 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Strength</span>
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">{strengthLabel}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-full rounded-full transition-colors duration-300 ${
                            i < metCount ? strengthColor : "bg-slate-800"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-1.5 border-t border-slate-800/40">
                      {criteria.map((c) => (
                        <div key={c.label} className="flex items-center gap-1.5">
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] ${
                              c.met
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "border-slate-800 text-slate-600 bg-slate-950/40"
                            }`}
                          >
                            {c.met ? <Check className="h-2.5 w-2.5" /> : null}
                          </span>
                          <span className={`text-[10px] leading-none ${c.met ? "text-slate-300" : "text-slate-500"}`}>
                            {c.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isPending}
                    {...register("confirmPassword")}
                    className={`w-full h-11 pl-4 pr-11 rounded-xl border bg-slate-950/40 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                      isPending ? "opacity-50 cursor-not-allowed" : ""
                    } ${
                      errors.confirmPassword
                        ? "border-red-500/50 focus:ring-red-500/20"
                        : "border-slate-800 focus:border-indigo-500/50 focus:ring-indigo-500/25"
                    }`}
                  />
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors disabled:opacity-50"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="flex items-center gap-1 text-[11px] font-medium text-red-400 mt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="space-y-1.5">
                <label className={`relative flex items-start gap-3 py-1 ${isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                  <input
                    type="checkbox"
                    disabled={isPending}
                    {...register("agreeToTerms")}
                    className="peer sr-only"
                  />
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-800 bg-slate-950/40 text-white transition-all peer-checked:bg-indigo-500 peer-checked:border-indigo-500 peer-focus:ring-2 peer-focus:ring-indigo-500/20">
                    <Check className="h-3.5 w-3.5 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-xs text-slate-400 leading-normal select-none">
                    I agree to the{" "}
                    <a href="#home" className="text-indigo-400 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#home" className="text-indigo-400 hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="flex items-center gap-1 text-[11px] font-medium text-red-400 mt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.agreeToTerms.message}
                  </p>
                )}
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-95 transition-all duration-300 hover:scale-[1.01] active:scale-98 disabled:pointer-events-none disabled:opacity-50 mt-2"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <hr className="w-full border-slate-850" />
              <span className="absolute px-4 bg-[#0F172A] text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                Or continue with
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              {/* Google */}
              <button
                type="button"
                disabled={isPending}
                onClick={() => console.log("Continue with Google clicked")}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              {/* GitHub */}
              <button
                type="button"
                disabled={isPending}
                onClick={() => console.log("Continue with GitHub clicked")}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to={isPending ? "#" : paths.login}
                className={`font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors ml-1 ${
                  isPending ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>

      </div>

    </div>
  );
}
export default RegisterPage;
