import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Info,
  Check,
  Sparkles,
  CloudUpload,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import {
  useLatestResumeQuery,
  useUploadResumeMutation,
  useDeleteResumeMutation,
  useAnalyzeResumeMutation
} from "@/hooks";

type LocalPreviewFile = {
  name: string;
  size: string;
  type: string;
};

export function ResumePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Local selected file state (before uploading)
  const [selectedRawFile, setSelectedRawFile] = useState<File | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<LocalPreviewFile | null>(null);

  // TanStack Query hooks
  const { data: latestResume, isLoading: isLatestLoading, isError: isLatestError, error: latestError } = useLatestResumeQuery();
  const uploadMutation = useUploadResumeMutation();
  const deleteMutation = useDeleteResumeMutation();
  const analyzeMutation = useAnalyzeResumeMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Enforce file size limit of 5MB
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5 MB limit.");
        return;
      }

      // Enforce file type constraints (.pdf, .doc, .docx)
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension !== "pdf" && extension !== "docx" && extension !== "doc") {
        toast.error("Invalid file format. Only PDF and Word documents are supported.");
        return;
      }

      setSelectedRawFile(file);
      setSelectedFilePreview({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        type: file.type || "application/octet-stream",
      });
      toast.success("Resume selected. Ready for upload!");
    }
  };

  const handleChooseClick = () => {
    if (uploadMutation.isPending) return;
    fileInputRef.current?.click();
  };

  const handleRemoveClick = () => {
    if (uploadMutation.isPending) return;
    setSelectedRawFile(null);
    setSelectedFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Selection cleared.");
  };

  const handleUploadClick = () => {
    if (!selectedRawFile || uploadMutation.isPending) return;

    uploadMutation.mutate(selectedRawFile, {
      onSuccess: () => {
        setSelectedRawFile(null);
        setSelectedFilePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success("Resume uploaded successfully!");
      },
      onError: (error: any) => {
        const errorMsg = error.response?.data?.message || error.message || "Failed to upload resume.";
        toast.error(errorMsg);
      },
    });
  };

  const handleDeleteClick = (id: string) => {
    if (deleteMutation.isPending) return;
    if (confirm("Are you sure you want to remove your active resume?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Resume removed successfully.");
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to remove resume.");
        },
      });
    }
  };

  const handleAnalyzeClick = (id: string) => {
    if (analyzeMutation.isPending) return;
    toast.loading("Analyzing resume using AI...", { id: "analyze" });
    analyzeMutation.mutate(id, {
      onSuccess: () => {
        toast.success("AI Analysis complete!", { id: "analyze" });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to complete AI Analysis.", { id: "analyze" });
      },
    });
  };

  // 1. Loading Skeleton States
  if (isLatestLoading) {
    return (
      <div className="space-y-8 pb-10 animate-pulse">
        {/* Banner Skeleton */}
        <div className="h-44 bg-slate-800/30 rounded-[24px]" />
        
        {/* Main Columns Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-56 bg-slate-800/30 rounded-[24px]" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="h-24 bg-slate-800/30 rounded-2xl" />
              <div className="h-24 bg-slate-800/30 rounded-2xl" />
              <div className="h-24 bg-slate-800/30 rounded-2xl" />
              <div className="h-24 bg-slate-800/30 rounded-2xl" />
            </div>
            <div className="h-44 bg-slate-800/30 rounded-[24px]" />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="h-64 bg-slate-800/30 rounded-[24px]" />
            <div className="h-48 bg-slate-800/30 rounded-[24px]" />
          </div>
        </div>
      </div>
    );
  }

  // 2. API Failure Error States
  if (isLatestError && latestError) {
    return (
      <div className="p-8 rounded-[24px] border border-red-500/20 bg-red-500/5 text-center space-y-4">
        <h2 className="text-lg font-bold text-red-400">Failed to fetch resume</h2>
        <p className="text-xs text-slate-400">
          {(latestError as any).response?.data?.message || latestError.message || "An unexpected network error occurred."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      
      {/* Hero Welcome Header Banner */}
      <div className="p-8 rounded-[24px] border border-slate-800 bg-gradient-to-r from-[#0F172A] via-[#090F1E] to-[#0F172A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 blur-[60px] pointer-events-none rounded-full" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            AI Audit Suites
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Resume Manager</h1>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Upload, manage and analyze your resume using AI.
          </p>
        </div>
      </div>

      {/* Split-screen Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Render upload dropzone conditionally if no resume is stored on database */}
          {!latestResume ? (
            <div className="p-6 md:p-8 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-6">
              <div 
                className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-800 transition-all cursor-pointer group ${
                  uploadMutation.isPending ? "opacity-50 cursor-not-allowed" : "hover:border-indigo-500/40 hover:bg-indigo-500/[0.02]"
                }`}
                onClick={handleChooseClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  disabled={uploadMutation.isPending}
                  aria-label="Upload resume file"
                />
                <span className="p-4 rounded-full bg-slate-900 border border-slate-850 text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all shadow-inner">
                  <CloudUpload className="h-7 w-7" />
                </span>
                <h3 className="text-sm font-bold text-slate-200 mt-4">Drag & Drop your Resume here</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-normal">
                  Supported formats: PDF, DOCX (Maximum 5 MB)
                </p>
                
                <button
                  type="button"
                  disabled={uploadMutation.isPending}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-indigo-500 text-xs font-semibold text-white shadow-md hover:bg-indigo-600 hover:scale-102 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Choose Resume
                </button>
              </div>
            </div>
          ) : (
            /* Active Resume Details card (rendered when latestResume exists) */
            <div className="p-6 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Resume Details</h3>
              <div className="p-5 rounded-2xl border border-slate-850 bg-slate-950/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                    <FileText className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-100 truncate pr-2">
                      {latestResume.originalName}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1.5 leading-none">
                      Size: {(latestResume.fileSize / (1024 * 1024)).toFixed(2)} MB • Uploaded: {new Date(latestResume.uploadedAt || latestResume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">ATS Score</span>
                    <span className="text-sm font-extrabold text-indigo-400">
                      {latestResume.atsScore ? `${latestResume.atsScore}%` : "Pending"}
                    </span>
                  </div>
                  <div className="h-10 w-10 rounded-full border-2 border-indigo-500/30 flex items-center justify-center text-xs font-bold text-white relative">
                    <span className="absolute inset-0 rounded-full border-2 border-t-indigo-500 border-r-indigo-500 border-b-indigo-500 border-l-transparent" />
                    {latestResume.atsScore ? latestResume.atsScore : "--"}
                  </div>
                </div>
              </div>

              {/* Operational Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  disabled={uploadMutation.isPending}
                />
                
                <button
                  type="button"
                  onClick={handleChooseClick}
                  disabled={uploadMutation.isPending}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-850 bg-slate-900/50 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Replace Resume
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteClick(latestResume._id)}
                  disabled={deleteMutation.isPending}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-xs font-semibold text-red-400 transition-all disabled:opacity-50"
                >
                  {deleteMutation.isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Removing...
                    </>
                  ) : (
                    "Remove Resume"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleAnalyzeClick(latestResume._id)}
                  disabled={analyzeMutation.isPending || latestResume.analysisStatus === "completed"}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {analyzeMutation.isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Analyzing...
                    </>
                  ) : latestResume.analysisStatus === "completed" ? (
                    "Audited"
                  ) : (
                    "Analyze Resume"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Conditional Local Preview Card (for selected files waiting to upload) */}
          <AnimatePresence>
            {selectedFilePreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Local Selection Preview</h3>
                  
                  <div className="p-5 rounded-2xl border border-slate-850 bg-slate-950/40 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                        <FileText className="h-6 w-6" />
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-100 truncate pr-2">
                          {selectedFilePreview.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-1.5 leading-none">
                          Size: {selectedFilePreview.size} • Type: {selectedFilePreview.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {uploadMutation.isPending && (
                        <Loader2 className="h-6 w-6 text-indigo-400 animate-spin" />
                      )}
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  {uploadMutation.isPending && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>Uploading file...</span>
                        <span>In progress</span>
                      </div>
                      <div className="w-full bg-slate-850 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: "5%" }}
                          animate={{ width: "95%" }}
                          transition={{ duration: 2 }}
                          className="bg-indigo-500 h-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Upload Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={handleChooseClick}
                      disabled={uploadMutation.isPending}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-850 bg-slate-900/50 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Replace Resume
                    </button>

                    <button
                      type="button"
                      onClick={handleRemoveClick}
                      disabled={uploadMutation.isPending}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-xs font-semibold text-red-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Remove Resume
                    </button>

                    <button
                      type="button"
                      onClick={handleUploadClick}
                      disabled={uploadMutation.isPending || !selectedRawFile}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white shadow-md hover:scale-102 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploadMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Resume"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-1">
              <span className="text-[10px] block font-bold text-slate-500 uppercase tracking-wider">Current Resume</span>
              <p className="text-xs font-bold text-white truncate max-w-full pt-2">
                {latestResume ? latestResume.originalName : "None Selected"}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-1">
              <span className="text-[10px] block font-bold text-slate-500 uppercase tracking-wider">ATS Score</span>
              <p className="text-lg font-extrabold text-white pt-1">
                {latestResume && latestResume.atsScore ? `${latestResume.atsScore}%` : "--"}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-1">
              <span className="text-[10px] block font-bold text-slate-500 uppercase tracking-wider">Last Updated</span>
              <p className="text-xs font-bold text-slate-200 pt-2">
                {latestResume 
                  ? new Date(latestResume.updatedAt || latestResume.uploadedAt).toLocaleDateString() 
                  : "--"}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-1">
              <span className="text-[10px] block font-bold text-slate-500 uppercase tracking-wider">Resume Status</span>
              <span className={`inline-flex items-center px-2 py-0.5 mt-2 rounded-full text-[10px] font-semibold ${
                latestResume?.analysisStatus === "completed"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                  : latestResume?.analysisStatus === "processing"
                  ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                  : latestResume?.analysisStatus === "pending"
                  ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                  : "bg-slate-900 border border-slate-800 text-slate-400"
              }`}>
                {latestResume ? latestResume.analysisStatus : "N/A"}
              </span>
            </div>
          </div>

          {/* History Lists */}
          <div className="p-6 md:p-8 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Resume History</h3>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Archived versions</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="text-center py-6 text-slate-500 text-xs border border-slate-850/60 rounded-xl bg-slate-950/20">
                Archived drafts are loaded dynamically once versions are saved.
              </div>
            </div>
          </div>

        </div>

        {/* Right Side Panel: Tips & Practices */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Best ATS Practices Card */}
          <div className="p-6 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Info className="h-4.5 w-4.5 text-indigo-400" />
              ATS Best Practices
            </h3>
            
            <ul className="space-y-4 pt-1">
              {[
                {
                  title: "Simple layouts work best",
                  desc: "Avoid multi-column tables, visual charts, or image files which block reading parsers.",
                },
                {
                  title: "Match job description keywords",
                  desc: "Align resume tag keywords with terms found directly in the target role description.",
                },
                {
                  title: "Use clean heading standards",
                  desc: "Use clear section titles like 'Work Experience', 'Education', and 'Skills'.",
                },
                {
                  title: "Format typography fonts",
                  desc: "Stick to clean sans-serif typefaces like Arial, Helvetica, or Inter.",
                },
              ].map((tip) => (
                <li key={tip.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-[10px]">
                    <Check className="h-3 w-3" />
                  </span>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-200">{tip.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">{tip.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported format constraints */}
          <div className="p-6 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Format Requirements</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 rounded-xl border border-slate-850 bg-slate-950/60">
                <span className="text-[10px] block text-slate-500 font-bold uppercase tracking-wider">PDF format</span>
                <span className="text-xs font-bold text-slate-200 block mt-1">Recommended</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-850 bg-slate-950/60">
                <span className="text-[10px] block text-slate-500 font-bold uppercase tracking-wider">DOCX format</span>
                <span className="text-xs font-bold text-slate-200 block mt-1">Supported</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1 bg-slate-950/40 py-2.5 rounded-lg border border-slate-850/40">
              <Info className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              Files size must not exceed 5 MB limits
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
export default ResumePage;
