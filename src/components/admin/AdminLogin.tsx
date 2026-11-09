import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master password (artamad2026) or custom token
    if (password === 'artamad2026' || password === 'admin') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE9DF] dark:bg-[#0E1314] text-[#1E2424] dark:text-[#F2EFE9] flex items-center justify-center p-4 sm:p-6 font-fa transition-colors">
      <div className="w-full max-w-md bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(30,36,36,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#3E777A]/10 dark:bg-[#65B7B5]/15 border border-[#3E777A]/25 text-[#3E777A] dark:text-[#65B7B5] flex items-center justify-center shadow-xs">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#3E777A] dark:text-[#65B7B5] font-semibold block">
              ARTA MAD HONAR · CMS
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[#1E2424] dark:text-[#FAF8F4] mt-1">
              ورود به پنل مدیریت محتوا
            </h1>
          </div>
          <p className="text-xs text-[#777A76] dark:text-[#96A7A7] leading-relaxed">
            مدیریت دپارتمان‌ها، آثار، اعضای استودیو و تنظیمات سئو
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
              رمز عبور مدیریت:
            </label>
            <div className="relative">
              <input
                type="password"
                dir="ltr"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="رمز عبور را وارد کنید..."
                className="w-full px-4 py-3 rounded-xl bg-[#EDE9DF]/70 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] focus:border-[#3E777A] dark:focus:border-[#65B7B5] focus:outline-none text-sm text-[#1E2424] dark:text-white transition-colors"
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>رمز عبور اشتباه است. (رمز پیش‌فرض: <code className="font-mono">artamad2026</code>)</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>ورود به پیشخوان</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </form>

        {/* Back Link & Hint */}
        <div className="pt-4 border-t border-[#DCD6C8] dark:border-[#27363A] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#777A76] dark:text-[#96A7A7]">
          <a
            href="/"
            className="hover:text-[#3E777A] dark:hover:text-[#65B7B5] transition-colors flex items-center gap-1"
          >
            <ArrowRight className="w-3 h-3" />
            <span>بازگشت به وب‌سایت اصلی</span>
          </a>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#777A76]/80">
            <ShieldCheck className="w-3 h-3 text-[#3E777A]" />
            <span>Local Admin Environment</span>
          </div>
        </div>

      </div>
    </div>
  );
};
