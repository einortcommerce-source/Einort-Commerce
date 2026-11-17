import { useState } from 'react';
import { Mail, AlertCircle, Info } from 'lucide-react';
import { EINORT_URLS } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface NewsletterProps {
  language: Language;
}

export function Newsletter({ language }: NewsletterProps) {
  const t = TRANSLATIONS[language];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'not-configured'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      setStatus('error');
      setErrorMessage(
        language === 'fr'
          ? 'Veuillez saisir une adresse e-mail.'
          : 'Please enter your email address.',
      );
      return;
    }

    if (!emailPattern.test(trimmed)) {
      setStatus('error');
      setErrorMessage(
        language === 'fr'
          ? 'Veuillez saisir une adresse e-mail valide.'
          : 'Please enter a valid email address.',
      );
      return;
    }

    setErrorMessage('');
    setStatus('not-configured');
  };

  return (
    <div className="space-y-3">
      <h3 className="font-heading text-sm font-semibold text-white">
        {t.footerNewsletterTitle}
      </h3>
      <p className="text-xs sm:text-sm text-[#E9EEF8]/75 leading-relaxed">
        {t.footerNewsletterSubtitle}
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <label htmlFor="einort-newsletter-email" className="sr-only">
            {t.newsletterPlaceholder}
          </label>
          <div className="relative flex-1">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#93B4FF]/70"
              aria-hidden="true"
            />
            <input
              id="einort-newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder={t.newsletterPlaceholder}
              className="h-10 w-full rounded-lg border border-white/15 bg-[#0A1740] pl-9 pr-3 text-sm text-white placeholder:text-[#93B4FF]/60 focus:border-[#1677F8] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#1749C8] to-[#1677F8] px-4 text-sm font-semibold text-white hover:brightness-110 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.subscribe}
          </button>
        </div>

        {status === 'error' && (
          <p role="alert" className="flex items-center gap-1.5 text-xs text-rose-300">
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </p>
        )}

        {status === 'not-configured' && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-lg border border-[#1677F8]/40 bg-[#0A1740] p-2.5 text-xs text-[#E9EEF8]"
          >
            <Info className="size-4 shrink-0 text-[#1677F8] mt-0.5" aria-hidden="true" />
            <span>
              {language === 'fr' ? (
                <>
                  L’inscription à la newsletter nécessite une connexion API active. Vous pouvez aussi contacter directement{' '}
                  <a href={`mailto:${EINORT_URLS.supportEmail}`} className="underline text-[#93B4FF]">
                    {EINORT_URLS.supportEmail}
                  </a>
                  .
                </>
              ) : (
                <>
                  Email subscription is ready for backend endpoint integration. You can also reach EINORT at{' '}
                  <a href={`mailto:${EINORT_URLS.supportEmail}`} className="underline text-[#93B4FF]">
                    {EINORT_URLS.supportEmail}
                  </a>
                  .
                </>
              )}
            </span>
          </div>
        )}
      </form>
    </div>
  );
}
