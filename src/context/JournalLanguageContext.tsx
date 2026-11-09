import React, { createContext, useContext, useState } from 'react';
import { JournalLang } from '../data/journal';

export interface LanguageOption {
  code: JournalLang;
  label: string;
}

export const JOURNAL_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'En' },
  { code: 'ru', label: 'Ru' },
  { code: 'uk', label: 'Uk' },
];

export interface JournalUIStrings {
  backHome: string;
  eyebrow: string;
  title: string;
  latestArticle: string;
  readArticle: string;
  archiveEyebrow: string;
  archiveTitle: string;
  backToArticles: string;
  copiedLink: string;
  nextInJournal: string;
  keyTakeaways: string;
  notFoundTitle: string;
  notFoundCta: string;
  share: string;
}

export const JOURNAL_UI_STRINGS: Record<JournalLang, JournalUIStrings> = {
  en: {
    backHome: 'BACK HOME',
    eyebrow: 'Thoughts & Systems',
    title: 'Journal',
    latestArticle: 'New',
    readArticle: 'Read Article',
    archiveEyebrow: 'Archive & Articles',
    archiveTitle: 'All Previous Posts',
    backToArticles: 'BACK TO ARTICLES',
    copiedLink: 'Copied to clipboard',
    nextInJournal: 'Next in Journal',
    keyTakeaways: 'Key Takeaways',
    notFoundTitle: 'Article Not Found',
    notFoundCta: 'Back to Journal',
    share: 'Share',
  },
  ru: {
    backHome: 'НА ГЛАВНУЮ',
    eyebrow: 'Мысли и системы',
    title: 'Журнал',
    latestArticle: 'New',
    readArticle: 'Читать статью',
    archiveEyebrow: 'Архив и статьи',
    archiveTitle: 'Все публикации',
    backToArticles: 'КО ВСЕМ СТАТЬЯМ',
    copiedLink: 'Ссылка скопирована',
    nextInJournal: 'Следующая статья',
    keyTakeaways: 'Ключевые выводы',
    notFoundTitle: 'Статья не найдена',
    notFoundCta: 'Назад в журнал',
    share: 'Поделиться',
  },
  uk: {
    backHome: 'НА ГОЛОВНУ',
    eyebrow: 'Думки та системи',
    title: 'Журнал',
    latestArticle: 'New',
    readArticle: 'Читати статтю',
    archiveEyebrow: 'Архів та статті',
    archiveTitle: 'Всі публікації',
    backToArticles: 'ДО ВСІХ СТАТЕЙ',
    copiedLink: 'Посилання скопійовано',
    nextInJournal: 'Наступна стаття',
    keyTakeaways: 'Ключові висновки',
    notFoundTitle: 'Статтю не знайдено',
    notFoundCta: 'Назад до журналу',
    share: 'Поділитися',
  },
};

const STORAGE_KEY = 'portfolio_journal_lang';

interface JournalLanguageContextType {
  language: JournalLang;
  setLanguage: (lang: JournalLang) => void;
  t: JournalUIStrings;
}

const JournalLanguageContext = createContext<JournalLanguageContextType | undefined>(undefined);

export function JournalLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<JournalLang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'uk' || saved === 'en' || saved === 'ru') {
        return saved;
      }
    } catch {
      // Ignore
    }
    return 'en';
  });

  const setLanguage = (lang: JournalLang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  };

  return (
    <JournalLanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: JOURNAL_UI_STRINGS[language] || JOURNAL_UI_STRINGS.en,
      }}
    >
      {children}
    </JournalLanguageContext.Provider>
  );
}

export function useJournalLang() {
  const context = useContext(JournalLanguageContext);
  if (!context) {
    const [language, setLanguageState] = useState<JournalLang>(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'uk' || saved === 'en' || saved === 'ru') return saved;
      } catch {}
      return 'en';
    });
    const setLanguage = (lang: JournalLang) => {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {}
    };
    return {
      language,
      setLanguage,
      t: JOURNAL_UI_STRINGS[language] || JOURNAL_UI_STRINGS.en,
    };
  }
  return context;
}
