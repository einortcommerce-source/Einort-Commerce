import { ArrowRight, Store } from 'lucide-react';
import { EINORT_LOGO_PATH, EINORT_URLS } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface MerchantBannerProps {
  language: Language;
}

export function MerchantBanner({ language }: MerchantBannerProps) {
  const t = TRANSLATIONS[language];

  return (
    <section
      aria-labelledby="merchant-banner-heading"
      className="bg-white py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#050D24] via-[#0A1740] to-[#6439D6] p-6 sm:p-10 lg:p-12 text-white shadow-xl shadow-[#050D24]/15">
          {/* Subtle architectural gradient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-80 rounded-full bg-[#1677F8]/25 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#050D24] ring-1 ring-white/20 overflow-hidden shrink-0">
                  <img
                    src={EINORT_LOGO_PATH}
                    alt="EINORT"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#93B4FF]">
                  {t.sellOnEinort}
                </span>
              </div>

              <h2
                id="merchant-banner-heading"
                className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white [text-wrap:balance]"
              >
                {t.merchantBannerTitle}
              </h2>

              <p className="max-w-xl text-sm sm:text-base text-[#E9EEF8]/85 leading-relaxed">
                {t.merchantBannerBody}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={EINORT_URLS.signup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#050D24] shadow-sm transition-all hover:bg-[#E9EEF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0"
                >
                  <Store className="size-4 text-[#1749C8]" aria-hidden="true" />
                  <span>{t.openYourStore}</span>
                  <ArrowRight className="size-4 text-[#1749C8]" aria-hidden="true" />
                </a>

                <a
                  href={EINORT_URLS.login}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/25 bg-white/8 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/15 whitespace-nowrap shrink-0"
                >
                  {t.merchantLogin}
                </a>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="relative flex size-52 items-center justify-center rounded-2xl border border-white/15 bg-[#050D24]/80 p-6 shadow-2xl">
                <img
                  src={EINORT_LOGO_PATH}
                  alt="EINORT 3D Symbol"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
