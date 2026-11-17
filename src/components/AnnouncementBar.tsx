import { Store, LogIn, ArrowUpRight } from 'lucide-react';
import { EINORT_URLS } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface AnnouncementBarProps {
  language: Language;
}

export function AnnouncementBar({ language }: AnnouncementBarProps) {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-[#050D24] text-white border-b border-[#1749C8]/25">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-2 text-xs">
        <p className="truncate text-[#E9EEF8]/90 font-normal">
          {t.announcement}
        </p>

        <nav
          aria-label="Merchant quick links"
          className="hidden md:flex items-center gap-5 shrink-0 text-[#E9EEF8]/85"
        >
          <a
            href={EINORT_URLS.signup}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677F8] rounded-sm"
          >
            <Store className="size-3.5 text-[#1677F8]" aria-hidden="true" />
            <span>{t.sellOnEinort}</span>
          </a>
          <span className="text-white/20" aria-hidden="true">
            |
          </span>
          <a
            href={EINORT_URLS.signup}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 font-medium text-[#93B4FF] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677F8] rounded-sm"
          >
            <span>{t.openAStore}</span>
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
          <span className="text-white/20" aria-hidden="true">
            |
          </span>
          <a
            href={EINORT_URLS.login}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677F8] rounded-sm"
          >
            <LogIn className="size-3.5 text-[#8655F0]" aria-hidden="true" />
            <span>{t.merchantLogin}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
