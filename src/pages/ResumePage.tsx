import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Trash2,
  Download,
  Info,
  Check,
  Sparkles,
  Search,
  CloudUpload
} from "lucide-react";
import toast from "react-hot-toast";

type SelectedFile = {
  name: string;
  size: string;
  type: string;
  date: string;
  score: string;
  status: string;
};

export function ResumePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for user selected file (starts as null to show upload card prominently)
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);

  // Previous resume history mock
  const [historyFiles] = useState<SelectedFile[]>([
    {
      name: "nitesh_resume_v1.pdf",
      size: "1.1 MB",
      type: "application/pdf",
      date: "Aug 12, 2026",
      score: "85%",
      status: "Archived",
    },
    {
      name: "nitesh_resume_draft.docx",
      size: "940 KB",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      date: "Aug 05, 2026",
      score: "78%",
      status: "Archived",
    },
  ]);

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

      const newFile: SelectedFile = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        type: file.type || "application/octet-stream",
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        score: "Calculating...",
        status: "Processing",
      };

      setSelectedFile(newFile);
      toast.success("Resume selected successfully!");

      // Simulate AI score calculation
      setTimeout(() => {
        setSelectedFile((prev) => {
          if (prev && prev.name === file.name) {
            return {
              ...prev,
              score: Math.floor(Math.random() * 15 + 80) + "%",
              status: "Audited",
            };
          }
          return prev;
        });
        toast.success("AI score calculation complete!");
      }, 3000);
    }
  };

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveClick = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Resume removed.");
  };

  const handleActionMock = (actionName: string) => {
    alert(`${actionName} triggered (Simulation Mode).`);
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* 1. Hero Welcome Header Banner */}
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

      {/* 2. Split-screen Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (Upload zone, preview panel, stats, history) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2a. Prominent Resume Upload Card at the top */}
          <div className="p-6 md:p-8 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-6">
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/40 hover:bg-indigo-500/[0.02] transition-all cursor-pointer group" onClick={handleChooseClick}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
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
                className="mt-6 px-6 py-2.5 rounded-xl bg-indigo-500 text-xs font-semibold text-white shadow-md hover:bg-indigo-600 hover:scale-102 active:scale-98 transition-all"
              >
                Choose Resume
              </button>
            </div>
          </div>

          {/* 2b. Conditional Preview Card (below the upload area) */}
          <AnimatePresence>
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">File Preview</h3>
                  
                  <div className="p-5 rounded-2xl border border-slate-850 bg-slate-950/40 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                        <FileText className="h-6 w-6" />
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-100 truncate pr-2">
                          {selectedFile.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-1.5 leading-none">
                          Size: {selectedFile.size} • Type: {selectedFile.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Score</span>
                        <span className="text-sm font-extrabold text-indigo-400">{selectedFile.score}</span>
                      </div>
                      <div className="h-10 w-10 rounded-full border-2 border-indigo-500/30 flex items-center justify-center text-xs font-bold text-white relative">
                        <span className="absolute inset-0 rounded-full border-2 border-t-indigo-500 border-r-indigo-500 border-b-indigo-500 border-l-transparent animate-spin-slow" />
                        {selectedFile.score !== "Calculating..." ? selectedFile.score.replace("%", "") : "--"}
                      </div>
                    </div>
                  </div>

                  {/* Operational Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={handleChooseClick}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-850 bg-slate-900/50 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                    >
                      Replace Resume
                    </button>

                    <button
                      type="button"
                      onClick={handleRemoveClick}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-xs font-semibold text-red-400 transition-all"
                    >
                      Remove Resume
                    </button>

                    <button
                      type="button"
                      disabled
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/40 text-slate-500 text-xs font-semibold cursor-not-allowed border border-slate-800"
                    >
                      <Search className="h-4 w-4" />
                      Analyze Resume
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2c. Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-1">
              <span className="text-[10px] block font-bold text-slate-500 uppercase tracking-wider">Current Resume</span>
              <p className="text-xs font-bold text-white truncate max-w-full pt-2">
                {selectedFile ? selectedFile.name : "None Selected"}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-1">
              <span className="text-[10px] block font-bold text-slate-500 uppercase tracking-wider">ATS Score</span>
              <p className="text-lg font-extrabold text-white pt-1">
                {selectedFile ? selectedFile.score : "--"}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-1">
              <span className="text-[10px] block font-bold text-slate-500 uppercase tracking-wider">Last Updated</span>
              <p className="text-xs font-bold text-slate-200 pt-2">
                {selectedFile ? selectedFile.date : "--"}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-1">
              <span className="text-[10px] block font-bold text-slate-500 uppercase tracking-wider">Resume Status</span>
              <span className={`inline-flex items-center px-2 py-0.5 mt-2 rounded-full text-[10px] font-semibold ${
                selectedFile?.status === "Audited"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                  : selectedFile?.status === "Processing"
                  ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                  : "bg-slate-900 border border-slate-800 text-slate-400"
              }`}>
                {selectedFile ? selectedFile.status : "N/A"}
              </span>
            </div>
          </div>

          {/* 2d. Resume History List */}
          <div className="p-6 md:p-8 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Resume History</h3>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{historyFiles.length} versions archived</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {historyFiles.map((file) => (
                <div
                  key={file.name}
                  className="p-4 rounded-xl border border-slate-850/60 bg-slate-900/20 hover:border-slate-800 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-slate-950/60 text-slate-500 border border-slate-850/40">
                      <FileText className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 truncate pr-2 max-w-[200px] sm:max-w-xs">
                        {file.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Uploaded on {file.date} • {file.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t border-slate-800/40 sm:border-t-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ATS Score</span>
                      <span className="text-xs font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                        {file.score}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleActionMock("Download version")}
                        className="p-2 rounded-lg border border-slate-800 hover:bg-slate-900 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
                        aria-label="Download version"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleActionMock("Delete version")}
                        className="p-2 rounded-lg border border-red-500/10 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Delete version"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
