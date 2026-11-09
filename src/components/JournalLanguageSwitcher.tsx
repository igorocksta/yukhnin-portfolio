import React from 'react';
import { useJournalLang, JOURNAL_LANGUAGES } from '../context/JournalLanguageContext';

interface JournalLanguageSwitcherProps {
  className?: string;
}

export default function JournalLanguageSwitcher({ className = '' }: JournalLanguageSwitcherProps) {
  const { language, setLanguage } = useJournalLang();

  return (
    <div 
      className={`inline-flex items-center p-[2px] sm:p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md select-none shrink-0 ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {JOURNAL_LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            aria-pressed={isActive}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] tracking-wider font-sans transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-[#9F9F9F] hover:text-white font-light'
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
